// material ui items
import Dialog from "@material-ui/core/Dialog";

const MediumDialog = (props) => {
  return (
    <Dialog
      open={props.isOpen}
      style={{ maxWidth: "1000px", margin: "0 auto" }}
      fullWidth
    >
      {props.children}
    </Dialog>
  );
};

export default MediumDialog;
