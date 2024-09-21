import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const AppList = ({ data, osType }) => {
  const apps = data?.filter((app) => app.os.includes(osType));

  return (
    <ListGroup>
      {apps.map((app, index) => (
        <ListGroup.Item key={index}>
          <div className="title-a">{app.name}</div>
          <div className="config-icons">
            {app.downloadLinks[osType] && (
              <Link to={app.downloadLinks[osType]}>
                <FontAwesomeIcon size="sm" icon={faCloudArrowDown} />
              </Link>
            )}
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default AppList;
