import React, { useState, useEffect } from "react";
import { Storage } from "aws-amplify";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Cache } from "aws-amplify";

import constants from "../utils/constants";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    color: theme.palette.getContrastText(theme.palette.primary.dark),
    backgroundColor: theme.palette.primary.dark,
  },
}));

const IndividualAvatar = ({ individualID, individualName }) => {
  const classes = useStyles();

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        let imageUrl = Cache.getItem(individualID + constants.individualPhoto);
        if (!imageUrl) {
          // set expires to match cache config defaultTTL
          imageUrl = await Storage.get(individualID, { expires: 60 * 60 * 72 });
          Cache.setItem(individualID + constants.individualPhoto, imageUrl);
        }
        setImageUrl(imageUrl);
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
