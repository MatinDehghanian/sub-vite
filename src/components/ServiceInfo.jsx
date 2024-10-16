import {
  faCalendar,
  faCircle,
  faCircleInfo,
  faCircleXmark,
  faDesktop,
  faInfinity,
  faPenToSquare,
  faPowerOff,
  faQrcode,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Container, Modal, Row } from "react-bootstrap";
import {
  formatDate,
  formatExpireDate,
  calculateRemainingTime,
  formatTraffic,
  handleCopyToClipboard,
} from "../utils/Helper";
import InfoRow from "./ClientTab/ServiceComponents/InfoRow";
import InfoCard from "./ClientTab/ServiceComponents/InfoCard";
import QRCode from "react-qr-code";

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

  const statusMapping = {
    on_hold: { color: "yellow", detail: "در انتظار اتصال" },
    expired: { color: "orange", detail: "منقضی شده" },
    limited: { color: "brown", detail: "محدود شده" },
    active: { color: "green", detail: "فعال" },
    default: { color: "red", detail: "غیرفعال" },
  };

  const currentStatus = statusMapping[data?.status] || statusMapping.default;

  const statusColor = currentStatus.color;
  const statusDetail = currentStatus.detail;

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
        formattedDate: onlineAt ? formatDate(onlineAt) : "نامشخص",
        createdDate: createdAt ? formatDate(createdAt) : "نامشخص",
        formattedExpireDate: expire ? formatExpireDate(expire) : "نامحدود",
        remainingTime: expire ? (
          calculateRemainingTime(expire)
        ) : (
          <FontAwesomeIcon size="lg" icon={faInfinity} />
        ),
        formattedTraffic:
          usedTraffic !== 0 ? formatTraffic(usedTraffic) : "0 MB",
        totalTraffic: dataLimit !== null ? formatTraffic(dataLimit) : "نامحدود",
        remainingTraffic:
          dataLimit !== null && dataLimit !== undefined ? (
            dataLimit - (usedTraffic ?? 0) < 0 ? (
              "منفی"
            ) : (
              formatTraffic(dataLimit - (usedTraffic ?? 0))
            )
          ) : (
            <FontAwesomeIcon size="lg" icon={faInfinity} />
          ),
      });
    }
  }, [data]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

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
    <>
      <Container className="mt-5 p-lg-5 p-4 box">
        <div
          className="w-100"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="info-title">
            <FontAwesomeIcon
              className="px-2 flashdot"
              size="sm"
              icon={faCircle}
            />
            <h3 className="mt-1">{"اطلاعات سرویس"}</h3>
          </div>
          <FontAwesomeIcon
            cursor={"pointer"}
            color="#94143a"
            className="ps-3"
            size="2xl"
            icon={faQrcode}
            onClick={(e) => {
              e.stopPropagation();
              handleShow();
            }}
          />
        </div>

        <Row className="items pt-4 mt-4">
          <InfoRow
            icon={faPenToSquare}
            label={"نام سرویس :"}
            value={data?.username}
          />
          <InfoRow
            icon={faCircleInfo}
            label={"آخرین اتصال :"}
            value={formattedDate}
            rtl
          />
          <InfoRow
            icon={faCalendar}
            label={"تاریخ اتمام :"}
            value={formattedExpireDate}
            rtl
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
          <InfoRow
            icon={faCalendar}
            label={"تاریخ خرید :"}
            value={createdDate}
            rtl
          />
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
          <InfoCard title={"حجم مصرف شده"} value={formattedTraffic} ltr />
          <InfoCard title={"حجم باقی مانده"} value={remainingTraffic} ltr />
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header dir="rtl" className="justify-content-between no-border">
          <Modal.Title>لینک ساب</Modal.Title>
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
            value={
              data?.subscription_url
                ? data?.subscription_url
                : window.location.href
            }
            cursor={"pointer"}
            onClick={() =>
              handleCopyToClipboard(
                data?.subscription_url
                  ? data?.subscription_url
                  : window.location.href
              )
            }
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ServiceInfo;
