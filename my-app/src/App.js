import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from './components/Cards';


function App() {
  const [username, setUsername] = useState("CatInTheBasket")
  const [repo, setRepo] = useState([])

  function handleChange(event) {
    setUsername(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    axios({
      method: 'get',
      url: 'https://api.github.com/users/'+username+'/repos'
    })
      .then(function (response) {
        console.log(response.data);
        setRepo(response.data);
      });
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={handleChange} />        </label>
      <input type="submit" value="Submit" />
      {repo.length==0?<textarea value="No repo yet"></textarea>:<ul>
      {repo.map((item) => <Cards key={item.key} object={item} />)}
    </ul>}
    </form>
    
  );
}

export default App;
