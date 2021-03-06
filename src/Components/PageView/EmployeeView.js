import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import { Route, Switch } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { EmployeeTable } from "Components/Tables/EmployeeTable";
import { AlertDialog } from "Components/Dialog/AlertDialog";
import { DELETE_EMPLOYEE } from "Mutations/Employee";
import { EMPLOYEES } from "Queries/Employee";
import { EmployeeEditView } from "Components/PageView/EmployeeEditView";
import { EmployeeAddView } from "Components/PageView/EmployeeAddView";
import { RouterButton } from "Components/Buttons/RouterButton";

const useStyles = makeStyles((theme) => ({
  addButton: {
    marginBottom: theme.spacing(2),
  },
}));

export const EmployeeView = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    refetchQueries: [
      {
        query: EMPLOYEES,
        fetchPolicy: "network-only",
      },
    ],
  });

  const handleClose = () => setOpen(false);

  const handleOpen = (e, id) => {
    e.preventDefault();
    setEmployeeId(id);
    setOpen(true);
  };

  const handleDeleteEmployee = async () => {
    try {
      await deleteEmployee({
        variables: {
          id: employeeId,
        },
      });
      enqueueSnackbar("Employee successfully deleted!", {
        variant: "success",
      });
      handleClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <DashboardLayout title="Employee List">
        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <RouterButton
              variant="contained"
              color="secondary"
              text="Add Employee"
              to="/employee/add"
              icon={<AddIcon />}
              className={classes.addButton}
            />
            <Paper>
              <EmployeeTable openDialog={handleOpen} />
            </Paper>
          </Grid>
        </Grid>
        <AlertDialog
          open={open}
          onClose={handleClose}
          title="Delete Employee"
          content={
            <>
              <Typography component="p" variant="body1">
                Are you sure to delete the employee?
              </Typography>
            </>
          }
          actionLabel="Delete"
          action={handleDeleteEmployee}
          cancelLabel="Cancel"
          cancel={handleClose}
        />
      </DashboardLayout>
      <Switch>
        <Route path={`/employee/edit/:id`} component={EmployeeEditView} />
        <Route path={`/employee/add`} component={EmployeeAddView} />
      </Switch>
    </>
  );
};
