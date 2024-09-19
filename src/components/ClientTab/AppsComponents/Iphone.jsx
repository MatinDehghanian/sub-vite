import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const Iphone = ({ data }) => {
  const iosApps = data?.filter((app) => app.os.includes("iOS"));

  return (
    <ListGroup>
      {iosApps.map((app, index) => (
        <ListGroup.Item key={index}>
          <div className="title-a">{app.name}</div>
          <div className="config-icons">
            {app.downloadLinks.iOS && (
              <Link to={app.downloadLinks.iOS}>
                <FontAwesomeIcon size="sm" icon={faCloudArrowDown} />
              </Link>
            )}
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
export default Iphone;
