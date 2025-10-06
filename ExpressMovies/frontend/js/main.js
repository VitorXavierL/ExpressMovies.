fetch("http://127.0.0.1:5000/filmes/")
  .then(response => response.json())
  .then(data => {
    const lista = document.getElementById("lista-filmes");
    data.forEach(filme => {
      const li = document.createElement("li");
      li.textContent = `${filme.titulo} (${filme.ano}) - ${filme.genero}`;
      lista.appendChild(li);
    });
  })
  .catch(err => console.error("Erro ao carregar filmes:", err));

