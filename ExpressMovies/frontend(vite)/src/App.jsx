import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import { getFilmes ,postFilme ,putFilme ,deleteFilme} from "./main";
import './App.css'
import FormMovies from './components/filmesForm';
import Movies from './components/FilmesList';

export function App() { 

const [filmes,setFilmes] = useState([]); // 
const [filmeError, setFilmeError] = useState(null); // os erros que podem ocorrer

async function handleReturn(){
  try{
    const movies = await getFilmes(); // Usa a função getFilmes para buscar todos os filmes

    setFilmes(movies.data),
    setFilmeError(null);
  }catch(err){
    console.log(err),
    setFilmeError(true);
  }
}

async function handleCreate(data){
 try{ 
   const response = await postFilme(data);
   const new_Movie = response.data;

   setFilmes(prevMovies => [...prevMovies, new_Movie]);

   console.log("Dados " ,data)
  }catch(err){
    setFilmeError(err.message);
  }
}

async function handleUpdate(id, new_data){
  try{
      const response = await putFilme(id,new_data);
      const movieUpdated = response.data;

      setFilmes( prevMovies => {
       return prevMovies.map(filme => {
         if(filme.id === id){
          return movieUpdated
         }
         return filme
       })
        
    });
      setFilmeError(null);
  
      }catch(erro){
        setFilmeError(erro.message)
      }
    
  
}

async function handleDelete(id){
  await deleteFilme(id);

  setFilmes(prevMovies =>{
    return prevMovies.filter(movie => movie.id !== id);
  })


}

useEffect(() => {
     handleReturn()
},[])

return (
<>
    <h1>Express Movies🎞🎥</h1>
    <Movies 
    filmes={filmes}
    onDelete={handleDelete}
    onUpdate={handleUpdate}
    />
    <FormMovies 
    onMovieCreated={handleCreate}
    />
</>
    )  

  }
export default App;