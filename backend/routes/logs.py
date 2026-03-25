from flask import Blueprint, request, jsonify
from services.store import add_log, get_logs

bp = Blueprint('logs', __name__)

@bp.route('/log', methods=['POST'])
def log():
    add_log(request.json)
    return {"ok": True}

@bp.route('/logs')
def logs():
    return jsonify(get_logs())