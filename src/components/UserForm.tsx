import { FC } from "react";
import { User } from "../models";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Paper,
  Button,
  TextField,
  Stack,
  Divider,
  Typography
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

interface Props {
  loading?: boolean;
  user?: User;
  onSubmit: (user: User) => void;
  onCancel: () => void;
}

export const UserForm: FC<Props> = ({ user, onSubmit, onCancel, loading }) => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty }
  } = useForm<User>({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      address: {
        city: user?.address?.city || "casablanca"
      },
      username: user?.username || "defaultUserName"
    }
  });
  return (
    <Paper>
      <Box px={4} py={4}>
        <Typography variant="h5">Form</Typography>
      </Box>
      <Divider />
      <Box p={4} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2}>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field, formState: { errors } }) => (
              <TextField
                label="Name"
                {...field}
                error={!!errors?.name}
                helperText={!!errors?.name ? "Name field is Required" : ""}
                fullWidth
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field, formState: { errors } }) => (
              <TextField
                label="Email"
                {...field}
                error={!!errors?.email}
                helperText={!!errors?.email ? "Email field is Required" : ""}
                fullWidth
              />
            )}
          />
        </Stack>
        <Box mt={4}>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            <Button variant="outlined" color="success" onClick={onCancel}>
              Cancel
            </Button>
            <LoadingButton
              loading={loading}
              type="submit"
              variant="contained"
              color="success"
              disabled={!isValid || !isDirty}
            >
              Submit
            </LoadingButton>
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
};
