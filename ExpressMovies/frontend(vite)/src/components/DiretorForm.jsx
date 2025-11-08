import { useState } from "react";

export default function FormDiretor({onDirectorCreated}){
      const [form,setForm] = useState({"id":"","nome":"","data_nascimento":""})

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

      setForm({"id":"","nome":"","data_nascimento":""})

}

return (
      <>
        <form onSubmit={handleSubmit} class="bg-red-900 text-zinc-400 font-bold p-20 rounded-lg">
            <h2 class="font-bold text-gray-15  text-4xl">Diretores🎞🎥</h2>
            <label class="m-4">Nome:</label>
            <input type="text" name="nome" id="nome" placeholder="Nome do Diretor" value={form.nome} onChange={handleChange} required/><br />
            <label class="m-4">Data de Nascimento: </label>
            <input type="date" id="data_nascimento" name="data_nascimento" placeholder="Data de Nascimento" value={form.data_nascimento} onChange={handleChange} required/><br />
            <input type="submit" class="bg-gray-500 p-3 rounded-lg" value="Adicionar diretor"/>
        </form>
      </>
)
}