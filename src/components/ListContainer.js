import React, {useContext} from "react"
import AppContext from "../context"
import { View, FlatList, StyleSheet, Text } from "react-native"
import ResponseItem from "./ResponseItem"
import SMSItem from "./SMSItem"


const ListContainer = () =>{
    const {smsList, setSmsList, isRequestSuccessful, setIsRequestSuccessful} = useContext(AppContext)

    return(
        <View style={styles.listContainer}>
        {isRequestSuccessful == true ?
            (
              <>
                <Text style={styles.heroText}>Summarized Messages</Text>
                <View style={styles.hr} />
                <FlatList
                  data={smsList}
                  keyExtractor={(item) => item._id}
                  renderItem={ResponseItem}
                  style={styles.flatList}
                />
              </>)
            :
            (
              <>
                <Text style={styles.heroText}>Messages to Summarize</Text>
                <View style={styles.hr} />
                <FlatList
                  data={smsList}
                  keyExtractor={(item) => item._id}
                  renderItem={SMSItem}
                  style={styles.flatList}
                />
              </>)}
              
            </View>
    )
}

const styles = StyleSheet.create({
    listContainer:{
        height:'65%',
        display:'flex',
        alignItems:'center'
    },
    hr: {
      borderBottomColor: 'white',
      borderBottomWidth: 10,
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
      maxHeight: '100%',
      width: '100%',
      
    },
    heroText: {
      marginTop: 7,
      marginBottom: 7,
      fontSize: 20,
      color:'white'
    }
  });
  

export default ListContainer