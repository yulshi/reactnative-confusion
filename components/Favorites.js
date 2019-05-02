import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './Loading';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        favorites: state.favorites
    }
}

class Favorites extends Component {

    static navigationOptions = {
        title: 'My Favorites'
    };

    render() {

        const { navigate } = this.props.navigation;

        const renderMenuItem = ({ item, index }) => {

            return (
                <ListItem key={index}
                    title={item.name}
                    subtitle={item.description}
                    chevron={false}
                    leftAvatar={{ source: { uri: baseUrl + item.image } }}
                    onPress={() => navigate("DishDetail", { dishId: item.id })} />
            );
        };

        if (this.props.dishes.isLoading) {
            return (
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return (
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            );
        }
        else {
            const favoriteDishes = this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id));
            if (favoriteDishes.length == 0) {
                return (
                    <View>
                        <Text style={{ color: "red", alignSelf: "center", padding: 20 }}>
                            No favorite dishes
                        </Text>
                    </View>
                );
            } else {
                return (
                    <FlatList
                        data={favoriteDishes}
                        renderItem={renderMenuItem}
                        keyExtractor={item => item.id.toString()}
                    />
                );
            }
        }
    }
}

export default connect(mapStateToProps)(Favorites);
