import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import TitleBar from '../../component/titlebar/TitleBar';
import handleGetGameTime from '../../hooks/controller/Game/handleGetGameTime';
import {AuthContext} from '../../src/context/AuthContext';
import {useIsFocused} from '@react-navigation/native';
import normalize, {SCREEN_HEIGHT, SCREEN_WIDTH} from 'react-native-normalize';
import LinearGradient from 'react-native-linear-gradient';

const GameTime = ({navigation, route}) => {
  const isFocused = useIsFocused();

  const {userInfo} = useContext(AuthContext);
  const {game_id, game_name} = route.params;
  const {getGameTime} = handleGetGameTime();
  const [gameTime, SetGameTime] = useState([]);

  const [currentTime, setCurrentTime] = useState('');

  // ata a6e karon ami time take direct 24 hours a nichhi
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    getGameTime(game_id, userInfo.token)
      .then(res => {
        SetGameTime(res.data.data);
      })
      .catch(error => console.error(error));
  }, [isFocused]);

  // game_time
  const findFutureGame = () => {
    for (let i = 0; i < gameTime?.length; i++) {
      const checkgameTime = gameTime[i].game_time;
      // console.log(checkgameTime,currentTime,"\n")
      if (checkgameTime > currentTime) {
        return gameTime[i].game_id;
      }
    }
    return null; // Return null if no future game is found
  };
  const findFutureGameTwo = () => {
    let futureGameId = null; // Initialize to null by default

    gameTime?.forEach(game => {
      const checkgameTime = game.game_time;
      //   console.log(checkgameTime, currentTime);

      if (checkgameTime > currentTime) {
        futureGameId = game.game_id;
        // If you want to stop the iteration after finding the first future game, you can use 'return false;'
      }
    });
    console.log(futureGameId);
    return futureGameId; // Return null if no future game is found, or the game_id of the first future game found
  };

  const findFutureGameThree = () => {
    for (let i = 0; i < gameTime?.length; i++) {
      const checkgameTime = gameTime[i].game_time;
      console.log(checkgameTime);
      // console.log(checkgameTime,currentTime,"\n")
      if (checkgameTime > currentTime) {
        return gameTime?.game_id;
      }
    }
    return null; // Return null if no future game is found
  };

  useEffect(() => {
    // if (gameTime.length != 0) {
    //    const kk =  findFutureGameThree()
    //     console.log(kk)
    // }
  }, [gameTime]);

  const GameListTwo = ({item, index}) => {
    const futureGame = findFutureGame();
    const isLive = futureGame != null && futureGame == item.game_id;
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
                isLive &&
                navigation.navigate('GameEntry', {
                  itemData: item,
                })
              }
              style={{
                height: '50%',
                width: '140%',
                backgroundColor: isLive ? '#0b9c92' : 'hotpink',
                borderRadius: normalize(10),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                }}>
                {isLive ? 'Play ' : 'Close'}
              </Text>
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
          {gameTime?.map((item, index) => (
            <GameListTwo key={item.game_id} item={item} index={index} />
          ))}
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GameTime;

const styles = StyleSheet.create({
  linearGradientBg: {
    minHeight: SCREEN_HEIGHT,
    height: 'auto',
    alignItems: 'center',
    // padding: normalize(10),
  },
});
