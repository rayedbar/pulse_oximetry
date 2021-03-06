import React, { useState, useEffect } from "react";
import { Storage, Cache } from "aws-amplify";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { INDIVIDUAL_PHOTO } from "../../utils/constants";

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
        let imageUrl = Cache.getItem(individualID + INDIVIDUAL_PHOTO);
        if (!imageUrl) {
          // set expires to 1 hour
          imageUrl = await Storage.get(individualID, { expires: 60 * 60 });

          let imageUrlResponse = await fetch(new Request(imageUrl));
          if (imageUrlResponse.status !== 200) {
            imageUrl = "Unavailable";
          }
          Cache.setItem(individualID + INDIVIDUAL_PHOTO, imageUrl, {
            expires: new Date().getTime() + 1000 * 60 * 60,
          });
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
