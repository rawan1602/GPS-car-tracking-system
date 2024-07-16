from __init__ import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String(50))
    lname = db.Column(db.String(50))
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(200))
    phone = db.Column(db.String(20))
    devices = db.relationship('Device', backref='user', lazy=True)


class Device(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    serial_number = db.Column(db.String(20), unique=True, nullable=False)
    status = db.Column(db.String(10))
    battery_percentage = db.Column(db.Integer)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    phone = db.Column(db.String(20))
    car_name = db.Column(db.String(20))
    plate_number = db.Column(db.String(20), unique=True)
    speed_limit = db.Column(db.Integer)
    geo_longitude = db.Column(db.Float)
    geo_latitude = db.Column(db.Float)
    geo_radius = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    category = db.relationship('Category', backref='devices')



class CarState(db.Model):
    state_id = db.Column(db.Integer, primary_key=True)
    plate_number = db.Column(db.String(20), index=True)
    longitude = db.Column(db.Float)
    latitude = db.Column(db.Float)
    speed = db.Column(db.Integer)
    date = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class CarAlert(db.Model):
    alert_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    plate_number = db.Column(db.String(20))
    date = db.Column(db.DateTime)
    type_of_alert = db.Column(db.String(20))


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    category_name = db.Column(db.String(50), nullable=False)
    user = db.relationship('User', backref='categories')
