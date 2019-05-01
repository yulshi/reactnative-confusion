import React, { Component } from 'react';
import { View, Text } from 'react-native';

export class Contact extends Component {

    static navigationOptions = {
        title: "Contact Us"
    }

    render() {
        return (
            <View>
                <Text>Contact Us</Text>
            </View>
        )
    }
}

export default Contact
