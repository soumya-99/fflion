import {
  ToastAndroid,
  PixelRatio,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import TitleBar from '../../component/titlebar/TitleBar';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import {BASE_URL} from '../../src/config';
import {AuthContext} from '../../src/context/AuthContext';
import normalize, {SCREEN_HEIGHT} from 'react-native-normalize';
import LinearGradient from 'react-native-linear-gradient';
import {areDigitsUnique, findPermute} from '../../src/utils/cp_algorithm';

const GameEntry = ({route, navigation}) => {
  const {itemData} = route.params;
  const {userInfo} = useContext(AuthContext);

  const singleAmountInputRef = useRef(null);
  const jodiAmountInputRef = useRef(null);
  const pattiAmountInputRef = useRef(null);
  const cpAmountInputRef = useRef(null);

  const [singleNumber, changeSingleNumber] = useState('');
  const [singleAmount, changeSingleAmount] = useState('');

  const [juriNumber, changeJurieNumber] = useState('');
  const [juriAmount, changeJuriAmount] = useState('');

  const [pattiNumber, changePattiNumber] = useState('');
  const [pattiAmount, changePattiAmount] = useState('');

  const [cpNumber, changeCpNumber] = useState('');
  const [cpAmount, changeCpAmount] = useState('');

  const [gameEntryArray, setGameEntry] = useState([]);
  const [wlBal, setWlBal] = useState();

  const [single, setSingle] = useState(() => false);
  const [jodi, setJodi] = useState(() => false);
  const [patti, setPatti] = useState(() => false);
  const [cp, setCp] = useState(() => false);

  const handleChangeSingleNumber = txt => {
    changeSingleNumber(txt);
    if (txt.length === 1) {
      singleAmountInputRef.current.focus();
    }
  };
  const handleChangeJodiNumber = txt => {
    changeJurieNumber(txt);
    if (txt.length === 2) {
      jodiAmountInputRef.current.focus();
    }
  };
  const handleChangePattiNumber = txt => {
    changePattiNumber(txt);
    if (txt.length === 3) {
      pattiAmountInputRef.current.focus();
    }
  };
  const handleChangeCpNumber = txt => {
    changeCpNumber(txt);
    if (txt.length === 5) {
      cpAmountInputRef.current.focus();
    }
  };

  const handleSingleChnage = txt => {
    setSingle(true);
    setJodi(false);
    setPatti(false);
    setCp(false);

    setGameEntry([]);
    changeJurieNumber('');
    changeJuriAmount('');
    changePattiNumber('');
    changePattiAmount('');
    changeCpNumber('');
    changeCpAmount('');
  };
  const handleJodiChnage = txt => {
    setJodi(true);
    setSingle(false);
    setPatti(false);
    setCp(false);

    setGameEntry([]);
    changeSingleNumber('');
    changeSingleAmount('');
    changePattiNumber('');
    changePattiAmount('');
    changeCpNumber('');
    changeCpAmount('');
  };
  const handlePattiChnage = txt => {
    setPatti(true);
    setSingle(false);
    setJodi(false);
    setCp(false);

    setGameEntry([]);
    changeSingleNumber('');
    changeSingleAmount('');
    changeJurieNumber('');
    changeJuriAmount('');
    changeCpNumber('');
    changeCpAmount('');
  };

  const handleCpChnage = txt => {
    setCp(true);
    setPatti(false);
    setSingle(false);
    setJodi(false);

    setGameEntry([]);
    changeSingleNumber('');
    changeSingleAmount('');
    changeJurieNumber('');
    changeJuriAmount('');
    changePattiNumber('');
    changePattiAmount('');
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
        ToastAndroid.show('Please add Single Number', ToastAndroid.SHORT);
        return;
      }
    }

    if (juriAmount) {
      if (!juriNumber) {
        ToastAndroid.show('Please add Juri Number', ToastAndroid.SHORT);
        return;
      }
    }

    if (pattiAmount) {
      if (!pattiNumber) {
        ToastAndroid.show('Please add Patti Number', ToastAndroid.SHORT);
        return;
      }
    }

    if (singleNumber) {
      if (!singleAmount) {
        ToastAndroid.show('Please add Single Amount', ToastAndroid.SHORT);
        return;
      }
      if (singleAmount < 5) {
        ToastAndroid.show(
          'Single amount should be more than ₹5.',
          ToastAndroid.SHORT,
        );
        return;
      }
      if (singleAmount > 4999) {
        ToastAndroid.show(
          'Single amount should be less than ₹4999.',
          ToastAndroid.SHORT,
        );
        return;
      }
    }

    if (juriNumber) {
      if (!juriAmount) {
        ToastAndroid.show('Please add Juri Amount', ToastAndroid.SHORT);
        return;
      }

      if (juriAmount < 1 || juriAmount > 100) {
        ToastAndroid.show(
          'Jodi amount should be in between ₹1 to ₹100.',
          ToastAndroid.SHORT,
        );
        return;
      }

      // if (juriAmount > 20) {
      //   ToastAndroid.show(
      //     'You can`t add Jodi price more than 20',
      //     ToastAndroid.SHORT,
      //   );
      //   return;
      // }
    }

    if (pattiNumber) {
      if (!pattiAmount) {
        ToastAndroid.show('Please add Patti Amount', ToastAndroid.SHORT);
        return;
      }

      if (pattiAmount < 1 || pattiAmount > 100) {
        ToastAndroid.show(
          'Patti amount should be in between ₹1 to ₹100.',
          ToastAndroid.SHORT,
        );
        return;
      }
      // if (pattiAmount > 20) {
      //   ToastAndroid.show(
      //     'You can`t add price more than 20 for patti',
      //     ToastAndroid.SHORT,
      //   );
      //   return;
      // }
    }

    if (cpAmount) {
      if (!cpNumber) {
        ToastAndroid.show('Please add CP Number', ToastAndroid.SHORT);
        return;
      }

      if (cpAmount > 100) {
        ToastAndroid.show(
          'You can`t add price more than 100 for CP.',
          ToastAndroid.SHORT,
        );
        return;
      }
    }

    if (cpNumber) {
      if (cpNumber.length < 5) {
        ToastAndroid.show('CP number must be 5 digits.', ToastAndroid.SHORT);
        return;
      }
      let isUnique = areDigitsUnique(parseInt(cpNumber));
      if (!isUnique) {
        ToastAndroid.show('All digits should be unique.', ToastAndroid.SHORT);
        return;
      }
    }

    if (gameEntryArray.length + 1 > 6) {
      return ToastAndroid.showWithGravity(
        'Maximum Bid limit Reached.',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    const newFieldsObject = {
      singleNumber,
      singleAmount,
      juriNumber,
      juriAmount,
      pattiNumber,
      pattiAmount,
      cpNumber,
      cpAmount,
    };
    if (
      singleAmount ||
      juriAmount ||
      pattiAmount ||
      singleNumber ||
      juriNumber ||
      pattiAmount ||
      cpNumber ||
      cpAmount
    ) {
      if (cp) {
        // let cpNumbers = generateUniqueThreeDigitNumbersFromFiveDigit(
        //   parseInt(cpNumber),
        // );
        let inputString = cpNumber;
        let kValue = 3;
        let cpNumbers = [];
        let tempArray = [];

        findPermute(inputString, kValue, cpNumbers, tempArray, 0);
        // let cpNumbers = generatePermutations(parseInt(cpNumber));
        cpNumbers.forEach(item => {
          let itemStr = item.toString();
          console.log('itemStritemStritemStritemStritemStr', itemStr);
          setGameEntry(oldFieldsObject => [
            ...oldFieldsObject,
            {...newFieldsObject, pattiNumber: itemStr, pattiAmount: cpAmount},
          ]);
        });
      } else {
        setGameEntry(oldFieldsObject => [...oldFieldsObject, newFieldsObject]);
      }
    }

    changeSingleNumber('');
    changeSingleAmount('');
    changeJuriAmount('');
    changeJurieNumber('');
    changePattiAmount('');
    changePattiNumber('');
    changeCpNumber('');
    changeCpAmount('');
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
      return ToastAndroid.show('Please add Data', ToastAndroid.LONG);
    }
    const totalBidAmount = calculateTotalAmount(gameEntryArray);
    if (totalBidAmount > wlBal) {
      return alert('Your wallet balance is low');
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
          navigation.navigate('HomeNav');
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
          {/* <View style={styles.inputContainer}> */}
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity
              onPress={handleSingleChnage}
              style={{
                alignSelf: 'center',
                backgroundColor: '#FF9800',
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
                backgroundColor: '#6FC276',
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
            <TouchableOpacity
              onPress={handleCpChnage}
              style={{
                alignSelf: 'center',
                backgroundColor: '#f5564a',
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
                CP
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
                  autoFocus
                  style={styles.textInputStyle}
                  onChangeText={handleChangeSingleNumber}
                  placeholder="Number"
                  value={singleNumber}
                  numberOfLines={2}
                  placeholderTextColor={'black'}
                  keyboardType="numeric"
                  maxLength={1}
                />
                <TextInput
                  ref={singleAmountInputRef}
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
                  autoFocus
                  style={styles.textInputStyle}
                  onChangeText={handleChangeJodiNumber}
                  placeholder="Number"
                  value={juriNumber}
                  placeholderTextColor={'black'}
                  keyboardType="numeric"
                  maxLength={2}
                />
                <TextInput
                  ref={jodiAmountInputRef}
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
                  autoFocus
                  style={styles.textInputStyle}
                  onChangeText={handleChangePattiNumber}
                  placeholder="Number"
                  value={pattiNumber}
                  placeholderTextColor={'black'}
                  keyboardType="numeric"
                  maxLength={3}
                />
                <TextInput
                  ref={pattiAmountInputRef}
                  style={styles.textInputStyle}
                  onChangeText={changePattiAmount}
                  placeholder="Amount"
                  value={pattiAmount}
                  placeholderTextColor={'black'}
                  keyboardType="numeric"
                />
              </View>
            )}

            {cp && (
              <View style={{}}>
                <Text style={styles.titleStyle}> CP </Text>
                <TextInput
                  autoFocus
                  style={styles.textInputStyle}
                  onChangeText={handleChangeCpNumber}
                  placeholder="Number"
                  value={cpNumber}
                  placeholderTextColor={'black'}
                  keyboardType="numeric"
                  maxLength={5}
                />
                <TextInput
                  ref={cpAmountInputRef}
                  style={styles.textInputStyle}
                  onChangeText={changeCpAmount}
                  placeholder="Amount"
                  value={cpAmount}
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
              backgroundColor: '#ba184f',
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

          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderTopRightRadius: 5,
              borderTopLeftRadius: 5,
              backgroundColor: '#FFFFFFAA',
              width: '93.4%',
            }}>
            <Text
              style={{
                ...styles.cellText,
                borderRightWidth: 0,
                borderLeftWidth: 0,
              }}>
              {'  '}
            </Text>
            {single && (
              <Text
                style={{
                  ...styles.cellText,
                  borderRightWidth: 0,
                  borderLeftWidth: 0,
                  textAlign: 'center',
                }}>
                {'Single'}
              </Text>
            )}
            {jodi && (
              <Text
                style={{
                  ...styles.cellText,
                  borderRightWidth: 0,
                  textAlign: 'center',
                }}>
                {'Jodi'}
              </Text>
            )}
            {patti && (
              <Text
                style={{
                  ...styles.cellText,
                  borderRightWidth: 0,
                  textAlign: 'center',
                }}>
                {'Patti'}
              </Text>
            )}
            {cp && (
              <Text
                style={{
                  ...styles.cellText,
                  borderRightWidth: 0,
                  textAlign: 'center',
                }}>
                {'CP'}
              </Text>
            )}
            <Text
              style={{
                ...styles.cellText,
                borderRightWidth: 1,
                borderLeftWidth: 0,
              }}>
              {''}
            </Text>
          </View> */}

          {gameEntryArray &&
            gameEntryArray.map((props, index) => (
              <View
                style={{
                  width: '100%',
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
                    {single && (
                      <Text style={styles.cellText}>{props.singleNumber}</Text>
                    )}
                    {/* Juri Text */}
                    {jodi && (
                      <Text style={styles.cellText}>{props.juriNumber}</Text>
                    )}
                    {/* Patti Text */}
                    {patti && (
                      <Text style={{...styles.cellText, borderRightWidth: 1}}>
                        {props.pattiNumber}
                      </Text>
                    )}
                    {/* CP Text */}
                    {cp && (
                      <Text style={{...styles.cellText, borderRightWidth: 1}}>
                        {props.pattiNumber}
                      </Text>
                    )}
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
                    {/* single Amount */}
                    {single && (
                      <Text style={styles.cellText}>{props.singleAmount}</Text>
                    )}
                    {/* Juri Amount */}
                    {jodi && (
                      <Text style={styles.cellText}>{props.juriAmount}</Text>
                    )}
                    {/* Patti Amount */}
                    {patti && (
                      <Text style={{...styles.cellText, borderRightWidth: 1}}>
                        {props.pattiAmount}
                      </Text>
                    )}
                    {/* CP Amount */}
                    {cp && (
                      <Text style={{...styles.cellText, borderRightWidth: 1}}>
                        {props.pattiAmount}
                      </Text>
                    )}
                  </View>
                </View>

                {/* delete button */}
                <TouchableOpacity
                  onPress={() => handleDeleteRow(index)}
                  style={{
                    paddingHorizontal: 2,
                    backgroundColor: 'red',
                    height: 35,
                    width: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 12,
                      color: 'white',
                      textTransform: 'uppercase',
                    }}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            ))}

          <TouchableOpacity
            onPress={() => {
              handleUploadToTheServer();
            }}
            style={{
              alignSelf: 'center',
              backgroundColor: '#010048',
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
    minHeight: SCREEN_HEIGHT,
    height: 'auto',
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
    // borderLeftWidth: 1,
    fontSize: normalize(18),
    paddingHorizontal: 2,
    width: 70,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});
