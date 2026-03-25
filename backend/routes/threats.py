from flask import Blueprint, request, jsonify
from services.store import add_threat, get_threats

bp = Blueprint('threats', __name__)

@bp.route('/threat', methods=['POST'])
def threat():
    add_threat(request.json)
    return {"ok": True}

@bp.route('/threats')
def threats():
    return jsonify(get_threats())