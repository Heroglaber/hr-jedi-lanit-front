import VacationApprovalPrepareRequest from "./tasksComponents/VacationApprovalPrepareRequest";
import VacationApprovalApproveRequest from "./tasksComponents/VacationApprovalApproveRequest";
import TaskStub from "./TaskStub";
import BusinessTripApprovalPrepareRequest from "./tasksComponents/BusinessTripApprovalPrepareRequest";
import BusinessTripApprovalApproveRequest from "./tasksComponents/BusinessTripApprovalApproveRequest";

const taskComponentByFormKey = {
  "vacation-approval:prepare-request": VacationApprovalPrepareRequest,
  "vacation-approval:approve-request": VacationApprovalApproveRequest,
  "business-trip-approval:prepare-request": BusinessTripApprovalPrepareRequest,
  "business-trip-approval:approve-request": BusinessTripApprovalApproveRequest,
};

export default (task) => {
  const {formKey} = task;
  return  taskComponentByFormKey[formKey] || TaskStub;
};
