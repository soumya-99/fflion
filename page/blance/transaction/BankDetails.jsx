import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import TitleBar from '../../../component/titlebar/TitleBar';
import LinearGradient from 'react-native-linear-gradient';
import normalize, {SCREEN_HEIGHT, SCREEN_WIDTH} from 'react-native-normalize';
import axios from 'axios';
import {BASE_URL} from '../../../src/config';
import {AuthContext} from '../../../src/context/AuthContext';
import {useIsFocused} from '@react-navigation/native';
const BankDeatils = () => {
  const isFocused = useIsFocused();
  const {userInfo} = useContext(AuthContext);
  const [bName, setBName] = useState('');
  const [accNo, setAccNo] = useState('');
  const [ifscCode, setIfscCode] = useState('');

  const fetchBankDetails = async () => {
    await axios
      .get(
        `${BASE_URL}/add-account`,
        // {},
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      )
      .then(res => {
        console.log('BANK DETAILS FETCHED...', res.data);
        setBName(res.data?.bank_name);
        setAccNo(res.data?.account_no);
        setIfscCode(res.data?.ifsc_code);
      })
      .catch(err => {
        console.log('Error fetching Bank Details...', err);
      });
  };

  useEffect(() => {
    fetchBankDetails();
  }, [isFocused]);

  const handleUpdateDetails = async () => {
    console.log('handleUpdateDetails');
    await axios
      .post(
        `${BASE_URL}/add-account`,
        {
          account_no: accNo.toString(),
          bank_name: bName,
          ifsc_code: ifscCode,
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      )
      .then(res => {
        console.log('handleUpdateDetails SUCC', res.data);
      })
      .catch(err => {
        console.log('handleUpdateDetails ERRR', err);
      });
  };
  return (
    <SafeAreaView style={{marginBottom: SCREEN_HEIGHT / 18}}>
      <View>
        <TitleBar />
      </View>
      <ScrollView>
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          colors={['#5ce1ff', '#8c1e96', '#1b2196']}
          style={styles.linearGradientBg}>
          <View
            style={{
              width: SCREEN_WIDTH / 1.1,
              height: SCREEN_HEIGHT / 1.4,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              paddingTop: normalize(20),
              borderRadius: normalize(30),
            }}>
            <Text style={styles.b_title}>BANK ACCOUNT INFO</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#FFFFFF',
                width: '80%',
                alignSelf: 'center',
                marginTop: normalize(10),
              }}></View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: normalize(30),
              }}>
              <View style={{justifyContent: 'space-evenly', height: '80%'}}>
                <Text style={{color: '#FFF', fontSize: normalize(18)}}>
                  Bank Name
                </Text>
                <Text style={{color: '#FFF', fontSize: normalize(18)}}>
                  Account No.
                </Text>
                <Text style={{color: '#FFF', fontSize: normalize(18)}}>
                  IFSC Code
                </Text>
              </View>
              <View style={{justifyContent: 'space-evenly', height: '80%'}}>
                <TextInput
                  style={styles.input}
                  value={bName}
                  onChangeText={setBName}
                  placeholder={bName || 'Bank Name'}
                  placeholderTextColor="#FFFFFF"
                />
                <TextInput
                  style={styles.input}
                  value={accNo}
                  onChangeText={setAccNo}
                  placeholder={accNo || 'Account No.'}
                  keyboardType="numeric"
                  placeholderTextColor="#FFFFFF"
                />
                <TextInput
                  style={styles.input}
                  value={ifscCode}
                  onChangeText={setIfscCode}
                  placeholder={ifscCode || 'IFSC Code'}
                  placeholderTextColor="#FFFFFF"
                />
              </View>
            </View>
          </View>
          <View style={{marginBottom: 50}}>
            <TouchableOpacity
              onPress={handleUpdateDetails}
              style={{
                alignSelf: 'center',
                backgroundColor: 'purple',
                paddingHorizontal: 10,
                paddingVertical: 10,
                margin: 10,
                width: SCREEN_WIDTH / 1.3,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  color: '#ffff',
                  fontSize: 16,
                  textTransform: 'uppercase',
                  textAlign: 'center',
                }}>
                UPDATE DETAILS
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BankDeatils;

const styles = StyleSheet.create({
  linearGradientBg: {
    minHeight: SCREEN_HEIGHT,
    height: 'auto',
    alignItems: 'center',
    padding: normalize(10),
  },
  b_title: {
    fontSize: normalize(20),
    fontWeight: '700',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  input: {
    padding: normalize(10),
    justifyContent: 'center',
    width: normalize(180),
    height: normalize(40),
    // backgroundColor: 'rgba(255, 255, 255, 0)',
    borderColor: '#FFF',
    borderWidth: 1,
    color: '#FFFFFF',
    fontSize: normalize(17),
    borderRadius: 15,
  },
});
