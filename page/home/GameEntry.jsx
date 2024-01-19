import {
  ToastAndroid,
  PixelRatio,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {authstyles} from '../style/pagestyle';
import TitleBar from '../../component/titlebar/TitleBar';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import {BASE_URL} from '../../src/config';
import {AuthContext} from '../../src/context/AuthContext';
import Banner from '../../component/banner/Banner';
import TransComp from '../../component/trans_component/TransComp';
import normalize, {SCREEN_HEIGHT} from 'react-native-normalize';
import LinearGradient from 'react-native-linear-gradient';

const GameEntry = ({route, navigation}) => {
  const {itemData} = route.params;
  const {userInfo} = useContext(AuthContext);

  const [singleNumber, changeSingleNumber] = useState('');
  const [singleAmount, changeSingleAmount] = useState('');

  const [juriNumber, changeJurieNumber] = useState('');
  const [juriAmount, changeJuriAmount] = useState('');

  const [pattiNumber, changePattiNumber] = useState('');
  const [pattiAmount, changePattiAmount] = useState('');

  const [gameEntryArray, setGameEntry] = useState([]);
  const [wlBal, setWlBal] = useState();

  const [single, setSingle] = useState(() => false);
  const [jodi, setJodi] = useState(() => false);
  const [patti, setPatti] = useState(() => false);

  const handleSingleChnage = () => {
    setSingle(true);
    setJodi(false);
    setPatti(false);
  };
  const handleJodiChnage = () => {
    setJodi(true);
    setSingle(false);
    setPatti(false);
  };
  const handlePattiChnage = () => {
    setPatti(true);
    setSingle(false);
    setJodi(false);
  };

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
        // console.log('titBlance', resData);
      })
      .catch(er => {
        console.log('title bal', er);
      });
  };

  console.log(gameEntryArray);
  function calculateTotalAmount(data) {
    let totalAmount = 0;

    data.forEach(item => {
      totalAmount += parseFloat(item.singleAmount) || 0;
      totalAmount += parseFloat(item.juriAmount) || 0;
      totalAmount += parseFloat(item.pattiAmount) || 0;
    });

    return totalAmount;
  }
  function handleSetGameEntryArray() {
    if (singleAmount) {
      if (!singleNumber) {
        ToastAndroid.show('plese add Single Number', ToastAndroid.SHORT);
        return;
      }
    }

    if (juriAmount) {
      if (!juriNumber) {
        ToastAndroid.show('plese add Juri Number', ToastAndroid.SHORT);
        return;
      }
    }

    if (pattiAmount) {
      if (!pattiNumber) {
        ToastAndroid.show('plese add Patti Number', ToastAndroid.SHORT);
        return;
      }
    }

    if (singleNumber) {
      if (!singleAmount) {
        ToastAndroid.show('plese add Single Amount', ToastAndroid.SHORT);
        return;
      }
      if (singleAmount < 10) {
        ToastAndroid.show(
          'check you Single amount it should be more than 9',
          ToastAndroid.SHORT,
        );
        return;
      }
    }

    if (juriNumber) {
      if (!juriAmount) {
        ToastAndroid.show('plese add Juri Amount', ToastAndroid.SHORT);
        return;
      }

      if (juriAmount < 5) {
        ToastAndroid.show(
          'check you Jodi amount, it`s should be more than 4 ',
          ToastAndroid.SHORT,
        );
        return;
      }

      if (juriAmount > 20) {
        ToastAndroid.show(
          'You can`t add Jodi price more than 20',
          ToastAndroid.SHORT,
        );
        return;
      }
    }

    if (pattiNumber) {
      if (!pattiAmount) {
        ToastAndroid.show('plese add Patti Amount', ToastAndroid.SHORT);
        return;
      }

      if (pattiAmount < 5) {
        ToastAndroid.show('Please add More Patti Ammount ', ToastAndroid.SHORT);
        return;
      }
      if (pattiAmount > 20) {
        ToastAndroid.show(
          'You can`t add price more than 20 for patti',
          ToastAndroid.SHORT,
        );
        return;
      }
    }

    if (gameEntryArray.length + 1 > 7) {
      return ToastAndroid.showWithGravity(
        'Maximum Bid limit Reached',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    const newArray = {
      singleNumber,
      singleAmount,
      juriNumber,
      juriAmount,
      pattiNumber,
      pattiAmount,
    };
    if (
      singleAmount ||
      juriAmount ||
      pattiAmount ||
      singleNumber ||
      juriNumber ||
      pattiAmount
    ) {
      setGameEntry(oldArray => [...oldArray, newArray]);
    }

    changeSingleNumber('');
    changeSingleAmount('');
    changeJuriAmount('');
    changeJurieNumber('');
    changePattiAmount('');
    changePattiNumber('');
  }
  console.log(gameEntryArray.length);
  const handleDeleteRow = rowId => {
    return new Promise((resolve, reject) => {
      try {
        setGameEntry(prevRows =>
          prevRows.filter((row, index) => index !== rowId),
        );
        resolve(); // Resolve the Promise when the deletion is successful
      } catch (error) {
        reject(error); // Reject the Promise if there's an error during deletion
      }
    });
  };

  const handleUploadToTheServer = async () => {
    if (gameEntryArray.length == 0) {
      return ToastAndroid.show('plese add Data', ToastAndroid.LONG);
    }
    const totalBidAmount = calculateTotalAmount(gameEntryArray);
    if (totalBidAmount > wlBal) {
      return alert('your wallet balance is low');
    }
    // {"juriAmount": undefined, "juriNumber": undefined, "pattiAmount": undefined, "pattiNumber": undefined, "singleAmount": "999", "singleNumber": "89"}
    const data = [];
    gameEntryArray.forEach(item => {
      data.push({
        game_id: itemData.game_id,
        single: item.singleNumber,
        jodi: item.juriNumber,
        patti: item.pattiNumber,
        single_amt: item.singleAmount,
        jodi_amt: item.juriAmount,
        patti_amt: item.pattiAmount,
      });
    });
    console.log('----------------------------------', data);
    await axios
      .post(
        `${BASE_URL}/add-bid`,
        {
          data: data,
        },
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      )
      .then(async res => {
        // console.log("__________________________________________________", res.data)
        if (res.data.status == 'SUCCESS') {
          setGameEntry([]);
          navigation.navigate('GameEntry', {itemData});
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    getGameNameData();
  }, [gameEntryArray]);
  return (
    <SafeAreaView>
      <View style={authstyles.title}>
        <TitleBar />
      </View>
      <ScrollView style={styles.list_container2}>
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          colors={['#5ce1ff', '#8c1e96', '#1b2196']}
          style={styles.linearGradientBg}>
          {/* <View style={styles.inputContainer}> */}
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity
              onPress={handleSingleChnage}
              style={{
                alignSelf: 'center',
                backgroundColor: 'orange',
                paddingHorizontal: 10,
                paddingVertical: 5,
                margin: 10,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  color: '#ffff',
                  fontSize: 16,
                  textTransform: 'uppercase',
                }}>
                SINGLE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleJodiChnage}
              style={{
                alignSelf: 'center',
                backgroundColor: 'lavender',
                paddingHorizontal: 10,
                paddingVertical: 5,
                margin: 10,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  color: '#000000',
                  fontSize: 16,
                  textTransform: 'uppercase',
                }}>
                JODI
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePattiChnage}
              style={{
                alignSelf: 'center',
                backgroundColor: 'dodgerblue',
                paddingHorizontal: 10,
                paddingVertical: 5,
                margin: 10,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  color: '#ffff',
                  fontSize: 16,
                  textTransform: 'uppercase',
                }}>
                PATTI
              </Text>
            </TouchableOpacity>
          </View>
          <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            colors={['#5ce1ff', '#8c1e96', '#1b2196']}
            style={styles.inputContainer}>
            {/* Single */}
            {single && (
              <View style={{}}>
                <Text style={styles.titleStyle}> SINGLE </Text>
                <TextInput
                  style={styles.textInputStyle}
                  onChangeText={changeSingleNumber}
                  placeholder="Number"
                  value={singleNumber}
                  numberOfLines={2}
                  placeholderTextColor={'black'}
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.textInputStyle}
                  onChangeText={changeSingleAmount}
                  placeholder="Amount"
                  placeholderTextColor={'black'}
                  keyboardType="numeric"
                  value={singleAmount}
                />
              </View>
            )}
            {/* juri */}
            {jodi && (
              <View style={{}}>
                <Text style={styles.titleStyle}> JODI </Text>
                <TextInput
                  style={styles.textInputStyle}
                  onChangeText={changeJurieNumber}
                  placeholder="Number"
                  value={juriNumber}
                  placeholderTextColor={'black'}
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.textInputStyle}
                  onChangeText={changeJuriAmount}
                  placeholder="Amount"
                  value={juriAmount}
                  placeholderTextColor={'black'}
                  keyboardType="numeric"
                />
              </View>
            )}

            {patti && (
              <View style={{}}>
                <Text style={styles.titleStyle}> PATTI </Text>
                <TextInput
                  style={styles.textInputStyle}
                  onChangeText={changePattiNumber}
                  placeholder="Number"
                  value={pattiNumber}
                  placeholderTextColor={'black'}
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.textInputStyle}
                  onChangeText={changePattiAmount}
                  placeholder="Amount"
                  value={pattiAmount}
                  placeholderTextColor={'black'}
                  keyboardType="numeric"
                />
              </View>
            )}
          </LinearGradient>

          <TouchableOpacity
            onPress={handleSetGameEntryArray}
            style={{
              alignSelf: 'center',
              backgroundColor: 'orange',
              paddingHorizontal: 20,
              paddingVertical: 10,
              margin: 10,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontWeight: '600',
                color: '#ffff',
                fontSize: 20,
                textTransform: 'uppercase',
              }}>
              Add Bid
            </Text>
          </TouchableOpacity>

          {/* Table */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderTopRightRadius: 5,
              borderTopLeftRadius: 5,
              backgroundColor: '#FFFFFFAA',
              width: '93.4%',
            }}>
            {/* blanck text */}
            <Text
              style={{
                ...styles.cellText,
                borderRightWidth: 0,
                borderLeftWidth: 0,
              }}>
              {'  '}
            </Text>
            {/* single Text */}
            <Text
              style={{
                ...styles.cellText,
                borderRightWidth: 0,
                borderLeftWidth: 0,
                textAlign: 'center',
              }}>
              {'Single'}
            </Text>
            {/* Juri Text */}
            <Text
              style={{
                ...styles.cellText,
                borderRightWidth: 0,
                textAlign: 'center',
              }}>
              {'Jodi'}
            </Text>
            {/* Patti Text */}
            <Text
              style={{
                ...styles.cellText,
                borderRightWidth: 0,
                textAlign: 'center',
              }}>
              {'Patti'}
            </Text>
            {/* Blanck text */}
            <Text
              style={{
                ...styles.cellText,
                borderRightWidth: 1,
                borderLeftWidth: 0,
              }}>
              {''}
            </Text>
          </View>

          {gameEntryArray &&
            gameEntryArray.map((props, index) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  borderWidth: 1,
                  backgroundColor: '#EEEEEE55',
                }}
                key={index}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      borderBottomWidth: 1,
                    }}>
                    {/* Text 1 */}
                    <Text style={{...styles.cellText, borderLeftWidth: 0}}>
                      {'Digits'}
                    </Text>
                    {/* single Text */}
                    <Text style={styles.cellText}>{props.singleNumber}</Text>
                    {/* Juri Text */}
                    <Text style={styles.cellText}>{props.juriNumber}</Text>
                    {/* Patti Text */}
                    <Text style={{...styles.cellText, borderRightWidth: 1}}>
                      {props.pattiNumber}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    {/* Text 1 */}
                    <Text style={{...styles.cellText, borderLeftWidth: 0}}>
                      {'Amount'}
                    </Text>
                    {/* single Text */}
                    <Text style={styles.cellText}>{props.singleAmount}</Text>
                    {/* Juri Text */}
                    <Text style={styles.cellText}>{props.juriAmount}</Text>
                    {/* Patti Text */}
                    <Text style={{...styles.cellText, borderRightWidth: 1}}>
                      {props.pattiAmount}
                    </Text>
                  </View>
                </View>

                {/* delete button */}
                <TouchableOpacity
                  onPress={() => handleDeleteRow(index)}
                  style={{
                    paddingHorizontal: 2,
                    backgroundColor: 'red',
                    height: 30,
                    justifyContent: 'center',
                    borderRadius: 2,
                  }}>
                  <Text
                    style={{fontWeight: '700', fontSize: 12, color: 'white'}}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            ))}

          <TouchableOpacity
            onPress={() => {
              handleUploadToTheServer();
              // navigation.navigate('FFLION');
            }}
            style={{
              alignSelf: 'center',
              backgroundColor: 'gold',
              paddingHorizontal: 20,
              paddingVertical: 10,
              margin: 10,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontWeight: '600',
                color: '#ffff',
                fontSize: 20,
                textTransform: 'uppercase',
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GameEntry;

const styles = StyleSheet.create({
  linearGradientBg: {
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    padding: normalize(10),
  },
  inputContainer: {
    backgroundColor: '#3fc367',
    width: '100%',
    borderRadius: normalize(20),
    elevation: 8,
    borderWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
  },
  titleStyle: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: normalize(25),
    color: '#FFFFFF',
  },
  textInputStyle: {
    width: PixelRatio.roundToNearestPixel(300),
    maxWidth: PixelRatio.roundToNearestPixel(300),
    height: 50,
    margin: 5,
    marginVertical: 4,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    borderWidth: 0,
    backgroundColor: 'white',
    color: 'black',
    elevation: 5,
  },
  cellText: {
    borderLeftWidth: 1,
    paddingHorizontal: 2,
    width: 70,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});
