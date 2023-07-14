import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Image, TouchableOpacity, TextInput, Button, Text, StyleSheet, Animated } from 'react-native';
import Scan from './Scan';
import QRCodeScreen from './QRCodeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();

const App = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [ipAddress, setIpAddress] = useState('');
  const fadeAnim = useState(new Animated.Value(0))[0];

  const handleImageClick = () => {
    setShowMenu(!showMenu);
    
  };
 

  const handleSaveIpAddress = async  () => {
    // Save IP address to local storage
    try {
      await AsyncStorage.setItem('ipAddress', ipAddress);
      await retrieveIpAddress();
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
        console.log('Ip Address saved',savedIpAddress)
      }
    } catch (error) {
      console.error('Error retrieving IP address:', error);
    }
    };  
   

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
          {(props) => (
            <QRCodeScreen {...props} ipAddress={ipAddress} />
          )}
        </Stack.Screen>
      </Stack.Navigator>

     
      <Animated.View style={[styles.menuContainer, { opacity: fadeAnim }]}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter IP Address"
            value={ipAddress}
            onChangeText={setIpAddress}
            style={styles.input}
            placeholderTextColor="#9F9F9F"
          />
        </View>
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
    right: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    elevation: 5,
    width: 200,
    opacity: 0,
  },
  inputContainer: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#9F9F9F',
    borderRadius: 4,
  },
  input: {
    padding: 8,
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Arial',
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
    width:35,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 3,
    backgroundColor: 'white',
    marginVertical: 2,
    right:-1,
  },
});

export default App;
