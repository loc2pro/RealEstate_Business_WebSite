import { notification } from "antd";

const NotificationSuccess = (content) => {
  notification.success({
    description: content,
    placement: "bottomRight",
    duration: 3,
  });
};

// const NotificationFail = (content) => {
//   notification.error({
//     description: content,
//     placement: "bottomRight",
//     duration: 3,
//   });
// };

export default NotificationSuccess
