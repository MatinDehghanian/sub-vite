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
import { Container, Row } from "react-bootstrap";
import {
  formatDate,
  formatExpireDate,
  calculateRemainingTime,
  formatTraffic,
} from "../utils/Helper";
import InfoRow from "./ClientTab/ServiceComponents/InfoRow";
import InfoCard from "./ClientTab/ServiceComponents/InfoCard";

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
  // Define status mapping based on the new API
  const statusMapping = {
    expired: { color: "orange", detail: "منقضی شده" },
    data_limit_reached: { color: "brown", detail: "حجم تمام شده" },
    inactive: { color: "red", detail: "غیرفعال" },
    active: { color: "green", detail: "فعال" },
    limited: { color: "yellow", detail: "محدود شده" },
    default: { color: "gray", detail: "نامشخص" },
  };

  // Determine status based on new API fields
  const currentStatus = data?.expired
    ? statusMapping.expired
    : data?.data_limit_reached
    ? statusMapping.data_limit_reached
    : data?.is_active
    ? statusMapping.active
    : statusMapping.inactive; // Fallback to inactive or default

  const statusColor = currentStatus.color;
  const statusDetail = currentStatus.detail;

  useEffect(() => {
    if (data) {
      const {
        online_at: onlineAt,
        created_at: createdAt,
        expire_date,
        used_traffic: usedTraffic,
        data_limit: dataLimit,
      } = data;

      setServiceInfo({
        formattedDate: onlineAt ? formatDate(onlineAt) : "نامشخص",
        createdDate: createdAt ? formatDate(createdAt) : "نامشخص",
        formattedExpireDate: expire_date
          ? formatExpireDate(expire_date)
          : "نامحدود",
        remainingTime: expire_date ? (
          calculateRemainingTime(expire_date)
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
          label={"آخرین اتصال :"}
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
          value={
            !data?.note ? (
              <FontAwesomeIcon size="lg" icon={faInfinity} />
            ) : (
              `${data?.note} کاربره`
            )
          }
        />
        <InfoCard title={"حجم مصرف شده"} value={formattedTraffic} ltr />
        <InfoCard title={"حجم باقی مانده"} value={remainingTraffic} ltr />
      </Row>
    </Container>
  );
};

export default ServiceInfo;
