import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import TitleBar from '../../component/titlebar/TitleBar';
import {authstyles} from '../style/pagestyle';
import Banner from '../../component/banner/Banner';
import TransComp from '../../component/trans_component/TransComp';
import handleGetGameName from '../../hooks/controller/Game/handleGetGameName';
import {AuthContext} from '../../src/context/AuthContext';
import LudoImage from '../../assets/icon/dice.png';
import {useIsFocused} from '@react-navigation/native';
import normalize, {SCREEN_HEIGHT, SCREEN_WIDTH} from 'react-native-normalize';
import {SafeAreaView} from 'react-native-safe-area-context';

const MyBid = ({navigation}) => {
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: SCREEN_WIDTH / 1.04,
            height: SCREEN_HEIGHT / 10,
            backgroundColor: 'dodgerblue',
            borderRadius: normalize(10),
          }}>
          <View style={{width: '20%'}}>
            <Text>Image</Text>
          </View>
          <View style={{width: '30%'}}>
            <Text>{item.game_name}</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AllBid', {
                  game_id: item.game_id,
                  game_name: item.game_name,
                })
              }
              style={{
                height: '50%',
                width: '130%',
                backgroundColor: '#FFFFFF',
                borderRadius: normalize(10),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>SHOW</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={authstyles.container}>
      <View style={authstyles.title}>
        <TitleBar />
      </View>
      <ScrollView>
        <View>
          <FlatList
            data={gameNameList}
            keyExtractor={item => item.game_id}
            renderItem={({item, index}) => (
              <GameListTwo item={item} index={index} />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyBid;

const styles = StyleSheet.create({});
