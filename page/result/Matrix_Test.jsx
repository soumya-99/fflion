import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import TitleBar from '../../component/titlebar/TitleBar';
import normalize, {SCREEN_HEIGHT} from 'react-native-normalize';
import {ScrollView} from 'react-native-gesture-handler';

const Matrix = ({matrix}) => {
  let head = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  matrix.unshift(head);
  matrix.forEach((item, index) => {
    if (index === 0) {
      item.unshift('');
    } else {
      item.unshift(index);
    }
  });
  return (
    <View>
      {matrix.map((row, i) => (
        <View key={i} style={{flexDirection: 'row'}}>
          {row.map((item, j) => (
            <View
              key={j}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: 'purple',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 0,
              }}>
              <Text>{item}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const matrix = [
  ['1', '2', '33', '1', '2', '3', '1', '92', '3', '3'],
  ['4', '95', '6', '1', '2', '3', '1', '20', '3', '3'],
  ['47', '8', '9', '1', '2', '3', '1', '2', '3', '3'],
  ['4', '5', '6', '1', '2', '3', '112', '752', '3', '3'],
  ['7', '8', '9', '17', '2', '3', '1', '82', '32', '3'],
  ['4', '75', '6', '1', '2', '3', '1', '2', '3', '3'],
  ['7', '8', '9', '21', '232', '3', '1', '2', '3', '3'],
  ['7', '8', '9', '1', '2', '3', '1', '22', '3', '3'],
  ['4', '5', '6', '1', '27', '3', '1', '28', '3', '3'],
  ['7', '8', '9', '1', '2', '3', '1', '27', '3', '3'],
];

const Contact = () => {
  return (
    <SafeAreaView style={{marginBottom: SCREEN_HEIGHT / 18}}>
      <View>
        <TitleBar />
      </View>
      <ScrollView>
        <View style={{padding: normalize(20)}}>
          <Matrix matrix={matrix} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Contact;

const styles = StyleSheet.create({});
