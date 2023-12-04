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
                     <Icon name="check" color="green" size={20} style={styles.checkedCircle} />
                  )}
              <View style={{flexDirection:'column'}}>
                <Text style={{fontSize:13,fontWeight:'700'}}>{item.text}</Text>
                <Text style={{fontSize:10,marginTop:-3}}>{item.subtext}</Text>
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
  },

  circle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#bbb',
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:7,
    width:140
  },

  checkedCircle: {
    position:'absolute',
    top:5,
    left:4
  },
});
