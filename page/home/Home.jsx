import {StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import TitleBar from '../../component/titlebar/TitleBar';
import AntDesign from 'react-native-vector-icons/AntDesign';

import normalize, {SCREEN_HEIGHT, SCREEN_WIDTH} from 'react-native-normalize';
import {ScrollView} from 'react-native-gesture-handler';
import handleGetGameName from '../../hooks/controller/Game/handleGetGameName';
import {AuthContext} from '../../src/context/AuthContext';
import TransComp from '../../component/trans_component/TransComp';
import OfferText from '../../component/offerText/OfferText';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Carousel from 'react-native-reanimated-carousel';

import carou0 from '../../assets/carou1.jpeg';
import carou1 from '../../assets/carou2.jpeg';
import carou2 from '../../assets/carou3.jpeg';
import LinearGradient from 'react-native-linear-gradient';

const ALL_CAROUSELS = [
  {
    img: carou0,
  },
  {
    img: carou1,
  },
  {
    img: carou2,
  },
];

const Home = ({navigation}) => {
  const isFocused = useIsFocused();

  const {userInfo} = useContext(AuthContext);
  const [gameNameList, setGameNameList] = useState();
  const {getGameList} = handleGetGameName();

  const GameListNew = ({item}) => {
    return (
      <View style={{alignItems: 'center'}}>
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          colors={['#5ce1ff', '#8c1e96', '#1b2196']}
          style={styles.gameBox}>
          <Text style={styles.linearGradientbuttonText}>{item.game_name}</Text>
        </LinearGradient>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('GameTime', {
              game_id: item.game_id,
              game_name: item.game_name,
            })
          }
          style={{
            height: normalize(30),
            width: normalize(70),
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            top: normalize(-15),
            borderRadius: normalize(10),
          }}>
          <Text style={{textAlign: 'center', justifyContent: 'center'}}>
            PLAY <AntDesign name="caretright" size={12} color="tomato" />
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

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

  return (
    <SafeAreaView style={{marginBottom: SCREEN_HEIGHT / 18}}>
      <View>
        <TitleBar />
      </View>
      <ScrollView>
        <View style={styles.marqueeAndCarouselContainer}>
          <View style={{backgroundColor: '#ffdbf5'}}>
            <OfferText />
          </View>
          <View>
            <Carousel
              loop
              width={SCREEN_WIDTH}
              height={SCREEN_WIDTH / 2}
              autoPlay={true}
              data={ALL_CAROUSELS}
              scrollAnimationDuration={1000}
              // onSnapToItem={index => console.log('current index:', index)}
              renderItem={({index, item}) => (
                <View
                  style={{
                    borderWidth: 1,
                    justifyContent: 'center',
                  }}>
                  {/* <Text style={{textAlign: 'center', fontSize: 30}}>{item}</Text> */}
                  <Image source={item.img} style={styles.carouselImageStyle} />
                </View>
              )}
            />
          </View>
          <View style={{backgroundColor: '#ffdbf5'}}>
            <OfferText />
          </View>
        </View>
        <View style={styles.transactionCompContainer}>
          <TransComp />
        </View>
        <View style={{padding: normalize(10)}}>
          <View style={{marginBottom: normalize(10)}}>
            <Text style={{fontSize: normalize(25), fontWeight: '700'}}>
              Today's Highlight
            </Text>
          </View>
          <View style={styles.gameListWrapper}>
            {gameNameList?.map((item, index) => (
              <GameListNew key={index} item={item} index={index} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  marqueeAndCarouselContainer: {
    width: SCREEN_WIDTH,
  },
  carouselImageStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    width: SCREEN_WIDTH,
    height: normalize(187),
  },
  transactionCompContainer: {
    width: SCREEN_WIDTH,
    height: 'auto',
    backgroundColor: '#d7e2ff',
  },
  gameBox: {
    width: SCREEN_WIDTH / 2.3,
    height: SCREEN_HEIGHT / 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(5),
    borderRadius: normalize(10),
  },
  linearGradientbuttonText: {
    color: 'white',
    textAlign: 'center',
  },
  gameListWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
});
