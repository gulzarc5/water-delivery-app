import { StyleSheet } from "react-native";
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
      width:"100%",
      borderRadius:5,
      marginBottom:10,
      padding:10,
      fontSize:14,
      paddingVertical:2,
      color:'#333',
      textAlign:'left',
      borderColor: '#ddd',
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
      color: '#333',
      alignSelf:'flex-start',
      marginBottom:5,
      fontWeight:'700',
      textTransform:'uppercase',
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
    },
    cartItem: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius:10,
      padding: 10,
      width:'100%',
      marginBottom: 20,
      backgroundColor:'#fff',
      marginBottom:15
    }
})
export default styles;