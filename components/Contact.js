import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

export class Contact extends Component {

    static navigationOptions = {
        title: "Contact Us"
    }

    render() {
        return (
            <View>
                <Animatable.View animation="fadeInDown" duration={2000} delay={100}>
                    <Card title="Contact Information" >
                        <Text style={{ padding: 10 }}>121, Clear Water Bay Road</Text>
                        <Text style={{ padding: 10 }}>Clear Water Bay, Kowloon</Text>
                        <Text style={{ padding: 10 }}>Hong Kong</Text>
                        <Text style={{ padding: 10 }}>Tel. 12345678</Text>
                        <Text style={{ padding: 10 }}>Fax. 12345678</Text>
                        <Text style={{ padding: 10 }}>Email: xxx@yyy.com</Text>
                    </Card>
                </Animatable.View>
            </View>
        )
    }
}

export default Contact
