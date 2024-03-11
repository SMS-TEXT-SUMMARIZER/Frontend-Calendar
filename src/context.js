import React, { useState } from 'react';
import { convertFromUnixTimestamp, convertToUnixTimestamp } from './convertTimestamp';

const AppContext = React.createContext(AppProvider);

export const AppProvider = ({ children }) => {
  const URL = 'https://backend-enev.onrender.com/send-data';
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [smsList, setSmsList] = useState([]);
  const [isRequestSuccessful, setIsRequestSuccessful] = useState(false)

  return (
    <AppContext.Provider
      value={{
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        smsList,
        setSmsList,
        isRequestSuccessful,
        setIsRequestSuccessful,
        URL,
        convertToUnixTimestamp,
        convertFromUnixTimestamp
      }}
    >
      {children}
    </AppContext.Provider>
  );
};



export default AppContext;
