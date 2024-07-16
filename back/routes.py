import datetime
from functools import wraps
from flask import Blueprint, request, jsonify
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from utils import is_inside_geofence, speed_limit
from models import CarState, User, Device, CarAlert, Category
from __init__ import db

main = Blueprint('main', __name__)

BLACKLIST = set()


def is_token_revoked(jwt_header, jwt_payload):
    jti = jwt_payload['jti']
    return jti in BLACKLIST

@main.route('/signup', methods=['POST'])
def sign_up():
    data = request.json
    fname = data.get('fname')
    lname = data.get('lname')
    email = data.get('email')
    password = data.get('password')
    phone = data.get('phone')

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already exists'}), 400

    hashed_password = generate_password_hash(password, method='pbkdf2:sha1', salt_length=8)
    new_user = User(fname=fname, lname=lname, email=email, password=hashed_password, phone=phone)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@main.route('/signin', methods=['POST'])
def signin():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'User not exist please create new one '}), 404

    if not check_password_hash(user.password, password):
        return jsonify({'error': 'Invalid email or password'}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({'access_token': access_token}), 200

@main.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    return jsonify({'message': 'Successfully logged out'}), 200

@main.route('/delete_account', methods=['DELETE'])
@jwt_required()
def delete_account():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    try:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User account deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete user account', 'details': str(e)}), 500

@main.route('/add_category', methods=['POST'])
@jwt_required()
def add_category():
    current_user_id = get_jwt_identity()

    try:
        data = request.get_json()
        category_name = data.get('category_name')

        if not category_name:
            return jsonify({'error': 'Category name is required'}), 400

        new_category = Category(user_id=current_user_id, category_name=category_name)
        db.session.add(new_category)
        db.session.commit()

        return jsonify({'message': 'Category added successfully', 'category_id': new_category.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@main.route('/device_counts', methods=['GET'])
@jwt_required()
def device_counts():
    current_user_id = get_jwt_identity()

    try:
        total_devices = Device.query.filter_by(user_id=current_user_id).count()
        on_devices = Device.query.filter_by(user_id=current_user_id, status='on').count()
        off_devices = total_devices - on_devices

        categories = Category.query.filter_by(user_id=current_user_id).all()
        categories_info = [{'id': category.id, 'category_name': category.category_name} for category in categories]

        return jsonify({
            'user_id': current_user_id,
            'total_devices': total_devices,
            'on_devices': on_devices,
            'off_devices': off_devices,
            'categories': categories_info
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@main.route('/add_device', methods=['POST'])
@jwt_required()
def add_device():
    current_user_id = get_jwt_identity()
    data = request.json

    device_id = data.get('device_id', None)
    serial_number = data.get('serial_number')
    status = data.get('status', 'on')
    battery_percentage = data.get('battery_percentage', 100)
    category_id = data.get('category')
    phone = data.get('phone')
    car_name = data.get('car_name')
    plate_number = data.get('plate_number')

    if device_id == "-1" or device_id is None:
        new_device = Device(
            serial_number=serial_number,
            status=status,
            battery_percentage=battery_percentage,
            category_id=category_id,
            phone=phone,
            car_name=car_name,
            plate_number=plate_number,
            user_id=current_user_id
        )

        try:
            db.session.add(new_device)
            db.session.commit()
            return jsonify({'message': 'Device added successfully.', 'device_id': new_device.id}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    else:
        # Update existing device
        existing_device = Device.query.filter_by(id=device_id).first()

        if existing_device:
            existing_device.serial_number = serial_number
            existing_device.status = status
            existing_device.battery_percentage = battery_percentage
            existing_device.category_id = category_id
            existing_device.phone = phone
            existing_device.car_name = car_name
            existing_device.plate_number = plate_number
            existing_device.user_id = current_user_id

            try:
                db.session.commit()
                return jsonify({'message': 'Device updated successfully.', 'device_id': existing_device.id}), 200
            except Exception as e:
                db.session.rollback()
                return jsonify({'error': str(e)}), 500
        else:
            return jsonify({'error': 'Device not found with the given device_id.'}), 404

@main.route('/devices_by_category', methods=['POST'])
@jwt_required()
def get_devices_by_category():
    current_user_id = get_jwt_identity()
    data = request.json

    category_id = data.get('category_id')

    if not category_id:
        return jsonify({'error': 'Category ID is required in JSON data'}), 400

    devices = Device.query.filter_by(user_id=current_user_id, category_id=category_id).all()

    devices_info = []
    for device in devices:
        devices_info.append({
            'serial_number': device.serial_number,
            'status': device.status,
            'battery_percentage': device.battery_percentage,
            'phone': device.phone,
            'car_name': device.car_name,
            'plate_number': device.plate_number,
            'speed_limit': device.speed_limit,
            'geo_longitude': device.geo_longitude,
            'geo_latitude': device.geo_latitude,
            'geo_radius': device.geo_radius,
            'device_id': device.id
        })

    return jsonify({'devices': devices_info}), 200

@main.route('/alerts', methods=['GET'])
@jwt_required()
def get_user_alerts():
    current_user_id = get_jwt_identity()

    alerts = CarAlert.query.filter_by(user_id=current_user_id).all()

    alerts_info = []
    for alert in alerts:
        alerts_info.append({
            'alert_id': alert.alert_id,
            'plate_number': alert.plate_number,
            'date': alert.date.isoformat(),
            'type_of_alert': alert.type_of_alert
        })

    return jsonify({'alerts': alerts_info}), 200

@main.route('/latest_car_state', methods=['POST'])
@jwt_required()
def get_latest_car_state():
    current_user_id = get_jwt_identity()

    data = request.json
    plate_number = data.get('plate_number')

    if not plate_number:
        return jsonify({'error': 'Plate number is required'}), 400

    latest_car_state = CarState.query.filter_by(user_id=current_user_id, plate_number=plate_number).order_by(
        CarState.date.desc()).first()

    if not latest_car_state:
        return jsonify({'error': 'No car state found for the given plate number.'}), 404

    response_data = {
        'plate_number': latest_car_state.plate_number,
        'longitude': latest_car_state.longitude,
        'latitude': latest_car_state.latitude,
        'speed': latest_car_state.speed,
        'date': latest_car_state.date.isoformat()
    }

    return jsonify(response_data), 200

@main.route('/delete_device', methods=['DELETE'])
@jwt_required()
def delete_device():
    current_user_id = get_jwt_identity()
    data = request.json
    serial_number = data.get('serial_number')

    if not serial_number:
        return jsonify({'error': 'Serial number is required'}), 400

    device = Device.query.filter_by(serial_number=serial_number, user_id=current_user_id).first()
    if not device:
        return jsonify({'error': 'Device not found or you do not have permission to delete it'}), 404

    try:
        db.session.delete(device)
        db.session.commit()
        return jsonify({'message': 'Device deleted successfully.'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete device', 'details': str(e)}), 500

@main.route('/update_device_settings', methods=['POST'])
@jwt_required()
def update_device_settings():
    current_user_id = get_jwt_identity()
    data = request.json

    device_id = data.get('device_id')
    speed_limit = data.get('speed_limit')
    geo_longitude = data.get('geo_longitude')
    geo_latitude = data.get('geo_latitude')
    geo_radius = data.get('geo_radius')

    if not all([device_id, speed_limit, geo_longitude, geo_latitude, geo_radius]):
        return jsonify({'error': 'Missing required fields.'}), 400

    device = Device.query.filter_by(id=device_id, user_id=current_user_id).first()

    if not device:
        return jsonify({'error': 'Device not found or you do not have permission to update it.'}), 404

    try:
        device.speed_limit = speed_limit
        device.geo_longitude = geo_longitude
        device.geo_latitude = geo_latitude
        device.geo_radius = geo_radius

        db.session.commit()

        return jsonify({'message': 'Device settings updated successfully.'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@main.route('/esp_data', methods=['POST'])
def esp_data():
    data = request.json

    lat = data.get('lat')
    lon = data.get('lon')
    speed = data.get('speed')
    serial_number = data.get('serial_number')

    device = Device.query.filter_by(serial_number=serial_number).first()

    if device:
        try:
            user_id = device.user_id
            car_state = CarState(
                plate_number=device.plate_number,
                longitude=lon,
                latitude=lat,
                speed=speed,
                date=datetime.datetime.utcnow() + datetime.timedelta(hours=2),
                user_id=user_id
            )
            db.session.add(car_state)
            db.session.commit()

            violations = []

            # Check geofencing
            if not is_inside_geofence(lat, lon, device.geo_latitude, device.geo_longitude, device.geo_radius):
                # Create a record in CarAlerts table for geofence violation
                car_alert = CarAlert(
                    user_id=device.user_id,
                    plate_number=device.plate_number,
                    date=datetime.datetime.utcnow() + datetime.timedelta(hours=2),
                    type_of_alert='Geofence Violation'
                )
                db.session.add(car_alert)
                db.session.commit()
                violations.append('Geofence Violation')

            # Check speed limit
            if not speed_limit(speed, device.speed_limit):
                # Create a record in CarAlerts table for speed violation
                car_alert = CarAlert(
                    user_id=device.user_id,
                    plate_number=device.plate_number,
                    date=datetime.datetime.utcnow() + datetime.timedelta(hours=2),
                    type_of_alert='Speeding'
                )
                db.session.add(car_alert)
                db.session.commit()
                violations.append('Speeding')

            if violations:
                return jsonify({'message': 'Data updated successfully with violations.'}), 200
            else:
                return jsonify({'message': 'Data updated successfully'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Device not found.'}), 404

@main.route('/edit_user_info', methods=['PUT'])
@jwt_required()
def edit_user_info():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    data = request.json

    fname = data.get('fname')
    lname = data.get('lname')
    email = data.get('email')
    phone = data.get('phone')
    password = data.get('password')

    if email and email != user.email and User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already exists'}), 400

    try:
        if fname:
            user.fname = fname
        if lname:
            user.lname = lname
        if email:
            user.email = email
        if phone:
            user.phone = phone
        if password:
            user.password = generate_password_hash(password, method='pbkdf2:sha1', salt_length=8)

        db.session.commit()
        return jsonify({'message': 'User information updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update user information', 'details': str(e)}), 500

@main.route('/', methods=['GET'])
def hello_world():
    return jsonify({'message': 'Data updated successfully.'}), 200


