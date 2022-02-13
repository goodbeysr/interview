import LoadingButton from "@mui/lab/LoadingButton";
import { Button, DialogActions } from "@mui/material";
import { FC, ReactNode } from "react";
import { Dialog } from "ui/Dialog";

interface Props {
  onClose: () => void;
  message: ReactNode;
  actions?: ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
  open: boolean;
  loading: boolean;
}

export const DeleteDialog: FC<Props> = ({
  open,
  loading,
  message,
  onClose,
  onCancel,
  onOk
}) => {
  return (
    <Dialog
      title="Delete"
      message={message}
      open={open}
      onClose={onClose}
      onOk={onOk}
      onCancel={onCancel}
      actions={
        <DialogActions>
          <Button variant="contained" color="success" onClick={onCancel}>
            Cancel
          </Button>
          <LoadingButton
            loading={loading}
            variant="contained"
            color="error"
            onClick={onOk}
          >
            Delete
          </LoadingButton>
        </DialogActions>
      }
    />
  );
};
