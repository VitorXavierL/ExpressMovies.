from app import db

class Filme(db.Model):
    """
    Modelo Filme - Representa a tabela 'filme' no banco de dados.
    """
    __tablename__ = 'filme'

    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    diretor_id = db.Column(db.Integer, db.ForeignKey('diretor.id'),nullable=False)
    genero = db.Column(db.String(50),nullable=False)
    ano = db.Column(db.Integer, nullable=False)
    
    def dici(self):
        return {
            "id": self.id,
            "titulo": self.titulo,
            "diretor_id": self.diretor_id,
            "genero":self.genero,
            "ano": self.ano
        }