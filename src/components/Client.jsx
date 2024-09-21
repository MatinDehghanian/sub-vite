import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Nav, Tab } from "react-bootstrap";
import Configs from "./ClientTab/Configs";
import AddConfigs from "./ClientTab/AddConfigs";
import Apps from "./ClientTab/Apps";
import { Link } from "react-router-dom";

const Client = ({ data }) => {
  const params = window.location.hash || "#addConfigs";

  const navItems = [
    { key: "#configs", label: "لینک ها", Component: Configs },
    { key: "#addConfigs", label: "افزودن سابسکریبشن", Component: AddConfigs },
    { key: "#apps", label: "برنامه ها", Component: Apps },
  ];

  return (
    <Container className="box mt-5 p-lg-5 p-3 mb-5">
      <div className="info-title">
        <FontAwesomeIcon className="px-2 flashdot" size="sm" icon={faCircle} />
        <h3 className="mt-1">{"کانفیگ ها"}</h3>
      </div>

      <Tab.Container id="left-tabs-example" defaultActiveKey={params}>
        <Nav className="nav-b text-center" id="nav-select" variant="underline">
          {navItems.map(({ key, label }) => (
            <Nav.Item key={key}>
              <Nav.Link as={Link} to={key} eventKey={key}>
                {label}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <Tab.Content as={Container} className="box">
          {navItems.map(({ key, Component }) => (
            <Tab.Pane eventKey={key} key={key}>
              <Component data={data} />
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default Client;
