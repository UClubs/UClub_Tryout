import {
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import CustomButton from "../../components/CustomButton";
import { images } from "../../constants";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import React, { useState } from "react";
import { useRouter, Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const [phNumber, setPhNumber] = useState("");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const signInwithPhNumber = async () => {
    setLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber("+91" + phNumber);
      setLoading(false);
      setConfirm(confirmation);
      
    } catch (error) {
      console.log(error);
    }
  };

  const confirmcode = async () => {
    setLoading(true);
    try {
      const userCredential = await confirm.confirm(code);
      const user = userCredential.user;
      console.log(user);
      const userDoc = await firestore().collection("users").doc(user.uid).get();

      if (userDoc.exists) {
        setLoading(false);
        router.replace('/home');
      } else {
        setLoading(false);
        const userUid = user.uid;
        router.push({ pathname: "/Details", params: { uid: userUid } });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View>
      {loading ? (
        <>
          <SafeAreaView className="h-full bg-primary">
            <View className='w-full justify-center items-center min-h-[90vh] px-4'>
              <Text className="text-2xl text-white font-semibold mt-10">Loading...</Text>
            </View>
          </SafeAreaView>
        </>
      ) : (
        <>
          {!confirm ? (
            <>
             
              <SafeAreaView className="h-full bg-primary">
                <ScrollView>
                  <View className="w-full justify-center items-center min-h-[90vh] px-4">
                    <Image
                      source={images.logo}
                      className="w-[115px] h-[35px]"
                      resizeMode="contain"
                    />
                    <Text className="text-2xl text-white font-semibold mt-10">
                      Log-In to UClub
                    </Text>
                    <View className="space-y-2 mt-7">
                      <Text className="text-base text-gray-100 font-pmedium">
                        Phone Number
                      </Text>
                      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
                        <TextInput
                          keyboardType="numeric"
                          value={phNumber}
                          onChangeText={setPhNumber}
                          className="flex-1 text-white font-psemibold text-base"
                          placeholderTextColor="white"
                        />
                      </View>
                    </View>
                    <CustomButton
                      title="Loge-In"
                      handelPress={signInwithPhNumber}
                      containerStyle="mt-10 w-full"
                    />
                  </View>
                </ScrollView>
              </SafeAreaView>
            </>
          ) : (
            <>
            
              <SafeAreaView className="h-full bg-primary">
                <ScrollView>
                  <View className="w-full justify-center items-center min-h-[90vh] px-4">
                    <Image
                      source={images.logo}
                      className="w-[115px] h-[35px]"
                      resizeMode="contain"
                    />
                    <Text className="text-2xl text-white font-semibold mt-10">
                      Code send by SMS
                    </Text>
                    <View className="space-y-2 mt-7">
                      <Text className="text-base text-gray-100 font-pmedium">
                        Enter your verification code
                      </Text>
                      <View className="w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
                        <TextInput
                          keyboardType="numeric"
                          value={code}
                          onChangeText={(text) => setCode(text)}
                          className="flex-1 text-white font-psemibold text-base"
                          placeholderTextColor="white"
                        />
                      </View>
                    </View>
                    <CustomButton
                      title="Confirm Code"
                      handelPress={confirmcode}
                      containerStyle="mt-10 w-full"
                    />
                  </View>
                </ScrollView>
              </SafeAreaView>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default Login;
