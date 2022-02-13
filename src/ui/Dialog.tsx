import { styled } from "@mui/material/styles";
import {
  Dialog as MATDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FC, ReactNode } from "react";

interface Props {
  onClose: () => void;
  title: string;
  message: ReactNode;
  actions?: ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
  open: boolean;
}

const CustomDialog = styled(MATDialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}));

export const Dialog: FC<Props> = ({
  open,
  title,
  message,
  actions,
  onClose,
  onCancel,
  onOk
}) => {
  return (
    <CustomDialog open={open} onClose={onClose}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {title}
        {onClose ? (
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>{message}</DialogContent>
      {actions ? (
        actions
      ) : (
        <DialogActions>
          <Button onClick={onCancel} variant="contained" color="secondary">
            Cancel
          </Button>
          <Button onClick={onOk} variant="contained" color="success">
            Confirm
          </Button>
        </DialogActions>
      )}
    </CustomDialog>
  );
};
