import * as React from "react";
import { Route } from "react-router-dom";
import { Loading } from "../components/Loading";

export function LazyRoute({ getComponent, ...props }) {
  const LazyComponent = React.useMemo(() => React.lazy(getComponent), [
    getComponent
  ]);
  return (
    <Route {...props}>
      <React.Suspense fallback={<Loading />}>
        <LazyComponent />
      </React.Suspense>
    </Route>
  );
}