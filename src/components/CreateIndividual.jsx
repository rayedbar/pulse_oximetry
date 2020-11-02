import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Input,
  Button,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import MuiDatePicker from "./MuiDatePicker";
import { createIndividual as CreateIndividualMutation } from "../graphql/mutations";
import { API, graphqlOperation, Storage } from "aws-amplify";

Storage.configure({ track: true, level: "private" });

const initialState = {
  firstName: "",
  lastName: "",
  gender: "",
};

const formatDate = date => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

const CreateIndividual = () => {
  const history = useHistory();

  const [formState, setFormState] = useState(initialState);
  const [dob, handleDobChange] = useState(new Date());
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);

  const fileInput = React.createRef();

  const onOpenFileDialog = () => {
    fileInput.current.click();
  };

  const onProcessFile = event => {
    event.preventDefault();
    setProfilePhotoFile(event.target.files[0]);
  };

  const handleChange = event => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    async function createIndividual() {
      try {
        const individualData = await API.graphql(
          graphqlOperation(CreateIndividualMutation, {
            input: { ...formState, dob: formatDate(dob) },
          })
        );
        const fileName = individualData.data.createIndividual.id;
        console.log(fileName);
        await Storage.put(fileName, profilePhotoFile, {
          contentType: "image/png",
        });
        history.push("/individuals");
      } catch {
        console.log("Error creating individual");
      }
    }
    createIndividual();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: 20,
        padding: 20,
      }}
    >
      <form style={{ width: "50%" }}>
        <h1>Add Individual</h1>

        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <Input
            name="firstName"
            type="text"
            value={formState.firstName}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="LastName">Last Name</InputLabel>
          <Input
            name="lastName"
            type="text"
            value={formState.lastName}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl component="fieldset" margin="normal" fullWidth>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender"
            value={formState.gender}
            onChange={handleChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>

        <FormControl margin="normal" fullWidth>
          <MuiDatePicker
            selectedDate={dob}
            handleDateChange={handleDobChange}
          />
        </FormControl>

        <FormControl margin="normal" fullWidth>
          <input
            type="file"
            onChange={onProcessFile}
            ref={fileInput}
            hidden={true}
          />
          <Button onClick={onOpenFileDialog}>Upload Picture</Button>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateIndividual;
