import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import TitleBar from '../../component/titlebar/TitleBar';
import normalize, {SCREEN_HEIGHT, SCREEN_WIDTH} from 'react-native-normalize';
import {AuthContext} from '../../src/context/AuthContext';
import axios from 'axios';
import {BASE_URL} from '../../src/config';

import carou1 from '../../assets/carou1.jpeg';
import phone from '../../assets/logo/phone.png';
import whatsapp from '../../assets/logo/whatsapp.png';
import LinearGradient from 'react-native-linear-gradient';

const Whatsapp = () => {
  const {userInfo, isLoading} = useContext(AuthContext);
  const [upiData, setUpiData] = useState({});
  useEffect(() => {
    get_game_info();
  }, []);
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

  const handleWhatsApp = () => {
    const url = `whatsapp://send?phone=${upiData.whatsapp}`;
    // const url = `whatsapp://send?phone=917319328962`;
    Linking.openURL(url).catch(() =>
      alert('Make sure WhatsApp is installed on your device'),
    );
  };

  const handleMobile = () => {
    Linking.openURL(`tel:${upiData.mobile}`);
    // Linking.openURL(`tel:7319328962`);
  };
  return (
    <SafeAreaView style={{marginBottom: SCREEN_HEIGHT / 18}}>
      <View>
        <TitleBar />
      </View>
      <ScrollView>
        <ImageBackground
          source={carou1}
          style={styles.image}
          imageStyle={{
            resizeMode: 'cover',
          }}
          blurRadius={0}>
          <View
            style={{
              flex: 0.18,
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT / 20,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              top: '82%',
            }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 20,
                textAlign: 'center',
                fontWeight: '700',
              }}>
              We are happy to Help You!
            </Text>
          </View>
        </ImageBackground>
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          colors={['#5ce1ff', '#8c1e96', '#1b2196']}
          style={styles.linearGradientBg}>
          <View style={{padding: normalize(20)}}>
            <Text
              style={{
                color: '#ffffff',
                fontSize: normalize(30),
                fontWeight: '800',
                textAlign: 'center',
              }}>
              Just give us a call or WhatsApp your query.
            </Text>
          </View>
          <View
            style={{
              width: SCREEN_WIDTH,
              padding: normalize(20),
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={{
                height: SCREEN_HEIGHT / 6.7,
                width: SCREEN_WIDTH / 3,
                padding: normalize(10),
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={handleMobile}>
              <Image
                source={phone}
                style={{height: '100%', width: '100%'}}
                resizeMode="cover"
              />
              <Text
                style={{
                  paddingTop: normalize(10),
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontWeight: '600',
                }}>
                Call Helpline
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: SCREEN_HEIGHT / 6,
                width: SCREEN_WIDTH / 3,
                padding: normalize(10),
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={handleWhatsApp}>
              <Image
                source={whatsapp}
                style={{height: '100%', width: '100%'}}
              />
              <Text
                style={{
                  paddingTop: normalize(10),
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontWeight: '600',
                }}>
                WhatsApp
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Whatsapp;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: SCREEN_HEIGHT / 3,
  },
  linearGradientBg: {
    height: SCREEN_HEIGHT / 1.69,
    alignItems: 'center',
    // padding: normalize(10),
    justifyContent: 'space-evenly',
  },
});
