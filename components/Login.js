import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Button } from 'react-native';
import { Input, CheckBox } from 'react-native-elements';
import { SecureStore } from 'expo';

const USER_INFO = "userinfo";

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    static navigationOptions = {
        title: 'Login'
    }

    componentDidMount() {
        SecureStore.getItemAsync(USER_INFO)
            .then(data => {
                let userinfo = JSON.parse(data);
                if (userinfo) {
                    this.setState({
                        username: userinfo.username,
                        password: userinfo.password,
                        remember: true
                    });
                }
            })
    }

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync(USER_INFO, JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }))
                .catch(err => console.log(`could not save user info: ${err}`));
        } else {
            SecureStore.deleteItemAsync(USER_INFO)
                .catch(err => console.log(`could not delete user info: ${err}`));
        }
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o', size: 18 }}
                    leftIconContainerStyle={styles.icon}
                    onChangeText={(username) => this.setState({ username })}
                    value={this.state.username}
                    inputContainerStyle={styles.formInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key', size: 18 }}
                    leftIconContainerStyle={styles.icon}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    inputContainerStyle={styles.formInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                />
                <CheckBox title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({ remember: !this.state.remember })}
                    containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title="Login"
                        color="#512DA8"
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 10,
    },
    formInput: {
        margin: 20,
        paddingRight: 10
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton: {
        margin: 10
    },
    icon: {
        paddingRight: 5
    }
});

export default Login
