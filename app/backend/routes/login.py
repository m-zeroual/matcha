from flask import Blueprint, jsonify, request

login_bp = Blueprint(
    "login",
    __name__,
    url_prefix="/api/login"
)

@login_bp.route("/", methods=["POST"])
def login():
    print("Login ...")
    data = request.get_json()

    print("username: ", data['username'])
    print("password: ", data['password'])

    return jsonify({
        "message": "Login success"
    }), 200

@login_bp.route("/", methods=["POST"])
def sign_up():
    print("Sign Up ...")
    data = request.get_json()

    print("username: ", data['username'])
    print("password: ", data['password'])
    print("email: ", data['email'])

    return jsonify({
        "message": "Login success"
    }), 200