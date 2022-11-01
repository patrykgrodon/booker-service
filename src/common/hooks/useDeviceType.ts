import { useEffect, useState } from "react";

export type DeviceType = "tablet" | "mobile" | "desktop";

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");
  const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    } else if (
      /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return "mobile";
    }
    return "desktop";
  };

  useEffect(() => {
    setDeviceType(getDeviceType());
  }, []);
  return { deviceType };
};

export default useDeviceType;
