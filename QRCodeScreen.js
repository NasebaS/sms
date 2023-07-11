import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

const QRCodeScreen = () => {
  const [scanning, setScanning] = useState(false);
  const [barcodeData, setBarcodeData] = useState(null);
  const details = {
    productName: 'SMS D/W FANCY CHTRN BUTTA CATALOGUE DESIGN',
    smsCode: 'SMSMXDG23',
    wholesalePrice: 'Rs. 52000',
    retailPrice: 'Rs. 52000',
  };

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

    // Access the scanned data from event.data
    const scannedData = event.data;
    setBarcodeData(scannedData);

    // Fetch the details from the URL
    try {
      const response = await fetch(scannedData);
      const data = await response.json();
      setDetails(data);
    } catch (error) {
      Alert.alert('Error', 'Invalid BarCode');
    }
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
      />
      {details && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>Product Name: {details.productName}</Text>
          <Text style={styles.detailsText}>SMS Code: {details.smsCode}</Text>
          <Text style={styles.detailsText}>Retail Price: {details.retailPrice}</Text>
          <Text style={styles.detailsText}>Wholesale Price: {details.wholesalePrice}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={startScanning}>
        <Text style={styles.buttonText}>Start Scanning</Text>
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
  cameraContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: 'white',
  },
  camera: {
    flex: 1,
  },
  detailsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 10,
  },
  detailsText: {
    color: 'black',
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default QRCodeScreen;
