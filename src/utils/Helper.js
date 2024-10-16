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
  // Format the date and time separately
  const formattedDate = tehranTime.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = tehranTime.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Concatenate the date and time with a hyphen
  return `${formattedDate} - ${formattedTime}`;
};

export const formatExpireDate = (isoString) => {
  const date = new Date(isoString);

  // Format the date and time separately
  const formattedDate = date.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Concatenate the date and time with a hyphen
  return `${formattedDate} - ${formattedTime}`;
};

// Calculate remaining time based on the new API "expire_date" format
export const calculateRemainingTime = (expireDate) => {
  // Convert the ISO string into a Unix timestamp (seconds)
  const expireTimestamp = Math.floor(new Date(expireDate).getTime() / 1000);
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
  const units = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;

  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }

  return `${bytes.toFixed(2)} ${units[i]}`;
};