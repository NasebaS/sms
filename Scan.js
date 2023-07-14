import React, { useState, useEffect } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import img from './android/app/src/main/res/drawable/launch_screen.png';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const imageWidth = width * 0.6; // Adjust the image width as desired
const buttonWidth = width * 0.4; // Adjust the button width as desired

const Scan = () => {
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
      ])
    ).start();
  };

  useEffect(() => {
    startPulseAnimation();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={img} style={[styles.image, { width: imageWidth, height: imageWidth }]} />
      <Text style={styles.title}>SMS</Text>
      <TouchableOpacity
        style={[
          styles.button,
          { transform: [{ scale: scaleValue }], width: buttonWidth },
        ]}
        onPress={handleScanNow}
      >
        <Text style={styles.buttonText}>Scan Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: width * 0.06,
    marginBottom: height * 0.04,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    borderRadius: height * 0.05,
    alignItems:'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.04,
    
  },
  image: {
    marginBottom: height * 0.04,
  },
});

export default Scan;
