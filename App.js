import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './src/components/Header.js';
import DatePicker from './src/components/DatePicker.js';
import ListContainer from './src/components/ListContainer.js';

import { useContext } from "react";
import AppContext from './src/context.js'




const App = () => {
  const { startDate, setStartDate, endDate, setEndDate, isRequestSuccessful, setIsRequestSuccessful, smsList, setSmsList, convertToUnixTimestamp } = useContext(AppContext);


  
  return (
    <View style={{backgroundColor:'#222831'}}>
      <Header />
      
      <DatePicker />
      <ListContainer />
      
    </View>
  );
};

const styles = StyleSheet.create({
  hr: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    height:'90%'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '100%',
    color:'white'
  },
  text: {
    height: 40,
    fontSize: 17,
    color:'white'
  },
  flatList: {
    maxHeight: '65%',
    width: '100%',
    
  },
  heroText: {
    marginTop: 7,
    marginBottom: 7,
    fontSize: 20,
    color:'white'
  }
});


export default App
