import {createContext} from 'react';

  const UserContext = createContext({
    userDataContext: {
      id:0,
      user:"",
      rol:""
    },
    setUserDataContext: () => {},
  });

  export default UserContext;