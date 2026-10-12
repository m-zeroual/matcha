from flask import Blueprint, jsonify, request

from backend.services.user_service import (
    create_user,
    delete_user,
    get_all_users
)


users_bp = Blueprint(
    "users",
    __name__,
    url_prefix="/api/users"
)


@users_bp.route("", methods=["GET"])
def users():

    users = get_all_users()

    return jsonify(users), 200


@users_bp.route("", methods=["POST"])
def add_user():

    data = request.get_json()

    user_id = data.get("id")
    username = data.get("username")
    age = data.get("age")
    image = data.get("image")
    firstname = data.get("firstname")
    lastname = data.get("lastname")
    sexe = data.get("sexe")
    interested = data.get("interested")
    description = data.get("description")
    tags = data.get("tags")
    location = data.get("location")
    images = data.get("images")
    password = data.get("password")
    email = data.get("email")

    if not user_id or not username or age is None:
        return jsonify({
            "error": "Missing required fields"
        }), 400

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
        password,
        email
        )

    return jsonify(user), 201

@users_bp.route("", methods=["DELETE"])
def remove_user():
    data = request.get_json()

    user_id = data.get('id')

    user = delete_user(user_id)

    return jsonify(user), 201
