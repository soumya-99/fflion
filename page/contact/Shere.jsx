import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  SafeAreaView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import TitleBar from '../../component/titlebar/TitleBar';
import {authstyles} from '../style/pagestyle';
import normalize, {SCREEN_HEIGHT, SCREEN_WIDTH} from 'react-native-normalize';
import {AuthContext} from '../../src/context/AuthContext';
import axios from 'axios';
import {BASE_URL} from '../../src/config';
import Share from 'react-native-share';
import Banner from '../../component/banner/Banner';
import TransComp from '../../component/trans_component/TransComp';
import LinearGradient from 'react-native-linear-gradient';

const Shere = () => {
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

  console.log('userinf', userInfo.user);

  const handleWhatsApp = () => {
    const url = `whatsapp://send?phone=${upiData.whatsapp}`;
    // const url = `whatsapp://send?phone=917319328962`;
    Linking.openURL(url).catch(() =>
      alert('Make sure WhatsApp is installed on your device'),
    );
  };

  const handleMobile = async () => {
    try {
      const shareOptions = {
        title: 'Share By ',
        message: `🌟 Get the FFLion App 🌟\n 📱 Download: ${BASE_URL}/download-apk \n👥 Referral Code: ${userInfo.user.id} \nRefer By :${userInfo.user.name} \n👉 Refer & Earn Now! 👈`,
        // url: `${BASE_URL}/download-apk`, // Optional URL to include with the shared content
        subject: 'Refer & Earn Now!', // For email
      };

      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error sharing:', error.message);
    }
  };
  return (
    <SafeAreaView>
      <View>
        <TitleBar />
      </View>

      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        colors={['#5ce1ff', '#8c1e96', '#1b2196']}
        style={styles.linearGradientBg}>
        <View style={{padding: normalize(20), width: SCREEN_WIDTH / 1}}>
          <View style={styles.card}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../assets/icon/sharee.png')}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleMobile}>
              <Text style={styles.buttonText}>Share Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Shere;

const styles = StyleSheet.create({
  linearGradientBg: {
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    // padding: normalize(10),
  },
  card: {
    // flex: 1,
    backgroundColor: '#E39FF6CC',
    borderRadius: normalize(30),
    padding: normalize(16),

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: normalize(0.3),
    shadowRadius: normalize(4),
    elevation: normalize(5),
    marginBottom: normalize(15),
  },

  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '80%',
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: '#A1045A',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  button2: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
