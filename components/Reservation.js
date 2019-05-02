import React, { Component } from 'react'
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Picker,
    Switch,
    Button,
    Modal
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Card } from 'react-native-elements'

export class Reservation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        }
    }

    static navigationOptions = {
        title: "Reserve Tables"
    }

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal })
    }

    handleReservation = () => {
        this.toggleModal();
    }

    handleCloseModal = () => {
        this.toggleModal();
        this.resetForm();
    }

    resetForm = () => {
        this.setState({
            guests: 1,
            smoking: false,
            date: ''
        });
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>number of guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(value, index) => { this.setState({ guests: value }) }} >
                        <Picker.Item value="1" label="1" />
                        <Picker.Item value="2" label="2" />
                        <Picker.Item value="3" label="3" />
                        <Picker.Item value="4" label="4" />
                        <Picker.Item value="5" label="5" />
                        <Picker.Item value="6" label="6" />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        trackColor="#512DA8"
                        onValueChange={val => { this.setState({ smoking: val }) }} />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date</Text>
                    <DatePicker
                        style={{ flex: 2, marginRight: 20 }}
                        date={this.state.date}
                        format=''
                        mode="datetime"
                        placeholder="select date and Time"
                        minDate="2017-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(date) => { this.setState({ date: date }) }} />
                </View>
                <View style={styles.formRow}>
                    <Button
                        title="Reserve"
                        color="#512DA8"
                        onPress={this.handleReservation} />
                </View>
                <Modal
                    visible={this.state.showModal}
                    transparent={false}>
                    <Card
                        style={styles.modal}
                        title="Your Reservation"
                        titleStyle={styles.modalTitle}>
                        <Text style={styles.modalText}>Number of Guest: {this.state.guests}</Text>
                        <Text style={styles.modalText}>Smoking?: {this.state.smoking ? "Yes" : "No"}</Text>
                        <Text style={styles.modalText}>Date: {this.state.date}</Text>
                        <Button
                            onPress={this.handleCloseModal}
                            title="Close"
                            color="#512DA8"
                        />
                    </Card>
                </Modal>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        alignItems: "center",
        justifyContent: "center",
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation
