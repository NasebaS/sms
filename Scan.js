import React, { Component, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
// import SplashScreen from 'react-native-splash-screen';
import img from './android/app/src/main/res/drawable/launch_screen.png';
import QRCodeScreen from './QRCodeScreen';
import { useNavigation } from '@react-navigation/native';
import ScanNow from './ScanNow'



const Scan =()=> {
  const navigation = useNavigation();

//   useEffect(()=>{
//     SplashScreen.hide()
//   },[]);
//   const handleScan = () => {
//     // navigation.navigate('QRCodeScreen');
//     Alert.alert("hi")
//   };
  
  
  return (
    <View style={styles.container}>
      <Image source={img} style={styles.image} />
      <Text style={styles.title}>SMS</Text>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('QRCodeScreen')}>
        <Text style={styles.buttonText}>Scan Now</Text>
      </TouchableOpacity>
    </View>

  )
 
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default Scan;
