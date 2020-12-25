import * as React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
const NotFound =()=>{
    return(
        <>
        NOT FOUND
        </>
    )
}

export const SwitchWith404 = ({
  children,
  ...props
}) => {
  const match = useRouteMatch();
  const defaultMatch = React.useMemo(
    () => match && <Route path={match.path} exact={true} />,
    [match]
  );
  return (
    <Switch {...props}>
      {children}
      {/*
       * Default route that matches the parent route, to avoid showing a 404
       * for "junction" pages . See the "Dashboard" example.
       */}
      {defaultMatch}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};