import { useState } from "react";

function Movies({filmes,onDelete,onUpdate}){
   const [filmeEdit,setMovieEdit] = useState(null) // para editar um filme específico
   const [filmeEdited,setFilmeEdited] = useState({})
   
function handleChangeEdit(e){
     const {name,value} = e.target;

     setFilmeEdited(prevData => (
      {
        ...prevData, 
        [name]:value
      }
     ))
}

function handleEditSubmit(e){
     e.preventDefault(); // impede o recarregamento da página

     // objeto json que possui os campos do filme
     const data = {
      titulo: filmeEdited.titulo,
      diretor: filmeEdited.diretor_id,
      genero: filmeEdited.genero,
      ano: filmeEdited.ano
     };

     onUpdate(filmeEdited.id, data);

     setFilmeEdited({}); // Limpar o estado 
     setMovieEdit(null); // Fechar o modo de edição

   }
   
   if(filmes.length === 0 ) {
    return <p class="text-red-500">Nenhum filme está cadastrado ainda!!</p>
   }
   
return (
  
   <div class="bg-amber-800 rounded-b-lg space-y-5">
        { filmes.map((filme) => 
          filmeEdit === filme.id ? (
        <form key={filme.id} onSubmit={handleEditSubmit}>
         <div className="border-black">
             <label class='m-3'>Título</label>
             <input type="text" value={filmeEdited.titulo} name="titulo" onChange={handleChangeEdit}/><br />
             <label class="m-3">Diretor</label>
             <input type="number" value={filmeEdited.diretor_id} name="diretor_id" onChange={handleChangeEdit}/><br />
             <label class="m-3">Gênero: </label>
             <input type="text"  value={filmeEdited.genero || ''} name="genero" onChange={handleChangeEdit}/><br />
             <label class="m-3">Ano:</label>
             <input type="number" value={filmeEdited.ano} name="ano" onChange={handleChangeEdit}/><br />
             <button type="submit">Salvar💾</button><br />
            <button onClick={() => (onDelete(filme.id))}>Deletar🗑️</button>
         </div>
        </form>
          ) : (
            <div key={filme.id} class="text-gray-400">
              <p>Título: {filme.titulo}</p>
              <p>Diretor: {filme.diretor_id}</p>
              <p>Gênero: {filme.genero}</p>
              <p>Ano: {filme.ano}</p>

              <button onClick={() => {
                setMovieEdit(filme.id);
                setFilmeEdited(filme);
              }}>
                Editar✏️
              </button>

              <button onClick={() => onDelete(filme.id)}>Deletar🗑️</button>
            </div>
          )
       
          )   
        }
    </div>
 
)
}


export default Movies;