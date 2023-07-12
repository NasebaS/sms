// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
// import { RNCamera } from 'react-native-camera';
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { useNavigation } from '@react-navigation/native';

// const QRCodeScreen = () => {
//   const [scanning, setScanning] = useState(false);
//   const [barcodeData, setBarcodeData] = useState(null);
//   const details = {
//     productName: 'SMS D/W FANCY CHTRN BUTTA CATALOGUE DESIGN',
//     smsCode: 'SMSMXDG23',
//     wholesalePrice: 'Rs. 52000',
//     retailPrice: 'Rs. 52000',
//   };
//   const navigation = useNavigation();
//   useEffect(() => {
//     startScanning();
//   }, []);

//   const startScanning = () => {
//     setScanning(true);
//   };

//   // const handleBarCodeRead = async (event) => {
//   //   if (!scanning) {
//   //     return;
//   //   }
//   //   setScanning(false);

//   //   // Access the scanned data from event.data
//   //   const scannedData = event.data;
//   //   Alert.alert(scannedData)
//   //   setBarcodeData(scannedData);
   
//   //   // Fetch the details from the URL
//   //   // try {
//   //   //   const response = await fetch(scannedData);
//   //   //   const data = await response.json();
//   //   //   setDetails(data);
     
//   //   // } catch (error) {
//   //   //   Alert.alert('Error', 'Invalid BarCode');
//   //   // }
//   // };
// const handleBarCodeRead = (event) => {
//     if (!scanning) {
//       return;
//     }

//     // Access the scanned data from event.data
//     const scannedData = event.data;

//     // Show an alert with the scanned data
//     Alert.alert('Scanned QR Code', scannedData);

//     // Resume scanning
//     setScanning(true);
//   };
//   return (
//     <View style={styles.container}>
//       <QRCodeScanner
//         reactivate={true}
//         showMarker={true}
//         onRead={handleBarCodeRead}
//         cameraProps={{ captureAudio: false }}
//         cameraContainerStyle={styles.cameraContainer}
//         cameraStyle={styles.camera}
//       />
//       {details && (
//         <View style={styles.detailsContainer}>
//           <Text style={styles.detailsText}>
//             <Text style={styles.productNameText}>Product Name: </Text>
//   {details.productName}
// </Text>
// <Text style={styles.detailsText}>
// <Text style={styles.smsCodeText}>
//   SMS Code: </Text>
//   {details.smsCode}
// </Text>
// <Text style={styles.detailsText}>
//   <Text style={styles.retailPriceText}>
//   Retail Price: 
//   </Text>
//   <Text style={styles.boldText}>{details.retailPrice}</Text>
// </Text>
// <Text style={styles.detailsText}>
//   <Text style={styles.wholesalePriceText}>
//   Wholesale Price: 
//   </Text>
//   <Text style={styles.boldText}>{details.wholesalePrice}</Text>
// </Text>

//         </View>
//       )}
//       <View style={styles.bottomView}>
      
//       <TouchableOpacity style={styles.backButton} onPress={()=>navigation.navigate('Scan')}>
//         <Text style={styles.backButtonText}>Go Back</Text>
//       </TouchableOpacity>
//       </View>
      
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cameraContainer: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         borderWidth: 1,
//         borderColor: 'white',
//       },
//   camera: {
//     flex: 1,
//     width: '100%',
//   },
//   detailsContainer: {
//     position: 'absolute',
//     top:420,
//        left: 0,
//     right: 0,
//     backgroundColor: 'white',
//     padding: 20,
//   },
//   detailsText: {
//     color: 'black',
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   productNameText: {
//     color: '#5A96E3',
//   },
//   smsCodeText: {
//     color: '#5A96E3',
//   },
//   retailPriceText: {
//     color: '#5A96E3',
//   },
//   wholesalePriceText: {
//     color: '#5A96E3',
//   },

//   button: {
//     backgroundColor: '#2196F3',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginTop: 20,
//     marginBottom:30,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   boldText:{
// fontWeight:'bold'
//   },
//   bottomView:{
//     flexDirection:'row',
//     justifyContent: 'space-between',
//     marginRight: 20,
    
//   },
//   backButton:{
//     backgroundColor: '#A8A196',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//     marginTop: 20,
//     marginBottom:30,
//     marginLeft:25,
//   },
//   backButtonText: {
//     color: 'black',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default QRCodeScreen;


// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
// import { RNCamera } from 'react-native-camera';
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { useNavigation } from '@react-navigation/native';

// const QRCodeScreen = () => {
//   const [scanning, setScanning] = useState(false);
//   const [barcodeData, setBarcodeData] = useState(null);
//   const details = {
//     productName: 'SMS D/W FANCY CHTRN BUTTA CATALOGUE DESIGN',
//     smsCode: 'SMSMXDG23',
//     wholesalePrice: 'Rs. 52000',
//     retailPrice: 'Rs. 52000',
//   };
//   const navigation = useNavigation();
//   useEffect(() => {
//     startScanning();
//   }, []);

//   const startScanning = () => {
//     setScanning(true);
//   };

//   const handleBarCodeRead = (event) => {
//     if (!scanning) {
//       return;
//     }
//     const scannedData = event.data;
//     Alert.alert('Scanned QR Code', scannedData, [
//       {
//         text: 'OK',
//         onPress: () => {
//           setTimeout(() => {
//             setScanning(true);
//           }, 2000);
//         },
//       },
//     ]);
//     setScanning(false);
//   };

//   return (
//     <View style={styles.container}>
//       <QRCodeScanner
      
//         reactivate={true}
//         showMarker={true}
//         onRead={handleBarCodeRead}
//         cameraProps={{ captureAudio: false }}
//         cameraContainerStyle={styles.cameraContainer}
//         cameraStyle={styles.camera}
//         topViewStyle={styles.topView}
//         bottomViewStyle={styles.bottomView}
//         markerStyle={styles.marker}
//         vibrate={false}
//       />
//       {details && (
//         <View style={styles.detailsContainer}>
//           <Text style={styles.detailsText}>
//             <Text style={styles.productNameText}>Product Name: </Text>
//             {details.productName}
//           </Text>
//           <Text style={styles.detailsText}>
//             <Text style={styles.smsCodeText}>SMS Code: </Text>
//             {details.smsCode}
//           </Text>
//           <Text style={styles.detailsText}>
//             <Text style={styles.retailPriceText}>Retail Price: </Text>
//             <Text style={styles.boldText}>{details.retailPrice}</Text>
//           </Text>
//           <Text style={styles.detailsText}>
//             <Text style={styles.wholesalePriceText}>Wholesale Price: </Text>
//             <Text style={styles.boldText}>{details.wholesalePrice}</Text>
//           </Text>
//         </View>
//       )}
//       <View style={styles.bottomView}>
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Scan')}>
//           <Text style={styles.backButtonText}>Go Back</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   camera: {
//     flex: 1,
//     width: '100%',
//   },
//   topView: {
//     flex: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     padding: 16,
//     paddingTop: 40,
//     paddingBottom: 40,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//   },
//   bottomView: {
//     flex: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     padding: 16,
//     paddingTop: 40,
//     paddingBottom: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   marker: {
//     borderWidth: 2,
//     borderColor: 'white',
//   },
//   detailsContainer: {
//     position: 'absolute',
//     bottom: 100,
//     left: 20,
//     right: 20,
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//   },
//   detailsText: {
//     color: 'black',
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   productNameText: {
//     color: '#5A96E3',
//     fontWeight: 'bold',
//   },
//   smsCodeText: {
//     color: '#5A96E3',
//     fontWeight: 'bold',
//   },
//   retailPriceText: {
//     color: '#5A96E3',
//     fontWeight: 'bold',
//   },
//   wholesalePriceText: {
//     color: '#5A96E3',
//     fontWeight: 'bold',
//   },
//   backButton: {
//     position: 'absolute',
//     bottom: 30,
//     backgroundColor: '#A8A196',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//   },
//   backButtonText: {
//     color: 'black',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });


// export default QRCodeScreen;

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
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Scan')}>
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
  },
  backButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
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
