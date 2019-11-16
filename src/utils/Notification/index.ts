import { notification } from "antd";
import *  as styles from "./styles.module.less";

const defaultKey = "Pulse_Notification";

notification.config({
  duration: 3
});

interface NotifyParams {
  type: "success" | "error" | "info" | "warning" | "warn";
  message: string;
  description: string;
  key?: string;
}

function notify(p: NotifyParams) {
  const key = p.key || defaultKey;

  notification[p.type]({
    message: p.message,
    description: p.description,
    className: styles.notification,
    key: key
  });
  return {
    close: () => notification.close(key),
    destroy: () => notification.destroy
  };
}
export default notify;
