import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

const Login = () => {
    const [phNumber,setPhNumber] = useState("");
    const [code,setCode] = useState("");
    const [confirm, setConfirm] = useState(null);
    const router = useRouter();
  
    const signInwithPhNumber = async () =>{
      try {
        const confirmation = await auth().signInWithPhoneNumber("+91"+phNumber);
        setConfirm(confirmation);
      } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
      }
    }
  
    const confirmcode = async () =>{
      try {
        const userCredential = await confirm.confirm(code);
        const user = userCredential.user;
        console.log(user);
        const userDoc = await firestore().collection('users').doc(user.uid).get()
  
        if(userDoc.exists){
          router.push({ pathname:'/Dashboard'});
        }else{
          const userUid = user.uid;
          //navigation.navigate('Details',{uid:user.uid});
          router.push({ pathname:'/Details',  params:{uid:userUid}});
        }
      } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        
      }
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Auth with phone number</Text>
        {!confirm ?(
          <>
           <Text style={{marginBottom:20, fontSize:18}}>Enter your number</Text>
           <TextInput keyboardType="numeric" style={styles.inputBlock} placeholder='number' value={phNumber} onChangeText={setPhNumber}/>
           <TouchableOpacity onPress={signInwithPhNumber} style={styles.btn}>
              <Text style={{color:'white',fontSize:22,fontWeight:"bold"}}>Send Code </Text>
           </TouchableOpacity>
          </>
        ): (
          <>
          <Text style={{fontSize:22,marginBottom:20}}>
              Enter the code:
          </Text>
          <TextInput keyboardType="numeric" style={styles.inputBlock} placeholder='Enter code' value={code} onChangeText={text=>setCode(text)}/>
          <TouchableOpacity onPress={confirmcode} style={styles.btn}>
            <Text style={{color:'white',fontSize:22,fontWeight:"bold"}}>Confirm Code</Text>
          </TouchableOpacity>
          </>
        )}
      </View>
    );
}

export default Login

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#BEBDB8',
      alignItems: 'center',
      justifyContent: 'center',
      padding:10,
    },
    text:{
      fontSize:32,
      fontWeight:'bold',
      marginBottom:40,
      marginTop:150,
    }, 
    inputBlock: {
      height:50,
      width:'100%',
      borderColor:"black",
      borderWidth:1,
      marginBottom:30,
      paddingHorizontal:10,
    },
    btn:{
      backgroundColor:'#841584',
      padding:10,
      borderRadius:5,
      marginBottom:20,
      alignItems:'center'
    }
  });