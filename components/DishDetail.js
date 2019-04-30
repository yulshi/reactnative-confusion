import React from 'react'
import { View, Text } from 'react-native'
import { Card } from 'react-native-elements';

export default function DishDetail({ dish }) {

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
