from app import create_app, db

app = create_app()

@app.cli.command("create-db")
def create_db_command():
    
    db.create_all()
    print("Banco de dados criado com sucesso!")