export const AlertType = {
  info : "info",
  warn : "warn",
  error : "error",
  success : "success",
}


class AlertHelper {

setDropdownAlertRef(ref) {
    this.dropDownRef = ref;
    console.log("Dropdown alert reference ", ref);
  }

  showAlert = (
    type,
    title = "",
    message = ""
  ) => {
    if (this.dropDownRef) this.dropDownRef.alertWithType(type, title, message);
  };

  errorAlert = (title= "", message = "") => {
    this.showAlert(AlertType.error, title, message);
  };

  successAlert = (title = "", message = "") => {
    this.showAlert(AlertType.success, title, message);
  };

  infoAlert = (title = "", message = "") => {
    this.showAlert(AlertType.info, title, message);
  };

  warningAlert = (title="", message = "") => {
    this.showAlert(AlertType.warn, title, message);
  };

  closeAlert = () => {};

  onAlertClosed = () => {

  }
}

const alertHelper = new AlertHelper();
export { alertHelper as AlertHelper };
