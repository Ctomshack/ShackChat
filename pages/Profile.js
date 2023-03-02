import { useUserContext } from '@/context/userContext';
import React, { useEffect, useState } from 'react'

const Profile = () => {
    const { user, logoutUser } = useUserContext();
    // const [currentUser, setCurrentUser] = useState('');
//   console.log(user);

  return (
    <div>
        <h1>Dashboard </h1>
      
      {/* <h2>Name : {currentUser.displayName}</h2>
      <h2>Email : {currentUser.email}</h2> */}
      <button onClick={logoutUser}>Log out</button>
    </div>
  )
}

export default Profile