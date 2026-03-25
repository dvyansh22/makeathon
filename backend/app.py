from flask import Flask
from flask_cors import CORS

from routes.node import bp as node_bp
from routes.logs import bp as log_bp
from routes.threats import bp as threat_bp
from routes.vitals import bp as vitals_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(node_bp)
app.register_blueprint(log_bp)
app.register_blueprint(threat_bp)
app.register_blueprint(vitals_bp)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)