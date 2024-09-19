import {
  faAndroid,
  faApple,
  faLinux,
  faWindows,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab, Col, Nav } from "react-bootstrap";
import Iphone from "./AppsComponents/Iphone";
import Android from "./AppsComponents/Android";
import Windows from "./AppsComponents/Windows";
import Linux from "./AppsComponents/Linux";
import AppsData from "./AppsComponents/apps.json";

const Apps = () => {
  return (
    <>
      <Tab.Container id="apps-tab" defaultActiveKey={"#iphone"}>
        <Col xs="12" className="m-auto d-flex mt-4 p-3 apps-col">
          <Col xs="12" md="3" lg="2" className="d-flex">
            <Nav
              variant="pills"
              className="flex-column nav-list w-100 nav-apps"
            >
              <Nav.Item>
                <Nav.Link eventKey="#iphone">
                  <FontAwesomeIcon size="xl" className="mx-2" icon={faApple} />
                  <span>{"آیفون"}</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="#android">
                  <FontAwesomeIcon
                    size="xl"
                    color="green"
                    className="mx-2"
                    icon={faAndroid}
                  />
                  <span>{"اندروید"}</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="#windows">
                  <FontAwesomeIcon
                    size="xl"
                    color="#2057bb"
                    className="mx-2"
                    icon={faWindows}
                  />
                  <span>{"ویندوز"}</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="#linux">
                  <FontAwesomeIcon
                    size="xl"
                    className="mx-2"
                    icon={faLinux}
                    color="orange"
                  />
                  <span>{"لینوکس"}</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col xs="12" md="9" lg="10">
            <Tab.Content>
              <Tab.Pane eventKey="#iphone">
                <Iphone data={AppsData} />
              </Tab.Pane>
              <Tab.Pane eventKey="#android">
                <Android data={AppsData} />
              </Tab.Pane>
              <Tab.Pane eventKey="#windows">
                <Windows data={AppsData} />
              </Tab.Pane>
              <Tab.Pane eventKey="#linux">
                <Linux data={AppsData} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Col>
      </Tab.Container>
    </>
  );
};
export default Apps;
