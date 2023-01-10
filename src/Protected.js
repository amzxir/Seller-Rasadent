import { useContext } from 'react';
import { Navigate , Outlet } from 'react-router-dom';
import Context from './context/context';

function Protected() {

  const {token} = useContext(Context)

  if(!token){
      return <Navigate to='/login' replace/>
  }

  return <Outlet/>;
}

export default Protected