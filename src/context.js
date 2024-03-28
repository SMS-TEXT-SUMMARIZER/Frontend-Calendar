import React, { useState } from 'react';
import { convertFromUnixTimestamp, convertToUnixTimestamp } from './convertTimestamp';

const AppContext = React.createContext(AppProvider);

export const AppProvider = ({ children }) => {
  const URL = 'https://nishantth1-summrize.hf.space/send-data';
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [smsList, setSmsList] = useState([]);
  const [isRequestSuccessful, setIsRequestSuccessful] = useState(false)

  const [isLoading, setIsLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
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
