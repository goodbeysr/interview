import { UserList } from "components/UserList";
import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUsers } from "store/user.slice";
import { useHistory } from "react-router-dom";
import { DeleteDialog } from "components/DeleteDialog";
import { deleteUserThunk } from "store/user.thunk";

export const UserListPage = () => {
  const users = useSelector(selectUsers);
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toDeleteUserId, setToDeleteUserId] = useState(null);

  const onDelete = useCallback((id) => {
    setToDeleteUserId(id);
    setOpen(true);
  }, []);

  const onEdit = useCallback((id) => {
    history.push(`user/${id}`);
  }, []);

  const onAdd = () => {
    history.push(`user`);
  };

  const onCancel = () => {
    setToDeleteUserId(null);
    setOpen(false);
  };

  const onOk = async () => {
    setLoading(true);
    //better typing
    const action: any = deleteUserThunk;
    const event = action(toDeleteUserId);
    await dispatch(event);
    setToDeleteUserId(null);
    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      <UserList
        users={users}
        onDelete={onDelete}
        onEdit={onEdit}
        onAdd={onAdd}
      />
      <DeleteDialog
        open={open}
        message={`Are you sure to delete user ${toDeleteUserId}`}
        onClose={onCancel}
        onCancel={onCancel}
        onOk={onOk}
        loading={loading}
      />
    </>
  );
};
