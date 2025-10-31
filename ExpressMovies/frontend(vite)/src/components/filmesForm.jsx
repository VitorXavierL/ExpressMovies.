import { useEffect,useState } from "react";
import { getFilmes,postFilmes,putFilmes,deleteFilmes } from "../main";

function FormMovies(){

const [form,setForm] = useState({id:"", titulo :"", diretor :"", ano: "" });
const [filmeEdit,setMovieEdit] = useState(null) // para editar 
const [filmeError, setFilmeError] = useState(null) // os erros que podem ocorrer

const getMovies = async() => {
    
  try{
    const movies = await getFilmes(); // Usa a função getFIlmes para buscar todos os filmes
    const response = movies.json(); // Transforma a resposta em um objeto JSON

      if(!response.ok){
        throw new Error('Falha na busca do Filme!');
      }
      setForm(response.data),
      setFilmeError(null)
  }catch(err){
    console.log(err),
    setFilmeError(true)
  }
}

useEffect(() => {
     getMovies()
},[])


/* //Fetch API
 */

return (
 <>
  <form class="bg-red-900 font-bold text-white-15 rounded-lg p-15">
    <h2>Filmes</h2>
    <label class="m-4">ID: </label>
    <input type="number" placeholder="Id do filme" value={form.id} required/><br/>
    <label class="m-4">Título: </label>
    <input type="text" name="title" id="title" placeholder="Título do Filme:" value={form.name} required /><br/>
    <label class="m-4">Diretor: </label>
    <input type="text" name="diretor" id="diretor" placeholder="Diretor do Filme"/><br/>
    <label class="m-4">Ano: </label>
    <input type="number" name="year" id="year" placeholder="Ano de lançamento"/>
  </form>
  </>
  );
}

export default FormMovies;