import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
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
  } = useContext(AppContext);


  const [show, setShow] = useState(false)

  const onStartChange = (e, selectedDate) => {
    setStartDate(selectedDate);
    setShow(false)
  };



  const handleButtonPress = async () => {
    if (isRequestSuccessful) {
      setIsRequestSuccessful(false);
      setStartDate(new Date())
    } else {

      const response = await handlePostRequest(URL, smsList);
      setSmsList(response);
      setIsRequestSuccessful(true);
    }
  };


  const showMode = () => {
    setShow(true)
  }

  return (
    <View style={styles.inputContainer}>
      <Text style={{ fontSize: 18, color: 'white', padding:5 }}>Choose date range for SMS summary</Text>
      <Text style={{ fontSize: 18, color: 'white', padding:5}}>
        {`${startDate.toLocaleDateString('en-GB')}  <===>  ${new Date().toLocaleDateString('en-GB')}`}
      </Text>

      <View style={{ display: 'flex', gap: 10, flexDirection: 'row', padding: 10 }}>
        <Button title="Select Start Date" onPress={() => showMode()} />
        {show && (
          <DateTimePicker
            value={startDate}
            mode='date'
            is24Hour={true}
            onChange={onStartChange}
          />
        )}

        <Button title={isRequestSuccessful ? 'Reset' : 'Summarize'} onPress={handleButtonPress} />
      </View>
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
    height: '20%'
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
