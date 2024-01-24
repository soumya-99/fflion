import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import TitleBar from '../../../component/titlebar/TitleBar';
import LinearGradient from 'react-native-linear-gradient';
import normalize, {SCREEN_HEIGHT, SCREEN_WIDTH} from 'react-native-normalize';
const BankDeatils = () => {
  const [bName, setBName] = useState('');
  const [accNo, setAccNo] = useState('');
  const [ifscCode, setIfscCode] = useState('');

  const handleUpdateDetails = () => {
    console.log('handleUpdateDetails');
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
                  placeholder="Bank Name"
                  placeholderTextColor="#FFFFFF"
                />
                <TextInput
                  style={styles.input}
                  value={accNo}
                  onChangeText={setAccNo}
                  placeholder="Account No."
                  keyboardType="numeric"
                  placeholderTextColor="#FFFFFF"
                />
                <TextInput
                  style={styles.input}
                  value={ifscCode}
                  onChangeText={setIfscCode}
                  placeholder="IFSC Code"
                  keyboardType="numeric"
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
    height: SCREEN_HEIGHT,
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
