import axios from 'axios';

const api = axios.create({
    baseURL: "http://127.0.0.1:5000/api",
    headers: {
        'Content-Type': 'application/json'
    }
})

// Operações de filmes
export const getFilmes = () => api.get('/filmes');
export const getFilme = (id) => api.get(`/filmes/${id}`)
export const postFilme = (data) => api.post('/filmes', data);
export const putFilme = (id,data) => api.put(`/filmes/${id}`,data)
export const deleteFilme = (id) => api.delete(`/filmes/${id}`)

// Operações de diretores
export const getDiretores = () => api.get('/diretores');
export const getDiretor = (id) => api.get(`/diretores/${id}`)
export const postDiretor = (data) => api.post("/diretores",data)
export const putDiretor = (id,data) => api.put(`/diretores/${id}`,data)
export const deleteDiretor = (id) => api.delete(`/diretores/${id}`)

export default api;