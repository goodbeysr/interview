import { FC, useEffect } from "react";
import { render } from "react-dom";
import { Provider, useDispatch } from "react-redux";
import store from "./store/config";
import "./styles.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { UserListPage } from "pages/UserListPage";
import { FormPage } from "pages/FormPage";
import { Header } from "components/Header";
import { loadUserThunk } from "store/user.thunk";

const rootElement = document.getElementById("root");

const StoreProvider: FC<{}> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

const Routing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserThunk());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/">
          <UserListPage />
        </Route>
        <Route path="/user">
          <Switch>
            <Route path="/user/:id">
              <FormPage />
            </Route>
            <Route path="/user">
              <FormPage />
            </Route>
          </Switch>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

render(
  <StoreProvider>
    <div className="app">
      <Routing />
    </div>
  </StoreProvider>,
  rootElement
);
