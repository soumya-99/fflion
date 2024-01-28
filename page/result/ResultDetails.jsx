import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  PixelRatio,
  SafeAreaView,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {authstyles} from '../style/pagestyle';
import TitleBar from '../../component/titlebar/TitleBar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ExampleOne from './ExampleOne';
import handleGetGameName from '../../hooks/controller/Game/handleGetGameName';
import {AuthContext} from '../../src/context/AuthContext';
import handleGetResult from '../../hooks/controller/Game/Results/handleGetResult';
import handleGetGameTime from '../../hooks/controller/Game/handleGetGameTime';
import {useIsFocused} from '@react-navigation/native';
import {RadioButton} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import normalize, {SCREEN_HEIGHT, SCREEN_WIDTH} from 'react-native-normalize';

const ResultDetails = ({navigation, route}) => {
  const [active, setActive] = useState(false);
  const {userInfo} = useContext(AuthContext);
  const [results, setResults] = useState();
  const {getResult} = handleGetResult();
  const {game_id, game_name} = route.params;
  const {getGameTime} = handleGetGameTime();
  const [gameLength, SetGameLength] = useState();
  const isFocused = useIsFocused();
  const [radioVal, setRadioVal] = useState('Single / Patti');

  function handleSingleorPattiData() {
    setRadioVal('Single / Patti');
    setActive(false);
  }

  function handleJoriData() {
    setRadioVal('Jodi');
    setActive(true);
  }

  useEffect(() => {
    getGameTime(game_id, userInfo.token)
      .then(res => {
        SetGameLength(res.data.data.length);
      })
      .catch(error => console.error(error));
  }, [isFocused]);
  useEffect(() => {
    if (!userInfo) {
      return;
    }
    getResult(game_id, userInfo?.token)
      .then(res => {
        const data = res.data.data;
        console.log('getResult', data);
        console.log('userInfo?.token', userInfo?.token);
        console.log('game_id', game_id);
        setResults(data);
      })
      .catch(error => console.error(error));
  }, [isFocused]);
  return (
    <SafeAreaView style={{marginBottom: SCREEN_HEIGHT / 18}}>
      <View style={authstyles.title}>
        <TitleBar />
      </View>

      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        colors={['#5ce1ff', '#8c1e96', '#1b2196']}
        style={styles.linearGradientBg}>
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
            justifyContent: 'space-around',
            alignItems: 'center',
            width: SCREEN_WIDTH / 1.1,
          }}>
          <RadioButton
            value="Single / Patti"
            status={radioVal === 'Single / Patti' ? 'checked' : 'unchecked'}
            onPress={handleSingleorPattiData}
            color="#FFFFFF"
            uncheckedColor="#FFFFFF"
          />
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: normalize(20),
              fontWeight: '700',
            }}>
            Single / Patti
          </Text>
          <RadioButton
            value="Jodi"
            status={radioVal === 'Jodi' ? 'checked' : 'unchecked'}
            onPress={handleJoriData}
            color="#FFFFFF"
            uncheckedColor="#FFFFFF"
          />
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: normalize(20),
              fontWeight: '700',
            }}>
            Jodi
          </Text>
        </View>
        <ScrollView style={{marginHorizontal: normalize(20), width: '100%'}}>
          {results &&
            results.map((props, index) => (
              <ExampleOne
                data={[props]}
                isSingle={active}
                gameLength={gameLength}
              />
            ))}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ResultDetails;

const styles = StyleSheet.create({
  linearGradientBg: {
    minHeight: SCREEN_HEIGHT,
    height: 'auto',
    alignItems: 'center',
    padding: normalize(10),
    // marginHorizontal: normalize(20),
  },

  inputContainer: {
    backgroundColor: '#3fc367',
    width: '100%',
    borderRadius: 10,
    elevation: 8,
    borderWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
  },
  titleStyle: {
    textAlign: 'center',
    fontWeight: '900',
    color: 'black',
  },
  textInputStyle: {
    width: PixelRatio.roundToNearestPixel(95),
    maxWidth: PixelRatio.roundToNearestPixel(95),
    height: 40,
    margin: 5,
    marginVertical: 4,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor: 'white',
    color: 'black',
    elevation: 5,
  },

  cellText: {
    borderLeftWidth: 1,
    paddingHorizontal: 2,
    width: 65,
    fontWeight: '500',
    color: 'black',
  },
  buttonTextStyle: {
    color: 'white',
    fontWeight: '600',
    padding: 10,
    fontSize: 16,
    letterSpacing: 2,
  },
});
