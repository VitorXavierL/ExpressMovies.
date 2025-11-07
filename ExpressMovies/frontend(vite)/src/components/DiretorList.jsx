import { useState } from "react";

export default function Directors({diretores,onDelete,onUpdate}){
    const [diretorEdit,setDiretorEdit] = useState(null)
    const [diretorEdited,setDiretorEdited] = useState({})

function handleChangeEdit(e){
     const {name,value} = e.target;

     setDiretorEdited(prevData =>(
        {
        ...prevData ,
        [name]:value
     }
    ))

}

function handleEditSubmit(e){
    e.preventDefault()

    const data = {
        name: diretorEdited.nome,
        data_nascimento: diretorEdited.data_nascimento,
        filmes_id: diretorEdited.filmes_id
    }

    onUpdate(diretorEdited.id, data)

    setDiretorEdited({}) // Limpa o estado
    setDiretorEdit(null) // Fechar o Modo de edição

}

if(diretores.length === 0){
    return <p class="text-red-600">Nenhum diretor foi adicionado ainda!!</p>
}


return (
    <div class="bg-amber-800 rounded-lg">
        { diretores.map((diretor)=> 
          diretorEdit === diretor.id ? (
          <form onSubmit={handleEditSubmit}>
           <div key={diretor.id} class="text-xl bg-gray-500">
                <label class="m-3">Nome: </label>
                <input type="text" value={diretorEdited.name} id="nome" name="nome" onChange={handleChangeEdit} /><br />
                <label class="m-3">Ano de Nascimento</label>
                <input type="**date**" id="data_nascimento" name="data_nascimento" value={diretorEdited.data_nascimento} onChange={handleChangeEdit}/><br />
                <label class="m-3">Id do Filme:</label>
                <input type="number" id='filmes_id' name="filmes_id" value={diretorEdited.filmes_id} onChange={handleChangeEdit}/><br />
                <button type="submit">Salvar💾</button>
                <button onClick={() => onDelete(diretor.id)}>Deletar🗑️</button>
            </div>
          </form>
          ) : ( 
                <div class="text-gray-400">
                    <p>Nome: {diretor.nome}</p>
                    <p>Ano de Nascimento: {diretor.data_nascimento}</p>
                    <p>Id do Filme: {diretor.filmes_id}</p>

                      <button onClick={() =>{
                        setDiretorEdit(diretor.id)
                        setDiretorEdited(diretor)
                      }}>Editar✏️</button>

                      <button onClick={() => onDelete(diretor.id)}>Deletar🗑️</button>
                </div>           
          )
        
        )
            
        }
    </div>
)
}