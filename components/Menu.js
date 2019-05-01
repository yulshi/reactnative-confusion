import React, {Component} from 'react'
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { DISHES } from '../shared/dishes'

export default class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        };
    }

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
                    leftAvatar={{ source: require("./images/uthappizza.png") }}
                    onPress={() => navigate("DishDetail", { dishId: item.id })} />
            );
        }

        return (
            <FlatList data={this.state.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()} />
        )
    }
}
