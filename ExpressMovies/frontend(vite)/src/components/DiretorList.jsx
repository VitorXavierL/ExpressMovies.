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
        id:diretorEdited.id,
        nome: diretorEdited.nome,
        data_nascimento: diretorEdited.data_nascimento,
    }

    onUpdate(diretorEdited.id, data)// passa o id do diretor a ser atualizado

    setDiretorEdited({}) // Limpa o estado
    setDiretorEdit(null) // Fechar o Modo de edição

}

if(diretores.length === 0){
    return <p className="text-red-600">Nenhum diretor foi adicionado ainda!!</p>
}


return (
    
    <div className="bg-amber-800 rounded-b-lg space-y-5">
    <h2 className="font-bold">Lista de Diretores🎬</h2>
        { diretores.map((diretor)=> 
          diretorEdit === diretor.id ? (
          <form key={diretor.id} onSubmit={handleEditSubmit}>
           <div className="text-xl bg-gray-500">
                <label className="m-3">Nome: </label>
                <input type="text" value={diretorEdited.nome} id="nome" name="nome" onChange={handleChangeEdit} /><br />
                <label className="m-3">Data de Nascimento</label>
                <input type="**date**" id="data_nascimento" name="data_nascimento" value={diretorEdited.data_nascimento} onChange={handleChangeEdit}/><br />
                <button type="submit">Salvar💾</button>
                <button onClick={() => onDelete(diretor.id)}>Deletar🗑️</button>
            </div>
          </form>
          ) : ( 
                <div key={diretor.id} class="text-gray-400">
                    <p>Nome: {diretor.nome}</p>
                    <p>Data de Nascimento: {diretor.data_nascimento}</p>
                    <ul>Filmes:{
                   diretor.filmes.length > 0 && (diretor.filme || [])? (
                    diretor.filmes.map(
                        filme => (
                            <li key={filme.id}>{filme.titulo}</li>
                        ))
                        ) : (
                            <p>Nenhum filme listado ainda!!</p>
                        )}
            
                    </ul>
                    <button onClick={() =>{
                        setDiretorEdit(diretor.id)
                        setDiretorEdited(diretor)
                      }}>Editar✏️</button>

                      <button onClick={() => onDelete(diretor.id)}>Deletar🗑️</button>
                </div>           
          )
        
        )}
    </div>
)
}