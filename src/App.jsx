import { useState, useEffect } from 'react'
import './App.css'

function ItemFilme({ titulo, ano }) {
  return (
    <div className="card-filme">
      <h2>{titulo}</h2>
      <p>Ano: {ano}</p>
    </div>
  );
}

function ListaFilmes({ filmes }) {
  return (
    <div>
      {filmes.map((filme) => (
        <ItemFilme
          key={filme.id}
          titulo={filme.titulo}
          ano={filme.ano}
        />
      ))}
    </div>
  );
}

function App() {
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarFilmes() {
      try {
        const resposta = await fetch('http://localhost:3000/api/filmes');
        const dados = await resposta.json();
        setFilmes(dados);
      } catch (erro) {
        console.log('Erro ao buscar filmes', erro);
      } finally {
        setCarregando(false);
      }
    }
    buscarFilmes();
  }, []);

  return (
    <div className="container">
      <h1>Minha aplicação de Filmes</h1>
      <p>Aprendendo React</p>
      {carregando ? (
        <p>Carregando filmes...</p>
      ) : (
        <ListaFilmes filmes={filmes} />
      )}
      <button onClick={() => alert('Botão clicado!')}>
        Clique aqui
      </button>
    </div>
  );
}

export default App;
