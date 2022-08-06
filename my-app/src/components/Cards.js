import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Cards({object}) {
  return (
    <Card style={{ width: '18rem' }}>
      {/* <Card.Img variant="top" src="text.image" /> */}
      <Card.Body>
        <Card.Title>{object.name}</Card.Title>
        <Card.Text>
          {object.html_url}:
          {object.description}
          with id {object.id}
        </Card.Text>
        <Button variant="primary">Go to repo</Button>
      </Card.Body>
    </Card>
  );
}

export default Cards;