import {  Text, View, Pressable } from "react-native";
import auth from "@react-native-firebase/auth";
import { router } from "expo-router";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";

const profile = () => {
  const handelLogout = async () => {
    try {
      await auth().signOut();
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView className="h-full bg-white">
    <View >
     <Text className="text-2xl text-primary font-semibold mt-10">Your Detailes</Text>
     <CustomButton
       title="Log-Out"
       handelPress={handelLogout}
       containerStyle="mt-10 w-full"
     />
   </View>
  </SafeAreaView>
  )
}

export default profile