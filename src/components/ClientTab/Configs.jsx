import {
  faCheckCircle,
  faCircleXmark,
  faClipboard,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";

const Configs = ({ data }) => {
  const extractTitleFromLink = (link) => {
    const hashIndex = link.indexOf("#");
    if (hashIndex !== -1) {
      // Extract part after #
      const encodedTitle = link.substring(hashIndex + 1);
      // Decode URL-encoded characters
      return decodeURIComponent(encodedTitle);
    }
    return "";
  };

  const filteredLinks = useMemo(
    () => data?.links?.slice(0, -1) || [],
    [data?.links]
  );

  const [icons, setIcons] = useState([]);
  const [iconClasses, setIconClasses] = useState([]);

  useEffect(() => {
    // Initialize icons and iconClasses arrays when filteredLinks changes
    if (filteredLinks) {
      setIcons(filteredLinks.map(() => faClipboard));
      setIconClasses(filteredLinks.map(() => "icon-copy"));
    }
  }, [filteredLinks]);

  const handleIconChange = (index) => {
    setIcons((prevIcons) => {
      const newIcons = [...prevIcons];
      newIcons[index] = faCheckCircle;
      return newIcons;
    });

    setIconClasses((prevClasses) => {
      const newClasses = [...prevClasses];
      newClasses[index] = "icon-success";
      return newClasses;
    });

    // Revert the icon and class back after 1 second
    setTimeout(() => {
      setIcons((prevIcons) => {
        const newIcons = [...prevIcons];
        newIcons[index] = faClipboard;
        return newIcons;
      });

      setIconClasses((prevClasses) => {
        const newClasses = [...prevClasses];
        newClasses[index] = "icon-copy";
        return newClasses;
      });
    }, 1000);
  };

  const handleCopyToClipboard = (text, index) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => {
          toast.success("لینک کپی شد");
          handleIconChange(index); // Call handleIconChange with index
        },
        (err) => {
          toast.error("خطا در کپی کردن لینک");
          console.error("Failed to copy: ", err);
        }
      );
    } else {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        toast.success("لینک کپی شد");
        handleIconChange(index); // Call handleIconChange with index
      } catch (err) {
        toast.error("خطا در کپی کردن لینک");
        console.error("Failed to copy: ", err);
      }
    }
  };

  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState(false);
  const [link, setLink] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (title, link) => {
    setShow(true);
    setModalTitle(title);
    setLink(link);
  };

  return (
    <>
      <ListGroup className="nav-links">
        {filteredLinks?.map((link, index) => {
          const title = extractTitleFromLink(link);
          return (
            <ListGroup.Item key={index} value={filteredLinks?.[index]}>
              <div className="title-a">{title}</div>
              <div className="config-icons">
                <FontAwesomeIcon
                  size="sm"
                  icon={icons[index] || faClipboard} // Use the icon for this specific item
                  className={iconClasses[index]} // Use the class for this specific item
                  onClick={() =>
                    handleCopyToClipboard(filteredLinks?.[index], index)
                  } // Pass the index
                />
                <FontAwesomeIcon
                  size="sm"
                  icon={faQrcode}
                  onClick={() => handleShow(title, filteredLinks?.[index])}
                />
              </div>
            </ListGroup.Item>
          );
        })}
        <Button onClick={() => handleCopyToClipboard(filteredLinks)}>
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
            onClick={() => handleClose()}
          />
        </Modal.Header>
        <Modal.Body className="text-center mb-3">
          <QRCode className="img-fluid" value={link} />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default Configs;
