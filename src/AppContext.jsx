import React, {useState} from 'react';
import * as securityApi from "./api/securityApi";

const AppContext = React.createContext([]);

const AppContextProvider = (props) => {
  const [context, setContext] = useState({
    currentUser: securityApi.getCurrentUser()
  });
  return (
    <AppContext.Provider value={[context, setContext]}>
      {props.children}
    </AppContext.Provider>
  );
};

export {AppContext, AppContextProvider};
