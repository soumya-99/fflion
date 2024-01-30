import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import TitleBar from '../../../component/titlebar/TitleBar';
import {authstyles} from '../../style/pagestyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {BASE_URL} from '../../../src/config';
import {AuthContext} from '../../../src/context/AuthContext';
import {useIsFocused} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import normalize, {SCREEN_HEIGHT, SCREEN_WIDTH} from 'react-native-normalize';
const WithdrawalHistory = () => {
  const {userInfo} = useContext(AuthContext);
  const [allTransaction, setAllTransaction] = useState([]);
  const isFocused = useIsFocused();

  const handleGetTransaction = () => {
    axios
      .get(`${BASE_URL}/transaction`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then(res => {
        setAllTransaction(res.data.data);
      })
      .catch(error => console.error(error.message));
  };

  useEffect(() => {
    handleGetTransaction();
  }, [isFocused]);

  const TransactionCardUi = ({item}) => {
    const newdate = new Date(item.created_at);
    return (
      <View
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 20,
          marginBottom: normalize(10),
          width: '100%',
        }}>
        {/* card container */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* Icon */}
          <View
            style={{
              backgroundColor: 'white',
              padding: 5,
              borderRadius: 50,
              marginRight: 10,
            }}>
            <FontAwesome name="arrow-down" size={30} color="#000000" />
          </View>
          {/* All Texts */}
          <View>
            <Text style={{color: '#FFFFFF', fontWeight: '500'}}>
              ₹ {item.amount}
            </Text>

            <Text style={{color: '#FFFFFF', fontWeight: '500'}}>
              {newdate.toLocaleString()}
            </Text>

            <Text style={{color: '#FFFFFF', fontWeight: '500'}}>
              Type :{' '}
              {item.trns_flag == 'D'
                ? 'DEPOSIT'
                : item.trns_flag == 'W'
                ? 'WITHDRAL'
                : item.trns_flag == 'WI'
                ? 'WINING'
                : item.trns_flag == 'EF'
                ? 'ENTRY FEE'
                : ''}
            </Text>
          </View>
        </View>

        {/* Pending */}
        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
          <Text
            style={{
              backgroundColor: '#fff',
              fontSize: 14,
              color: 'black',
              fontWeight: '600',
              padding: 10,
              borderRadius: 5,
            }}>
            {item.status == '0' ? 'PENDING' : 'SUCCESSFUL'}
          </Text>
        </View>
      </View>
    );
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
          <View>
            <Text
              style={{
                fontSize: normalize(20),
                color: '#FFFFFF',
                textTransform: 'uppercase',
                fontWeight: '800',
                padding: 10,
              }}>
              Withdrawal History
            </Text>
          </View>

          {allTransaction
            .filter(item => item.trns_flag === 'W')
            .map((item, index) => (
              <TransactionCardUi item={item} key={index} />
            ))}
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WithdrawalHistory;

const styles = StyleSheet.create({
  linearGradientBg: {
    minHeight: SCREEN_HEIGHT,
    height: 'auto',
    alignItems: 'center',
    padding: normalize(10),
  },
});
