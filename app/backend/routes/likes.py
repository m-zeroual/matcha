from flask import Blueprint, jsonify, request

from backend.services.like_service import like_user


likes_bp = Blueprint(
    "likes",
    __name__,
    url_prefix="/api/users"
)


@likes_bp.route(
    "/<target_id>/like",
    methods=["POST"]
)
def create_like(target_id):

    data = request.get_json()

    user_id = data.get("user_id")

    if not user_id:
        return jsonify({
            "error": "user_id is required"
        }), 400

    result = like_user(
        user_id,
        target_id
    )

    if result is None:
        return jsonify({
            "error": "User not found"
        }), 404

    return jsonify({
        "message": "Like created",
        "user": result["user"],
        "target": result["target"]
    }), 201