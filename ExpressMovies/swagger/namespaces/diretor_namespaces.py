from app.models.diretor import Diretor,db
from flask_restx import Resource,fields,Namespace
from datetime import datetime


diretor_ns = Namespace('diretores',description='Operações relacionadas aos diretores')

diretor_model = diretor_ns.model('Diretor',{
    'nome':fields.String(required=True,description='nome do diretor'),
    'data_nascimento':fields.Date(required=False,description='data de nascimento do diretor')
    })

diretor_model_output = diretor_ns.model('Diretor Output',{
    'id':fields.Integer(description='Id do diretor'),
    'nome':fields.String(description='Nome do diretor'),
    'data_nascimento':fields.Date(description='Data de nascimento do diretor')
    })

@diretor_ns.route('/')
class DiretorResource(Resource):
    @diretor_ns.marshal_list_with(diretor_model_output)
    def get(self):
        """Listar todos os diretores"""
        return Diretor.query.all(),200
    
    @diretor_ns.expect(diretor_model)
    @diretor_ns.marshal_with(diretor_model_output,code=201)
    def post(self):
        """Cria um novo diretor"""
        data = diretor_ns.payload
        date = datetime.strptime(f'{data["data_nascimento"]}',"%Y-%m-%d")
        director = Diretor(nome=data['nome'],data_nascimento=date.date())
        db.session.add(director)
        db.session.commit()
        return director

@diretor_ns.route('/<int:id>')
class DiretorIdResource(Resource):
    @diretor_ns.marshal_with(diretor_model_output)
    def get(self,id):
        """Retorna o diretor pelo id"""
        return  Diretor.query.get(id),200
    
    @diretor_ns.expect(diretor_model)
    @diretor_ns.marshal_with(diretor_model_output,code=201)
    def put(self,id):
      """Atualiza o diretor"""
      data = diretor_ns.payload()
      date = datetime.strptime(f'{data["data_nascimento"]}',"%Y-%m-%d")
      director = Diretor.query.get(id)
      director.nome = data['nome']
      director.data_nascimento = date.date()
      db.session.commit()
      return director ,201
        
    
    def delete(id):
        """Deleta um diretor"""
        director = Diretor.query.get(id)
        db.session.delete(director)
        db.session.commit()
        return '',204