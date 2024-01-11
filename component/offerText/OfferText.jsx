import React, {useEffect, useState, useContext} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {BASE_URL} from '../../src/config';
import axios from 'axios';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../src/context/AuthContext';
import {Marquee} from '@animatereactnative/marquee';

const OfferText = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {userInfo, isLoading} = useContext(AuthContext);

  const [useOffData, setOffData] = useState('');
  useEffect(() => {
    if (isFocused) {
      get_game_info();
    }
  }, [navigation.isFocused()]);

  const get_game_info = async () => {
    await axios
      .get(`${BASE_URL}/offer`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then(res => {
        console.log('res', res);
        let gameinfo = res.data;
        setOffData(gameinfo.data.offer);
        console.log('offer_test', gameinfo.data.offer);
      })
      .catch(er => {
        console.log('result Network ', er);
      });
  };

  const text = useOffData;
  console.log('abcdes', text);

  return (
    <View style={styles.container}>
      <Marquee spacing={10} speed={1}>
        <Text>{text}</Text>
      </Marquee>
    </View>
  );
};

export default OfferText;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  text: {
    fontSize: 20,
    textAlign: 'left',
    color: '#000000',
    width: '100%',
  },
});
