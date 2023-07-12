import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useNavigation } from '@react-navigation/native';

const QRCodeScreen = () => {
  const [scanning, setScanning] = useState(false);
  const [barcodeData, setBarcodeData] = useState(null);
  const details = {
    productName: 'SMS D/W FANCY CHTRN BUTTA CATALOGUE DESIGN',
    smsCode: 'SMSMXDG23',
    wholesalePrice: 'Rs. 52000',
    retailPrice: 'Rs. 52000',
  };
  const navigation = useNavigation();
  useEffect(() => {
    startScanning();
  }, []);

  const startScanning = () => {
    setScanning(true);
  };

  // const handleBarCodeRead = async (event) => {
  //   if (!scanning) {
  //     return;
  //   }
  //   setScanning(false);

  //   // Access the scanned data from event.data
  //   const scannedData = event.data;
  //   Alert.alert(scannedData)
  //   setBarcodeData(scannedData);
   
  //   // Fetch the details from the URL
  //   // try {
  //   //   const response = await fetch(scannedData);
  //   //   const data = await response.json();
  //   //   setDetails(data);
     
  //   // } catch (error) {
  //   //   Alert.alert('Error', 'Invalid BarCode');
  //   // }
  // };
const handleBarCodeRead = (event) => {
    if (!scanning) {
      return;
    }

    // Access the scanned data from event.data
    const scannedData = event.data;

    // Show an alert with the scanned data
    Alert.alert('Scanned QR Code', scannedData);

    // Resume scanning
    setScanning(true);
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
          <Text style={styles.detailsText}>
            <Text style={styles.productNameText}>Product Name: </Text>
  {details.productName}
</Text>
<Text style={styles.detailsText}>
<Text style={styles.smsCodeText}>
  SMS Code: </Text>
  {details.smsCode}
</Text>
<Text style={styles.detailsText}>
  <Text style={styles.retailPriceText}>
  Retail Price: 
  </Text>
  <Text style={styles.boldText}>{details.retailPrice}</Text>
</Text>
<Text style={styles.detailsText}>
  <Text style={styles.wholesalePriceText}>
  Wholesale Price: 
  </Text>
  <Text style={styles.boldText}>{details.wholesalePrice}</Text>
</Text>

        </View>
      )}
      <View style={styles.bottomView}>
      
      <TouchableOpacity style={styles.backButton} onPress={()=>navigation.navigate('Scan')}>
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
      </View>
      
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
    width: '100%',
  },
  detailsContainer: {
    position: 'absolute',
    top:420,
       left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
  },
  detailsText: {
    color: 'black',
    fontSize: 16,
    marginBottom: 10,
  },
  productNameText: {
    color: '#5A96E3',
  },
  smsCodeText: {
    color: '#5A96E3',
  },
  retailPriceText: {
    color: '#5A96E3',
  },
  wholesalePriceText: {
    color: '#5A96E3',
  },

  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    marginBottom:30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  boldText:{
fontWeight:'bold'
  },
  bottomView:{
    flexDirection:'row',
    justifyContent: 'space-between',
    marginRight: 20,
    
  },
  backButton:{
    backgroundColor: '#A8A196',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    marginBottom:30,
    marginLeft:25,
  },
  backButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default QRCodeScreen;
