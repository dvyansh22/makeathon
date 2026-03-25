from flask import Blueprint, request, jsonify
from services.store import update_node, get_nodes

bp = Blueprint('node', __name__)

@bp.route('/node', methods=['POST'])
def node():
    update_node(request.json)
    return {"ok": True}

@bp.route('/nodes')
def nodes():
    return jsonify(get_nodes())