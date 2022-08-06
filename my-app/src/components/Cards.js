import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Cards({object}) {
  function redirectToRepo(event){
    window.open(object.html_url, "_blank");
  }  
  return (
    <Card className="mb-4 text-white bg-dark h-100" style={{ width: '20rem',margin: "10px" }}>
      
      <Card.Body className="justify-content-center">
        <h2 className="text-center font-weight-bold">{object.name}</h2>
        <textarea readonly className="text-white bg-dark" value={object.description?object.description:"No description, website, or topics provided. "}>
          
        </textarea>
        <Button variant="primary" onClick={redirectToRepo}>Go to repo</Button>
      </Card.Body>
    </Card>
  );
}

export default Cards;