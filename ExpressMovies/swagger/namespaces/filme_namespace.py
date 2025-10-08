from app.routes.filmes_routes import create_filme,delete_filme,get_filme,get_filmes,update_filme
from flask_restx import Resource,Namespace,fields

filme_ns = Namespace('filmes',description='Operações relacionadas aos filmes')

filme_model = filme_ns.model('Filme',{
    "id":fields.Integer(required=True,description='ID do filme'),
    "titulo":fields.String(required=True,description="Título do filme"),
    "diretor": fields.String(required=True,description="O diretor do filme"),
    "ano": fields.Integer(required=True,description="Ano em que o filme foi lançado")
})

filme_model_output = filme_ns.model("Filme Output",{
    "id":fields.Integer(description="Id do filme"),
    "titulo": fields.String(description="Título do filme"),
    "diretor": fields.String(description="Diretor do filme"),
    "ano": fields.Integer(description="Ano de lançamento")
})

@filme_ns.route('/')
class FilmeResource(Resource):
    @filme_ns.marshal_list_with(filme_model_output)
    def get(self):     
            '''Listar todos os filmes'''
            return get_filmes()
        
    @filme_ns.expect(filme_model)
    def post(self):
            '''Cria um novo filme'''
            movie = filme_ns.payload
            diretor = create_filme(movie)
            return diretor,201

@filme_ns.route('/<int:filme_id>')
class FilmeIdResource(Resource):
    @filme_ns.marshal_with(filme_model_output)
    def get(self,filme_id):
        '''Retorna um filme'''
        return get_filme(filme_id),200
    
    @filme_ns.expect(filme_model)
    def put(self,filme_id):
        update_filme(filme_id),201
    
    def delete(self,filme_id):
        return delete_filme(filme_id), 204
         