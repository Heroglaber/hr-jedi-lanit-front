import vacationApprovalPrepareRequestUiDesc from "./tasksUiDescriptions/vacationApprovalPrepareRequestUiDesc";

const taskUiDescriptionsByFormKey = {
  "vacation-approval:prepare-request": vacationApprovalPrepareRequestUiDesc,
  "vacation-approval:approve-request": null,
};

export default (task) => {
  const {formKey} = task;
  return  taskUiDescriptionsByFormKey[formKey];
};
