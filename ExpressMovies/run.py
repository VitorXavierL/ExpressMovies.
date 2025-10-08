from app import create_app, db

app = create_app()

@app.cli.command("create-db")
def create_db_command():
    
    db.create_all()
    print("Banco de dados criado com sucesso!")


if __name__ == '__main__':
   app.run(host='0.0.0.0',port=5000,debug=True)