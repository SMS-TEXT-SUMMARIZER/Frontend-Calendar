import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

const Header = () => {
  const { textStyling, viewStyle, imageStyle } = styles;

  return (
    <View style={viewStyle}>
      <Image
        source={require('../assets/nav-logo.png')}
        style={imageStyle}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({

  viewStyle: {
    backgroundColor: '#090b17',
    height: '10%',
    width:'100%',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  imageStyle: {
    width: '100%',
    height: 55,

  },
});

export default Header;
