import { GET, POST, PATCH, DELETE } from "./utils";
import {
  AddEndpoint,
  DeleteEndpoint,
  DomainEndpoint,
  EditEndpoint,
  LoadEndpoint
} from "./domain-endpoint.interface";
import { User } from "models/User";

const USERS_ENDPOINT = "/";

const mapUserResponse = ({
  id,
  name,
  username,
  email,
  address: { city }
}: any) => ({
  id,
  name,
  username,
  email,
  address: { city }
});

const load: LoadEndpoint<User> = () =>
  GET(`${USERS_ENDPOINT}`).then(({ data }: any) => data.map(mapUserResponse));

const add: AddEndpoint<User> = (user: Partial<User>) =>
  POST(`${USERS_ENDPOINT}`, user).then(({ data }: any) =>
    mapUserResponse(data)
  );

const edit: EditEndpoint<User> = (id: number, user: Partial<User>) =>
  PATCH(`${USERS_ENDPOINT}${id}`, user).then(({ data }: any) =>
    mapUserResponse(data)
  );

const deleteEndpoint: DeleteEndpoint<User> = (id: number) =>
  DELETE(`${USERS_ENDPOINT}${id}`);

export const UserAPI: DomainEndpoint<User> = {
  load,
  add,
  edit,
  delete: deleteEndpoint
};

//.then((d) => console.log(d));
