import React, { useState, useEffect } from "react";

export default function App() {
  const [respositories, setRepositories] = useState([]);
  const [phrase, setPhrase] = useState("");
  const [repositoryName, setRepositoryName] = useState("");

  function handleChangeUserName(event) {
    setRepositoryName(event.target.value);
  }

  async function fetchRepositories(repoName) {
    const response = await fetch(
      `https://api.github.com/users/${repoName}/repos`
    );
    if (response.status === 200) {
      const data = await response.json();
      setRepositories(data);
    } else {
      setPhrase("Não foi possível encontrar repositório com esse nome");
      setRepositories([]);
    }
  }

  function handleRepositorie() {
    fetchRepositories(repositoryName);
  }

  function handleFavorite(id) {
    const newRepositories = respositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
    });

    setRepositories(newRepositories);
  }

  useEffect(() => {
    const filtered = respositories.filter(repo => repo.favorite);
    if (respositories.length > 0) {
      setPhrase(
        `Esse projeto em reactjs hooks - Você tem ${respositories.length} e desses ${filtered.length} são favoritos!`
      );
    } else {
      setPhrase(`Não há respositórios com esse username`);
    }
  }, [respositories]);

  return (
    <div>
      <h1>Qual respositorio você quer ter acesso?</h1>
      <label>Digite o nome do usuário que deseja ver os repositórios </label>
      <br />
      <input type="text" onChange={e => handleChangeUserName(e)}></input>
      {repositoryName.length > 0 && (
        <button onClick={() => handleRepositorie()}>
          Clique aqui para ver o respositório de {repositoryName}
        </button>
      )}
      {phrase.length > 0 && (
        <div>
          <h2>{phrase}</h2>
        </div>
      )}
      <ul>
        {respositories.map(repo => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorite && (
              <span> você marcou esse projeto como favorito</span>
            )}
            {!repo.favorite && (
              <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
            )}
            {repo.favorite && (
              <button onClick={() => handleFavorite(repo.id)}>Limpar</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
