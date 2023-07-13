

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity,Animated,Modal , TouchableHighlight, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useNavigation } from '@react-navigation/native';

const QRCodeScreen = () => {
  const [scanning, setScanning] = useState(false);
  const [details, setDetails] = useState({});
  const navigation = useNavigation();
  const [buttonScale] = useState(new Animated.Value(1));
  const [showModal, setShowModal] = useState(false);

 
  useEffect(() => {
    startScanning();
  }, []);

  const startScanning = () => {
    setScanning(true);
  };

  const handleBarCodeRead =async (event) => {
    if (!scanning) {
      return;
    }
    setScanning(false);
    const scannedData = event.data;
    try {
      const response = await fetch(
        `http://192.168.29.38/sms/WebServices/WebService.asmx/getProductbyCode?Code=${scannedData}`
      );
      const data = await response.json();
      if (data && data.Details && data.Details.length > 0) {
        setDetails(data.Details[0]);
      } else {
        setDetails(null); 
      }
      // console.log(data.Details[0]);
      // console.log(details.ProductName)
      // console.log(details.SMSCode)
      // console.log(details.RetailPrice)
      // console.log(details.WholeSalePrice)
    
    } catch (error) {
      console.error('Error fetching details:', error);
      setDetails(null); 
    }

    setShowModal(true);
    
  };
  const goBack = () => {
    navigation.navigate('Scan');
  };
  const handleButtonPress = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      goBack();
    });
  };
  const closeModal = () => {
    setShowModal(false);
    setScanning(true); // Start scanning again after closing the modal
  };
  
  return (
    <View style={styles.container}>
      <QRCodeScanner
        reactivate={true}
        showMarker={true}
        onRead={handleBarCodeRead}
        cameraProps={{ captureAudio: false }}
        cameraContainerStyle={styles.cameraContainer}
        cameraStyle={styles.camera}
        vibrate={false}
        
      />
     <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Product Details:</Text>
            <View style={styles.modalDetails}>
              <Text style={styles.modalText}>
                Product Name: <Text style={styles.modalBoldText}>{details.ProductName}</Text>
              </Text>
              <Text style={styles.modalText}>
                SMS Code: <Text style={styles.modalBoldText}>{details.SMSCode}</Text>
              </Text>
              <Text style={styles.modalText}>
                Retail Price: <Text style={styles.modalBoldText}>{details.RetailPrice}</Text>
              </Text>
              <Text style={styles.modalText}>
                Wholesale Price: <Text style={styles.modalBoldText}>{details.WholeSalePrice}</Text>
              </Text>
            </View>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.bottomView}>
      <Animated.View style={[styles.backButton, { transform: [{ scale: buttonScale }] }]}>
          <TouchableOpacity
            onPress={handleButtonPress}
            activeOpacity={0.7}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#E3E3E3',
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
    left: 50,
    bottom:100
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  detailsContainer: {
    position: 'absolute',
    top: 330,
    left: 0,
    right: 0,
    paddingTop: 90,
    paddingHorizontal: 20,
        // backgroundColor: 'white',
  },
  card: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 15,
    padding: 40,
    marginBottom: 5,
    top: 15,
    backgroundColor: 'white',
    width: 325,
    elevation: 15, // Add elevation for Android shadow
    shadowColor: 'rgba(0, 0, 0, 0.5)', // Add shadow color for iOS shadow
    shadowOffset: { width: 0, height: 5 }, // Add shadow offset for iOS shadow
    shadowOpacity: 0.8, // Add shadow opacity for iOS shadow
    shadowRadius: 2, // Add shadow radius for iOS shadow
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'sans-serif',
    position:'absolute',
    top:70,
    left:15,
    color:'black'
  },
  cardText: {
    fontSize: 14,
    marginBottom: 2,
    padding:0,
    fontFamily: 'sans-serif',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: 'gray',
  },
  boldText: {
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color:'#DE006F',
    fontSize:13,
    padding:3,
  },
  bottomView: {
    // position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    // backgroundColor: '#E3E3E3',
    
  },
  backButton: {
    backgroundColor: '#B1B3B3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    transform: [{ translateY: -10 }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  backButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 10,
  },
  // dashedMarker: {
  //   borderWidth: 2,
  //   borderColor: 'white',
  //   borderStyle: 'dashed',
  //   borderRadius: 10,   
  //   borderDashPattern: [0, 50],
  // },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    margin: 20,
    width: '80%',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalDetails: {
    marginTop: 10,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 5,
  },
  modalBoldText: {
    fontWeight: 'bold',
    color: '#DE006F',
  },
  modalButton: {
    backgroundColor: '#B1B3B3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  modalButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default QRCodeScreen;
