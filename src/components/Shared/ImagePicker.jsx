import React from "react";
import { AmplifyS3ImagePicker } from "@aws-amplify/ui-react";
import { Storage } from "aws-amplify";

Storage.configure({ track: true, level: "private" });

const ImagePicker = ({ individualID }) => {
  return (
    <AmplifyS3ImagePicker
      headerTitle="Add Photo"
      fileToKey={() => individualID}
      level="private"
    />
  );
};

export default ImagePicker;
