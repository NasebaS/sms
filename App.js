
import React, { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import QRCodeScreen from './QRCodeScreen';
import Scan from './Scan'

import { Modal, View, TextInput, Button } from 'react-native';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';

const Stack = createNativeStackNavigator();


const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [ipAddress, setIpAddress] = useState('');
  // const handleSettingsPress = () => {
  //   setShowModal(true);
  // };
  // const handleSaveIpAddress = () => {
  //       setShowModal(false);
  // };
  // const CustomHeaderButton = (props) => {
  //   return (
      
  //   );
  // };
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Scan"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#DE006F' },
        
         
         
       
      
      }}>
        <Stack.Screen name="Scan" component={Scan} />
        <Stack.Screen name="QRCodeScreen" component={QRCodeScreen} />
      </Stack.Navigator>
      {/* <Modal visible={showModal} animationType="slide" transparent>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            <TextInput
              placeholder="Enter IP Address"
              value={ipAddress}
              onChangeText={setIpAddress}
              style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderColor: 'gray' }}
            />
            <Button title="Save" onPress={handleSaveIpAddress} />
          </View>
        </View>
      </Modal> */}
    </NavigationContainer>
  );
};

export default App;
