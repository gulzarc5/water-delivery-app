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
              <View style={{marginLeft:15}}>
                <Text style={{fontWeight:'700',fontSize:14}}>{item.text}</Text>
                <Text style={{fontWeight:'300',fontSize:10,marginTop:-1}}>{item.label}</Text>
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
    width:'100%'
  },
  buttonContainer: {
    marginBottom: 10,
    marginRight:5,
    width:'50%'
  },

  circle: {
    width:'100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ACACAC',
    backgroundColor:'#f3f3f3',
    justifyContent: 'center',
    paddingLeft:15,
    marginRight:5,
    padding:3,
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
