import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import normalize from 'react-native-normalize';

const ExampleOne = ({data, isSingle, gameLength}) => {
  // const maxColumns = Math.max(
  //   ...data?.nested_results.map(item => item?.final_results.length || 0),
  //   0,
  // );

  const maxColumns = Math.max(
    ...data?.nested_results.map(item => item?.final_results.length || 0),
    0,
  );

  // Filter out unnecessary cells
  const filteredData = data?.nested_results.map(item =>
    item.final_results.filter(result =>
      !isSingle
        ? result.game_type === 'S' || result.game_type === 'P'
        : result.game_type === 'J',
    ),
  );

  return (
    <>
      <View style={styles.container}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: normalize(18),
            fontWeight: '800',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF',
            padding: 2,
          }}>
          {new Date(data?.result_date).toLocaleDateString('en-GB')}
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

        {Array.from({length: maxColumns}).map((_, j) => (
          <View key={j} style={{flexDirection: 'row'}}>
            {filteredData.map((item, i) => (
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
                <ScrollView horizontal={true}>
                  {item[j] ? (
                    <Text key={i} style={styles.text}>
                      {item[j]?.result}
                    </Text>
                  ) : null}
                </ScrollView>
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

  text: {
    margin: 5,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: normalize(15),
  },
});

export default ExampleOne;
