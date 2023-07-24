import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Modal, Dimensions, Alert,useColorScheme} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const QRCodeScreen = ({ ipAddress }) => {
  const [scanning, setScanning] = useState(false);
  const [details, setDetails] = useState({});
  const navigation = useNavigation();
  const [buttonScale] = useState(new Animated.Value(1));
  const [showModal, setShowModal] = useState(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    startScanning();
  }, []);

  const startScanning = () => {
    setScanning(true);
  };

  const handleBarCodeRead = async (event) => {
    if (!scanning) {
      return;
    }
    setScanning(false);
    const scannedData = event.data;
    console.log(`http://${ipAddress}/WebServices/WebService.asmx/getProductbyCode?Code=${scannedData}`)
    try {
      const response = await fetch(`http://${ipAddress}/WebServices/WebService.asmx/getProductbyCode?Code=${scannedData}`);
      
      const data = await response.json();
      if (data) {
        const details = data.Details[0];
        if (details) {
          setDetails(details);
          setShowModal(true);
        } else {
          setDetails(null);
          Alert.alert('No details found for the scanned QR code');
          setScanning(true);
        }
      } else {
        setDetails(null);
        Alert.alert('No details found for the scanned QR code');
        setScanning(true);
      }
    } catch (error) {
      console.error('Error fetching details:', error);
      setDetails(null);
      Alert.alert('Error fetching details');
      setScanning(true);
    }
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
    setScanning(true);
  };

  return (
    <View style={[styles.container, colorScheme === 'dark' && styles.darkContainer]}>
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
        <View style={[styles.modalContainer, colorScheme === 'dark' && styles.darkModalContainer]}>
          <View style={[styles.modalContent, colorScheme === 'dark' && styles.darkModalContent]}>
            <Text style={styles.modalTitle}>Product Details:</Text>
            <View style={styles.modalDetails}>
              <Text style={styles.modalText}>Product Name: <Text style={styles.modalBoldText}>{details.ProductName}</Text>
              </Text>
              <Text style={styles.modalText}>
                SMS Code: <Text style={styles.modalBoldText}>{details.SMSCode}</Text>
              </Text>
              <Text style={styles.modalText}>
                Retail Price: <Text style={styles.modalBoldText}><Text style={styles.priceBold}>{details.RetailPrice}</Text></Text>
              </Text>
              <Text style={styles.modalText}>
                Wholesale Price: <Text style={styles.modalBoldText}><Text style={styles.priceBold}>{details.WholeSalePrice}</Text></Text>
              </Text>
            </View>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.bottomView}>
        <Animated.View style={[
            styles.backButton,
            { transform: [{ scale: buttonScale }] },
            colorScheme === 'dark' && styles.darkBackButton,
          ]}>
          <TouchableOpacity onPress={handleButtonPress} activeOpacity={0.7}>
          <Text style={[styles.backButtonText, colorScheme === 'dark' && styles.darkBackButtonText]}>Go Back</Text>
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
    backgroundColor: '#E3E3E3',
  },
  darkContainer: {
    backgroundColor: '#080202',
  },
  darkModalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  darkModalContent: {
    backgroundColor: 'black',
    borderRadius: height * 0.03,
    padding: width * 0.05,
    margin: width * 0.05,
    width: '80%',
    elevation: 5,
  },
  darkBackButton: {
    backgroundColor: '#B1B3B3',
  },
  darkBackButtonText: {
    color: 'black',
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
    left: width * 0.15,
    bottom: height * 0.2,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  bottomView: {
    bottom: 0,
    left: 0,
    right: 0,
    padding: width * 0.05,
  },
  backButton: {
    backgroundColor: '#B1B3B3',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.1,
    borderRadius: height * 0.05,
    marginTop: height * 0.04,
    transform: [{ translateY: -height * 0.03 }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    top:width*-0.15,
  },
  backButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: height * 0.03,
    padding: width * 0.05,
    margin: width * 0.05,
    width: '80%',
    elevation: 5,
  },
  modalTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: width * 0.04,
    textAlign: 'center',
  },
  modalDetails: {
    marginTop: width * 0.04,
  },
  modalText: {
    fontSize: width * 0.04,
    marginBottom: width * 0.02,
  },
  modalBoldText: {
    fontWeight: 'bold',
    color: '#DE006F',
  },
  modalButton: {
    backgroundColor: '#B1B3B3',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.1,
    borderRadius: height * 0.05,
    marginTop: height * 0.04,
  },
  modalButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: width * 0.04,
    textAlign: 'center',
  },

  priceBold:{
    fontSize:15,
    
    
  }
});

export default QRCodeScreen;
