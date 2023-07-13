import React, { Component, useState,useEffect
 } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,Animated,Easing,
} from 'react-native';
// import SplashScreen from 'react-native-splash-screen';
import img from './android/app/src/main/res/drawable/launch_screen.png';
import QRCodeScreen from './QRCodeScreen';
import { useNavigation } from '@react-navigation/native';


const Scan =()=> {
  const navigation = useNavigation();
  const [scaleValue] = useState(new Animated.Value(1));
   
const handleScanNow = () => {
  navigation.navigate('QRCodeScreen');
};
const startPulseAnimation = () => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]),
  ).start();
};


useEffect(() => {
  startPulseAnimation();
}, []);


  return (
    <View style={styles.container}>
    
      <Image source={img} style={styles.image} />
      
      <Text style={styles.title}>SMS</Text>
      <TouchableOpacity
        style={[styles.button, { transform: [{ scale: scaleValue }] }]}
        onPress={handleScanNow}
      >
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
    fontSize: 14,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default Scan;
