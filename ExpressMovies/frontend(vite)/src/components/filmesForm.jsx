import { useState } from "react";

function FormMovies({onMovieCreated}){

const [dataForm,setDataForm] = useState({'id':'','titulo':'','diretor':'',"genero":"",'ano':""});


function handleChange(e){
    const {name,value} = e.target;

    setDataForm(prevData => ({
      ...prevData,
      [name]:value
    }))
}

function handleSubmit(e){
  e.preventDefault();

  onMovieCreated(dataForm)
  
  setDataForm({"id":"","titulo":"","diretor":"","genero":"","ano":""})
}


//Fetch API

return (
 <>
  <form onSubmit={handleSubmit} class="bg-red-900 font-bold text-white-15 rounded-lg p-20 border-black" >   
    <h2 class="font-bold text-gray-15 text-3xl">Filmes🎞🎥</h2>
    <label class="m-4">Título: </label>
    <input type="text" name="titulo" id="titulo" placeholder="Título do Filme:" value={dataForm.titulo} onChange={handleChange} required /><br/>
    <label class="m-4">Diretor: </label>
    <input type="text" name="diretor" id="diretor" value={dataForm.diretor} placeholder="Diretor do Filme" onChange={handleChange} required/><br/>
    <label class="m-4">Gênero: </label>
    <input type="text" name="genero" id="genero" value={dataForm.genero} onChange={handleChange} placeholder="Gênero do Filme"/><br />
    <label class="m-4">Ano: </label>
    <input type="number" name="ano" id="ano" value={dataForm.ano} placeholder="Ano de lançamento" onChange={handleChange} required/><br/>
    <input type="submit"  value="Adicionar filme" class="bg-gray-500 p-3 rounded-lg"/>

  </form>
 </>
  );
}

export default FormMovies;