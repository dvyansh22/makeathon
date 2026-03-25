nodes = {}
logs = []
threats = []
vitals = {}

def update_node(data):
    nodes[data["id"]] = data

def get_nodes():
    return nodes

def add_log(log):
    logs.append(log)

def get_logs():
    return logs[-20:]

def add_threat(threat):
    threats.append(threat)

def get_threats():
    return threats[-10:]

def update_vitals(data):
    vitals[data["id"]] = data["hr"]

def get_vitals():
    return vitals