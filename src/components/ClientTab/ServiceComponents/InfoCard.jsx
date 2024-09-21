import { Card, Col } from "react-bootstrap";

const InfoCard = ({ title, value }) => (
  <Col xs="12" md="3">
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{value}</Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

export default InfoCard;
