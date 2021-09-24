import { FC, useState, useCallback } from 'react';

import { useHistory } from 'react-router-dom';
import delay from 'delay';

import { login } from 'store/slices/authSlice';

import useAppDispatch from 'hooks/useAppDispatch';

const LoginPage: FC = () => {
  const history = useHistory();

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = useCallback(async () => {
    setIsLoading(true);
    await delay(3000);
    dispatch(login());
    setIsLoading(false);
    history.push('/dashboard');
  }, [dispatch, history]);

  return (
    <div>
      <h1>Authorization</h1>
      <button disabled={isLoading} onClick={handleLogin}>
        {isLoading ? 'Authorizing...' : 'Sign In'}
      </button>
    </div>
  );
};

export default LoginPage;
