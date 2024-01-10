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
import {AuthContext} from '../../src/context/AuthContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import normalize from 'react-native-normalize';

import bgImg from '../../assets/loginBg.jpg';
import ffLogo from '../../assets/logo/fflion_logo.jpeg';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const LOGO_HEIGHT_AND_WIDTH = 150;

const Login = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const {isLoading, loginUser} = useContext(AuthContext);

  function handleLogin() {
    if (userEmail.length > 12) {
      return ToastAndroid.showWithGravity(
        'Please Enter a Correct Mobile Number',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    loginUser(userEmail, userPassword);
  }
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
                keyboardType="number-pad"
                mode="contained"
                theme={{colors: {onSurfaceVariant: '#FFFFFF'}}}
                style={{
                  backgroundColor: '#00000000',
                  color: '#ffffff',
                  marginBottom: 20,
                }}
                label="Phone No."
                onChangeText={text => {
                  setUserEmail(text);
                }}
                value={userEmail}
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
                onChangeText={text => {
                  setUserPassword(text);
                }}
                theme={{colors: {onSurfaceVariant: '#FFFFFF'}}}
                value={userPassword}
                underlineColor="#ffffff"
                activeUnderlineColor="#ffffff"
                textColor="#ffffff"
                cursorColor="#ffffff"
              />
            </View>

            <View
              style={{
                width: screenWidth,
                left: normalize(240),
              }}>
              <TouchableOpacity
                onPress={() => console.log('FORGOT PASSCODE CLICKED!!!')}>
                <Text style={{color: 'hotpink'}}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.loginButtonContainer}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => handleLogin()}>
                <Text style={styles.loginButtonText}>LOGIN</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingHorizontal: normalize(42),
              }}>
              <Text style={{color: '#ffffff'}}>Don't have a account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Registar')}>
                <Text
                  style={{color: 'hotpink', textDecorationLine: 'underline'}}>
                  CREATE AN ACCOUNT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: screenHeight,
  },
  overlay: {flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'},
  logoContainer: {width: screenWidth, alignItems: 'center', padding: 30},
  inputGroup: {
    padding: 20,
  },
  loginButtonContainer: {padding: normalize(30), alignItems: 'center'},
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
