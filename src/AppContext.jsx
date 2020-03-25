import React, { useState } from 'react';

const AppContext = React.createContext([{}, () => {}]);

const AppContextProvider = (props) => {
  const [context, setContext] = useState({});
  return (
    <AppContext.Provider value={[context, setContext]}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
