import React, { Component } from 'react'
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl';
import Loading from './Loading';

const mapStateToProps = (state) => ({
    dishes: state.dishes
})

class Menu extends Component {

    static navigationOptions = {
        title: "Dish Menu"
    }

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
        }

        if (this.props.dishes.isLoading) {
            return <Loading />
        } else if (this.props.dishes.errMess) {
            return <View><Text style={{ color: "red" }}>{this.props.dishes.errMess}</Text></View>
        } else {
            return (
                <FlatList data={this.props.dishes.dishes}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()} />
            )
        }
    }
}

export default connect(mapStateToProps)(Menu);