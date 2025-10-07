from flask import Blueprint, request, jsonify
from .. import db
from ..models.filme import Filme

filmes_bp = Blueprint('filmes_bp', __name__, url_prefix='/filmes')


@filmes_bp.route('/', methods=['GET'])
def get_filmes():
    filmes = Filme.query.all()
    return jsonify([filme.to_dict() for filme in filmes]), 200


@filmes_bp.route('/<int:filme_id>', methods=['GET'])
def get_filme(filme_id):
    try:
        filme = Filme.query.get_or_404(filme_id)
        return jsonify(filme.to_dict()), 200
    except Exception:
        return jsonify({'Erro':'Filme não encontrado'}),404

@filmes_bp.route('/', methods=['POST'])
def create_filme():
    dados = request.get_json()
    novo_filme = Filme(
        titulo=dados['titulo'],
        diretor=dados['diretor'],
        ano=dados['ano']
    )
    db.session.add(novo_filme)
    db.session.commit()
    return jsonify(novo_filme.to_dict()), 201

@filmes_bp.route('/<int:filme_id>', methods=['PUT'])
def update_filme(filme_id):
    try:
        filme = Filme.query.get_or_404(filme_id)
        dados = request.get_json()
        filme.titulo = dados.get('titulo', filme.titulo)
        filme.diretor = dados.get('diretor', filme.diretor)
        filme.ano = dados.get('ano', filme.ano)
        db.session.commit()
        return jsonify(filme.to_dict()), 200
    except Exception:
        return jsonify({"Erro":"Filme não encontrado"}),404
    
@filmes_bp.route('/<int:filme_id>', methods=['DELETE'])
def delete_filme(filme_id):
    try:
        filme = Filme.query.get_or_404(filme_id)
        db.session.delete(filme)
        db.session.commit()
        return '', 204
    except Exception:
        return jsonify({"Erro":"Filme não encontrado"}),404