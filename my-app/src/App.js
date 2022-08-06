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
  const [profile, setProfile] = useState("")
  const [repo, setRepo] = useState([])
  const [successGetRepo, setSuccessGetRepo] = useState(false);
  const [haveEntered, setHaveEntered] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historySearch,setHistorySearch]=useState([]);

  function handleChange(event) {
    setUsername(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if(!haveEntered){
      setHaveEntered(true);
    }
    axios({
      method: 'get',
      url: 'https://api.github.com/users/'+username
    })
      .then(function (response) {
        console.log(response.data);
        setProfile(response.data);
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
            if(!tempHistory.includes(username))
            tempHistory.push(username);
            setHistorySearch(tempHistory);
            
          }).catch((error)=>{
            console.log(error);
            setRepo([]);
          });
      }).catch((error)=>{
        console.log(error);
        setRepo([]);
        setSuccessGetRepo(false);
        setProfile("")
      });
    
  }

  function toggleHistory(event) {
    setShowHistory(!showHistory);
  }

  function clearHistory(event) {
    setHistorySearch([]);
  }

  return (
    <Container fluid style={{backgroundColor:"#E3E3E3"}}>
    <Row className="bg-dark text-white">
      <h1 className="d-flex justify-content-center">Github Repository Getter</h1>
    </Row>
      <Row style={{backgroundColor:"white"}}>
      <Col style={{backgroundColor:"#E3E3E3"}}>
    <form className="mb-3" onSubmit={handleSubmit}>
      <label className="text-muted">
        Username:</label>
        <input type="text" value={username} onChange={handleChange} />        
      <input type="submit" value="Submit" />
    </form>
    </Col>
    <Col>
    <Row>
      <Col><label onClick={toggleHistory} className="text-muted">
        {showHistory?"History:":"Show history"}</label></Col>
      <Col>{historySearch.length!=0?<label onClick={clearHistory} className="text-muted">
        Clear History</label>:""}</Col>
    </Row>
    
    {showHistory?
    <ul>
    {historySearch.map((item) => <li key={item}>{item}</li>)}
    </ul>:<p></p>}
    </Col>
    </Row>
    {profile.length!=0?<Row className="justify-content-center bg-dark text-white">
    
    <h3 className="text-center">Profile</h3>
      <Profile object={profile}/>
    </Row>:<p></p>}
    {haveEntered?
    !successGetRepo?<h1 className="text-center">Please enter a valid username to search repository list</h1>:repo.length==0?<h4 className="text-center">No repo yet</h4>
    :<div><h3 className="text-center">List Repo</h3><Row className="justify-content-center align-items-center text-center">
      {repo.map((item) =><Cards key={item.id} object={item} />)}
    </Row>
    </div>:""
    }
    </Container>
  );
}

export default App;
