
from flask import Blueprint, jsonify, request

from backend.services.user_service import (
    create_user,
    delete_user,
    get_all_users
)


auth_bp = Blueprint(
    "auth",
    __name__,
    url_prefix="/api/auth"
)


@auth_bp.route("", methods=["GET"])
def auth():
    print('------ Auth -------')


    return jsonify(''), 200
