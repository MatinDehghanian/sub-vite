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
import {
  formatDate,
  formatExpireDate,
  calculateRemainingTime,
  formatTraffic,
} from "../utils/Helper";

const InfoRow = ({ icon, label, value, extraIcon, extraColor, extend }) => (
  <Col xs="12" md={!extend ? "6" : ""} className={"item " + extend}>
    <Stack direction="horizontal" gap={3}>
      <div className="icon-holder">
        <FontAwesomeIcon size="lg" icon={icon} />
      </div>
      <div className="text-c">
        <div className="p-2 ms-auto">{label}</div>
        <div className="p-2 text-op">
          {value}
          {extraIcon && (
            <FontAwesomeIcon
              className="px-2 flashdot"
              size="sm"
              icon={extraIcon}
              color={extraColor}
            />
          )}
        </div>
      </div>
    </Stack>
  </Col>
);

const InfoCard = ({ title, value }) => (
  <Col xs="12" md="3">
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{value}</Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

const ServiceInfo = ({ data }) => {
  const [serviceInfo, setServiceInfo] = useState({
    formattedDate: "",
    createdDate: "",
    formattedExpireDate: "",
    remainingTime: "",
    formattedTraffic: "",
    totalTraffic: "",
    remainingTraffic: "",
  });

  const statusColor =
    data?.status === "on_hold" ? "yellow" : data?.status ? "green" : "red";
  const statusDetail =
    data?.status === "on_hold"
      ? "متوقف شده"
      : data?.status
      ? "فعال"
      : "غیرفعال";

  useEffect(() => {
    if (data) {
      const {
        online_at: onlineAt,
        created_at: createdAt,
        expire,
        used_traffic: usedTraffic,
        data_limit: dataLimit,
      } = data;

      setServiceInfo({
        formattedDate: onlineAt ? formatDate(onlineAt) : "",
        createdDate: createdAt ? formatDate(createdAt) : "",
        formattedExpireDate: expire ? formatExpireDate(expire) : "نامحدود",
        remainingTime: expire ? (
          calculateRemainingTime(expire)
        ) : (
          <FontAwesomeIcon size="lg" icon={faInfinity} />
        ),
        formattedTraffic:
          usedTraffic !== undefined ? formatTraffic(usedTraffic) : "0 MB",
        totalTraffic:
          dataLimit !== undefined ? formatTraffic(dataLimit) : "نامحدود",
        remainingTraffic:
          dataLimit !== null && dataLimit !== undefined ? (
            formatTraffic(dataLimit - (usedTraffic ?? 0))
          ) : (
            <FontAwesomeIcon size="lg" icon={faInfinity} />
          ),
      });
    }
  }, [data]);

  const {
    formattedDate,
    createdDate,
    formattedExpireDate,
    remainingTime,
    formattedTraffic,
    totalTraffic,
    remainingTraffic,
  } = serviceInfo;

  return (
    <Container className="mt-5 p-lg-5 p-4 box">
      <div className="info-title">
        <FontAwesomeIcon className="px-2 flashdot" size="sm" icon={faCircle} />
        <h3 className="mt-1">{"اطلاعات سرویس"}</h3>
      </div>

      <Row className="items pt-4 mt-4">
        <InfoRow
          icon={faPenToSquare}
          label={"نام سرویس :"}
          value={data?.username}
        />
        <InfoRow
          icon={faCircleInfo}
          label={"وضعیت اتصال :"}
          value={formattedDate}
        />
        <InfoRow
          icon={faCalendar}
          label={"تاریخ اتمام :"}
          value={formattedExpireDate}
        />
        <InfoRow
          icon={faPowerOff}
          label={"وضعیت سرویس :"}
          value={statusDetail}
          extraIcon={faCircle}
          extraColor={statusColor}
        />
        <InfoRow
          icon={faDesktop}
          label={"آخرین برنامه متصل شده :"}
          value={data?.sub_last_user_agent}
          extend="sys"
        />
        <InfoRow icon={faCalendar} label={"تاریخ خرید :"} value={createdDate} />
        <InfoRow
          icon={faSpinner}
          label={"حجم خریداری شده :"}
          value={totalTraffic}
        />
      </Row>

      <Row className="cards pt-3">
        <InfoCard title={"مدت باقی مانده از اعتبار"} value={remainingTime} />
        <InfoCard
          title={"تعداد کاربر"}
          value={<FontAwesomeIcon size="lg" icon={faInfinity} />}
        />
        <InfoCard title={"حجم مصرف شده"} value={formattedTraffic} />
        <InfoCard title={"حجم باقی مانده"} value={remainingTraffic} />
      </Row>
    </Container>
  );
};

export default ServiceInfo;
