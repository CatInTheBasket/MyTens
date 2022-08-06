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
  const [historyFilter, setHistoryFilter] = useState("")
  const [repoFilter, setRepoFilter] = useState("")
  const [profile, setProfile] = useState("")
  const [repo, setRepo] = useState([])
  const [repoFiltered, setRepoFiltered] = useState([])
  const [successGetRepo, setSuccessGetRepo] = useState(false);
  const [haveEntered, setHaveEntered] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historySearch,setHistorySearch]=useState([]);
  const [historyFilteredSearch,setHistoryFilteredSearch]=useState([]);
  const [eventFromHistory,setEventFromHistory]=useState("");

  function handleChange(event) {
    setUsername(event.target.value);
  }

  function handleChangeFilterHistory(event) {
    setHistoryFilter(event.target.value);
  }

  function handleChangeFilterRepo(event) {
    setRepoFilter(event.target.value);
  }

  useEffect(() => {
    if(historyFilter!=""){
      let temp=[];
      historySearch.forEach(element => {
        if(element.includes(historyFilter)){
          temp.push(element);
        }
      });
      setHistoryFilteredSearch(temp);
    }else{
      setHistoryFilteredSearch(historySearch);
    }
    
  },[historyFilter,historySearch]);

  useEffect(() => {
    if(repoFilter!=""){
      let temp=[];
      repo.forEach(element => {
        console.log(element);
        if(element.name.includes(repoFilter)){
          temp.push(element);
        }
      });
      setRepoFiltered(temp);
    }else{
      setRepoFiltered(repo);
    }
    
  },[repoFilter,repo]);

  useEffect(() => {
    if(eventFromHistory!=""){
      handleSubmit(eventFromHistory);
    }
    
  },[username]);

  useEffect(() => {
    if(eventFromHistory!=""){
      handleSubmit(eventFromHistory);
    }
    
  },[username]);

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
              if(element!=username){
                tempHistory.push(element);
              }
              
            });
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
    console.log("Clicked"+showHistory)
    setShowHistory(!showHistory);
  }

  function setSearchFromHistory(event) {
    setEventFromHistory(event);
    setUsername(event.target.textContent);
  }

  function clearHistory(event) {
    setHistoryFilter("");
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
      <Row className="align-items-center text-center justify-content-center"><Col>
      <label className="text-muted">
        Get Repository(s) by Username:</label>
        <input type="text" value={username} onChange={handleChange} />        
      <input type="submit" value="Search" />
      </Col></Row>
    </form>
    </Col>
    <Col>
    <Row>
      <Col>
      <label onClick={toggleHistory} className="text-muted">
        {showHistory?"History" :"Show history"}</label>
      {showHistory?<input type="text" value={historyFilter} onChange={handleChangeFilterHistory}/>:""}</Col>
      <Col>{historySearch.length!=0?<label onClick={clearHistory} className="text-muted">
        Clear History</label>:""}</Col>
    </Row>
    
    {showHistory?
    <ul>
    {historyFilteredSearch.map((item) => <li key={item} onClick={setSearchFromHistory}>{item}</li>)}
    </ul>:<p></p>}
    </Col>
    </Row>
    {profile.length!=0?<Row className="justify-content-center bg-dark text-white">
    
    <h3 className="text-center">Profile</h3>
      <Profile object={profile}/>
    </Row>:<p></p>}
    {haveEntered?
    !successGetRepo?<h1 className="text-center">Please enter a valid username to search repository list</h1>:repo.length==0?<h4 className="text-center">No repo yet</h4>
    :<div><h3 className="text-center">List Repo</h3><Row className="align-items-center text-center justify-content-center"><Col><label onClick={toggleHistory} className="text-muted">Search:</label><input type="text" value={repoFilter} onChange={handleChangeFilterRepo} /></Col></Row><Row className="justify-content-center align-items-center text-center">
      {repoFiltered.map((item) =><Cards key={item.id} object={item} />)}
      {repo.length!=0?repoFiltered.length==0?<h1 className="text-center">No Matching Title for Repositories</h1>:"":""}
    </Row>
    </div>:""
    }
    <Row  className="bg-dark text-white text-center">
      <p>Copyright: Ferdinandus Renaldi @2022</p>
    </Row>
    </Container>
  );
}

export default App;
