import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  ImageBackground,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {TextInput} from 'react-native-paper';
import {authstyles} from './AuthStule';
import {AuthContext} from '../../src/context/AuthContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import loginController from '../../hooks/controller/auth/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage, hideMessage} from 'react-native-flash-message';

import bgImg from '../../assets/loginBg.jpg';
import ffLogo from '../../assets/logo/fflion_logo.jpeg';
import {SafeAreaView} from 'react-native-safe-area-context';
import normalize from 'react-native-normalize';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const LOGO_HEIGHT_AND_WIDTH = 150;

const Registar = ({navigation}) => {
  const [userMobile, setUserMobile] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [userRefCode, setRefCode] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const {register} = loginController();

  const handleMobNO = text => {
    const regex = /^[0-9]{0,11}$/;
    if (regex.test(text)) {
      setUserMobile(text);
    }
  };

  const handlerefNO = text => {
    const regex = /^[0-9]{0,10}$/;
    if (regex.test(text)) {
      setRefCode(text);
    }
  };

  const registeruser = async () => {
    setIsLoading(true);
    await register(userName, userMobile, userPassword, userRefCode)
      .then(res => {
        const response = res.data;
        console.log(response);
        setUserInfo(response);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        if (response.status == false) {
          ToastAndroid.showWithGravity(
            `${response.massage}`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          showMessage({
            message: 'invalid input',
            type: 'danger',
            autoHide: true,
            duration: 3000,
            position: 'top',
            style: {
              justifyContent: 'center',
              alignItems: 'center',
            },
            titleStyle: {
              textAlign: 'center',
            },
            descriptionStyle: {
              textAlign: 'center',
            },
          });
          setIsLoading(false);
        } else {
          showMessage({
            message: 'Registration successful',
            type: 'success',
            autoHide: true,
            duration: 3000,
            position: 'top',
            style: {
              justifyContent: 'center',
              alignItems: 'center',
            },
            titleStyle: {
              textAlign: 'center',
            },
            descriptionStyle: {
              textAlign: 'center',
            },
          });
          setIsLoading(false);
          navigation.navigate('Login');
        }
      })
      .catch(er => {
        console.log(er);
        showMessage({
          message: 'Invalid Input please fill valid input !',
          type: 'danger',
          autoHide: true,
          duration: 3000,
          position: 'top',
          style: {
            justifyContent: 'center',
            alignItems: 'center',
          },
          titleStyle: {
            textAlign: 'center',
          },
          descriptionStyle: {
            textAlign: 'center',
          },
        });
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground
          source={bgImg}
          style={styles.image}
          imageStyle={{
            resizeMode: 'cover',
          }}
          blurRadius={30}>
          <View style={styles.overlay}>
            <View style={styles.logoContainer}>
              <Image
                source={ffLogo}
                style={{
                  width: LOGO_HEIGHT_AND_WIDTH,
                  height: LOGO_HEIGHT_AND_WIDTH,
                }}
                resizeMode="contain"
                borderRadius={15}
              />
            </View>

            <View style={styles.inputGroup}>
              <TextInput
                keyboardType="default"
                mode="contained"
                theme={{colors: {onSurfaceVariant: '#FFFFFF'}}}
                style={{
                  backgroundColor: '#00000000',
                  color: '#ffffff',
                }}
                label="Name"
                value={userName}
                maxLength={40}
                onChangeText={text => {
                  setUserName(text);
                }}
                underlineColor="#ffffff"
                activeUnderlineColor="#ffffff"
                textColor="#ffffff"
                cursorColor="#ffffff"
              />
              <TextInput
                keyboardType="phone-pad"
                mode="contained"
                theme={{colors: {onSurfaceVariant: '#FFFFFF'}}}
                style={{
                  backgroundColor: '#00000000',
                  color: '#ffffff',
                }}
                label="Mobile No."
                maxLength={11}
                value={userMobile}
                onChangeText={handleMobNO}
                underlineColor="#ffffff"
                activeUnderlineColor="#ffffff"
                textColor="#ffffff"
                cursorColor="#ffffff"
              />
              <TextInput
                keyboardType="ascii-capable"
                mode="contained"
                style={{backgroundColor: '#00000000', color: '#ffffff'}}
                label="Password"
                secureTextEntry={true}
                theme={{colors: {onSurfaceVariant: '#FFFFFF'}}}
                value={userPassword}
                maxLength={30}
                onChangeText={text => {
                  setUserPassword(text);
                }}
                underlineColor="#ffffff"
                activeUnderlineColor="#ffffff"
                textColor="#ffffff"
                cursorColor="#ffffff"
              />
              <TextInput
                keyboardType="number-pad"
                mode="contained"
                theme={{colors: {onSurfaceVariant: '#FFFFFF'}}}
                style={{
                  backgroundColor: '#00000000',
                  color: '#ffffff',
                }}
                label="Refferal Code"
                maxLength={11}
                value={userRefCode}
                onChangeText={handlerefNO}
                underlineColor="#ffffff"
                activeUnderlineColor="#ffffff"
                textColor="#ffffff"
                cursorColor="#ffffff"
              />
            </View>

            <View style={styles.loginButtonContainer}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={registeruser}>
                <Text style={styles.loginButtonText}>SIGN UP</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                height: 1,
                width: screenWidth / 3,
                backgroundColor: '#ffffff',
                alignSelf: 'center',
              }}></View>

            <View style={styles.loginButtonContainer}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginButtonText}>LOGIN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Registar;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: screenHeight,
  },
  overlay: {flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'},
  logoContainer: {width: screenWidth, alignItems: 'center', padding: 30},
  inputGroup: {
    padding: normalize(20),
  },
  loginButtonContainer: {padding: normalize(20), alignItems: 'center'},
  loginButton: {
    width: screenWidth / 1.3,
    height: screenHeight / 15,
    borderRadius: normalize(15),
    backgroundColor: 'hotpink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: normalize(20),
    fontWeight: '800',
  },
});
