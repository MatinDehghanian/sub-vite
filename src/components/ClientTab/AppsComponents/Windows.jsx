import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const Windows = ({ data }) => {
  const windowsApps = data?.filter((app) => app.os.includes("Windows"));

  return (
    <ListGroup>
      {windowsApps.map((app, index) => (
        <ListGroup.Item key={index}>
          <div className="title-a">{app.name}</div>
          <div className="config-icons">
            {app.downloadLinks.Windows && (
              <Link to={app.downloadLinks.Windows}>
                <FontAwesomeIcon size="sm" icon={faCloudArrowDown} />
              </Link>
            )}
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
export default Windows;
