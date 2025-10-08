from app.routes.diretor_routes import atualizar_diretor,buscar_diretor,buscar_diretores,criar_diretor,deletar_diretor
from flask_restx import Resource,fields,Namespace

diretor_ns = Namespace('diretor',description='Operações relacionadas aos diretores')

diretor_model = diretor_ns.model('Diretor',{
    'id':fields.Integer(required=True,description='Id do diretor'),
    'nome':fields.String(required=True,description='nome do diretor'),
    'data_nascimento':fields.Date(required=False,description='data de nascimento do diretor'),
    'filmes_id':fields.Integer(required=True,description='Filme que o diretor dirigiu')
})

diretor_model_output = diretor_ns.model('Diretor Output',{
    'id':fields.Integer(description='Id do diretor'),
    'nome':fields.String(description='Nome do diretor'),
    'data_nascimento':fields.Date(description='Data de nascimento do diretor'),
    'filmes_id':fields.Integer(description="filme que o diretor dirigiu")
})

@diretor_ns.route('/')
class DiretorResource(Resource):
    def get(self):
        """Listar todos os diretores"""
        return buscar_diretores(),200
    
    def post(self,data):
        """Cria um novo diretor"""
        data = diretor_ns.payload
        response,status_code = criar_diretor(data)
        return response,status_code

@diretor_ns.route('/<int:id>')
class DiretorIdResource(Resource):
    def get(self,id):
        """Retorna o diretor pelo id"""
        return  buscar_diretor(id),200
    
    def put(self,id):
      """Atualiza o diretor"""
      return atualizar_diretor(id),201
        
    
    def delete(id):
        """Deleta um diretor"""
        deletar_diretor(id)
        return '',204