import { Card, Col } from "react-bootstrap";

const InfoCard = ({ title, value, ltr }) => (
  <Col xs="12" md="3">
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text style={{ direction: ltr ? "ltr" : "rtl" }}>
          {value}
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

export default InfoCard;
