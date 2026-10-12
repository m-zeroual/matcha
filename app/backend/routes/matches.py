from flask import Blueprint, jsonify

from backend.services.match_service import get_matches


matches_bp = Blueprint(
    "matches",
    __name__,
    url_prefix="/api/matches"
)


@matches_bp.route(
    "/<user_id>",
    methods=["GET"]
)
def matches(user_id):

    result = get_matches(user_id)

    return jsonify(result), 200