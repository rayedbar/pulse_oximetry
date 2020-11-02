import React, { useState, useEffect } from "react";
import { Storage } from "aws-amplify";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

  const [image, setImage] = useState(null);

  useEffect(() => {
    async function fetchImageUrl() {
      Storage.get(individualID)
        .then((url) => {
          var myRequest = new Request(url);
          fetch(myRequest).then(function (response) {
            if (response.status === 200) {
              setImage(url);
            }
          });
        })
        .catch((err) => console.log(err));
    }
    fetchImageUrl();
  }, [individualID]);

  return (
    <Avatar className={classes.avatar} alt={individualName} src={image}/>
  );
};

export default IndividualAvatar;
