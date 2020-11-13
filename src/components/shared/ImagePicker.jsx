import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AmplifyS3ImagePicker } from "@aws-amplify/ui-react";
import { Storage } from "aws-amplify";

Storage.configure({ track: true, level: "private" });

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    margin: "auto",
  },
}));

const ImagePicker = ({ individualID }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AmplifyS3ImagePicker
        headerTitle="Add Photo"
        fileToKey={() => individualID}
        level="private"
      />
    </div>
  );
};

export default ImagePicker;
