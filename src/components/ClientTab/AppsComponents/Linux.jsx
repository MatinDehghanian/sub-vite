import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const Linux = ({ data }) => {
  const linuxApps = data?.filter((app) => app.os.includes("Linux"));

  return (
    <ListGroup>
      {linuxApps.map((app, index) => (
        <ListGroup.Item key={index}>
          <div className="title-a">{app.name}</div>
          <div className="config-icons">
            {app.downloadLinks.Linux && (
              <Link to={app.downloadLinks.Linux}>
                <FontAwesomeIcon size="sm" icon={faCloudArrowDown} />
              </Link>
            )}
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
export default Linux;
