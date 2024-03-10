import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './src/components/Header.js';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import SmsAndroid from 'react-native-get-sms-android';
import DatePicker from './src/components/DatePicker.js';
import ListContainer from './src/components/ListContainer.js';

import { useContext } from "react";
import AppContext from './src/context.js'




const App = () => {
  const { startDate, setStartDate, endDate, setEndDate, isRequestSuccessful, setIsRequestSuccessful, smsList, setSmsList, convertToUnixTimestamp } = useContext(AppContext);


  const runOnlyOnce = async () => {
    await requestSmsPermissions();
    await fetchSmsMessages();
  };

  const requestSmsPermissions = async () => {
    try {
      const readPermission = await request(PERMISSIONS.ANDROID.READ_SMS);
      const writePermission = await request(PERMISSIONS.ANDROID.WRITE_SMS);
      const sendPermission = await request(PERMISSIONS.ANDROID.SEND_SMS);

      if (
        readPermission === RESULTS.GRANTED &&
        writePermission === RESULTS.GRANTED &&
        sendPermission === RESULTS.GRANTED
      ) {
        // Permissions granted, proceed with your code logic
        console.log('SMS permissions granted');
      } else {
        // Permissions not granted, handle accordingly
        console.log('SMS permissions not granted');
      }
    } catch (error) {
      console.error('Error requesting SMS permissions:', error);
    }
  };

  const fetchSmsMessages = async () => {
    const filter = {
      box: 'inbox',
      minDate:convertToUnixTimestamp(startDate),
      maxDate:convertToUnixTimestamp(new Date()),
    };
    console.log(filter)

    SmsAndroid.list(
      JSON.stringify(filter),
      (fail) => {
        console.log('fail', fail);
      },
      (count, smsList) => {
        const parsedSmsList = JSON.parse(smsList);
        // console.log('count', count);
        // console.log('smsList', parsedSmsList);
        setSmsList(parsedSmsList);
        setIsRequestSuccessful(false)
      }
    );
  };

  useEffect(() => {
    runOnlyOnce();
  }, [startDate]);

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
