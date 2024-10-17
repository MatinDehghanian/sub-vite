import {
  faCircleXmark,
  faClipboard,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";
import QRCode from "react-qr-code";
import {
  extractNameFromConfigURL,
  handleCopyToClipboard,
} from "../../utils/Helper.js";
import GetInfoRequest from "../../utils/GetInfoRequest.js";

const Configs = ({ data }) => {
  const [dataLinks, setDataLinks] = useState({});

  const SubUrl = data?.subscription_url.includes("https://")
    ? data?.subscription_url
    : `${window.location.origin}${data?.subscription_url}`;

  useEffect(() => {
    GetInfoRequest.getConfigs().then((res) => {
      var decodedLinks = decodeBase64(res.data.trim());
      var configArray = decodedLinks ? decodedLinks.split("\n") : [];
      setDataLinks(configArray);
    });
  }, []);

  const filteredLinks = useMemo(() => {
    if (!Array.isArray(dataLinks)) {
      return [];
    }
    if (dataLinks.length && dataLinks[dataLinks.length - 1] === "False") {
      return dataLinks.slice(0, -1);
    }
    return dataLinks;
  }, [dataLinks]);

  const [icons, setIcons] = useState([]);
  const [iconClasses, setIconClasses] = useState([]);

  useEffect(() => {
    if (filteredLinks) {
      setIcons(filteredLinks.map(() => faClipboard));
      setIconClasses(filteredLinks.map(() => "icon-copy"));
    }
  }, [filteredLinks]);

  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState(false);
  const [link, setLink] = useState("");
  const [index, setIndex] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (title, link, index) => {
    setShow(true);
    setModalTitle(title);
    setLink(link);
    setIndex(index);
  };

  return (
    <>
      <ListGroup className="nav-links">
        {filteredLinks &&
          filteredLinks?.map((link, index) => {
            const title = extractNameFromConfigURL(link);
            return (
              <ListGroup.Item
                key={index}
                value={filteredLinks?.[index]}
                onClick={() =>
                  handleCopyToClipboard(
                    filteredLinks?.[index],
                    index,
                    setIcons,
                    setIconClasses
                  )
                }
              >
                <div className="title-a">{title}</div>
                <div className="config-icons">
                  <FontAwesomeIcon
                    size="sm"
                    icon={icons[index] || faClipboard}
                    className={iconClasses[index]}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyToClipboard(
                        filteredLinks?.[index],
                        index,
                        setIcons,
                        setIconClasses
                      );
                    }}
                  />
                  <FontAwesomeIcon
                    size="sm"
                    icon={faQrcode}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShow(title, filteredLinks?.[index], index);
                    }}
                  />
                </div>
              </ListGroup.Item>
            );
          })}
        <ListGroup.Item
          key={-1}
          value={SubUrl}
          onClick={() =>
            handleCopyToClipboard(SubUrl, -2, setIcons, setIconClasses)
          }
        >
          <div className="title-a">{"لینک ساب"}</div>
          <div className="config-icons">
            <FontAwesomeIcon
              size="sm"
              icon={icons[-2] || faClipboard}
              className={iconClasses[-2]}
              onClick={(e) => {
                e.stopPropagation();
                handleCopyToClipboard(SubUrl, -2, setIcons, setIconClasses);
              }}
            />
            <FontAwesomeIcon
              size="sm"
              icon={faQrcode}
              onClick={(e) => {
                e.stopPropagation();
                handleShow("لینک ساب", SubUrl, -2);
              }}
            />
          </div>
        </ListGroup.Item>
        <Button
          onClick={() =>
            handleCopyToClipboard(
              filteredLinks.join("\n"),
              -1,
              setIcons,
              setIconClasses
            )
          }
        >
          کپی همه
        </Button>
      </ListGroup>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header dir="rtl" className="justify-content-between no-border">
          <Modal.Title>{modalTitle}</Modal.Title>
          <FontAwesomeIcon
            size="xl"
            color="rgb(160, 21, 62)"
            style={{ cursor: "pointer" }}
            icon={faCircleXmark}
            onClick={handleClose}
          />
        </Modal.Header>
        <Modal.Body className="text-center mb-3">
          <QRCode
            className="img-fluid"
            value={link}
            cursor={"pointer"}
            onClick={() => handleCopyToClipboard(link, index)}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Configs;

function decodeBase64(encodedString) {
  try {
    const decodedString = atob(encodedString);
    return decodedString;
  } catch (error) {
    console.error("Failed to decode base64:", error);
    return "";
  }
}
