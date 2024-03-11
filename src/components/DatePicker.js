import React, { useMemo, useState, useEffect } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import requestSmsPermissions from '../utils/permission';
import SmsAndroid from 'react-native-get-sms-android';
import { useContext } from 'react';
import AppContext from './../context';
import handlePostRequest from './../api/postRequest';

const DatePicker = () => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isRequestSuccessful,
    setIsRequestSuccessful,
    smsList,
    setSmsList,
    URL,
    convertFromUnixTimestamp,
    convertToUnixTimestamp
  } = useContext(AppContext);


  const [show, setShow] = useState(false)
  const [mode, setMode] = useState('')

  const onStartChange = (e, selectedDate) => {
    setShow(false)
    setStartDate(selectedDate);
    
  };

  const onEndChange = (e, selectedDate) => {
    setShow(false)
    setEndDate(selectedDate);
    
  };



  const handleButtonPress = async () => {
    if (isRequestSuccessful) {
      setIsRequestSuccessful(false);
      setStartDate(new Date())
      setEndDate(new Date())
    } else {

      const response = await handlePostRequest(URL, smsList);
      setSmsList(response);
      setIsRequestSuccessful(true);
    }
  };


  const showMode = (mode) => {
    setMode(mode)
    setShow(true)
  }


  const runOnlyOnce = async () => {
    await requestSmsPermissions();
    await fetchSmsMessages();
  };

  

  const fetchSmsMessages = async () => {
    const filter = {
      box: 'inbox',
      minDate: convertToUnixTimestamp(startDate),
      maxDate: convertToUnixTimestamp(endDate),
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
    setShow(false)
    runOnlyOnce();
  }, [startDate, endDate]);


  return (
    <View style={styles.inputContainer}>
      <Text style={{ fontSize: 18, color: 'white', padding: 5 }}>Choose date range for SMS summary</Text>
      <Text style={{ fontSize: 18, color: 'white', padding: 5 }}>
        {`${startDate.toLocaleDateString('en-GB')}  <===>  ${endDate.toLocaleDateString('en-GB')}`}
      </Text>

      <View style={{ display: 'flex', gap: 10, flexDirection: 'row', padding: 10 }}>
        <Button title="Select Start Date" onPress={() => showMode('start')} />
        <Button title="Select End Date" onPress={() => showMode('end')} />
        {show && (
          <DateTimePicker
            value={mode=='start'?startDate:endDate}
            mode='date'
            minimumDate={mode=='end'?startDate:new Date(1950, 1, 1)}
            maximumDate={ mode=='start'?endDate:new Date()}
            is24Hour={true}
            onChange={mode=='start'?onStartChange:onEndChange}
          />
        )}

        
      </View>
      <Button title={isRequestSuccessful ? 'Reset' : 'Summarize'} onPress={handleButtonPress} />
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
    height: '25%'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '100%',
    color: 'white',
  },
  text: {
    height: 40,
    fontSize: 17,
    color: 'white',
  },
  flatList: {
    maxHeight: '65%',
    width: '100%',
  },
  heroText: {
    marginTop: 7,
    marginBottom: 7,
    fontSize: 20,
    color: 'white',
  },
});

export default DatePicker;
