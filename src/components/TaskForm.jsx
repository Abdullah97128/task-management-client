import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import {
  Paper,
  Stack,
  TextField,
  Grid,
  MenuItem,
  Select,
  Button,
  FormControl,
  InputLabel,
  Typography,
  Divider,
} from "@mui/material";

import StatusServices from "../services/status.services";
import userServices from "../services/user.services";
import DatePicker from "sassy-datepicker";

const TaskForm = ({
  handleFormClose,
  handleFormSubmit,
  formHeading,
  data,
  isShowCreated,
  isShowAssigned,
  isDisable,
}) => {
  const [status, setStatus] = useState();
  const [users, setUsers] = useState();
  const initialValues = {
    id: data ? data._id : "",
    title: data ? data.title : "",
    description: data ? data.description : "",
    status: data ? data.status._id : "",
    assignedTo: data ? data.assignedTo._id : "",
    addedBy: data
      ? data.addedBy.firstName + " " + data.addedBy.lastName
      : "629ddfdc55fec924cae8fd1f",
    dueDate: data ? data.dueDate : new Date().getTime(),
  };

  const [date, setDate] = React.useState(new Date());
  const [visible, setVisible] = React.useState(false);

  const togglePicker = () => setVisible(true);

  const getStatus = async () => {
    const result = await StatusServices.getStatus();
    if (result) {
      setStatus(result);
    }
  };

  const getAllUsers = async () => {
    const result = await userServices.getAllUsers();
    if (result) {
      setUsers(result);
    }
  };

  useEffect(() => {
    getStatus();
    getAllUsers();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleFormSubmit(values)}
    >
      {({ values, handleSubmit, handleChange, setFieldValue }) => (
        <Form
          style={{ padding: "20px", width: "500px", height: "530px" }}
          onSubmit={handleSubmit}
        >
          <Stack spacing={2}>
            <Typography>{formHeading}</Typography>
            <TextField
              type="text"
              name="title"
              label="Title"
              variant="outlined"
              placeholder="Enter task title here"
              required
              value={values.title}
              onChange={handleChange}
              disabled={isDisable}
            />
            <TextField
              type="text"
              name="description"
              label="Description"
              variant="outlined"
              placeholder="Enter task description here"
              required
              multiline
              maxRows={6}
              minRows={4}
              value={values.description}
              onChange={handleChange}
              disabled={isDisable}
            />
            <FormControl>
              <InputLabel id="statusLabel">Status</InputLabel>
              <Select
                required
                labelId="statusLabel"
                value={values.status}
                label="Status"
                name="status"
                onChange={handleChange}
              >
                {status?.map((item) => {
                  return (
                    <MenuItem key={item._id} value={item._id}>
                      {item.title}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {isShowAssigned && (
              <FormControl>
                <InputLabel id="assignedToLabel">Assigned To</InputLabel>
                <Select
                  required
                  labelId="assignedToLabel"
                  value={values.assignedTo}
                  label="Assign To"
                  name="assignedTo"
                  onChange={handleChange}
                >
                  {users?.map((user) => {
                    return (
                      <MenuItem key={user._id} value={user._id}>
                        {user.firstName + " " + user.lastName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}
            {isShowCreated && (
              <Grid sx={{ textAlign: "left" }}>
                <Typography variant="h8">Created By: </Typography>
                <Typography variant="h8">{values.addedBy}</Typography>
              </Grid>
            )}
            <Stack direction="row">
              <Button variant="contained" onClick={togglePicker}>Select Due Date</Button>
              {console.log(values.dueDate)}
              <p style={{paddingLeft: '10px'}}>{new Date(values.dueDate).toDateString()}</p>
              {visible && (
                <DatePicker
                  selected={new Date(values.dueDate)}
                  name="dueDate"
                  required
                  value={values.dueDate}
                  onChange={(newDate) => {
                    setFieldValue("dueDate", newDate.getTime());
                    setVisible(false);
                  }}
                  minDate={new Date()}
                  style={{ position: "fixed", zIndex: 1 }}
                />
              )}
            </Stack>
            <Divider />
            <Stack
              direction="row"
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                sx={{ width: "45%" }}
                size="large"
                variant="outlined"
                color="primary"
                onClick={handleFormClose}
              >
                Cancel
              </Button>
              <Button
                sx={{ width: "45%" }}
                size="large"
                variant="contained"
                color="primary"
                type="submit"
              >
                Submit
              </Button>
            </Stack>
            {/* <Autocomplete/> */}
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
