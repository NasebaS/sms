import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Image, TouchableOpacity, TextInput, Button, Text, StyleSheet, Animated, Modal, TouchableWithoutFeedback } from 'react-native';
import Scan from './Scan';
import QRCodeScreen from './QRCodeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();

const App = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [ipAddress, setIpAddress] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const handleImageClick = () => {
    setShowMenu(!showMenu);
  };

  const handleSaveIpAddress = async () => {
    // Save IP address to local storage
    try {
      await AsyncStorage.setItem('ipAddress', ipAddress);
      setIsFirstTime(false);
      setShowMenu(false);
    } catch (error) {
      console.error('Error saving IP address:', error);
    }
  };

  const retrieveIpAddress = async () => {
    // Retrieve IP address from local storage
    try {
      const savedIpAddress = await AsyncStorage.getItem('ipAddress');
      if (savedIpAddress !== null) {
        setIpAddress(savedIpAddress);
        setIsFirstTime(false);
        console.log('Ip Address saved', savedIpAddress);
      } else {
        setIsFirstTime(true);
        setShowMenu(true);
      }
    } catch (error) {
      console.error('Error retrieving IP address:', error);
    }
  };

  useEffect(() => {
    retrieveIpAddress();
  }, []);

  useEffect(() => {
    if (showMenu) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [fadeAnim, showMenu]);

  const MaskedTextInput = ({ value, onChangeText }) => {
    const [maskedValue, setMaskedValue] = useState('');

    const handleTextChange = (text) => {
      setMaskedValue(maskText(text));
      onChangeText(text);
    };
  const maskText = (text) => {
    const maskLength = text.length;
    return '*'.repeat(maskLength) + text.slice(maskLength);
  };

  useEffect(() => {
    setMaskedValue(maskText(value))
  }, [value]);

  return <Text style={styles.maskedText}>{maskedValue}</Text>;
};

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Scan"
        screenOptions={{
          headerMode: 'screen',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#DE006F' },
        }}
      >
        <Stack.Screen
          name="Scan"
          component={Scan}
          options={{
            headerRight: () => (
              <TouchableOpacity onPress={handleImageClick} style={styles.dotContainer}>
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="QRCodeScreen">
          {(props) => <QRCodeScreen {...props} ipAddress={ipAddress} />}
        </Stack.Screen>
      </Stack.Navigator>

      {isFirstTime && (
        <Modal visible={showMenu} animationType="fade" transparent={true}>
          <TouchableWithoutFeedback onPress={() => setShowMenu(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.inputContainer}>
                  <MaskedTextInput
                    placeholder="Enter IP Address"
                    value={ipAddress}
                    onChangeText={setIpAddress}
                    style={styles.input}
                    placeholderTextColor="#9F9F9F"
                  />
                </View>
                <Text style={styles.example}>Example: 192.168.29.38/sms</Text>
                <TouchableOpacity onPress={handleSaveIpAddress} style={styles.saveButton}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}

      <Animated.View style={[styles.menuContainer, { opacity: fadeAnim }]}>
        <View style={styles.inputContainer}>
          <MaskedTextInput
            placeholder="Enter IP Address"
            value={ipAddress}
            onChangeText={setIpAddress}
            style={styles.input}
            placeholderTextColor="#9F9F9F"
          />
        </View>
        <Text style={styles.example}>Example: 192.168.29.38/sms</Text>
        <TouchableOpacity onPress={handleSaveIpAddress} style={styles.saveButton}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </Animated.View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  imageIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  menuContainer: {
    position: 'absolute',
    top: 60,
    right: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    elevation: 10,
    width: 300,
    opacity: 0,
    
  },
  inputContainer: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#9F9F9F',
    borderRadius: 4,
    
  },
  input: {
    padding: 5,
    color: '#000000',
    fontSize: 18,
    fontFamily: 'Arial',
    marginBottom: -2,
      
  },
  maskedText: {
    fontSize: 18, 
  },
  saveButton: {
    backgroundColor: '#DE006F',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dotContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 3,
    backgroundColor: 'white',
    marginVertical: 2,
    right: -1,
  },
  example: {
    color: 'blue',
    fontSize: 10,
    marginBottom: -2,
    bottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    elevation: 10,
    width: 220,
  },
});

export default App;
