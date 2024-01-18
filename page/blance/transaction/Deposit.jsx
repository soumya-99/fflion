import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
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
import {useIsFocused, useNavigation} from '@react-navigation/native';

const data = [
  {label: 'Phone Pe', value: '1'},
  {label: 'Google Pay', value: '2'},
  {label: 'PayTM', value: '3'},
];

const Deposit = ({navigation}) => {
  const [value, setValue] = useState(null);
  const [paymentMod, setPaymentMod] = useState();

  const [isFocus, setIsFocus] = useState(false);
  const [upiData, setUpiData] = useState({});
  const [transactionNumber, onChangeTransactionNumber] = useState();
  const [amount, onChangeAmount] = useState();
  const {userInfo} = useContext(AuthContext);
  // const navigation = useNavigation();
  const isFocused = useIsFocused();

  const handleRequest = async () => {
    if (!value && !transactionNumber && !amount) {
      return alert('please fill all the value');
    }

    if (amount < 200) {
      return alert('please add more than 200');
    }
    console.log(amount, paymentMod, transactionNumber);
    axios
      .post(
        `${BASE_URL}/deposit_amt`,
        {
          amt: amount,
          paymod: paymentMod,
          transNo: transactionNumber,
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      )
      .then(res => {
        console.log(res.data);
        if (res.data.status == 'SUCCESS') {
          navigation.navigate('Transaction');
        }
        if (res.data.status == 'ERROR') {
          alert(res.data.data);
          return;
        }
        setValue(null);
        onChangeAmount();
        onChangeTransactionNumber();
      })
      .catch(error => console.error(error));
  };

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
          <View style={styles.headerBox}>
            <Text style={styles.insideBoxTextStyle}>
              আমাদের ফোন-পে, গুগল-পে, পেটিএম নাম্বার নীচে দেওয়া আছে।
            </Text>
            <Text style={styles.insideBoxTextStyle}>
              Minimum Add Balance: ₹500
            </Text>
            <View style={styles.paymentMethodsNameWrapper}>
              <View style={styles.row}>
                <Text style={styles.insideBoxTextStyle}>
                  Phone Pe: {upiData.trans_no}
                </Text>
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={() =>
                    Clipboard.setString(upiData.trans_no.toString())
                  }>
                  <Text style={styles.copyButtonText}>Click to Copy</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <Text style={styles.insideBoxTextStyle}>
                  Google Pay: {upiData.trans_no}
                </Text>
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={() =>
                    Clipboard.setString(upiData.trans_no.toString())
                  }>
                  <Text style={styles.copyButtonText}>Click to Copy</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.row, {marginBottom: normalize(-5)}]}>
                <Text style={{color: '#FFFFFF'}}>
                  PayTM: {upiData.trans_no}
                </Text>
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={() =>
                    Clipboard.setString(upiData.trans_no.toString())
                  }>
                  <Text style={styles.copyButtonText}>Click to Copy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{marginTop: normalize(50)}}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeAmount}
              value={amount}
              placeholder="(₹) ENTER AMOUNT"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangeTransactionNumber}
              value={transactionNumber}
              placeholder="ENTER TRANSACTION NUMBER"
              keyboardType="phone-pad"
            />
          </View>

          <View
            style={{
              justifyContent: 'space-around',
              height: SCREEN_HEIGHT / 8,
              marginTop: normalize(30),
            }}>
            <Text
              style={{
                fontSize: normalize(25),
                fontWeight: '700',
                color: '#FFFFFF',
              }}>
              Select Money Transfer Mode
            </Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={styles.itemTextStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Select Item' : 'Choose...'}
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setPaymentMod(item.label);
                setIsFocus(false);
              }}
            />
          </View>

          <View style={{marginTop: normalize(30)}}>
            <TouchableOpacity
              onPress={handleRequest}
              style={styles.submitButton}>
              <Text
                style={[
                  styles.insideBoxTextStyle,
                  {
                    textAlign: 'center',
                    fontSize: normalize(20),
                    fontWeight: '700',
                  },
                ]}>
                REQUEST BALANCE
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Deposit;

const styles = StyleSheet.create({
  linearGradientBg: {
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    padding: normalize(10),
  },
  headerBox: {
    width: SCREEN_WIDTH / 1.04,
    height: SCREEN_HEIGHT / 4.5,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    padding: normalize(5),
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: normalize(5),
  },
  insideBoxTextStyle: {color: '#FFFFFF'},
  paymentMethodsNameWrapper: {
    width: SCREEN_WIDTH / 1.04,
    padding: normalize(20),
  },
  copyButton: {
    height: normalize(25),
    width: normalize(100),
    borderRadius: normalize(10),
    backgroundColor: 'hotpink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyButtonText: {
    color: '#FFFFFF',
    textTransform: 'uppercase',
    fontSize: normalize(14),
  },

  input: {
    height: normalize(60),
    width: SCREEN_WIDTH / 1.04,
    margin: normalize(12),
    backgroundColor: '#FFFFFFAF',
    color: '#000000',
    padding: normalize(15),
    borderRadius: normalize(10),
  },

  dropdown: {
    height: normalize(60),
    margin: normalize(12),
    backgroundColor: '#FFFFFFAF',
    color: '#000000',
    padding: normalize(15),
    borderRadius: normalize(10),
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  itemTextStyle: {
    color: 'black',
  },

  submitButton: {
    height: SCREEN_HEIGHT / 13,
    width: SCREEN_WIDTH / 1.2,
    backgroundColor: 'darkblue',
    borderRadius: normalize(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
