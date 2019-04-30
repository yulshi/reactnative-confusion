import React, { Component } from 'react'
import Menu from './Menu';
import { DISHES } from '../shared/dishes'
import DishDetail from './DishDetail'
import { View } from 'react-native'

export class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDishId: null
        }
    }

    handlePress = (id) => () => {
        this.setState({
            selectedDishId: id
        })
    }

    render() {
        return (
            <View>
                <Menu dishes={this.state.dishes}
                    handlePress={this.handlePress} />
                <DishDetail dish={this.state.dishes.filter(
                    dish => dish.id === this.state.selectedDishId)[0]} />
            </View>
        )
    }
}

export default Main
