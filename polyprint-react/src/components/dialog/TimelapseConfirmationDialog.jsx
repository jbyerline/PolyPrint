import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect } from "react";

export default function TimelapseConfirmationDialog(props) {
  const [blobFile, setBlob] = React.useState("");

  useEffect(() => {
    if (blobFile !== "") {
      const file = URL.createObjectURL(blobFile);
      const filename = props.selectedFile.name;
      let a = document.createElement("a");
      a.href = file;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }, [blobFile]);

  const deleteFile = () => {
    // props.datastore.startPrint(
    //   props.octoprintUrl,
    //   props.apiKey,
    //   props.selectedFile.origin,
    //   props.selectedFile.path
    // );
    // props.close();
    // props.closeOther();
    console.log("Deleting Timelapse File");
  };

  const downloadFile = () => {
    const fileBlob = props.datastore.downloadTimelapse(
      props.octoprintUrl,
      props.apiKey,
      props.selectedFile.path,
      props.selectedFile.name
    );
    props.close();
    props.closeOther();
    fileBlob.then((file) => {
      setBlob(file);
    });
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.close}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Download or Delete?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Would you like to download or delete:{" "}
            {props.selectedFile ? props.selectedFile.name : ""}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.close}>
            Cancel
          </Button>
          {/*<Button onClick={deleteFile} autoFocus>*/}
          {/*  Delete*/}
          {/*</Button>*/}
          <Button onClick={downloadFile} autoFocus>
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
