import {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {useIsFocused, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import normalize from 'react-native-normalize';
import {AuthContext} from '../../src/context/AuthContext';
import {BASE_URL} from '../../src/config';
import axios from 'axios';

const TitleBar = () => {
  const {userInfo, isLoading} = useContext(AuthContext);
  const screenWidth = Dimensions.get('window').width;

  const logoWidth = screenWidth * 0.1; // 80% of the screen width
  const logoHeight = (logoWidth * 0.5) / 2; // Assuming the logo's aspect ratio is 3:1

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [wlBal, setWlBal] = useState();

  useEffect(() => {
    if (isFocused) {
      getGameNameData();
    }
  }, [navigation.isFocused()]);

  const getGameNameData = async () => {
    await axios
      .get(`${BASE_URL}/total_money_Wallet`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then(res => {
        let resData = res.data;
        setWlBal(resData.data[0].total_value_amount);
        console.log('titBlance', resData);
      })
      .catch(er => {
        console.log('title bal', er);
      });
  };

  const handleOpenDrawer = () => {
    navigation.openDrawer();
  };
  const handleCopyToClipboard = () => {
    getGameNameData();
  };

  return (
    <View style={styles.titleContainer}>
      <View style={styles.coldiv}>
        <View style={styles.logo_icon}>
          <AntDesign
            name="menuunfold"
            size={40}
            color="#000000"
            onPress={handleOpenDrawer}
          />
        </View>
        {/* <View style={styles.logo_icon}>
          <Image
            source={require('../../assets/logo/Star-Line__2.png')}
            style={{width: logoWidth}}
            resizeMode="contain"
          />
        </View> */}
      </View>
      <View style={styles.coldiv}>
        <View style={styles.rupeeicon}>
          <Text style={styles.compName}>FF Lion</Text>
          <Text style={styles.version}> (v4.0)</Text>
        </View>
      </View>
      <View style={styles.coldiv}>
        <View style={styles.logo_icon}>
          <TouchableOpacity onPress={handleCopyToClipboard}>
            <Ionicons name="wallet" size={20} color="#555555" />
          </TouchableOpacity>
        </View>

        {/* <View style={styles.logo_icon}>
                    <Ionicons name="wallet" size={30} color="#ffff" />
                </View> */}
        <View style={styles.rupeeicon}>
          <Text style={styles.rupeeicon_content}>₹{wlBal}</Text>
        </View>
      </View>
    </View>
  );
};

export default TitleBar;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(1),
  },
  coldiv: {
    flexDirection: 'row',
    // justifyContent: "space-between",
  },
  logo_icon: {
    justifyContent: 'center',
    marginHorizontal: normalize(2),
  },
  rupeeicon: {
    fontSize: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  version: {
    fontSize: normalize(18),
    fontWeight: '800',
    textAlign: 'center',
  },
  rupeeicon_content: {
    fontSize: normalize(20),
    justifyContent: 'center',
    color: '#000000',
    // marginLeft:5
    marginRight: 8,
  },
  compName: {
    fontSize: normalize(25),
    justifyContent: 'center',
    fontWeight: 'bold',
    color: '#444444',
  },
});
