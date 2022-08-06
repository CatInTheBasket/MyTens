import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Profile({object}) {
  function redirectToRepo(event){
    window.open(object.html_url, "_blank");
  }  
  return (
    <Card className="mb-4 text-white justify-content-center bg-dark ml-5" style={{ width: '20rem' }}>
      <Card.Img variant="top" src={object.avatar_url} />
      <Card.Body>
        <h2 className="text-center font-weight-bold">{object.name}</h2>
        <Card.Text>
          {object.html_url}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Profile;