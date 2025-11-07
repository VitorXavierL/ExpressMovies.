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
        nome: diretorEdited.nome,
        data_nascimento: diretorEdited.data_nascimento,
        filmes_id: diretorEdited.filmes_id
    }

    onUpdate(diretorEdited.id, data)// passa o id do diretor a ser atualizado

    setDiretorEdited({}) // Limpa o estado
    setDiretorEdit(null) // Fechar o Modo de edição

}

if(diretores.length === 0){
    return <p class="text-red-600">Nenhum diretor foi adicionado ainda!!</p>
}


return (
    <div class="bg-amber-800 rounded-b-lg space-y-5">
        { diretores.map((diretor)=> 
          diretorEdit === diretor.id ? (
          <form key={diretor.id} onSubmit={handleEditSubmit}>
           <div class="text-xl bg-gray-500">
                <label class="m-3">Nome: </label>
                <input type="text" value={diretorEdited.nome} id="nome" name="nome" onChange={handleChangeEdit} /><br />
                <label class="m-3">Ano de Nascimento</label>
                <input type="**date**" id="data_nascimento" name="data_nascimento" value={diretorEdited.data_nascimento} onChange={handleChangeEdit}/><br />
                <label class="m-3">Id do Filme:</label>
                <input type="text" id='filmes_id' name="filmes_id" value={diretorEdited.filmes_id} onChange={handleChangeEdit}/><br />
                <button type="submit">Salvar💾</button>
                <button onClick={() => onDelete(diretor.id)}>Deletar🗑️</button>
            </div>
          </form>
          ) : ( 
                <div key={diretor.id} class="text-gray-400">
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