import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import TitleBar from '../../../component/titlebar/TitleBar';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import {BASE_URL} from '../../../src/config';
import {AuthContext} from '../../../src/context/AuthContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import normalize, {SCREEN_HEIGHT, SCREEN_WIDTH} from 'react-native-normalize';
import LinearGradient from 'react-native-linear-gradient';
import {useIsFocused} from '@react-navigation/native';

const data = [
  {label: 'Phone Pe', value: '1'},
  {label: 'Google Pay', value: '2'},
  {label: 'PayTM', value: '3'},
  {label: 'Bank', value: '4'},
];

const Withdrawal = ({navigation}) => {
  const [value, setValue] = useState(null);
  const [paymentMod, setPaymentMod] = useState();

  const [isFocus, setIsFocus] = useState(false);
  const [transactionNumber, onChangeTransactionNumber] = useState();
  const [amount, onChangeAmount] = useState();
  const [settings, setSettings] = useState();
  const {userInfo} = useContext(AuthContext);
  const isFocused = useIsFocused();

  const [wlBal, setWlBal] = useState();

  const handleRequest = async () => {
    if (!value && !transactionNumber && !amount) {
      return alert('Please fill all the values.');
    }

    if (amount < 500) {
      return alert('Please add minimum of ₹500.');
    }

    axios
      .post(
        `${BASE_URL}/withdral_amt`,
        {
          amt: amount,
          paymod: paymentMod,
          transNo: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      )
      .then(res => {
        if (res.data.status == 'SUCCESS') {
          navigation.navigate('Withdrawal History');
        }
        if (res.data.status == 'ERROR') {
          alert(res.data.data);
          return;
        }
        setValue(null);
        onChangeAmount();
        onChangeTransactionNumber();
      })
      .catch(error => console.error(error.message));
  };

  useEffect(() => {
    if (isFocused) {
      getGameNameData();
    }
  }, [navigation.isFocused()]);

  const getGameNameData = async () => {
    await axios
      .get(`${BASE_URL}/total_money_Wallet`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then(res => {
        let resData = res.data;
        setWlBal(resData.data[0].total_value_amount);
        console.log('titBlance', resData);
      })
      .catch(er => {
        console.log('title bal', er);
      });
  };

  const getSettings = async () => {
    await axios
      .get(`${BASE_URL}/setting`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then(res => {
        setSettings(res.data?.data[0]);
      });
  };

  useEffect(() => {
    getSettings();
  }, [isFocused]);

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
          <View
            style={{
              flexDirection: 'row',
              padding: normalize(10),
            }}>
            <View
              style={{
                width: SCREEN_WIDTH / 2.1,
                height: SCREEN_HEIGHT / 4.2,
                backgroundColor: '#FFFFFF',
                borderTopLeftRadius: normalize(20),
                borderBottomLeftRadius: normalize(20),
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <Text style={{color: 'purple'}}>Total Balance</Text>
              <View style={styles.boxAmountContainer}>
                <Text style={styles.boxAmountText}>
                  ₹{Number(wlBal).toFixed(2)}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Bank Details')}>
                <Text style={{textDecorationLine: 'underline'}}>
                  Update Account?
                </Text>
              </TouchableOpacity>
            </View>
            <LinearGradient
              start={{x: 1, y: 0}}
              end={{x: 0, y: 2}}
              colors={['#5ce1ff', '#8c1e96', '#1b2196']}
              style={{
                width: SCREEN_WIDTH / 2.1,
                height: SCREEN_HEIGHT / 4.2,
                borderTopRightRadius: normalize(20),
                borderBottomRightRadius: normalize(20),
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <Text style={{color: '#FFFFFF'}}>Withdraw Balance</Text>
              {/* <TextInput
                style={styles.input}
                onChangeText={onChangeTransactionNumber}
                value={transactionNumber}
                placeholder="TNX. NO."
                keyboardType="numeric"
              /> */}
              <TextInput
                style={styles.input}
                onChangeText={onChangeAmount}
                value={amount}
                placeholder="(₹) ENTER AMOUNT"
                keyboardType="number-pad"
              />
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={styles.itemTextStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : 'Choose...'}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setPaymentMod(item.label);
                  setIsFocus(false);
                }}
              />
              <TouchableOpacity
                onPress={handleRequest}
                style={styles.submitButton}
                disabled={settings?.withdrawal_flag == 'Y' ? false : true}>
                <Text
                  style={[
                    styles.insideBoxTextStyle,
                    {
                      textAlign: 'center',
                      fontSize: normalize(20),
                      fontWeight: '700',
                    },
                    ``,
                  ]}>
                  SUBMIT
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Withdrawal;

const styles = StyleSheet.create({
  linearGradientBg: {
    minHeight: SCREEN_HEIGHT,
    height: 'auto',
    alignItems: 'center',
    padding: normalize(10),
  },
  boxAmountContainer: {
    width: normalize(150),
    height: normalize(50),
    backgroundColor: '#ffdcbb',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(10),
    borderWidth: 1,
    borderColor: '#8c5000',
  },
  boxAmountText: {
    fontWeight: '600',
    fontSize: normalize(22),
    color: '#2d1600',
  },
  input: {
    padding: normalize(10),
    justifyContent: 'center',
    width: '85%',
    height: '16%',
    backgroundColor: 'white',
    color: 'black',
    fontSize: 11,
    borderRadius: 5,
  },
  dropdown: {
    height: 25,
    width: '85%',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  placeholderStyle: {
    color: 'black',
    fontSize: 12,
  },
  selectedTextStyle: {
    color: 'black',
    fontSize: 12,
  },
  itemTextStyle: {
    color: 'black',
  },
  insideBoxTextStyle: {color: '#2c0050'},
  submitButton: {
    height: '20%',
    width: '85%',
    backgroundColor: '#f2daff',
    borderRadius: normalize(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
