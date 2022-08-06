import logo from './logo.svg';
import './App.css';
import React, { useCallback ,useState, useEffect } from 'react';
import axios from 'axios';
import Cards from './components/Cards';
import Profile from './components/Profile';
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailData } from "./store/actions/actionCreator";
import {Row,Col,Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
function App() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("")

  const [historyFilter, setHistoryFilter] = useState("")
  const [repoFilter, setRepoFilter] = useState("")
  const [repoFiltered, setRepoFiltered] = useState([])
  const [haveEntered, setHaveEntered] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historySearch,setHistorySearch]=useState([]);
  const [historyFilteredSearch,setHistoryFilteredSearch]=useState([]);
  const [eventFromHistory,setEventFromHistory]=useState(false);

  const repo = useSelector(state => state.repo.repo);
  const profile = useSelector(state => state.repo.profile);
  const successGetRepo = useSelector(state => state.repo.successGetRepo);
  
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
    if(username!=""){
      if(profile!=""){
        let temp=[];
        historySearch.forEach(element => {
          if(element!=username){
            temp.push(element);
          }
        });
        temp.push(username);
        setHistorySearch(temp);
      }
    }
    
  },[profile]);

  // useEffect(() => {
  //   dispatch(fetchDetailData("test"));
  // }, []);

  const handleSubmitLogin = e => {
    e.preventDefault();
    if(!haveEntered){
      setHaveEntered(true);
    }
    setEventFromHistory(true);
    dispatch(fetchDetailData(username));
  };


  function toggleHistory(event) {
    console.log("Clicked"+showHistory)
    setShowHistory(!showHistory);
  }

  function useSearchFromHistory(event) {
    // useHandleSubmit(event.target.textContent);
    
    setUsername(event.target.textContent);
    setEventFromHistory(true);
    dispatch(fetchDetailData(event.target.textContent));
    
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
    <form className="mb-3" onSubmit={handleSubmitLogin}>
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
    {historyFilteredSearch.map((item) => <li key={item} onClick={useSearchFromHistory}>{item}</li>)}
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
export default connect()(App);
