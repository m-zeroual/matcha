from flask import Blueprint, jsonify, request
import hashlib, uuid
from backend.services.signup_service import (
    create_user,
    delete_user,
    get_all_users
)

signUp_bp = Blueprint(
    "sign_up",
    __name__,
    url_prefix="/api/sign_up"
)



@signUp_bp.route("/", methods=["POST"])
def signUp():
    print("Sign Up ...")
    data = request.get_json()




    # print("username: ", data['username'])
    # print("password: ", data['password'])
    # print("email: ", data['email'])
    # print(hashed_password)

    data = request.get_json()

    user_id = data.get("id", "")
    username = data.get("username")
    age = data.get("age", "")
    image = data.get("image", "")
    firstname = data.get("firstname")
    lastname = data.get("lastname")
    sexe = data.get("sexe", "")
    interested = data.get("interested", "")
    description = data.get("description", "")
    tags = data.get("tags", "")
    location = data.get("location", "")
    images = data.get("images", "")
    password = data.get("password")
    email = data.get("email")

    salt = uuid.uuid4().hex
    password_salt = (password + str(salt))
    hashed_password = hashlib.sha256(password_salt.encode('utf-8')).hexdigest()

    print(hashed_password)

    # if not user_id or not username or age is None:
    #     return jsonify({
    #         "error": "Missing required fields"
    #     }), 400

    user = create_user(
        user_id,
        username,
        age,
        image,
        firstname,
        lastname,
        sexe,
        interested,
        description,
        tags,
        location,
        images,
        hashed_password,
        email
        )

    return jsonify(user), 201
