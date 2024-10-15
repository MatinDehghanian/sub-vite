import React, { useState, useEffect } from "react";
import {
  faAndroid,
  faApple,
  faLinux,
  faWindows,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab, Col, Nav } from "react-bootstrap";
import AppList from "./AppsComponents/Applist"; // Import the generic AppList

const Apps = () => {
  const [os, setOS] = useState("#Apple");

  const [AppsData, setAppData] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_JSON_APPS_URL)
      .then((response) => response.json())
      .then((data) => {
        setAppData(data);
      });
  }, []);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes("win")) {
      setOS("#Windows");
    } else if (
      userAgent.includes("mac") &&
      !userAgent.includes("iphone") &&
      !userAgent.includes("ipad")
    ) {
      setOS("#Apple");
    } else if (userAgent.includes("android")) {
      setOS("#Android");
    } else if (userAgent.includes("linux")) {
      setOS("#Linux");
    } else {
      setOS("#Apple");
    }
  }, []);

  const osData = [
    {
      key: "#Apple",
      label: "اپل",
      icon: faApple,
      color: null,
      osType: "iOS",
    },
    {
      key: "#Android",
      label: "اندروید",
      icon: faAndroid,
      color: "green",
      osType: "Android",
    },
    {
      key: "#Windows",
      label: "ویندوز",
      icon: faWindows,
      color: "#2057bb",
      osType: "Windows",
    },
    {
      key: "#Linux",
      label: "لینوکس",
      icon: faLinux,
      color: "orange",
      osType: "Linux",
    },
  ];

  return (
    <>
      <Tab.Container id="apps-tab" defaultActiveKey={os}>
        <Col xs="12" className="m-auto d-flex mt-4 p-3 apps-col">
          <Col xs="12" md="3" lg="2" className="d-flex">
            <Nav
              variant="pills"
              className="flex-column nav-list w-100 nav-apps"
            >
              {osData.map(({ key, label, icon, color }) => (
                <Nav.Item key={key}>
                  <Nav.Link eventKey={key}>
                    <FontAwesomeIcon
                      size="xl"
                      className="mx-2"
                      icon={icon}
                      color={color}
                    />
                    <span>{label}</span>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col xs="12" md="9" lg="10">
            <Tab.Content>
              {osData.map(({ key, osType }) => (
                <Tab.Pane eventKey={key} key={key}>
                  <AppList data={AppsData} osType={osType} />
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Col>
      </Tab.Container>
    </>
  );
};

export default Apps;
