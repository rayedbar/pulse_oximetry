import React, { useState, useEffect } from "react";
import { Storage } from "aws-amplify";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    color: theme.palette.getContrastText(theme.palette.avatarBackground),
    backgroundColor: theme.palette.avatarBackground,
  },
}));

const IndividualAvatar = ({ individualID, individualName }) => {
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        setImageUrl(await Storage.get(individualID));
      } catch (error) {
        console.log(error);
      }
    };
    fetchImageUrl();
  }, [individualID]);

  return (
    <Avatar className={classes.avatar} alt={individualName} src={imageUrl} />
  );
};

export default IndividualAvatar;
