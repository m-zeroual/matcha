from flask import Blueprint, jsonify, request

signUp_bp = Blueprint(
    "sign_up",
    __name__,
    url_prefix="/api/sign_up"
)



@signUp_bp.route("/", methods=["POST"])
def signUp():
    print("Sign Up ...")
    data = request.get_json()

    print("username: ", data['username'])
    print("password: ", data['password'])
    print("email: ", data['email'])

    return jsonify({
        "message": "Login success"
    }), 200