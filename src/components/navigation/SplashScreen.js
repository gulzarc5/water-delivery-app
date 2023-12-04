import React, {useEffect, useState} from 'react';
import { Image, Text, StyleSheet, ActivityIndicator, Modal, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ProgressBar, Colors } from 'react-native-paper';
import codePush from "react-native-code-push";

let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };



const SplashScreen = ({loginState,dispatch,authContext}) => {
   
    const [modalVisible, setModalVisible] = useState(false);

    const [data,setData]=useState({
        statusText : "",
        receivedBytes : 0,
        totalBytes : 0,
        calnumber : 0,
    });
    const checkCodePush =()=>{
        codePush.sync({
            installMode: codePush.InstallMode.IMMEDIATE,
        }, 
        (status) => {
            switch (status) {
                case codePush.SyncStatus.CHECKING_FOR_UPDATE:
                    setData({
                        ...data,
                        statusText:"Checking For Update Please Wait",
                    })
                    console.log("Checking for updat");
                    break;
                case codePush.SyncStatus.DOWNLOADING_PACKAGE:    
                    setData({
                        ...data,
                        statusText:"Checking For Update Please Wait",
                    })
                    setModalVisible(true);
                    console.log("Downloading package.");
                    break;
                case codePush.SyncStatus.AWAITING_USER_ACTION:
                    // this.setState({ syncMessage: "Awaiting user action." });
                    setData({
                        ...data,
                        statusText:"Awaiting User Action.",
                    })
                    console.log("Awaiting user action.");
                    break;
                case codePush.SyncStatus.INSTALLING_UPDATE:
                    setModalVisible(true);
                    // this.setState({ syncMessage: "Installing update." });
                    setData({
                        ...data,
                        statusText:"Installing Update.",
                    })
                    console.log("Installing update.");
                    break;
                case codePush.SyncStatus.UP_TO_DATE:
                    setModalVisible(false);
                    dispatch({ type: 'APP_UPDATE', appUpdate: false});
                    // setData({
                    //     ...data,
                    //     statusText:"App up to date.",
                    // })
                    console.log("App up to date.");
                    break;
                case codePush.SyncStatus.UPDATE_IGNORED:
                    console.log("Update cancelled by user");
                    setData({
                        ...data,
                        statusText:"Update Cancelled by User",
                    })
                    // this.setState({ syncMessage: "Update cancelled by user.", progress: false });
                    break;
                case codePush.SyncStatus.UPDATE_INSTALLED:
                    console.log("Update installed and will be applied on restart");
                    setData({
                        ...data,
                        statusText:"Update installed and will be applied on restart",
                    })
                    break;
                case codePush.SyncStatus.UNKNOWN_ERROR:
                    console.log("An unknown error occurred.");
                    setData({
                        ...data,
                        statusText:"An unknown error occurred.",
                    })
                    break;
            }
        },
        ({ receivedBytes, totalBytes, }) => {
            console.log('receivedBytes',receivedBytes);
            console.log('totalBytes',totalBytes);
            

            // percentage calculation
            calPercentage = (receivedBytes*100)/totalBytes;

            // calculate on 0 -1
            calnumber = calPercentage/100;

            setData({
                ...data,
                receivedBytes:(receivedBytes/1000000).toFixed(2),
                totalBytes:(totalBytes/1000000).toFixed(2),
                calnumber:calnumber,
            })
        }
        );
      }

//   const CodePushStatusDidChange =syncStatus=> {
//       console.log("App Update Status",syncStatus);
//     switch(syncStatus) {
//       case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
//         // this.setState({ syncMessage: "Checking for update." });
//         break;
//       case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
//         // this.setState({ syncMessage: "Downloading package." });
//         break;
//       case CodePush.SyncStatus.AWAITING_USER_ACTION:
//         // this.setState({ syncMessage: "Awaiting user action." });
//         break;
//       case CodePush.SyncStatus.INSTALLING_UPDATE:
//         // this.setState({ syncMessage: "Installing update." });
//         break;
//       case CodePush.SyncStatus.UP_TO_DATE:
//         // this.setState({ syncMessage: "App up to date.", progress: false });
//         break;
//       case CodePush.SyncStatus.UPDATE_IGNORED:
//         // this.setState({ syncMessage: "Update cancelled by user.", progress: false });
//         break;
//       case CodePush.SyncStatus.UPDATE_INSTALLED:
//         // this.setState({ syncMessage: "Update installed and will be applied on restart.", progress: false });
//         break;
//       case CodePush.SyncStatus.UNKNOWN_ERROR:
//         // this.setState({ syncMessage: "An unknown error occurred.", progress: false });
//         break;
//     }
// }

    // const CodePushDownloadDidProgress = progress=>{
    //     // this.setState({ progress });
    //     console.log(progress);
    // }

    useEffect(() => {
        let unmounted = false;
        Promise.all([
            checkCodePush(),
        ]).catch(ex => console.error(ex));
        return () => { unmounted = true };
    },[])
    return (
        <LinearGradient colors={['#2c69bc', '#ddd', '#fff']} style={{ alignItems: 'center', height: '100%' }}>
            <Image
                source={require('../../assets/img/splash.png')}
                style={{ width: '100%', resizeMode: 'contain' }}
            />
            <Image
                source={require('../../assets/img/logo.png')}
                style={{ width: '50%', resizeMode: 'contain', position:'absolute',top:'50%'}}
            />
            <LinearGradient colors={['#2c69bc', '#48BBEC']} style={[styles.loadIcon, {position:'absolute',top:'75%'}]}> 
                <ActivityIndicator size="large" color="#fff"/>
            </LinearGradient>
            <Image
                source={require('../../assets/img/banner/food-safaty.png')}
                style={{ width: '50%', resizeMode: 'contain', position:'absolute',top:'80%'}}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>                        
                        <Image
                            source={require('../../assets/img/logo.png')}
                            style={{ width: '30%', height: 100,resizeMode: 'contain',alignSelf:'center' }}
                        />
                        <View>
                            <Text style={{fontSize:25,fontWeight:'700',textAlign:'center',color:'#2c69bc',marginBottom:10}}>{data.statusText}</Text>
                            <ProgressBar progress={data.calnumber} color={'#2c69bc'} style={{marginVertical:10}} />
                            <Text style={{fontSize:14,color:'#333',marginBottom:10,textAlign:'center'}}>Downloading ({data.receivedBytes} MB Out Of {data.totalBytes})</Text>
                        </View>
                        {/* <View style={{flexDirection:'row',justifyContent:'flex-end',width:'100%',marginRight:20}}>
                            <TouchableOpacity                  
                            onPress={() => setModalVisible(!modalVisible)}
                            >
                            <Text style={styles.buttonClose}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity                  
                            onPress={() => setModalVisible(!modalVisible)}
                            >
                            <Text style={styles.buttonClose}>Update</Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>
                </View>
            </Modal> 
            <Text style={{ position: 'absolute', bottom: 10, color: '#2c69bc' }}>POWRED BY WEBINFOTECH</Text>
        </LinearGradient>
    )
}
const styles = StyleSheet.create({
    loadIcon: {backgroundColor:'#fff',borderRadius:20,padding:2, marginTop: -10 , shadowColor: "#000", shadowOffset: { width: 0, height: 0, }, shadowOpacity: 0.90, shadowRadius: 4.65, elevation: 500},

    centeredView: {flex: 1,justifyContent: "center",alignItems: "center",backgroundColor: "#434246a3",},
    modalView: {position:'absolute',top:'25%',width:'100%',backgroundColor: "white",padding: 20,},
    buttonClose: {color: "#000",fontWeight:'700',fontSize:18,marginLeft:10},
    textStyle: {color: "white",fontWeight: "bold",textAlign: "center"},
    modalText: {marginBottom: 15,textAlign: "center"},
})
export default codePush(codePushOptions)(SplashScreen);