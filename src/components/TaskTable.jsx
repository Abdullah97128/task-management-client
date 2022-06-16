import React from "react";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Table,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import taskServices from "../services/task.services";
import { red } from "@mui/material/colors";

const TaskTable = ({
  isAssigned,
  isCreated,
  data,
  openUpdateDialog,
  deleteTask,
}) => {
  if (data) {
    data.map((item) => {
      console.log(item.dueDate < new Date().getTime());
    });
  }
  return (
    <TableContainer style={{ width: "100%", margin: "auto" }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="left">Description</TableCell>
            {isAssigned && <TableCell align="left">Assigned To</TableCell>}
            {isCreated && <TableCell align="left">Created By</TableCell>}
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Due Date</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data ? (
            data.map((task) => (
              <TableRow
                key={task._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor:
                    task.dueDate < new Date().getTime() ? "#f241416e" : "",
                }}
              >
                <TableCell component="th" scope="row">
                  {task.title}
                </TableCell>
                <TableCell align="left">{task.description}</TableCell>
                {isAssigned && (
                  <TableCell align="left">
                    {task.assignedTo.firstName + " " + task.assignedTo.lastName}
                  </TableCell>
                )}
                {isCreated && (
                  <TableCell align="left">
                    {task.addedBy.firstName + " " + task.addedBy.lastName}
                  </TableCell>
                )}
                <TableCell align="left">{task.status.title}</TableCell>
                <TableCell align="left">
                  {new Date(task.dueDate).toDateString()}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => openUpdateDialog(task._id)}>
                    <EditIcon variant="filled" color="primary" />
                  </IconButton>
                  {isAssigned && (
                    <IconButton onClick={() => deleteTask(task._id)}>
                      <DeleteIcon variant="filled" sx={{ color: "#e01414" }} />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell colSpan={5} align="center" component="th" scope="row">
                No tasks to show
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
