import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../page/home/Home';
import GameTime from '../../page/home/GameTime';
import GameEntry from '../../page/home/GameEntry';
const Stack = createStackNavigator();

const HomeNavigation = () => {
    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#9AC4F8',
                    },
                    headerTintColor: 'white',
                    headerBackTitle: 'Back',
                }}>

                <Stack.Screen name="HomeNav"
                    component={Home}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Home',
                    }} />

                <Stack.Screen
                    name="GameTime"
                    component={GameTime}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'GameTime',
                    }}
                />

                <Stack.Screen
                    name="GameEntry"
                    component={GameEntry}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'GameTime',
                    }}
                />
            </Stack.Navigator>

        </>
    )
}

export default HomeNavigation

const styles = StyleSheet.create({})