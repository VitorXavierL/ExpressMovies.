from flask import request,Blueprint,jsonify
from .. import db
from ..models.diretor import Diretor
from datetime import datetime
from flask_cors import CORS

diretor_blueprint = Blueprint('diretor_bp' ,__name__, url_prefix='/api')
CORS(diretor_blueprint)

@diretor_blueprint.route('/diretores',methods=['GET'])
def buscar_diretores():
    diretores = Diretor.query.all()
    return jsonify([diretor.dici() for diretor in diretores]),200

@diretor_blueprint.route('/diretores/<int:id>',methods=['GET'])
def buscar_diretor(id):
    try:
        diretor = Diretor.query.get(id)
        return jsonify(diretor.dici()),200
    except Exception:
        return jsonify({'Erro':'Diretor não encontrado'}),404

@diretor_blueprint.route('/diretores/',methods=['POST'])
def criar_diretor():
    data = request.get_json()
    date = datetime.strptime(f'{data["data_nascimento"]}',"%Y-%m-%d")
    diretor = Diretor(nome=data['nome'],data_nascimento=(date.date()),filmes_id=list(data['filmes_id']))
    db.session.add(diretor)
    db.session.commit()
    return jsonify({'Sucesso':'diretor criado!!'}),201

@diretor_blueprint.route('/diretores/<int:id>',methods=['PUT'])
def atualizar_diretor(id):
    try:
        data = request.json
        date = datetime.strptime(f'{data["data_nascimento"]}',"%Y-%m-%d")
        diretor = Diretor.query.get(id)
        diretor.nome = data['nome']
        diretor.data_nasc = date.date()
        diretor.filmes_id = data['filmes_id']
        db.session.commit()
        return jsonify(diretor.dici()), 201
    except Exception:
        return jsonify({'Erro':'diretor não foi encontrado'}),404

@diretor_blueprint.route('/diretores/<int:id>',methods=['DELETE'])  
def deletar_diretor(id):
    try:
        diretor = Diretor.query.get(id)
        db.session.delete(diretor)
        db.session.commit()
        return '',204
    except Exception:
        return jsonify({'Erro':'diretor não encontrado!!'}),404