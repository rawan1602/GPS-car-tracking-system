from math import radians, sin, cos, sqrt, atan2

def speed_limit(device_speed, device_predefined_speed):
    return device_speed <= device_predefined_speed

def is_inside_geofence(device_lat, device_lon, geofence_center_lat, geofence_center_lon, geofence_radius_km):
    distance = calculate_distance(device_lat, device_lon, geofence_center_lat, geofence_center_lon)
    return distance <= geofence_radius_km

def calculate_distance(lat1, lon1, lat2, lon2):
    lat1_rad = radians(lat1)
    lon1_rad = radians(lat1)
    lat2_rad = radians(lat2)
    lon2_rad = radians(lon2)

    earth_radius_km = 6371.0

    delta_lat = lat2_rad - lat1_rad
    delta_lon = lon2_rad - lon1_rad

    a = sin(delta_lat / 2) ** 2 + cos(lat1_rad) * cos(lat2_rad) * sin(delta_lon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    distance_km = earth_radius_km * c

    return distance_km
