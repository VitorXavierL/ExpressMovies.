from app import db

class Filme(db.Model):
    """
    Modelo Filme - Representa a tabela 'filme' no banco de dados.
    """
    __tablename__ = 'filme'

    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    diretor = db.Column(db.String(100), nullable=False)
    genero = db.Column(db.String(50),nullable=False)
    ano = db.Column(db.Integer, nullable=False)
    
    def to_dict(self):
        return {
            "id": self.id,
            "titulo": self.titulo,
            "diretor": self.diretor,
            "genero":self.genero,
            "ano": self.ano
        }