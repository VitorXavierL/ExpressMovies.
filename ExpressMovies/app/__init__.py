from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .config import Config
from flask_restx import Api


api = Api (
    version='1.0',
    title='Api ExpressMovies',
    description='Documentação para filmes, diretor',
    doc='/docs',
    mask_swagger = False,
    prefix='/api'
)

db = SQLAlchemy()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)

    api.init_app(app)
    
    from .routes.filmes_routes import filmes_bp
    from .routes.diretor_routes import diretor_blueprint
    app.register_blueprint(filmes_bp)
    app.register_blueprint(diretor_blueprint)

    from swagger.swagger_config import configure_swagger
    configure_swagger(api)


    return app