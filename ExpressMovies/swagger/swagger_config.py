from swagger.namespaces.filme_namespace import filme_ns
from . import api


def configure_swagger(app):
    api.init_app(app)
    api.add_namespace(filme_ns,path='/filmes')
    api.add_namespace()
    api.mask_swagger = False