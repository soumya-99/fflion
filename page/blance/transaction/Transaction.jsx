import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import TitleBar from '../../../component/titlebar/TitleBar';
import {authstyles} from '../../style/pagestyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {BASE_URL} from '../../../src/config';
import {AuthContext} from '../../../src/context/AuthContext';
import {useIsFocused} from '@react-navigation/native';
import Banner from '../../../component/banner/Banner';
import TransComp from '../../../component/trans_component/TransComp';
import LinearGradient from 'react-native-linear-gradient';
import normalize, {SCREEN_HEIGHT, SCREEN_WIDTH} from 'react-native-normalize';
const Transaction = () => {
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
        console.log('Transaction///////////', res.data.data)
        setAllTransaction(res.data.data);
      })
      .catch(error => console.error(error.message));
  };

  useEffect(() => {
    handleGetTransaction();
  }, [isFocused]);

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  

  const TransactionCardUi = ({item}) => {
    const timestamp = new Date(item.created_at);

    const newdate=formatDate(timestamp)
    console.log('timestamp',item.created_at)
    console.log('newdate',newdate)
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
            <FontAwesome name="trophy" size={30} color="#000000" />
          </View>
          {/* All Texts */}
          <View>
            <Text style={{color: '#FFFFFF', fontWeight: '500'}}>
              {item?.paymentMod === 'Bonus Money' ? 'Bonus' : item?.game_name}
            </Text>

            <Text style={{color: '#FFFFFF', fontWeight: '500'}}>
              {newdate.toLocaleString('en-GB')}
            </Text>

            {item?.paymentMod !== 'Bonus Money' && (
              <Text style={{color: '#FFFFFF', fontWeight: '500'}}>
                BAZI: {item.game_time}
              </Text>
            )}

            <Text style={{color: '#FFFFFF', fontWeight: '500'}}>
              BALANCE: ₹ {item.amount}
            </Text>
          </View>
        </View>

        {/* Pending */}
        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
          <Text
            style={{
              backgroundColor: '#5BB450',
              fontSize: 14,
              color: '#FFFFFF',
              fontWeight: '600',
              padding: 10,
              borderRadius: 5,
            }}>
            {/* {item.trns_flag == 'WI' ? 'WIN' : 'SUCCESSFUL'} */}
            WINNING
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
              Transaction
            </Text>
          </View>

          {allTransaction
            .filter(item => item?.trns_flag === 'WI')
            .map((item, index) => (
              <TransactionCardUi item={item} key={index} />
            ))}
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  linearGradientBg: {
    minHeight: SCREEN_HEIGHT,
    height: 'auto',
    alignItems: 'center',
    padding: normalize(10),
  },
});
