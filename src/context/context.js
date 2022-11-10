import {createContext} from 'react';

  const UserContext = createContext({
    userDataContext: {
      id:0,
      user:"",
      rol:"",
      token:""
    },
    setUserDataContext: () => {},
  });

  export default UserContext;