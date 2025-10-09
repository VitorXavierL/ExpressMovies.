from .namespaces.filme_namespace import filme_ns
from .namespaces.diretor_namespaces import diretor_ns


def configure_swagger(api):
    api.add_namespace(filme_ns,path='/filmes')
    api.add_namespace(diretor_ns,path='/diretores')
    api.mask_swagger = False