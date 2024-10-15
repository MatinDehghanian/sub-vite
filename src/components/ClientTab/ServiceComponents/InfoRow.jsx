import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Stack } from "react-bootstrap";

const InfoRow = ({
  icon,
  label,
  value,
  extraIcon,
  extraColor,
  extend,
  rtl,
}) => (
  <Col xs="12" md={!extend ? "6" : ""} className={"item " + extend}>
    <Stack direction="horizontal" gap={3}>
      <div className="icon-holder">
        <FontAwesomeIcon size="lg" icon={icon} />
      </div>
      <div className="text-c">
        <div className="p-2 ms-auto">{label}</div>
        <div className="p-2 text-op" style={{ direction: rtl ? "rtl" : "ltr" }}>
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

export default InfoRow;
