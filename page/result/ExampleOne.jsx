import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Table, Rows} from 'react-native-table-component';

const ExampleOne = ({data, isSingle, gameLength}) => {
  return (
    <>
      <View style={styles.container}>
        <Text
          style={{
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF',
            padding: 2,
          }}>
          {data?.result_date}
        </Text>
        {/* {data?.nested_results.map((item, i) => (
          // item?.final_results?.map((resItem, i) => {
          //   return <Text key={index}>{resItem?.result}</Text>;
          // }),
          <View key={i} style={{flexDirection: 'row'}}>
            {item?.final_results?.map((resItem, j) => (
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
                <Text style={{color: '#FFFFFF'}}>{resItem?.result}</Text>
              </View>
            ))}
          </View>
        ))} */}

        {data?.nested_results[0]?.final_results?.map((_, j) => (
          <View key={j} style={{flexDirection: 'row'}}>
            {data?.nested_results.map((item, i) => (
              <View
                key={i}
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: 'purple',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 0,
                }}>
                <Text style={{color: '#FFFFFF'}}>
                  {item?.final_results[j]?.result}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
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
