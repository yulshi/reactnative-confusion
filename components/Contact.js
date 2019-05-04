import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { MailComposer } from 'expo';

export class Contact extends Component {

    static navigationOptions = {
        title: "Contact Us"
    }

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['shiyulongwudi@163.com'],
            subject: 'Enquiry',
            body: 'To whom it may concern'
        }).then(status => {
            console.log(status.status);
        })
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
                        <Button
                            title="Send Email"
                            buttonStyle={{ backgroundColor: "#512DA8" }}
                            icon={<Icon
                                name='envelope-o'
                                type='font-awesome'
                                color='white'
                                containerStyle={{ paddingRight: 5 }} 
                                size={18}/>}
                            onPress={this.sendMail}
                        />
                    </Card>
                </Animatable.View>
            </View>
        )
    }
}

export default Contact
