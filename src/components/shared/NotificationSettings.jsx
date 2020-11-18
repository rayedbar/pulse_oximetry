import React from "react";
import FormTemplate from "./FormTemplate";
import NotificationForm from "./NotificationForm";

const NotificationSettings = () => {
  return (
    <FormTemplate>
      <NotificationForm formHeader="Notification Settings" />
    </FormTemplate>
  );
};

export default NotificationSettings;
