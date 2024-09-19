import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const Android = ({ data }) => {
  const androidApps = data?.filter((app) => app.os.includes("Android"));

  return (
    <ListGroup>
      {androidApps?.map((app, index) => (
        <ListGroup.Item key={index}>
          <div className="title-a">{app.name}</div>
          <div className="config-icons">
            {app.downloadLinks.Android && (
              <Link to={app.downloadLinks.Android}>
                <FontAwesomeIcon size="sm" icon={faCloudArrowDown} />
              </Link>
            )}
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
export default Android;
