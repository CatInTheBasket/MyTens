import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from './components/Cards';
import Profile from './components/Profile';

import {Row,Col,Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [username, setUsername] = useState("")
  const [profile, setProfile] = useState([])
  const [repo, setRepo] = useState([])
  const [successGetRepo, setSuccessGetRepo] = useState(false)
  const [historySearch,setHistorySearch]=useState([]);
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
        setSuccessGetRepo(true);
        setRepo(response.data);
        let tempHistory=[];
        historySearch.forEach(element => {
          tempHistory.push(element);
        });
        tempHistory.push(username);
        setHistorySearch(tempHistory);
      }).catch((error)=>{
        console.log(error);
        setRepo([]);
      });
  }
  return (
    <Container fluid="md">
    <Row>
      <h1 className="d-flex justify-content-center">Github Repository Getter</h1>
    </Row>
      <Row>
      <Col>
    <form className="mb-3" onSubmit={handleSubmit}>
      <label className="text-muted">
        Username:</label>
        <input type="text" value={username} onChange={handleChange} />        
      <input type="submit" value="Submit" />
    </form>
    </Col>
    <Col>
    <label className="text-muted">
        History:</label>
    <ul>
    {historySearch.map((item) => <li key={item}>{item}</li>)}
    </ul>
    </Col>
    </Row>
    <Row>
      {profile.length!=0?<Profile object={profile}/>:<p></p>}
    </Row>
    {!successGetRepo?<p>Please enter a valid username to search repository list</p>:repo.length==0?<textarea value="No repo yet"></textarea>
    :<Row className="align-items-center" style={{
      backgroundColor: 'red'
    }}>
      {repo.map((item) =><Cards object={item} />)}
    </Row>
    }
    </Container>
  );
}

export default App;
