// material ui items
import Dialog from "@material-ui/core/Dialog";

const MinDialog = (props) => {
  return (
    <Dialog
      open={props.isOpen}
      style={{ maxWidth: "500px", minWidth: "", margin: "0 auto" }}
      fullWidth
    >
      {props.children}
    </Dialog>
  );
};

export default MinDialog;
