import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Table, Rows} from 'react-native-table-component';

const ExampleOne = ({data, isSingle, gameLength}) => {
  return (
    <>
      {data.map((item, index) => (
        <View style={styles.container}>
          <Text
            style={{
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: '#000000',
              padding: 2,
              marginBottom: 10,
            }}>
            {item?.result_date}
          </Text>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#ffffff52',
    alignContent: 'center',
  },

  text: {margin: 6, fontWeight: '600', color: '#FFFFFF', textAlign: 'center'},
});

export default ExampleOne;
