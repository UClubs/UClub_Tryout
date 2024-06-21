import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import  firestore  from "@react-native-firebase/firestore";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from 'expo-router';

const Details = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const params = useLocalSearchParams();
  const router = useRouter();

  const saveDeatiles = async ()=>{
    try {
      await firestore().collection('users').doc(params.uid).set({
        name,
        dob,
        gender,
      })
      router.push({ pathname:'/Dashboard'});
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter your Details</Text>
      <TextInput style={styles.inputBlock} placeholder='Name' value={name} onChangeText={setName}/>
      <TextInput style={styles.inputBlock} placeholder='Date on birth' value={dob} onChangeText={setDob}/>
      <TextInput style={styles.inputBlock} placeholder='Gender' value={gender} onChangeText={setGender}/>
      <TouchableOpacity onPress={saveDeatiles} style={styles.btn}>
          <Text style={{color:'white',fontSize:22,fontWeight:"bold"}}>Confirm</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Details

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
})