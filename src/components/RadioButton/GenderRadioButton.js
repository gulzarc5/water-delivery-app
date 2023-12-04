import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

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
              <View style={styles.circleInner}>
                {selectedOption && selectedOption.key === item.key && (
                  <View style={styles.checkedCircle} />
                )}
              </View>
              <View style={{flexDirection:'column'}}>
                <Text style={{fontSize:13,fontWeight:'700'}}>{item.text}</Text>
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
    alignSelf: 'flex-start',
    width:'80%',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginRight:0,
  },

  circle: {
    width:'70%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ACACAC',
    backgroundColor:'#f3f3f3',
    alignSelf: 'center',
    paddingLeft:30,
    padding:5,
    position:'relative',
  },

  circleInner: {
    position:'absolute',
    top:'40%',
    left:10,
    zIndex:9,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#ddd',
    borderWidth: 1,
    borderColor: '#ACACAC',
  },
  checkedCircle: {
    width: 10,
    height: 10,
    borderRadius: 7,
    marginTop:1,
    marginLeft:1,
    backgroundColor: '#2c69bc',
  },
});
