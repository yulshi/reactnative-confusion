import React, { Component } from 'react'
import { ScrollView, Text, FlatList } from 'react-native'
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl'
import Loading from './Loading';

function RenderHistory() {
    return (
        <Card title="Our History">
            <Text>
                Started in 2010...
            </Text>
        </Card>
    );
}

const renderLeaders = ({ item, index }) => {
    return (
        <ListItem
            key={index}
            title={item.name}
            subtitle={item.description}
            chevron={false}
            leftAvatar={{ source: { uri: baseUrl + item.image } }} />
    );
}

function RenderLeaderShip({ leaders, isLoading, errMess }) {
    return (
        <Card title="Corporate Leadership">
            {isLoading ?
                <Loading />
                :
                errMess ?
                    <Text style={{color: "red"}}>{errMess}</Text>
                    :
                    <FlatList
                        data={leaders}
                        renderItem={renderLeaders}
                        keyExtractor={leader => leader.id.toString()} />
            }
        </Card>
    );

}

const mapStateToProps = (state) => ({
    leaders: state.leaders
})

export class About extends Component {


    static navigationOptions = {
        title: "About Us"
    }

    render() {

        return (
            <ScrollView>
                <RenderHistory />
                <RenderLeaderShip
                    leaders={this.props.leaders.leaders}
                    isLoading={this.props.leaders.isLoading}
                    errMess={this.props.leaders.errMess} />
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(About);
