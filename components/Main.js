import React, { Component } from 'react'
import Menu from './Menu';
import Home from './Home'
import DishDetail from './DishDetail'
import { View, Platform } from 'react-native'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'

const MenuNavigator = createStackNavigator(
    {
        Menu: { screen: Menu },
        DishDetail: { screen: DishDetail }
    },
    {
        initialRouteName: 'Menu',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
)

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    }, {
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTitleStyle: {
                color: "#fff"
            },
            headerTintColor: "#fff"
        })
    });


const MainNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeNavigator,
            navigationOptions: {
                title: "Home from Nav",
                drawerLabel: "Home :)"
            }
        },
        Menu: {
            screen: MenuNavigator,
            navigationOptions: {
                title: "Menu from Nav",
                drawerLabel: "Menu :)"
            }
        }
    },
    {
        drawerBackgroundColor: "#D1C4E9"
    }
)

export class Main extends Component {

    render() {
        return (
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <MainNavigator />
            </View>
        )
    }
}

export default Main
