import { faClipboard, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

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
  } else {
    return null;
  }
};

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

// serviceInfoHelpers.js

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthName = date.toLocaleString("en-US", { month: "long" });
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day} ${monthName} ${hours}:${minutes}`;
};

export const formatExpireDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const calculateRemainingTime = (expireTimestamp) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const remainingSeconds = expireTimestamp - currentTime;

  if (remainingSeconds <= 0) {
    return "Expired";
  }

  const days = Math.floor(remainingSeconds / (60 * 60 * 24));
  const hours = Math.floor((remainingSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((remainingSeconds % (60 * 60)) / 60);

  if (days > 0) return `${days} روز, ${hours} ساعت`;
  if (hours > 0) return `${hours} ساعت, ${minutes} دقیقه`;
  return `${minutes} دقیقه`;
};

export const formatTraffic = (bytes) => {
  const kb = 1024;
  const mb = kb * 1024;
  const gb = mb * 1024;
  const tb = gb * 1024;

  if (bytes < mb) return false;
  if (bytes < gb) return `${(bytes / mb).toFixed(2)} MB`;
  if (bytes < tb) return `${(bytes / gb).toFixed(2)} GB`;
  return `${(bytes / tb).toFixed(2)} TB`;
};
