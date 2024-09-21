import { Col, Row, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppsData from "../ClientTab/AppsComponents/apps.json";

const AddConfigs = () => {
  const panelDomain =
    import.meta.env?.VITE_PANEL_DOMAIN || window.location.origin;
  const pathname = window.location.pathname.split("#")[0];
  const url = `${panelDomain}${pathname}`;

  const menuItems = AppsData?.filter((app) => app.ShowInMenu);

  const openShadowrocketURL = () => {
    const encodedURL = btoa(url);
    const shadowrocketLink = "sub://" + encodedURL;
    window.location.href = shadowrocketLink;
  };

  return (
    <>
      <Row className="cards pt-5">
        {menuItems?.map((app, index) => (
          <Col xs="6" md="3" key={index}>
            <Card>
              <Card.Body
                onClick={
                  app.name === "Shadowrocket" ? openShadowrocketURL : undefined
                }
                to={
                  app.name !== "Shadowrocket"
                    ? app.link?.replace("{url}", url)
                    : undefined
                }
              >
                <Card.Title>{app.name}</Card.Title>
                <Card.Text>
                  <Image
                    className="p-md-4 p-2"
                    src={app.image}
                    roundedCircle
                    fluid
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default AddConfigs;
