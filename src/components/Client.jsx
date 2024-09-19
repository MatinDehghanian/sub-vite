import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Nav, Tab } from "react-bootstrap";
import Configs from "./ClientTab/Configs";
import AddConfigs from "./ClientTab/AddConfigs";
import Apps from "./ClientTab/Apps";
import { Link } from "react-router-dom";

const Client = ({ data }) => {
  let params = window.location.hash;

  return (
    <>
      <Container className="box mt-5 p-lg-5 p-3 mb-5">
        <div className="info-title">
          <FontAwesomeIcon
            className="px-2 flashdot"
            size="sm"
            icon={faCircle}
          />
          <h3 className="mt-1">{"کانفیگ ها"}</h3>
        </div>
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey={params || "#addConfigs"}
        >
          <Nav
            className="nav-b text-center"
            id="nav-select"
            variant="underline"
            defaultActiveKey="/home"
          >
            <Nav.Item>
              <Nav.Link as={Link} to="#configs" eventKey="#configs">
                لینک ها
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="#addConfigs" eventKey="#addConfigs">
                افزودن سابسکریبشن
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="#apps" eventKey="#apps">
                برنامه ها
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content as={Container} className="box">
            <Tab.Pane eventKey="#configs">
              <Configs data={data} />
            </Tab.Pane>
            <Tab.Pane eventKey="#addConfigs">
              <AddConfigs />
            </Tab.Pane>
            <Tab.Pane eventKey="#apps">
              <Apps />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </>
  );
};

export default Client;
