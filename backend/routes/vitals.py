from flask import Blueprint, request, jsonify
from services.store import update_vitals, get_vitals

bp = Blueprint('vitals', __name__)

@bp.route('/vitals', methods=['POST'])
def vitals():
    update_vitals(request.json)
    return {"ok": True}

@bp.route('/vitals')
def get_vitals_api():
    return jsonify(get_vitals())