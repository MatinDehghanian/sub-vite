import { faClipboard, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

// Handle clipboard copy and update icon
export const handleCopyToClipboard = (
  text,
  index,
  setIcons,
  setIconClasses
) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("لینک کپی شد");
        handleIconChange(index, setIcons, setIconClasses);
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
      handleIconChange(index, setIcons, setIconClasses);
    } catch (err) {
      toast.error("خطا در کپی کردن لینک");
      console.error("Failed to copy: ", err);
    }
  }
};

// Extract name from config URL
export const extractNameFromConfigURL = (url) => {
  const namePattern = /#([^#]*)/;
  const match = url.match(namePattern);

  if (match) {
    return decodeURIComponent(match[1]);
  } else if (url.startsWith("vmess://")) {
    const encodedString = url.replace("vmess://", "");
    const decodedString = atob(encodedString);
    try {
      return JSON.parse(decodedString).ps;
    } catch (error) {
      console.error("Invalid vmess URL format:", error);
      return null;
    }
  }
  return null;
};

// Update icon after successful copy
export const handleIconChange = (index, setIcons, setIconClasses) => {
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

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const tehranOffset = 3.5 * 60;
  const utcTime = date.getTime();
  const tehranTime = new Date(utcTime + tehranOffset * 60 * 1000);

  return tehranTime.toLocaleString("en-US", {
    timeZone: "Asia/Tehran",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Format expiration date
export const formatExpireDate = (timestamp) => {
  return formatDate(new Date(timestamp * 1000).toISOString());
};

// Calculate remaining time
export const calculateRemainingTime = (expireTimestamp) => {
  const remainingSeconds = expireTimestamp - Math.floor(Date.now() / 1000);

  if (remainingSeconds <= 0) {
    return "تمام شده";
  }

  const days = Math.floor(remainingSeconds / (60 * 60 * 24));
  const hours = Math.floor((remainingSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((remainingSeconds % (60 * 60)) / 60);

  if (days > 0) return `${days} روز, ${hours} ساعت`;
  if (hours > 0) return `${hours} ساعت, ${minutes} دقیقه`;
  return `${minutes} دقیقه`;
};

// Format traffic data
export const formatTraffic = (bytes) => {
  const mb = 1024 ** 2;
  const gb = 1024 ** 3;
  const tb = 1024 ** 4;

  if (bytes < mb) return false;
  if (bytes < gb) return `${(bytes / mb).toFixed(2)} MB`;
  if (bytes < tb) return `${(bytes / gb).toFixed(2)} GB`;
  return `${(bytes / tb).toFixed(2)} TB`;
};
