import React, { useState, useEffect} from "react";

export default function App() {
  const [respositories, setRepositories] = useState([]);

  async function fetchRepositories(repoName) {
    const response = await fetch(`https://api.github.com/users/${repoName}/repos`);
    const data = await response.json()
    setRepositories(data);
  }

  useEffect(() => {
    fetchRepositories('newtondelbuque');
  }, []);

  function handleRepositorie(repoName){
    fetchRepositories(repoName)
  }

  function handleFavorite(id){
    const newRepositories = respositories.map(repo =>{
      return repo.id === id ? {...repo, favorite:!repo.favorite} : repo
    })

    setRepositories(newRepositories)
  }

  useEffect(() => {
    const filtered = respositories.filter(repo=> repo.favorite)
    document.title = `Você tem ${filtered.length}`
  }, [respositories]);

  return (
    <div>
      <h1>Qual respositorio você quer ter acesso?</h1>
      <button onClick={()=>handleRepositorie('newtondelbuque')} >newton</button> ou <button onClick={()=>handleRepositorie('dextrapocs')}>dextra</button>
      <ul>
        {
          respositories.map(repo => (<li key={repo.id}>{repo.name}
            {
            repo.favorite && <span>Favorito</span>
          }
           <button onClick={()=>handleFavorite(repo.id)}>Favoritar</button></li>))
        }
      </ul>

    </div>

  );
}
