from app import db

class Diretor(db.Model):
    """
    Modelo Diretor : Representa a tabela diretor no banco de dados
    """
    __tablename__ = 'diretor'

    id = db.Column(db.Integer,primary_key=True,nullable=False)
    nome = db.Column(db.String(100),nullable=False)
    data_nascimento = db.Column(db.Date)
    filmes = db.relationship('Filme',backref="diretor",lazy='dynamic')

    def dici(self):
        return {'id':self.id,'nome':self.nome,'data_nascimento':str(self.data_nascimento),'filmes':[filme.dici() for filme in self.filmes]}