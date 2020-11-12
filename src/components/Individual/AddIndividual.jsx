import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiDatePicker from "../shared/MuiDatePicker";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { AmplifyS3ImagePicker } from "@aws-amplify/ui-react";
import { useForm, Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { format as formatDate } from "date-fns";

import { createIndividual as AddIndividualMutation } from "../../graphql/mutations";
import TextInputField from "../shared/TextInputField";
import SaveButton from "../shared/SaveButton";
import { VALIDATION_REQUIRED, URL } from "../../utils/constants";

Storage.configure({ track: true, level: "private" });

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    margin: 20,
  },
  imagePickerContainer: {
    display: "flex",
    margin: "auto",
  },
}));

const AddIndividual = () => {
  const classes = useStyles();
  const history = useHistory();

  const { register, errors, control, handleSubmit } = useForm();
  const [dob, handleDobChange] = useState(new Date());
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [individualID, setIndividualID] = useState(uuidv4());
  const domRef = React.useRef();

  const onSubmit = (data) => {
    setShowProgressBar(true);
    async function createIndividual() {
      try {
        await API.graphql(
          graphqlOperation(AddIndividualMutation, {
            input: {
              ...data,
              dob: formatDate(dob, "yyyy-MM-dd"),
              id: individualID,
            },
          })
        );
        history.push(URL.HOME);
      } catch {
        console.log("Error creating individual");
      }
    }
    createIndividual();
  };

  return (
    <div className={classes.root}>
      {showProgressBar === true ? (
        <CircularProgress />
      ) : (
        <Grid container direction="column" alignItems="center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h4">Add Individual</Typography>

            <TextInputField
              name="firstName"
              label="First Name"
              inputRef={register({ required: true })}
              errors={errors.firstName}
              errorText={VALIDATION_REQUIRED}
            />

            <TextInputField
              name="lastName"
              label="Last Name"
              inputRef={register({ required: true })}
              errors={errors.lastName}
              errorText={VALIDATION_REQUIRED}
            />

            <FormControl component="fieldset" margin="normal" fullWidth>
              <FormLabel component="legend">Gender</FormLabel>
              <Controller
                as={RadioGroup}
                aria-label="gender"
                name="gender"
                defaultValue="other"
                control={control}
                rules={{ required: true }}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </Controller>
              {errors.gender && <Typography color="error">Required</Typography>}
            </FormControl>

            <FormControl margin="normal" fullWidth>
              <MuiDatePicker
                selectedDate={dob}
                handleDateChange={handleDobChange}
                domRef={domRef}
              />
            </FormControl>

            <div className={classes.imagePickerContainer}>
              <AmplifyS3ImagePicker
                headerTitle="Add Photo"
                fileToKey={() => individualID}
                level="private"
              />
            </div>

            <SaveButton />
          </form>
        </Grid>
      )}
    </div>
  );
};

export default AddIndividual;
