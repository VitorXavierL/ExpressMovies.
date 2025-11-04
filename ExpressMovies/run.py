from app import create_app, db
from app.models.diretor import Diretor
from app.models.filme import Filme
from flask_cors import CORS

app = create_app()
CORS(app)

@app.cli.command("create-db")
def create_db_command():
    with app.app_context():

        db.create_all()
        print("Banco de dados criado com sucesso!")


if __name__ == '__main__':
   
   with app.app_context():
       db.create_all()
       
   app.run(host='0.0.0.0',port=5000,debug=True)