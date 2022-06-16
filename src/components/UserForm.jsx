import React from "react";
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
  Checkbox,
  FormControlLabel,
  Divider
} from "@mui/material";

const UserForm = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    designation: "",
    email: "",
    password: "",
    role: "",
    isActive: true,
  };

  const submitForm = (values) => {
    console.log(values);
  };

  return (
    <Grid>
      <Paper
        elevation={10}
        style={{ width: "70%", margin: "auto", padding: "20px 20px" }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => submitForm(values)}
        >
          {({ values, handleSubmit, handleChange }) => (
            <Form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  type="name"
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  placeholder="First Name Here..."
                  required
                  value={values.firstName}
                  onChange={handleChange}
                />
                <TextField
                  type="name"
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  placeholder="Last Name Here..."
                  required
                  value={values.lastName}
                  onChange={handleChange}
                />

                <TextField
                  type="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  placeholder="Email Here..."
                  required
                  value={values.email}
                  onChange={handleChange}
                />
                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  placeholder="Password Here..."
                  required
                  value={values.password}
                  onChange={handleChange}
                />

                <FormControl>
                  <InputLabel id="statusLabel">Designation</InputLabel>
                  <Select
                    labelId="designationLabel"
                    value={values.designation}
                    label="Designation"
                    name="designation"
                    onChange={handleChange}
                  >
                    <MenuItem value={"dev 1"}>dev1</MenuItem>
                    <MenuItem value={"dev 2"}>dev 2</MenuItem>
                    <MenuItem value={"dev 3"}>dev 3</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel id="roleLabel">Role</InputLabel>
                  <Select
                    labelId="roleLabel"
                    value={values.role}
                    label="Role"
                    name="role"
                    onChange={handleChange}
                  >
                    <MenuItem value={"Admin"}>Admin</MenuItem>
                    <MenuItem value={"User"}>User</MenuItem>
                    <MenuItem value={"HR"}>HR</MenuItem>
                  </Select>
                </FormControl>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Is Active?"
                  checked={values.isActive}
                  value={values.isActive}
                  onChange={handleChange}
                  name="isActive"
                />
                <Divider />
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default UserForm;
