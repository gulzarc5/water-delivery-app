import { StyleSheet } from "react-native";
import { block } from "react-native-reanimated";
const styles = StyleSheet.create({
    container: {
      flexDirection:'column',   
    },
    image: {
      flex: 1,
      resizeMode: "contain",
      justifyContent: "center"
    },
    comLogo: {
      width: 180,
      height: 60,
      marginTop: 30 ,
      alignSelf:'center',
    },
    InnerContainer: {
      borderTopLeftRadius:40,
      borderTopRightRadius:40,
      width:'100%',
      height:'100%',
      padding:20,
      backgroundColor:'#fff',
      marginTop:-60,
      alignItems: 'center',
    },
    inputText:{
      width:"100%",
      borderRadius:5,
      marginBottom:20,
      padding:5,
      paddingLeft:80,
      color:'#333',
      textAlign:'left',
      borderColor: '#ddd',
      borderWidth: 1,      
    },
    headingText:{
      marginBottom:30,
      padding:5,
      color:'#48BBEC',
      fontSize: 30,
      fontWeight:"700",
      fontFamily: "Cochin"
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
      marginBottom: -30,
      marginLeft: 5,
      paddingLeft: 10,
      paddingRight: 10,
      zIndex: 9999,
      borderRightWidth:1,
      borderColor:'#ddd',
      color: '#48BBEC',
      width:62,
    },
    bottomText: {
      fontSize: 14,
      marginBottom:30,
    },
    span:{      
      color:'#48BBEC',
      fontSize:12,
    },    
    spanText:{      
      color:'#333',
      fontSize:12,
      alignItems:'center'
    },    
    menuIcon: {
      fontSize:30,
      color:'#48BBEC',
      alignSelf:'flex-start', 
      justifyContent:'center', 
      backgroundColor:'#fff',
      paddingHorizontal:10,
      borderRadius:50,
    },
})
export default styles;