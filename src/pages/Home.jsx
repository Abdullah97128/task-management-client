import * as React from "react";
import TaskTable from "../components/TaskTable";
import Navbar from "../components/Navbar";
import taskServices from "../services/task.services";
import { Button, Box, Tab, Dialog, DialogActions } from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import TaskForm from "../components/TaskForm";

const Home = () => {
  const [allTasks, setAllTasks] = React.useState();
  const [task, setTask] = React.useState();
  const [createdTasks, setCreatedTasks] = React.useState();
  const [assignedTasks, setAssignedTasks] = React.useState();

  const createTask = async (task) => {
    const result = await taskServices.createTask(task);
    if (result) {
      console.log("Task created successfully");
      setNewTaskDialog(false);
      getCreatedTasks();
    } else {
      console.log("Error creating task!");
    }
  };

  const getTaskById = async (id) => {
    const result = await taskServices.getTaskById(id);
    if (result) {
      setTask(result);
    } else {
      console.log("Error occured!");
    }
  };

  const updateTask = async (task) => {
    console.log(task);
    const result = await taskServices.updateTask(task);
    if (result) {
      console.log("Task updated successfully");
      setCreatedTaskUpdateDialog(false);
      getCreatedTasks();
    } else {
      console.log("Error updating task!");
    }
  };

  const deleteTask = async (id) => {
    const result = await taskServices.deleteTask(id);
    if (result) {
      console.log("Successfully Deleted!");
      getCreatedTasks();
    } else {
      console.log("Error Deleting Task!");
    }
  };

  const getAllTasks = async () => {
    const result = await taskServices.getAllTasks();
    if (result) {
      setAllTasks(result);
    }
  };

  const getCreatedTasks = async () => {
    const result = await taskServices.getTaskCreated(
      "629ddfdc55fec924cae8fd1f"
    );
    if (result) {
      setCreatedTasks(result);
    }
  };

  const getAssignedTasks = async () => {
    const result = await taskServices.getTaskAssigned(
      "629ddfdc55fec924cae8fd1f"
    );
    if (result) {
      setAssignedTasks(result);
    }
  };

  const [newTaskDialog, setNewTaskDialog] = React.useState(false);
  const [createdTaskUpdateDialog, setCreatedTaskUpdateDialog] =
    React.useState(false);
  const [assignedTaskUpdateDialog, setAssignedTaskUpdateDialog] =
    React.useState(false);

  const handleCloseNewTaskDialog = () => {
    setNewTaskDialog(false);
    getCreatedTasks();
  };

  const handleOpenNewTaskDialog = () => {
    setNewTaskDialog(true);
  };

  const handleCloseCreatedTaskDialog = () => {
    setTask(null);
    setCreatedTaskUpdateDialog(false);
  };

  const handleOpenCreatedTaskDialog = (id) => {
    getTaskById(id);
    setCreatedTaskUpdateDialog(true);
  };

  const handleCloseAssignedTaskDialog = () => {
    setTask(null);
    setAssignedTaskUpdateDialog(false);
  };

  const handleOpenAssignedTaskDialog = (id) => {
    getTaskById(id);
    setAssignedTaskUpdateDialog(true);
  };

  React.useEffect(() => {
    getAssignedTasks();
    getCreatedTasks();
  }, []);

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          margin: "auto",
          paddingTop: "4vh",
          width: "80%",
          textAlign: "right",
        }}
      >
        <Button onClick={handleOpenNewTaskDialog} variant="contained">
          Add New Task
        </Button>
      </div>
      <Box
        sx={{
          width: "80%",
          paddingTop: "20px",
          margin: "auto",
          typography: "body1",
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              variant="fullWidth"
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab label="Assigned" value="1" />
              <Tab label="Created" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div style={{ marginTop: "5vh", marginBottom: "5vh" }}>
              <TaskTable
                isAssigned={false}
                isCreated={true}
                data={assignedTasks}
                openUpdateDialog={handleOpenAssignedTaskDialog}
              />
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div style={{ marginTop: "5vh", marginBottom: "5vh" }}>
              <TaskTable
                isAssigned={true}
                isCreated={false}
                data={createdTasks}
                openUpdateDialog={handleOpenCreatedTaskDialog}
                deleteTask={deleteTask}
              />
            </div>
          </TabPanel>
        </TabContext>
      </Box>
      <Dialog
        sx={{ display: "block" }}
        open={newTaskDialog}
        onClose={handleCloseNewTaskDialog}
      >
        <TaskForm
          handleFormClose={handleCloseNewTaskDialog}
          handleFormSubmit={createTask}
          formHeading={"Create Task"}
          isShowAssigned={true}

        />
      </Dialog>

      <Dialog
        sx={{ display: "block" }}
        open={createdTaskUpdateDialog}
        onClose={handleCloseCreatedTaskDialog}
      >
        {task && (
          <TaskForm
            handleFormClose={handleCloseCreatedTaskDialog}
            handleFormSubmit={updateTask}
            data={task}
            formHeading={"Update Task"}
            isShowCreated={false}
            isShowAssigned={true}
            isDisable={false}
          />
        )}
      </Dialog>

      <Dialog
        sx={{ display: "block" }}
        open={assignedTaskUpdateDialog}
        onClose={handleCloseAssignedTaskDialog}
      >
        {task && (
          <TaskForm
            handleFormClose={handleCloseAssignedTaskDialog}
            handleFormSubmit={updateTask}
            data={task}
            formHeading={"Update Task"}
            isShowCreated={true}
            isShowAssigned={false}
            isDisable={true}
          />
        )}
      </Dialog>
    </>
  );
};

export default Home;
