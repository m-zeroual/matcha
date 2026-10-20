from flask import Blueprint, jsonify, request
from backend.services.login_service import get_user
import hashlib, uuid

login_bp = Blueprint(
    "login",
    __name__,
    url_prefix="/api/login"
)

logout_bp = Blueprint(
    "login",
    __name__,
    url_prefix="/api/logout"
)


@login_bp.route("/", methods=["POST"])
def login():
    print("Login ...")
    data = request.get_json()

    password = data['password']
    username = data['username']

    salt = uuid.uuid4().hex
    password_salt = (password + str(salt))
    hashed_password = hashlib.sha256(password_salt.encode('utf-8')).hexdigest()

    print(hashed_password)

    print(username)
    print(password)


    

    result = get_user(username, password)

    # print(result)

    return jsonify({
        "message": "Login success"
    }), 200

@logout_bp.route('')
def logout():

    return jsonify({
        "message": "Login success"
    }), 200