from app.models.filme import Filme,db
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
            return Filme.query.all()
        
    @filme_ns.expect(filme_model)
    @filme_ns.marshal_with(filme_model_output,code=201)
    def post(self):
            '''Cria um novo filme'''
            data = filme_ns.payload
            filme_novo = Filme(id=data['id'],titulo=data['titulo'],diretor=data['diretor'],ano=data['ano'])
            db.session.add(filme_novo)
            db.session.commit()
            return filme_novo

@filme_ns.route('/<int:filme_id>')
class FilmeIdResource(Resource):
    @filme_ns.marshal_with(filme_model_output)
    def get(self,filme_id):
        '''Retorna um filme'''
        filme = Filme.query.get(filme_id)
        return filme
    
    @filme_ns.expect(filme_model)
    @filme_ns.marshal_with(filme_model_output,code=201)
    def put(self,filme_id):
        data = filme_ns.payload
        filme = Filme.query.get(filme_id)
        filme.id = data['id']
        filme.titulo = data['titulo']
        filme.diretor = data['diretor']
        filme.ano = data['ano']
        db.session.commit()
        return filme
    
    def delete(self,filme_id):
        filme = Filme.query.get(filme_id)
        db.session.delete(filme)
        db.session.commit()
        return ""
         