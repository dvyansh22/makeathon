import time
from threading import Lock

nodes = {}
logs = []
MAX_LOGS = 20
store_lock = Lock()


def _coerce_number(value):
    if value in (None, ""):
        return None

    try:
        number = float(value)
    except (TypeError, ValueError):
        return value

    return int(number) if number.is_integer() else number


def _normalize_command(value):
    if value is None:
        return None

    command = str(value).strip()
    if not command or command.upper() == "NULL":
        return None

    return command


def _normalize_payload(data):
    if not isinstance(data, dict):
        raise ValueError("Request body must be a JSON object.")

    node_id = str(data.get("id") or "").strip()
    if not node_id:
        raise ValueError("id is required.")

    enemies_payload = data.get("en") or []
    if not isinstance(enemies_payload, list):
        raise ValueError("en must be a JSON array.")

    enemies = []
    for index, enemy in enumerate(enemies_payload, start=1):
        if not isinstance(enemy, dict):
            raise ValueError("Each enemy in en must be a JSON object.")

        enemy_id = _coerce_number(enemy.get("i"))
        if not isinstance(enemy_id, (int, float)):
            enemy_id = index

        enemies.append({
            "i": enemy_id,
            "lat": _coerce_number(enemy.get("lat")),
            "lon": _coerce_number(enemy.get("lon")),
        })

    timestamp = _coerce_number(data.get("timestamp"))
    if not isinstance(timestamp, (int, float)):
        timestamp = int(time.time())

    return {
        "id": node_id,
        "lat": _coerce_number(data.get("lat")),
        "lon": _coerce_number(data.get("lon")),
        "hr": _coerce_number(data.get("hr")),
        "cmd": _normalize_command(data.get("cmd")),
        "en": enemies,
        "timestamp": timestamp,
    }


def _build_log_items_locked():
    return list(logs[-MAX_LOGS:])


def _build_enemy_items_locked():
    enemy_items = []

    for node in nodes.values():
        for enemy in node["en"]:
            enemy_items.append({
                "node_id": node["id"],
                "enemy_id": enemy["i"],
                "lat": enemy["lat"],
                "lon": enemy["lon"],
                "time": node["timestamp"],
            })

    enemy_items.sort(key=lambda item: (item["time"], item["node_id"], item["enemy_id"]))
    return enemy_items


def ingest_data(data):
    normalized = _normalize_payload(data)
    node_id = normalized["id"]

    with store_lock:
        nodes[node_id] = {
            "id": node_id,
            "lat": normalized["lat"],
            "lon": normalized["lon"],
            "hr": normalized["hr"],
            "cmd": normalized["cmd"],
            "en": normalized["en"],
            "enemy_count": len(normalized["en"]),
            "timestamp": normalized["timestamp"],
        }

        if normalized["cmd"]:
            logs.append({
                "id": node_id,
                "cmd": normalized["cmd"],
                "time": normalized["timestamp"],
            })
            del logs[:-MAX_LOGS]

    return normalized


def get_nodes():
    with store_lock:
        return {
            node_id: {
                "id": node["id"],
                "lat": node["lat"],
                "lon": node["lon"],
                "hr": node["hr"],
                "cmd": node["cmd"],
                "enemy_count": node["enemy_count"],
                "timestamp": node["timestamp"],
            }
            for node_id, node in nodes.items()
        }


def get_vitals():
    with store_lock:
        return {
            node_id: {
                "id": node["id"],
                "hr": node["hr"],
                "enemy_count": node["enemy_count"],
                "lat": node["lat"],
                "lon": node["lon"],
                "timestamp": node["timestamp"],
            }
            for node_id, node in nodes.items()
        }


def get_threats():
    with store_lock:
        return list(_build_enemy_items_locked())


def get_logs():
    with store_lock:
        return list(_build_log_items_locked())


def get_dashboard():
    with store_lock:
        node_items = sorted(
            (
                {
                    "id": node["id"],
                    "lat": node["lat"],
                    "lon": node["lon"],
                    "hr": node["hr"],
                    "cmd": node["cmd"],
                    "enemy_count": node["enemy_count"],
                    "timestamp": node["timestamp"],
                }
                for node in nodes.values()
            ),
            key=lambda item: item["id"],
        )
        enemy_items = _build_enemy_items_locked()
        message_items = _build_log_items_locked()
        vitals_items = [
            {
                "id": node["id"],
                "hr": node["hr"],
                "enemy_count": node["enemy_count"],
                "lat": node["lat"],
                "lon": node["lon"],
                "timestamp": node["timestamp"],
            }
            for node in node_items
        ]
        last_updated = max((item["timestamp"] for item in node_items), default=None)

        return {
            "nodes": node_items,
            "vitals": vitals_items,
            "threats": enemy_items,
            "logs": message_items,
            "summary": {
                "node_count": len(node_items),
                "enemy_count": len(enemy_items),
                "message_count": len(message_items),
                "last_updated": last_updated,
            },
        }
