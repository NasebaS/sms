

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity,Animated , TouchableHighlight, Alert } from 'react-native';
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
  const [buttonScale] = useState(new Animated.Value(1));

  useEffect(() => {
    startScanning();
  }, []);

  const startScanning = () => {
    setScanning(true);
  };

  const handleBarCodeRead = (event) => {
    if (!scanning) {
      return;
    }
    const scannedData = event.data;
    Alert.alert('Scanned QR Code', scannedData, [
      {
        text: 'OK',
        onPress: () => {
          setTimeout(() => {
            setScanning(true);
          }, 2000);
        },
      },
    ]);
    setScanning(false);
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
  // function marker(color: string, size: string | number, borderLength: string | number, thickness: number = 2, borderRadius: number = 0): JSX.Element {
  //   return <View style={{ height: size, width: size }}>
  //     <View style={{ position: 'absolute', height: borderLength, width: borderLength, top: 0, left: 0, borderColor: color, borderTopWidth: thickness, borderLeftWidth: thickness, borderTopLeftRadius: borderRadius }}></View>
  //     <View style={{ position: 'absolute', height: borderLength, width: borderLength, top: 0, right: 0, borderColor: color, borderTopWidth: thickness, borderRightWidth: thickness, borderTopRightRadius: borderRadius }}></View>
  //     <View style={{ position: 'absolute', height: borderLength, width: borderLength, bottom: 0, left: 0, borderColor: color, borderBottomWidth: thickness, borderLeftWidth: thickness, borderBottomLeftRadius: borderRadius }}></View>
  //     <View style={{ position: 'absolute', height: borderLength, width: borderLength, bottom: 0, right: 0, borderColor: color, borderBottomWidth: thickness, borderRightWidth: thickness, borderBottomRightRadius: borderRadius }}></View>
  //   </View>
  // }
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
        // customMarker={marker('white', '60%', '25%', 6, 20)}
      />
      {details && (
        <View style={styles.detailsContainer}>
          <Text style={styles.cardTitle}>Product Details:</Text>
          <View style={styles.card}>
            <View style={styles.wrapper}>
            
            <Text style={styles.cardText}>
              Product Name: <Text style={styles.boldText}>{details.productName}</Text>
            </Text>
             </View>
             <View style={styles.wrapper}>
            <Text style={styles.cardText}>
              SMS Code: <Text style={styles.boldText}>{details.smsCode}</Text>
            </Text>
            </View>
            <View style={styles.wrapper}>
            <Text style={styles.cardText}>
              Retail Price: <Text style={styles.boldText}>{details.retailPrice}</Text>
            </Text>
            </View>
            <View style={styles.wrapper}>
            <Text style={styles.cardText}>
              Wholesale Price: <Text style={styles.boldText}>{details.wholesalePrice}</Text>
            </Text>
            </View>
          </View>
        </View>
      )}
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
    top:-225,
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
});

export default QRCodeScreen;
