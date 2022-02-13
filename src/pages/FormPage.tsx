import { UserForm } from "components/UserForm";
import { User } from "models/User";
import { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { selectUser } from "store/user.slice";
import { addUserThunk, editUserThunk } from "store/user.thunk";

interface Props {}

interface RouteParams {
  id?: string;
}

export const FormPage: FC<Props> = () => {
  const { id } = useParams<RouteParams>();
  const history = useHistory();
  const user = useSelector(selectUser(Number(id)));
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (user: User) => {
    setLoading(true);
    //better typing
    const action: any = id ? editUserThunk : addUserThunk;
    const event = action(id ? { id: Number(id), user } : user);
    const response = await dispatch(event);
    setLoading(false);
    if (action.fulfilled.match(response)) {
      history.push("/");
    }
  };

  const onCancel = () => {
    history.push("/");
  };

  return (
    <UserForm
      user={user}
      onSubmit={onSubmit}
      onCancel={onCancel}
      loading={loading}
    />
  );
};
