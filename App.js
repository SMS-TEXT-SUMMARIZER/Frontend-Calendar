import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './src/components/Header.js';
import DatePicker from './src/components/DatePicker.js';
import ListContainer from './src/components/ListContainer.js';




const App = () => {
  
  
  return (
    <View style={{backgroundColor:'#222831'}}>
      <Header />
      
      <DatePicker />
      <ListContainer />
      
    </View>
  );
};



export default App
