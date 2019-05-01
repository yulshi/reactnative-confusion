import React, {Component} from 'react'
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import {connect} from 'react-redux'
import { baseUrl } from '../shared/baseUrl';

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
                    leftAvatar={{ source: {uri: baseUrl + item.image} }}
                    onPress={() => navigate("DishDetail", { dishId: item.id })} />
            );
        }

        return (
            <FlatList data={this.props.dishes.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()} />
        )
    }
}

export default connect(mapStateToProps)(Menu);