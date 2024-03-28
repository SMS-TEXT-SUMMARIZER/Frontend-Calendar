import React, { useContext } from "react";
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from "react-native";
import AppContext from "../context";
import ResponseItem from "./ResponseItem";
import SMSItem from "./SMSItem";

const ListContainer = () => {
  const { isLoading, smsList, isRequestSuccessful } = useContext(AppContext);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
        <ActivityIndicator size="x-large" />
        </View>
      ) : isRequestSuccessful ? (
        <>
          <Text style={styles.heroText}>Summarized Messages</Text>
          <View style={styles.hr} />
          <FlatList
            data={smsList}
            keyExtractor={(item) => item._id}
            renderItem={ResponseItem}
            style={styles.flatList}
          />
        </>
      ) : (
        <>
          <Text style={styles.heroText}>Messages to Summarize</Text>
          <View style={styles.hr} />
          <FlatList
            data={smsList}
            keyExtractor={(item) => item._id}
            renderItem={SMSItem}
            style={styles.flatList}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "65%",
    display: "flex",
    alignItems: "center"
  },
  loaderContainer: {
    position: 'absolute',
    top: '40%',
  },  
  hr: {
    borderBottomColor: "white",
    borderBottomWidth: 10,
    marginVertical: 10
  },
  flatList: {
    maxHeight: "100%",
    width: "100%"
  },
  heroText: {
    marginTop: 7,
    marginBottom: 7,
    fontSize: 20,
    color: "white"
  }
});

export default ListContainer;
