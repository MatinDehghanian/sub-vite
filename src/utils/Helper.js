import { faClipboard, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

// Utility function to copy text to clipboard and update icon state
export const handleCopyToClipboard = (
  text,
  index,
  setIcons,
  setIconClasses
) => {
  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("لینک کپی شد");
    } catch (err) {
      fallbackCopy(text);
    } finally {
      handleIconChange(index, setIcons, setIconClasses);
    }
  };

  const fallbackCopy = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    toast.success("لینک کپی شد");
  };

  copyText();
};

// Extract name from config URL
export const extractNameFromConfigURL = (url) => {
  const namePattern = /#([^#]*)/;
  const match = url.match(namePattern);

  if (match) return decodeURIComponent(match[1]);

  if (url.startsWith("vmess://")) {
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
  const updateIcon = (icon, className) => {
    setIcons((prev) => {
      const newIcons = [...prev];
      newIcons[index] = icon;
      return newIcons;
    });
    setIconClasses((prev) => {
      const newClasses = [...prev];
      newClasses[index] = className;
      return newClasses;
    });
  };

  updateIcon(faCheckCircle, "icon-success");

  setTimeout(() => {
    updateIcon(faClipboard, "icon-copy");
  }, 1000);
};

// Format date for Tehran timezone
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const tehranOffset = 3.5 * 60 * 1000; // in milliseconds
  const tehranTime = new Date(date.getTime() + tehranOffset);

  return tehranTime.toLocaleString("en-US", {
    timeZone: "Asia/Tehran",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Format expiration date
export const formatExpireDate = (timestamp) =>
  formatDate(new Date(timestamp * 1000).toISOString());

// Calculate remaining time
export const calculateRemainingTime = (expireTimestamp) => {
  const remainingSeconds = expireTimestamp - Math.floor(Date.now() / 1000);

  if (remainingSeconds <= 0) return "تمام شده";

  const days = Math.floor(remainingSeconds / (60 * 60 * 24));
  const hours = Math.floor((remainingSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((remainingSeconds % (60 * 60)) / 60);

  if (days > 0) return `${days} روز, ${hours} ساعت`;
  if (hours > 0) return `${hours} ساعت, ${minutes} دقیقه`;
  return `${minutes} دقیقه`;
};

// Format traffic data
export const formatTraffic = (bytes) => {
  const units = ["B", "MB", "GB", "TB"];
  const thresholds = [1, 1024, 1024 ** 2, 1024 ** 3];

  for (let i = 0; i < thresholds.length; i++) {
    if (bytes < thresholds[i] * 1024) {
      return `${(bytes / thresholds[i]).toFixed(2)} ${units[i]}`;
    }
  }
  return `${(bytes / 1024 ** 4).toFixed(2)} TB`; // Fallback for TB
};
