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
  useColorScheme,
} from 'react-native';
import img from './android/app/src/main/res/drawable/launch_screen.png';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const imageWidth = width * 0.6;
const buttonWidth = width * 0.4; 

const Scan = () => {
  const navigation = useNavigation();
  const [scaleValue] = useState(new Animated.Value(1));
  const colorScheme = useColorScheme(); 
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
    <View style={[styles.container, colorScheme === 'dark' && styles.darkContainer]}>
      <Image source={img} style={[styles.image, { width: imageWidth, height: imageWidth }]} />
      <Text style={[styles.title, colorScheme === 'dark' && styles.darkTitle]}>SMS</Text>
      <TouchableOpacity
        style={[
          styles.button,
          { transform: [{ scale: scaleValue }], width: buttonWidth },
          colorScheme === 'dark' && styles.darkButton,
        ]}
        onPress={handleScanNow}
      >
        <Text style={[styles.buttonText, colorScheme === 'dark' && styles.darkButtonText]}>Scan Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  darkContainer: {
    backgroundColor: 'black',
  },
  title: {
    fontWeight: 'bold',
    fontSize: width * 0.06,
    marginBottom: height * 0.04,
    color: '#080202',
  },
  darkTitle: {
    color: 'white',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    borderRadius: height * 0.05,
    alignItems: 'center',
  },
  darkButton: {
    backgroundColor: '#1E90FF',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  darkButtonText: {
    color: 'black',
    
  },
  image: {
    marginBottom: height * 0.04,
  },
});

export default Scan;
