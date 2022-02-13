import { User } from "models/User";

//Better put AddPayload, EditPayload as the id is required sometimes
export interface DomainEndpoint<T> {
  load: () => Promise<T[]>;
  add: (user: Partial<T>) => Promise<T>;
  edit: (id: number, user: Partial<T>) => Promise<T>;
  delete: (id: number) => Promise<unknown>;
}

export type LoadEndpoint<T> = DomainEndpoint<T>["load"];
export type AddEndpoint<T> = DomainEndpoint<T>["add"];
export type EditEndpoint<T> = DomainEndpoint<T>["edit"];
export type DeleteEndpoint<T> = DomainEndpoint<T>["delete"];
