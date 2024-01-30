import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import normalize, {SCREEN_HEIGHT, SCREEN_WIDTH} from 'react-native-normalize';
import {useNavigation} from '@react-navigation/native';

const TransComp = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.transCompContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Deposit')}
        style={styles.buttonComponent}>
        <Text style={styles.buttonText}>Add Money</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Withdrawal')}
        style={styles.buttonComponent}>
        <Text style={styles.buttonText}>Withdrawal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Transaction')}
        style={styles.buttonComponent}>
        <Text style={styles.buttonText}>Transaction</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  transCompContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    height: SCREEN_HEIGHT / 10,
    alignItems: 'center',
  },
  buttonComponent: {
    height: SCREEN_HEIGHT / 20,
    width: SCREEN_WIDTH / 4,
    backgroundColor: '#001944',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(15),
  },
  buttonText: {textAlign: 'center', color: '#d7e2ff'},
});

export default TransComp;
