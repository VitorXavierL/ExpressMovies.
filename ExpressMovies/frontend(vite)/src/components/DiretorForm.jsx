import { useState } from "react";

export default function FormDiretor({onDirectorCreated}){
      const [form,setForm] = useState({"id":"","nome":"","data_nascimento":"",'filmes_id':""})

function handleChange(e){
   const {name,value} = e.target;

   setForm(prevData => ({
      ...prevData,
      [name]:value
   }))
}

function handleSubmit(e){
      e.preventDefault()

      onDirectorCreated(form)

      setForm({"id":"","nome":"","data_nascimento":"","filmes_id":""})

}

return (
      <>
        <form onSubmit={handleSubmit} class="bg-red-900 text-zinc-400 font-bold p-20 rounded-lg">
            <h1 class="font-bold text-3x1">Diretores</h1>
            <label class="m-4">Nome:</label>
            <input type="text" name="name" id="nome" placeholder="Nome do Diretor" value={form.name} onChange={handleChange} required/><br />
            <label class="m-4">Ano de Nascimento: </label>
            <input type="**date**" id="data_nascimento" name="data_nascimento" placeholder="Data de Nascimento" value={form.data_nascimento} onChange={handleChange} required/><br />
            <label class="m-4">Id dos Filmes:</label>
            <input type="number" id="filmes_id" name="filmes_id" placeholder="Id do filme do diretor" required/><br />
            <button type="submit">Adicionar Diretor</button>
        </form>
      </>
)
}