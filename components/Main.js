import React, { Component } from 'react'
import Menu from './Menu';
import Home from './Home'
import DishDetail from './DishDetail';
import Contact from './Contact';
import About from './About';
import {
    View, Platform,
    Text, ScrollView, Image, StyleSheet
} from 'react-native';
import {
    createStackNavigator, createDrawerNavigator,
    DrawerItems, SafeAreaView
} from 'react-navigation';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators'
import { Reservation } from './Reservation';
import Favorites from './Favorites'
import Login from './Login'

const MenuNavigator = createStackNavigator(
    {
        Menu: {
            screen: Menu,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <Icon
                    name="menu"
                    size={24}
                    color="white"
                    onPress={() => navigation.toggleDrawer()} />
            })
        },
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

const FavoritesNavigator = createStackNavigator(
    {
        Favorites: {
            screen: Favorites,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <Icon
                    name="heart"
                    type="font-awesome"
                    size={24}
                    color="white"
                    onPress={() => navigation.toggleDrawer()} />
            })
        },
        DishDetail: { screen: DishDetail }
    },
    {
        initialRouteName: 'Favorites',
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
        Home: {
            screen: Home,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <Icon
                    name="home"
                    size={24}
                    color="white"
                    onPress={() => navigation.toggleDrawer()} />
            })
        }
    }, {
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTitleStyle: {
                color: "#fff"
            },
            headerTintColor: "#fff"
        }
    }
);

const ContactNavigator = createStackNavigator(
    {
        Contact: {
            screen: Contact,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <Icon
                    name="address-card"
                    type="font-awesome"
                    color="white"
                    size={24}
                    onPress={() => navigation.toggleDrawer()} />
            })
        }
    }, {
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTitleStyle: {
                color: "#fff"
            },
            headerTintColor: "#fff"
        }
    }
);

const LoginNavigator = createStackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <Icon
                    name="sign-in"
                    type="font-awesome"
                    color="white"
                    size={24}
                    onPress={() => navigation.toggleDrawer()} />
            })
        }
    }, {
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTitleStyle: {
                color: "#fff"
            },
            headerTintColor: "#fff"
        }
    }
);

const AboutNavigator = createStackNavigator(
    {
        About: {
            screen: About,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <Icon
                    name="info-circle"
                    type="font-awesome"
                    color="white"
                    size={24}
                    onPress={() => navigation.toggleDrawer()} />
            })
        }
    }, {
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTitleStyle: {
                color: "#fff"
            },
            headerTintColor: "#fff"
        }
    }
)

const ReservationNavigator = createStackNavigator(
    {
        Reservation: {
            screen: Reservation,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <Icon
                    name="cutlery"
                    type="font-awesome"
                    color="white"
                    size={24}
                    onPress={() => navigation.toggleDrawer()} />
            })
        }
    }, {
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTitleStyle: {
                color: "#fff"
            },
            headerTintColor: "#fff"
        }
    }
);

const CustomDrawerContentComponent = (props) => {
    return (
        <ScrollView>
            <SafeAreaView
                style={styles.container}
                forceInset={{ top: 'always', horizontal: 'never' }}>
                <View style={styles.drawerHeader}>
                    <View style={{ flex: 1 }}>
                        <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.drawerHeaderText}>
                            Ristorante Con Fusion
                    </Text>
                    </View>
                </View>
                <DrawerItems {...props} />
            </SafeAreaView>
        </ScrollView>
    )
};


const MainNavigator = createDrawerNavigator(
    {
        Login: {
            screen: LoginNavigator,
            navigationOptions: {
                title: "Login",
                drawerLabel: "Login",
                drawerIcon: ({ tintColor, focused }) => (
                    <Icon
                        name='sign-in'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Home: {
            screen: HomeNavigator,
            navigationOptions: {
                title: "Home from Nav",
                drawerLabel: "Home",
                drawerIcon: ({ tintColor, focused }) => (
                    <Icon
                        name='home'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Menu: {
            screen: MenuNavigator,
            navigationOptions: {
                title: "Menu from Nav",
                drawerLabel: "Menu",
                drawerIcon: ({ tintColor, focused }) => (
                    <Icon
                        name='list'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Contact: {
            screen: ContactNavigator,
            navigationOptions: {
                title: "Contact",
                drawerLabel: "Contact Us",
                drawerIcon: ({ tintColor, focused }) => (
                    <Icon
                        name='address-card'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        About: {
            screen: AboutNavigator,
            navigationOptions: {
                title: "About",
                drawerLabel: "About Us",
                drawerIcon: ({ tintColor, focused }) => (
                    <Icon
                        name='info-circle'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Favorites:
        {
            screen: FavoritesNavigator,
            navigationOptions: {
                title: 'My Favorites',
                drawerLabel: 'My Favorites',
                drawerIcon: ({ tintColor, focused }) => (
                    <Icon
                        name='heart'
                        type='font-awesome'
                        size={24}
                        iconStyle={{ color: tintColor }}
                    />
                ),
            }
        },
        Reservation: {
            screen: ReservationNavigator,
            navigationOptions: {
                title: "Reserve Tables",
                drawerLabel: "Reserve Tables",
                drawerIcon: ({ tintColor, focused }) => (
                    <Icon
                        name='cutlery'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        }
    },
    {
        initialRouteName: 'Home',
        drawerBackgroundColor: "#D1C4E9",
        contentComponent: CustomDrawerContentComponent
    }
)

const mapDispatchToProps = (dispatch) => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders())
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render() {
        return (
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <MainNavigator />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});

export default connect(undefined, mapDispatchToProps)(Main)