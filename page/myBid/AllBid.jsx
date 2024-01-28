import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {authstyles} from '../style/pagestyle';
import TitleBar from '../../component/titlebar/TitleBar';
import handleGetGameTime from '../../hooks/controller/Game/handleGetGameTime';
import {AuthContext} from '../../src/context/AuthContext';
import OfferText from '../../component/offerText/OfferText';
import Banner from '../../component/banner/Banner';
import TransComp from '../../component/trans_component/TransComp';
import {useIsFocused} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import normalize, {SCREEN_HEIGHT, SCREEN_WIDTH} from 'react-native-normalize';

const AllBid = ({navigation, route}) => {
  const {userInfo} = useContext(AuthContext);
  const isFocused = useIsFocused();

  const {game_id, game_name} = route.params;
  const {getGameTime} = handleGetGameTime();
  const [gameTime, SetGameTime] = useState();
  console.log(game_id);
  useEffect(() => {
    getGameTime(game_id, userInfo.token)
      .then(res => {
        SetGameTime(res.data.data);
      })
      .catch(error => console.error(error));
  }, [isFocused]);

  const GameListTwo = ({item, index}) => {
    // console.log("hello  ", item)
    const ordinalNumber =
      index + 1 === 1
        ? '1st'
        : index + 1 === 2
        ? '2nd'
        : index + 1 === 3
        ? '3rd'
        : `${index + 1}th`;

    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: normalize(8),
        }}>
        <LinearGradient
          start={{x: 1, y: 0}}
          end={{x: 0, y: 2}}
          colors={['#8c1e96', '#1b2196']}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: SCREEN_WIDTH / 1.04,
            height: SCREEN_HEIGHT / 10,
            borderRadius: normalize(10),
          }}>
          <View
            style={{
              width: '40%',
              height: '70%',
              paddingLeft: normalize(20),
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{fontSize: 13, fontWeight: 'bold', color: '#FFFFFF'}}>
              GAME TIME
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{fontSize: 13, fontWeight: 'bold', color: '#FFFFFF'}}>
              {item.game_time}
            </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{fontSize: 12, fontWeight: 'bold', color: '#FFFFFF'}}>
              RESULT : {item.result_time}
            </Text>
          </View>
          <View style={{width: '20%'}}>
            <Text style={{color: '#FFFFFF', fontWeight: '700'}}>
              {ordinalNumber} Bazi
            </Text>
          </View>
          <View style={{paddingRight: normalize(35)}}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('BidDetails', {
                  itemData: item,
                  game_name,
                })
              }
              style={{
                height: '50%',
                width: '140%',
                backgroundColor: '#0b9c92',
                borderRadius: normalize(10),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: '600', color: '#FFFFFF'}}>SHOW</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
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
          <Text
            style={{
              textAlign: 'center',
              color: '#FFFFFF',
              fontSize: normalize(20),
              fontWeight: '600',
              padding: normalize(5),
            }}>
            {game_name}
          </Text>
          {/* <FlatList
            data={gameTime}
            keyExtractor={item => item.game_id}
            renderItem={({item, index}) => (
              <GameListTwo item={item} index={index} />
            )}
          /> */}

          {gameTime?.map((item, index) => (
            <GameListTwo key={item.game_id} item={item} index={index} />
          ))}
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllBid;

const styles = StyleSheet.create({
  linearGradientBg: {
    minHeight: SCREEN_HEIGHT,
    height: 'auto',
    alignItems: 'center',
    // padding: normalize(10),
  },
});
