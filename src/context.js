import React, { useState } from 'react';

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

const convertToUnixTimestamp = (date) => {
  if (!(date instanceof Date) || isNaN(date)) {
    console.error("Invalid Date");
    return null;
  }

  // Get the Unix timestamp (milliseconds since January 1, 1970)
  const unixTimestamp = date.getTime();

  return unixTimestamp;
}


const convertFromUnixTimestamp = (unixTimestampInSeconds) => {
  // Multiply by 1000 to convert seconds to milliseconds
  const milliseconds = unixTimestampInSeconds * 1000;
  
  // Create a new Date object using the milliseconds
  const date = new Date(milliseconds);

  return date;
}

export default AppContext;
