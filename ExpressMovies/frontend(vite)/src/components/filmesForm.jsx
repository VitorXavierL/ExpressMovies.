import { useState } from "react";

export default function FormMovies({onMovieCreated}){

const [dataForm,setDataForm] = useState({'id':'','titulo':'','diretor_id':'',"genero":"",'ano':""});


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
  
  setDataForm({"id":"","titulo":"","diretor_id":"","genero":"","ano":""})
}


//Fetch API

return (
 <>
  <form onSubmit={handleSubmit} className="bg-red-900 font-bold text-zinc-400 rounded-lg p-20 border-black" >   
    <h2 className="font-bold text-gray-15 text-4xl">Filmes🎞🎥</h2>
    <label className="m-4">Título: </label>
    <input type="text" name="titulo" id="titulo" placeholder="Título do Filme:" value={dataForm.titulo} onChange={handleChange} required /><br/>
    <label className="m-4">Id do Diretor: </label>
    <input type="number" name="diretor_id" id="diretor_id" value={dataForm.diretor_id} placeholder="Diretor do Filme" onChange={handleChange} required/><br/>
    <label className="m-4">Gênero: </label>
    <input type="text" name="genero" id="genero" value={dataForm.genero} onChange={handleChange} placeholder="Gênero do Filme"/><br />
    <label className="m-4">Ano: </label>
    <input type="number" name="ano" id="ano" value={dataForm.ano} placeholder="Ano de lançamento" onChange={handleChange} required/><br/>
    <input type="submit"  value="Adicionar filme" className="bg-gray-500 p-3 rounded-lg"/>

  </form>
 </>
  );
}