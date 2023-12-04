import { StyleSheet } from "react-native";
import { block, color } from "react-native-reanimated";
const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      padding: 10,
    },
    image: {
      flex: 2,
      resizeMode: "contain",
      justifyContent: "center"
    },
    inputText:{
      // width:"100%",
      borderRadius:5,
      marginBottom:15,
      padding:30,
      paddingVertical:8,
      color:'#333',
      // textAlign:'left',
      borderColor: '#ddd',
      backgroundColor: '#f3f3f3',
      borderWidth: 1,   
    },
    inputTextarea:{
      width:"100%",
      borderRadius:5,
      marginBottom:20,
      padding:10,
      color:'#333',
      textAlign:'left',
      borderColor: '#ddd',
      borderWidth: 1,   
    },
    headingText:{
      marginBottom:10,
      padding:5,
      color:'#48BBEC',
      fontSize: 15,
      fontWeight:"700",
    },
    buttonText: {
      fontSize: 18,
      color: 'white',
      alignSelf: 'center',
      fontWeight: '700'
    },
    button: {
      height: 36,
      backgroundColor: '#48BBEC',
      borderColor: '#48BBEC',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      alignSelf: 'center',
      justifyContent: 'center',
      width: '90%'
    },
    topText: {
      width: 250,
      backgroundColor:"#ffffff00",
      alignSelf:"flex-end"
    },
    labelText:{
      alignSelf: 'flex-start',
      paddingLeft: 10,
      paddingRight: 10,
      zIndex: 9999,
      color: '#48BBEC',
      fontWeight:'700'
    },
    bottomText: {
      fontSize: 14,
      marginBottom:30,
    },
    span:{      
      color:'#48BBEC',
      fontSize:12
    },
    addressText : {
      color: '#000',
      alignSelf:'flex-start',
      fontWeight:'500',
      fontSize:12
    },
    addressTextPt : {
      color: '#333',
      alignSelf:'flex-start',
      fontWeight:'500',
      fontSize:12
    },
    addressBlock: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius:10,
      padding: 10,
      width:'100%',
      marginBottom: 10,
      backgroundColor:'#fff'
    }
})
export default styles;