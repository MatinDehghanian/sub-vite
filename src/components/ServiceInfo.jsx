import {
  faCalendar,
  faCircle,
  faCircleInfo,
  faDesktop,
  faInfinity,
  faPenToSquare,
  faPowerOff,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Stack } from "react-bootstrap";

const ServiceInfo = ({ data }) => {
  const [formattedDate, setFormattedDate] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [formattedExpireDate, setFormattedExpireDate] = useState("");
  const [remainingTime, setRemainingTime] = useState("");
  const [formattedTraffic, setFormattedTraffic] = useState("");
  const [totalTraffic, setTotalTraffic] = useState("");
  const [remainingTraffic, setRemainingTraffic] = useState("");
  const statusColor =
    data?.status === "on_hold" ? "yellow" : data?.status ? "green" : "red";
  const statusDetail =
    data?.status === "on_hold"
      ? "متوقف شده"
      : data?.status
      ? "فعال"
      : "غیرفعال";

  useEffect(() => {
    // Check and format online date
    const onlineAt = data?.online_at;
    if (onlineAt) {
      setFormattedDate(formatDate(onlineAt));
    }
    // Check and format created date
    const createdAt = data?.created_at;
    if (createdAt) {
      setCreatedDate(formatDate(createdAt));
    }
    // Check and format expire date
    const expireTimestamp = data?.expire;
    if (expireTimestamp) {
      setFormattedExpireDate(formatExpireDate(expireTimestamp));
      setRemainingTime(calculateRemainingTime(expireTimestamp));
    }
    // Check and format used traffic
    const usedTraffic = data?.used_traffic;
    if (usedTraffic !== undefined) {
      setFormattedTraffic(formatTraffic(usedTraffic));
    }
    // Check and format total traffic
    const dataLimit = data?.data_limit;
    if (dataLimit !== undefined) {
      setTotalTraffic(formatTraffic(dataLimit));
    }
    // Calculate and set remaining traffic
    if (dataLimit === null) {
      setRemainingTraffic(false);
    } else if (dataLimit !== undefined) {
      const remaining = dataLimit - (usedTraffic ?? 0);
      setRemainingTraffic(formatTraffic(remaining));
    }
  }, [data]);

  return (
    <>
      <Container className="mt-5 p-lg-5 p-4 box">
        <div className="info-title">
          <FontAwesomeIcon
            className="px-2 flashdot"
            size="sm"
            icon={faCircle}
          />
          <h3 className="mt-1">{"اطلاعات سرویس"}</h3>
        </div>
        {/* Items */}
        <Row className="items pt-4 mt-4">
          <Col xs="12" md="6" className="item">
            <Stack direction="horizontal" gap={3}>
              <div className="icon-holder">
                <FontAwesomeIcon size="lg" icon={faPenToSquare} />
              </div>
              <div className="text-c">
                <div className="p-2 ms-auto">{"نام سرویس :"}</div>
                <div className="p-2 text-op">{data?.username}</div>
              </div>
            </Stack>
          </Col>
          <Col xs="12" md="6" className="item">
            <Stack direction="horizontal" gap={3}>
              <div className="icon-holder">
                <FontAwesomeIcon size="lg" icon={faCircleInfo} />
              </div>
              <div className="text-c">
                <div className="p-2 ms-auto">{"وضعیت اتصال :"}</div>
                <div className="p-2 text-op">{formattedDate}</div>
              </div>
            </Stack>
          </Col>
          <Col xs="12" md="6" className="item">
            <Stack direction="horizontal" gap={3}>
              <div className="icon-holder">
                <FontAwesomeIcon size="lg" icon={faCalendar} />
              </div>
              <div className="text-c">
                <div className="p-2 ms-auto">{"تاریخ اتمام :"}</div>
                <div className="p-2 text-op">
                  {!formattedExpireDate ? "نامحدود" : formattedExpireDate}
                </div>
              </div>
            </Stack>
          </Col>
          <Col xs="12" md="6" className="item">
            <Stack direction="horizontal" gap={3}>
              <div className="icon-holder">
                <FontAwesomeIcon size="lg" icon={faPowerOff} />
              </div>
              <div className="text-c">
                <div className="p-2 ms-auto">{"وضعیت سرویس :"}</div>
                <div className="p-2 text-op">
                  {statusDetail}
                  <FontAwesomeIcon
                    className="px-2 flashdot"
                    size="sm"
                    icon={faCircle}
                    color={statusColor}
                  />
                </div>
              </div>
            </Stack>
          </Col>
          <Col xs="12" className="item sys">
            <Stack direction="horizontal" gap={3}>
              <div className="icon-holder">
                <FontAwesomeIcon size="lg" icon={faDesktop} />
              </div>
              <div className="text-c">
                <div className="p-2 ms-auto">{"آخرین برنامه متصل شده :"}</div>
                <div className="p-2 text-op">{data?.sub_last_user_agent}</div>
              </div>
            </Stack>
          </Col>
          <Col xs="12" md="6" className="item">
            <Stack direction="horizontal" gap={3}>
              <div className="icon-holder">
                <FontAwesomeIcon size="lg" icon={faCalendar} />
              </div>
              <div className="text-c">
                <div className="p-2 ms-auto">{"تاریخ خرید :"}</div>
                <div className="p-2 text-op">{createdDate}</div>
              </div>
            </Stack>
          </Col>
          <Col xs="12" md="6" className="item">
            <Stack direction="horizontal" gap={3}>
              <div className="icon-holder">
                <FontAwesomeIcon size="lg" icon={faSpinner} />
              </div>
              <div className="text-c">
                <div className="p-2 ms-auto">{"حجم خریداری شده :"}</div>
                <div className="p-2 text-op">
                  {!totalTraffic ? "نامحدود" : totalTraffic}
                </div>
              </div>
            </Stack>
          </Col>
        </Row>
        {/* Cards */}
        <Row className="cards pt-3">
          <Col xs="12" md="3">
            <Card>
              <Card.Body>
                <Card.Title>مدت باقی مانده از اعتبار</Card.Title>
                <Card.Text>
                  {!remainingTime ? (
                    <FontAwesomeIcon size="lg" icon={faInfinity} />
                  ) : (
                    remainingTime
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs="12" md="3">
            <Card>
              <Card.Body>
                <Card.Title>تعداد کاربر</Card.Title>
                <Card.Text>
                  {/* <FontAwesomeIcon size="lg" icon={faInfinity} /> */}1
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs="12" md="3">
            <Card>
              <Card.Body>
                <Card.Title>حجم مصرف شده</Card.Title>
                <Card.Text dir="ltr">
                  {!formattedTraffic ? "0 MB" : formattedTraffic}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs="12" md="3">
            <Card>
              <Card.Body>
                <Card.Title>حجم باقی مانده</Card.Title>
                <Card.Text dir="ltr">
                  {!remainingTraffic ? (
                    <FontAwesomeIcon size="lg" icon={faInfinity} />
                  ) : (
                    remainingTraffic
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ServiceInfo;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  // Get the day (DD)
  const day = date.getDate();
  // Get the month name (e.g., "August")
  const monthName = date.toLocaleString("en-US", { month: "long" });
  // Get the hour and minute (HH:MM)
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  // Combine them into the desired format
  return `${day} ${monthName} ${hours}:${minutes}`;
};

const formatExpireDate = (timestamp) => {
  // Convert the timestamp to milliseconds (JavaScript uses milliseconds)
  const date = new Date(timestamp * 1000);
  // Format the date to exclude seconds and year
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const calculateRemainingTime = (expireTimestamp) => {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  const remainingSeconds = expireTimestamp - currentTime;

  if (remainingSeconds <= 0) {
    return "Expired";
  }

  const days = Math.floor(remainingSeconds / (60 * 60 * 24));
  const hours = Math.floor((remainingSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((remainingSeconds % (60 * 60)) / 60);

  // Build the remaining time string based on conditions
  let remainingTime = "";

  if (days > 0) {
    remainingTime += `${days} روز`;
    if (hours > 0) {
      remainingTime += `, ${hours} ساعت`;
    }
  } else if (hours > 0) {
    remainingTime += `${hours} ساعت`;
    if (minutes > 0) {
      remainingTime += `, ${minutes} روز`;
    }
  } else {
    remainingTime += `${minutes} دقیقه`;
  }

  return remainingTime;
};

const formatTraffic = (bytes) => {
  const kb = 1024;
  const mb = kb * 1024;
  const gb = mb * 1024;
  const tb = gb * 1024;

  if (bytes < mb) {
    // Less than 1 MB
    return false;
  } else if (bytes < gb) {
    // Less than 1 GB
    const result = (bytes / mb).toFixed(2);
    return `${result} MB`;
  } else if (bytes < tb) {
    // Less than 1 TB
    const result = (bytes / gb).toFixed(2);
    return `${result} GB`;
  } else {
    // 1 TB and above
    const result = (bytes / tb).toFixed(2);
    return `${result} TB`;
  }
};
