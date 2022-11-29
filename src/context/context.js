import {createContext} from 'react';

  const UserContext = createContext({
    userDataContext: {
      id:0,
      user:"",
      rol:"",
      token:"",
      state:""
    },
    setUserDataContext: () => {},
  });

  export default UserContext;