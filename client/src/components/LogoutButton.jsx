import React from 'react'
import { useUserContext } from '../context/UserContext';

const LogoutButton = () => {

    const { setUser, setIsAuthenticated } = useUserContext();

    const Logout = () =>{
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      setUser(null)
      setIsAuthenticated(null)
    }

  return (
    <button className='inline-flex text-white' onClick={() => Logout()}>Logout</button>
  )
}

export default LogoutButton