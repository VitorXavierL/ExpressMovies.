from flask_restx import Api

api = Api (
    version='1.0',
    title='Api ExpressMovies',
    description='Documentação para filmes, diretor',
    doc='/docs',
    mask_swagger = False,
    prefix='/api'
)