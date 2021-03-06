import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { useHistory, useParams } from "react-router-dom";

import { PerformanceAddFormController } from "Components/FormController/PerformanceAddFormController";
import { score_options } from "Config/staticData";
import { FormTextField } from "Components/Forms/FormTextField";
import { FormSelect } from "Components/Forms/FormSelect";
import { FormRadioGroup } from "Components/Forms/FormRadioGroup";
import { FormSkeleton } from "Components/Skeleton/FormSkeleton";
import { DrawerDialog } from "Components/Dialog/DrawerDialog";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";

const PerformanceAddFormDrawer = reduxForm({
  form: "Performance_Add_Form",
})(({ handleSubmit, submitting, loading, open, onClose, employee_options }) => {
  return (
    <DrawerDialog
      open={open}
      title="Create New Review"
      onClose={onClose}
      onSubmit={handleSubmit}
      submitting={submitting}
      submitLabel="Submit">
      {loading ? (
        <FormSkeleton fieldCount={3} />
      ) : (
        <>
          <Field
            name="title"
            component={FormTextField}
            fullWidth
            variant="outlined"
            label="Title"
            margin="normal"
          />
          <Field
            name="evaluator"
            component={FormSelect}
            fullWidth
            variant="outlined"
            label="Evaluator"
            margin="normal"
            options={employee_options}
          />
          <Field
            name="communication"
            component={FormRadioGroup}
            fullWidth
            variant="outlined"
            label="Communication Skills"
            margin="normal"
            options={score_options}
            row
          />
          <Field
            name="teamPlayer"
            component={FormRadioGroup}
            fullWidth
            variant="outlined"
            label="Team Player"
            margin="normal"
            options={score_options}
            row
          />
          <Field
            name="comment"
            component={FormTextField}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Comment"
            margin="normal"
          />
        </>
      )}
    </DrawerDialog>
  );
});

export const PerformanceAddView = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(true);
  const history = useHistory();
  const onClose = () => {
    setOpen(false);
    history.push(`/review/${id}`);
  };

  return (
    <DashboardLayout>
      <PerformanceAddFormController employeeId={id}>
        {(props) => (
          <PerformanceAddFormDrawer {...props} open={open} onClose={onClose} />
        )}
      </PerformanceAddFormController>
    </DashboardLayout>
  );
};
