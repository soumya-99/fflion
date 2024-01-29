import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import TitleBar from '../../component/titlebar/TitleBar';
import {authstyles} from '../style/pagestyle';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BASE_URL} from '../../src/config';
import {AuthContext} from '../../src/context/AuthContext';
import normalize, {SCREEN_HEIGHT, SCREEN_WIDTH} from 'react-native-normalize';
import LinearGradient from 'react-native-linear-gradient';

const About = () => {
  const {userInfo, isLoading} = useContext(AuthContext);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [upiData, setUpiData] = useState({});

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
        setUpiData(gameinfo.data);
        console.log('gamecontact', gameinfo);
      })
      .catch(er => {
        console.log('result Network ', er);
      });
  };

  console.log('dsjhfjhd', upiData.tandc);
  return (
    <SafeAreaView>
      <View>
        <TitleBar />
      </View>
      <ScrollView>
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          colors={['#5ce1ff', '#8c1e96', '#1b2196']}
          style={styles.linearGradientBg}>
          <View style={{padding: normalize(20)}}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: normalize(25),
                fontWeight: '700',
                textAlign: 'center',
              }}>
              PLAYING INSTRUCTIONS
            </Text>
          </View>
          <View
            style={{
              minHeight: '70%',
              height: 'auto',
              width: SCREEN_WIDTH / 1.1,
              borderWidth: 2,
              borderRadius: normalize(30),
              borderColor: 'lavender',
              padding: normalize(20),
            }}>
            <Text style={{color: '#FFFFFF', fontSize: normalize(20)}}>
              {upiData.tandc}
            </Text>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({
  linearGradientBg: {
    minHeight: SCREEN_HEIGHT,
    height: 'auto',
    alignItems: 'center',
    // padding: normalize(10),
  },
});
