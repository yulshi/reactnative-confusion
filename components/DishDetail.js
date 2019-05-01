import React from 'react'
import { View, Text } from 'react-native'
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

export default class DishDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        }
    }

    static navigationOptions = {
        title: "Dish Details"
    }

    render() {

        const dishId = this.props.navigation.getParam("dishId", "");

        const dish = this.state.dishes[+dishId];

        if (dish == null) {
            return (<View></View>);
        } else {
            return (
                <Card featuredTitle={dish.name}
                    image={require('./images/uthappizza.png')}>
                    <Text style={{ margin: 10 }}>
                        {dish.description}
                    </Text>
                </Card>
            )
        }
    }
}
