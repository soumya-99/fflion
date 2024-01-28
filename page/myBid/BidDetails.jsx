import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
  SafeAreaView,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {authstyles} from '../style/pagestyle';
import TitleBar from '../../component/titlebar/TitleBar';
import Banner from '../../component/banner/Banner';
import TransComp from '../../component/trans_component/TransComp';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import {BASE_URL} from '../../src/config';
import {AuthContext} from '../../src/context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import normalize, {SCREEN_HEIGHT, SCREEN_WIDTH} from 'react-native-normalize';

const BidDetails = ({navigation, route}) => {
  const {itemData, game_name} = route.params;
  const {userInfo} = useContext(AuthContext);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [gameBidArray, setGameBidArray] = useState([]);

  const handleGetBidList = async () => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    await axios
      .get(
        `${BASE_URL}/my-bid?fDate=${formattedDate}&game_id=${itemData.game_id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        },
      )
      .then(res => {
        setGameBidArray(res.data.data);
      })
      .catch(error => console.error(error));
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
              marginBottom: normalize(20),
              padding: normalize(20),
              width: SCREEN_WIDTH,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#FFFFFF',
                fontSize: normalize(30),
                fontWeight: '600',
              }}>
              {game_name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: SCREEN_HEIGHT / 20,
                padding: 10,
              }}>
              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={{
                  width: SCREEN_WIDTH / 3,
                  height: SCREEN_HEIGHT / 20,
                  backgroundColor: 'lavender',
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#000000',
                    textTransform: 'uppercase',
                    fontWeight: '700',
                  }}>
                  {date.toLocaleDateString('en-GB')}
                </Text>
                <DatePicker
                  modal
                  mode="date"
                  open={open}
                  date={date}
                  onConfirm={date => {
                    setOpen(false);
                    setDate(date);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleGetBidList}
                style={{
                  width: SCREEN_WIDTH / 3,
                  height: SCREEN_HEIGHT / 20,
                  backgroundColor: 'gold',
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#000000',
                    textTransform: 'uppercase',
                    fontWeight: '700',
                  }}>
                  Show
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Table */}
          {/* Table Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderTopRightRadius: 5,
              borderTopLeftRadius: 5,
              backgroundColor: '#6ce1ffbb',
              // marginTop: 30,
            }}>
            {/* blanck text */}
            <Text
              style={{
                ...styles.cellText,
                width: 98,
                textAlign: 'center',
              }}>
              {' Date '}
            </Text>
            {/* single Text */}
            <Text
              style={{
                ...styles.cellText,

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
              {'Judi'}
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
              }}>
              {'Status'}
            </Text>
          </View>

          {gameBidArray &&
            gameBidArray.map((props, index) => {
              let newdate = props.created_at
                ? new Date(props.created_at)
                : false;

              // console.log(
              //   '19593465316589761387563485837468957362',
              //   props.created_at,
              // );
              // console.log('19593465316589761387563485837468957362', props);

              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    borderWidth: 1,
                    backgroundColor: '#FFFFFFAA',
                    width: '100%',
                  }}>
                  <View
                    style={{
                      // paddingHorizontal: 2,
                      height: 30,
                      justifyContent: 'center',
                      borderRadius: 2,
                    }}>
                    <Text
                      style={{
                        fontWeight: '700',
                        fontSize: 12,
                        color: '#FFFFFF',
                        width: 55,
                      }}>
                      {newdate && newdate?.toLocaleDateString()}
                    </Text>
                  </View>
                  {/* table start */}
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderStyle: 'dashed',
                      }}>
                      {/* single Text */}
                      <Text style={styles.cellText}>
                        {props.single || ' - '}
                      </Text>
                      {/* Juri Text */}
                      <Text style={styles.cellText}>{props.jodi || ' - '}</Text>
                      {/* Patti Text */}
                      <Text style={{...styles.cellText, borderRightWidth: 1}}>
                        {props.patti || ' - '}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}>
                      {/* single Text */}
                      <Text style={styles.cellText}>{props.single_amt}</Text>
                      {/* Juri Text */}
                      <Text style={styles.cellText}>{props.jodi_amt}</Text>
                      {/* Patti Text */}
                      <Text style={{...styles.cellText, borderRightWidth: 1}}>
                        {props.patti_amt}
                      </Text>
                    </View>
                  </View>

                  {/* delete button */}
                  <View
                    style={{
                      paddingHorizontal: 2,
                      height: 30,
                      justifyContent: 'center',
                      borderRadius: 2,
                    }}>
                    <Text
                      style={{
                        fontWeight: '700',
                        fontSize: 12,
                        color: 'black',
                      }}>
                      {props.trns_flag == 'WI' ? 'WIN' : '      '}
                    </Text>
                  </View>
                </View>
              );
            })}
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BidDetails;

const styles = StyleSheet.create({
  linearGradientBg: {
    minHeight: SCREEN_HEIGHT,
    height: 'auto',
    alignItems: 'center',
    // padding: normalize(10),
  },
  cellText: {
    borderLeftWidth: 1,
    paddingHorizontal: 2,
    width: 65,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
