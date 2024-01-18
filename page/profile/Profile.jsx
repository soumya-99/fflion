import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import TitleBar from '../../component/titlebar/TitleBar';
import {authstyles} from '../style/pagestyle';
import Banner from '../../component/banner/Banner';
import TransComp from '../../component/trans_component/TransComp';
import normalize from 'react-native-normalize';
import {AuthContext} from '../../src/context/AuthContext';

const Profile = () => {
  const {userInfo, isLoading} = useContext(AuthContext);
  console.log('hel', userInfo.user.name);
  return (
    <SafeAreaView>
      <View>
        <TitleBar />
      </View>
      <ScrollView>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: normalize(8),
    padding: normalize(16),

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: normalize(0.3),
    shadowRadius: normalize(4),
    elevation: normalize(5),
    marginBottom: normalize(15),
  },
});
