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
import ScanNow from './ScanNow'



const Scan =()=> {
  const navigation = useNavigation();
  const [scaleValue] = useState(new Animated.Value(1));
  const [bounceValue] = useState(new Animated.Value(10));
  const [isBouncing, setIsBouncing] = useState(true);
  // const [fadeValue] = useState(new Animated.Value(0));
//   useEffect(()=>{
//     SplashScreen.hide()
//   },[]);
//   const handleScan = () => {
//     // navigation.navigate('QRCodeScreen');
//     Alert.alert("hi")
//   };
  
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
// const startFadeAnimation = () => {
//   Animated.loop(
//     Animated.sequence([
//       Animated.timing(fadeValue, {
//         toValue: 1,
//         duration: 5000,
//         useNativeDriver: true,
//         easing: Easing.inOut(Easing.ease),
//       }),
//       Animated.timing(fadeValue, {
//         toValue: 0,
//         duration: 5000,
//         useNativeDriver: true,
//         easing: Easing.inOut(Easing.ease),
//       }),
//     ]),
//   ).start();
// };
const startBounceAnimation = () => {
  Animated.timing(bounceValue, {
    toValue: 1,
    duration: 3000,
    useNativeDriver: true,
    easing: Easing.inOut(Easing.ease),
  }).start(() => {
    if (isBouncing) {
      setIsBouncing(false);
      Animated.timing(bounceValue, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }).start();
    }
  });
};
useEffect(() => {
  startPulseAnimation();
  startBounceAnimation();
  // startFadeAnimation();
}, []);
// const imageStyle = {
//   transform: [{ translateY: bounceValue }],
// };

const imageStyle = {
  transform: [
    {
      translateY: bounceValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -20],
      }),
    },
  ],
};

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, imageStyle]}>
      <Image source={img} style={styles.image} />
      </Animated.View>
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
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default Scan;
