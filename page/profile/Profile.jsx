import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import TitleBar from '../../component/titlebar/TitleBar';
import normalize, {SCREEN_HEIGHT, SCREEN_WIDTH} from 'react-native-normalize';
import {AuthContext} from '../../src/context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';

const Profile = () => {
  const {userInfo, isLoading} = useContext(AuthContext);
  console.log('hel', userInfo.user.name);
  return (
    <SafeAreaView>
      <View>
        <TitleBar />
      </View>
      <ScrollView>
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          colors={['#5ce1ff', '#8c1e96', '#1b2196']}
          style={styles.linearGradientBg}>
          <LinearGradient
            start={{x: 1, y: 0}}
            end={{x: 0, y: 2}}
            colors={['#8c1e96', '#1b2196']}
            style={styles.gameBox}>
            <View>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontWeight: '700',
                  fontSize: normalize(22),
                }}>
                PERSONAL INFORMATION
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#FFFFFF',
                  width: '100%',
                }}></View>
            </View>
            <View style={{justifyContent: 'space-evenly', height: '100%'}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.textStyle}>ID.</Text>
                <Text style={styles.textStyle}>{userInfo.user.id}</Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.textStyle}>Name</Text>
                <Text style={styles.textStyle}>{userInfo.user.name}</Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.textStyle}>Phone Number</Text>
                <Text style={styles.textStyle}>{userInfo.user.mobile_no}</Text>
              </View>
            </View>
          </LinearGradient>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  linearGradientBg: {
    minHeight: SCREEN_HEIGHT,
    height: 'auto',
    alignItems: 'center',
    padding: normalize(20),
  },
  gameBox: {
    width: SCREEN_WIDTH / 1.1,
    height: SCREEN_HEIGHT / 4,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    padding: normalize(20),
    borderRadius: normalize(20),
  },
  textStyle: {
    fontSize: normalize(18),
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
