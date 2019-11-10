import React, { useState, useEffect } from 'react';

export default function App() {
    const [repositories, setRepositories] = useState([]);
    useEffect(async () => {
      const response = await fetch('https://api.github.com/users/davisjr2000/repos');
      const data = await response.json();

      setRepositories(data)
    }, []);

    useEffect(() => {
      const filtered = repositories.filter(repo => repo.favorite);

      document.title = `Github Repos (${filtered.length})`
    }, [repositories]);

    function handleAppRepository() {
        setRepositories([
            ... repositories,
             {id: Math.random, name: "Novo Repo"}
        ])
    }

    function handleFavorite(id) {
     const newRepositories = repositories.map(repo => {
         return repo.id === id ? { ...repo, favorite: !repo.favorite} : repo
     })

     setRepositories(newRepositories);
    }

    return (
        <>
            <ul>
                {repositories.map((repo =>
                    <li key={repo.id}>
                        {repo.name}
                        {repo.favorite && <span>(Favorito)</span>}
                        <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleAppRepository}>
                Adicionar Repositório
            </button>
        </>
    )
}