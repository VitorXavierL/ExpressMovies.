import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import { getFilmes ,postFilme ,putFilme ,deleteFilme} from "./main";
import {getDiretores, postDiretor, putDiretor, deleteDiretor} from './main'
import './App.css'
import FormMovies from './components/filmesForm';
import Movies from './components/FilmesList';
import Directors from './components/DiretorList'
import FormDiretor  from './components/DiretorForm';

export default function App() { 

const [filmes,setFilmes] = useState([]); // armazena em um array os filmes
const [filmeError, setFilmeError] = useState(null); // os erros que podem ocorrer
const [diretores,setDiretores] = useState([]) // armazena em um array os diretores
const [diretorError, setDiretorError] = useState(null) //Erros relacionados a diretor

async function handleReturn(){
  try{
    const movies = await getFilmes(); // Usa a função getFilmes para buscar todos os filmes
    const diretores = await getDiretores(); // Usa a função getDiretores para buscar todos os diretores

    setFilmes(movies.data);
    setFilmeError(null);
    
    setDiretores(diretores.data);
    setDiretorError(null);
  }catch(err){
    console.log(err);
    setFilmes([]);
    setDiretores([]);
    setFilmeError(true);
  }
}

async function handleCreateDirector(data){
  try{
   const response = await postDiretor(data);
   const new_director = response.data;
   
   setDiretores(prevDirector => [...prevDirector,new_director]);
   setDiretorError(null)

   await handleReturn()

  }catch(err){
    setDiretorError('falha na criação',err.message);
    console.error(err.message)
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

async function handleUpdateDirector(id , new_data){
  try{
  const response = await putDiretor(id,new_data);
  const directorUpdated = response.data;

  setDiretores(prevDirector =>{
      return prevDirector.map(director =>{
        if(director.id == id){
          return directorUpdated
        }
        return director
      })
  }
)
  setDiretorError(null)

}catch(err){
     setDiretorError(err.message)
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

async function handleDeleteDirector(id){
  try{
    await deleteDiretor(id);

    setDiretores(prevDirector=>{
      return prevDirector.filter(director => director.id != id);
    })
}catch(err){
  setDiretorError(err)
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
    <h1>Express Movies🎞🎥🍿</h1><br />
    <FormMovies 
    onMovieCreated={handleCreate}
    />
    <Movies 
    filmes={filmes}
    onDelete={handleDelete}
    onUpdate={handleUpdate}
    /> <br /><br />

    <FormDiretor
    onDirectorCreated={handleCreateDirector}
    />

    <Directors 
    diretores={diretores}
    onUpdate={handleUpdateDirector}
    onDelete={handleDeleteDirector}
    /> 
    

</>
    )  

  }
