from app import db

class Diretor(db.Model):
    """
    Modelo Diretor : Representa a tabela diretor no banco de dados
    """
    __tablename__ = 'diretor'

    id = db.Column(db.Integer,primary_key=True,nullable=False)
    nome = db.Column(db.String(100),nullable=False)
    data_nasc = db.Column(db.Date)
    filmes_id = db.Column(db.ForeignKey('filme.id'))

    def dici(self):
        return {'id':self.id,'nome':self.nome,'data_nascimento':self.data_nasc,'filmes_id':self.filmes_id}