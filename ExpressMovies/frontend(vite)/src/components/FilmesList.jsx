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
      diretor: filmeEdited.diretor,
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
        <form onSubmit={handleEditSubmit}>
         <div key={filme.id} className="border-r-gray-500">
             <label>Título</label>
             <input type="text" value={filmeEdited.titulo} name="titulo" onChange={handleChangeEdit}/><br />
             <label>Diretor: {filme.diretor}</label>
             <input type="text" value={filmeEdited.diretor} name="diretor" onChange={handleChangeEdit}/><br />
             <label>Ano: {filme.ano}</label>
             <input type="number" value={filmeEdited.ano} name="ano" onChange={handleChangeEdit}/>
             <button type="submit">Salvar</button>
            <button onClick={() => (onDelete(filme.id))}>Deletar</button>
         </div>
        </form>
          ) : (
            <div class="text-gray-400">
              <p>Titulo: {filme.titulo}</p>
              <p>Diretor: {filme.diretor}</p>
              <p>Ano: {filme.ano}</p>

              <button onClick={() => {
                setMovieEdit(filme.id);
                setFilmeEdited(filme);
              }}>
                Editar
              </button>

              <button onClick={() => onDelete(filme.id)}>Deletar</button>
            </div>
          )
       
          )   
        }
    </div>
 
)
}


export default Movies;