import { FC } from 'react';

import { Route, RouteProps, Redirect } from 'react-router-dom';

import useAppSelector from 'hooks/useAppSelector';

interface PrivateRouteProps extends Omit<RouteProps<string, Record<string, string | undefined>>, 'render'> {}

const PrivateRoute: FC<PrivateRouteProps> = ({ component, ...props }) => {
  const authorized = useAppSelector(state => state.auth.authorized);

  return <Route {...props} component={authorized ? component : () => <Redirect to="/login" />} />;
};

export default PrivateRoute;
