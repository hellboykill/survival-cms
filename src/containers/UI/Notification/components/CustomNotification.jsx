import React from "react";
import NotificationSystem from "rc-notification";
import { BasicNotification } from "../../../../shared/components/Notification";
export class CustomNotification {
  notificationRU = null;

  show = (color, title, message) => {
    NotificationSystem.newInstance(
      { style: { top: 65 } },
      n => (this.notificationRU = n)
    );

    const content = (
      <BasicNotification color={color} title={title} message={message} />
    );

    if (this.notificationRU) {
      this.notificationRU.notice({
        content: content,
        duration: 5,
        closable: true,
        style: { top: 0, left: "calc(90vw - 100%)" },
      });

      setTimeout(() => {
        this.notificationRU.destroy();
      }, 3000)
    } else console.log("missing notification");
  };
}