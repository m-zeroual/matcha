from flask import Flask
from flask_cors import CORS

from backend.routes.users import users_bp
from backend.routes.likes import likes_bp
from backend.routes.matches import matches_bp
from backend.routes.login import login_bp
from backend.routes.signUp import signUp_bp
from backend.routes.auth import auth_bp







def create_app():

    app = Flask(
        __name__,
        template_folder="../frontend/templates"
    )

    CORS(app, resources={
        r"/api/*": {
            "origins": [
                "http://localhost:5173",
                "http://127.0.0.1:5173"
            ]
        }
    })
    app.register_blueprint(users_bp)
    app.register_blueprint(likes_bp)
    app.register_blueprint(matches_bp)
    app.register_blueprint(login_bp)
    app.register_blueprint(signUp_bp)
    app.register_blueprint(auth_bp)

    return app