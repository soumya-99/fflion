import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  PixelRatio,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import TitleBar from '../../component/titlebar/TitleBar';
import {AuthContext} from '../../src/context/AuthContext';
import handleGetGameName from '../../hooks/controller/Game/handleGetGameName';
import LudoImage from '../../assets/icon/dice.png';
import {useIsFocused} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import avatar1 from '../../assets/icon/avatar1.jpg';
import normalize, {SCREEN_HEIGHT, SCREEN_WIDTH} from 'react-native-normalize';

const Result = ({navigation}) => {
  const isFocused = useIsFocused();

  const {userInfo} = useContext(AuthContext);
  const [gameNameList, setGameNameList] = useState();
  const {getGameList} = handleGetGameName();

  useEffect(() => {
    if (!userInfo) {
      return;
    }
    getGameList(userInfo?.token)
      .then(res => {
        const data = res.data.data;
        console.log(data);
        setGameNameList(data);
      })
      .catch(error => console.error(error));
  }, [isFocused]);

  const GameListTwo = ({item, index}) => {
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
            style={{width: '17%', height: '70%', paddingLeft: normalize(10)}}>
            <Image
              source={avatar1}
              style={{width: '100%', height: '100%', borderRadius: 60}}
              resizeMode="cover"
            />
          </View>
          <View style={{width: '50%'}}>
            <Text style={{color: '#FFFFFF', fontWeight: '700'}}>
              {item.game_name}
            </Text>
          </View>
          <View style={{paddingRight: normalize(20)}}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ResultDetails', {
                  game_id: item.game_id,
                })
              }
              style={{
                height: '50%',
                width: '120%',
                backgroundColor: '#FFFFFF',
                borderRadius: normalize(10),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: '600', color: '#1b2196'}}>SHOW</Text>
            </TouchableOpacity>
          </View>
          {/* </View> */}
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
          <View style={{padding: normalize(20)}}>
            <Text
              style={{
                fontSize: normalize(25),
                fontWeight: '700',
                color: '#FFFFFF',
              }}>
              Results
            </Text>
          </View>
          {gameNameList?.map((item, index) => (
            <GameListTwo key={index} item={item} index={index} />
          ))}
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Result;

const styles = StyleSheet.create({
  linearGradientBg: {
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    // padding: normalize(10),
  },
});
