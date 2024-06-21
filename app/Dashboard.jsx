import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { Link } from "expo-router";
import React from "react";

const Dashboard = () => {
  const navigation = useNavigation();
  const handelLogout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Detailes</Text>
      <Link replace href="/" asChild onPress={handelLogout}>
        <Pressable style={styles.btn}>
          <Text>LogOut</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:10,
    backgroundColor:'#BEBDB8'
  },
  text:{
    fontSize:32,
    fontWeight:'bold',
    marginBottom:40,
    marginTop:150,
  },
  btn:{
    backgroundColor:'#841584',
    padding:10,
    borderRadius:5,
    marginBottom:20,
    alignItems:'center'
  },
});
