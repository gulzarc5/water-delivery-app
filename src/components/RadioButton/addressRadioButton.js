import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function RadioButton({ options, selectedOption, onSelect }) {
  return (
    <View style={styles.blockContainer}>
      {options.map((item) => {
        return (
          <View key={item.key} style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.circle}
              onPress={() => {
                  onSelect(item);
            }}>
              {selectedOption && selectedOption.key === item.key && (
                     <Icon name="check" color="green" size={25} style={styles.checkedCircle} />
                  )}
              <View style={{flexDirection:'column'}}>
                <Text style={{fontSize:15,fontWeight:'500'}}>{item.text}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  blockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width:'100%',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight:30,
    marginBottom:20,
  },

  circle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    justifyContent: 'center',
    padding:7,
    width:140
  },

  checkedCircle: {
    position:'absolute',
    top:5,
    left:5
  },
});
