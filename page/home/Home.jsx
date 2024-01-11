import {
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  PixelRatio,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import TitleBar from '../../component/titlebar/TitleBar';
import {authstyles} from '../style/pagestyle';
import Icon from 'react-native-vector-icons/Entypo';

import normalize, {SCREEN_WIDTH} from 'react-native-normalize';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {ScrollView} from 'react-native-gesture-handler';
import OvalShapeButton from '../../component/Small/OvalShapeButton';
import handleGetGameName from '../../hooks/controller/Game/handleGetGameName';
import {AuthContext} from '../../src/context/AuthContext';
import TransComp from '../../component/trans_component/TransComp';
import Banner from '../../component/banner/Banner';
import OfferText from '../../component/offerText/OfferText';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Carousel from 'react-native-reanimated-carousel';

import carou0 from '../../assets/carou1.jpeg';
import carou1 from '../../assets/carou2.jpeg';
import carou2 from '../../assets/carou3.jpeg';

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

  function getColorByLetter(letter) {
    const alphabets = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];
    const colors = [
      '#FF6633',
      '#FFB399',
      '#FF33FF',
      '#8062D6',
      '#00B3E6',
      '#E6B333',
      '#3366E6',
      '#999966',
      '#99FF99',
      '#B34D4D',
      '#80B300',
      '#809900',
      '#E6B3B3',
      '#6680B3',
      '#66991A',
      '#FF99E6',
      '#CCFF1A',
      '#FF1A66',
      '#E6331A',
      '#33FFCC',
      '#66994D',
      '#B366CC',
      '#4D8000',
      '#B33300',
      '#CC80CC',
      '#66664D',
      '#991AFF',
    ];
    let upperLetter = letter.toUpperCase();

    const isAmpersandPresent = alphabets.includes(upperLetter);
    if (isAmpersandPresent) {
      return colors[alphabets.indexOf(upperLetter)];
    } else {
      return '#000000';
    }
  }

  const GameListTwo = ({item, index}) => {
    return (
      <>
        {/* Main Cointainer */}
        <View style={{width: '100%'}}>
          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 10,
              paddingHorizontal: 15,
              alignItems: 'center',
              marginBottom: 10,
              marginTop: 10,
              marginLeft: 10,
            }}>
            <View
              style={{
                position: 'absolute',
                left: -10,
                top: -10,
                height: 50,
                width: 50,
                borderWidth: 2,
                borderBottomColor: 'red',
                borderTopColor: 'yellow',
                borderLeftColor: 'green',
                backgroundColor: '#fff',
              }}>
              {/* image */}
              <Image
                source={require('../../assets/icon/dice.png')}
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
              />
            </View>
            {/* Game Name */}
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'white',
                left: 30,
                maxWidth: '70%',
                textAlign: 'center',
                width: '70%',
                backgroundColor: '#ff2937',
              }}>
              {item.game_name}
            </Text>

            {/* Play container */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('GameTime', {
                  game_id: item.game_id,
                  game_name: item.game_name,
                })
              }
              style={{
                backgroundColor: 'yellow',
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
                Play
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
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
    <SafeAreaView>
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
                    flex: 1,
                    borderWidth: 1,
                    justifyContent: 'center',
                  }}>
                  {/* <Text style={{textAlign: 'center', fontSize: 30}}>{item}</Text> */}
                  <Image
                    source={item.img}
                    style={{
                      alignItems: 'center',
                      alignSelf: 'center',
                      width: SCREEN_WIDTH,
                      height: normalize(187),
                    }}
                  />
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
        <View>
          <Text>
            jjasdfhisduhyisdghfriwefris sadf sryidufrwrefysgf sidfiurstgfbksd
            dasoyhfsjjasdfhisduhyisdghfriwefris sadf sryidufrwrefysgf
            sidfiurstgfbksd dasoyhfsjjasdfhisduhyisdghfriwefris sadf
            sryidufrwrefysgf sidfiurstgfbksd dasoyhfsjjasdfhisduhyisdghfriwefris
            sadf sryidufrwrefysgf sidfiurstgfbksd
            dasoyhfsjjasdfhisduhyisdghfriwefris sadf sryidufrwrefysgf
            sidfiurstgfbksd dasoyhfsjjasdfhisduhyisdghfriwefris sadf
            sryidufrwrefysgf sidfiurstgfbksd dasoyhfsjjasdfhisduhyisdghfriwefris
          </Text>
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
  transactionCompContainer: {
    width: SCREEN_WIDTH,
    height: 'auto',
    backgroundColor: '#d7e2ff',
  },
});
