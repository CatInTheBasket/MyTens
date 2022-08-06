import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Profile({object}) {
  function redirectToRepo(event){
    window.open(object.html_url, "_blank");
  }  
  return (
    <Card className="mb-4 align-items-center justify-content-center ml-5 text-dark" style={{ width: '20rem' }}>
    <h2 className="text-center font-weight-bold">{object.login}</h2>
      <Card.Img style={{width: "100px",height: "100px"}} variant="top" src={object.avatar_url} />
      <Card.Body>
        
        <Card.Text>
          {object.html_url}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Profile;