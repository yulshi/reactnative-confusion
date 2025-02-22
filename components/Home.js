import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { Card } from 'react-native-elements';
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import Loading from './Loading';
import * as Animatable from 'react-native-animatable';

function RenderItem({ item, isLoading, errMess }) {
    return (
        isLoading ?
            <Loading />
            :
            errMess ?
                <Text style={{ color: "red" }}>{errMess}</Text>
                :
                <Animatable.View animation="fadeInLeft" duration={2000} delay={200}>
                    <Card featuredTitle={item.name}
                        featuredSubtitle={item.designation}
                        image={{ uri: baseUrl + item.image }}>
                        <Text style={{ margin: 10 }}>
                            {item.description}
                        </Text>
                    </Card>
                </Animatable.View>
    );
}

const mapStateToProps = state => ({
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
});

export class Home extends Component {

    static navigationOptions = {
        title: "Home"
    }

    render() {
        return (
            <ScrollView>
                <RenderItem
                    item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess} />
                <RenderItem
                    item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    isLoading={this.props.promotions.isLoading}
                    errMess={this.props.promotions.errMess} />
                <RenderItem
                    item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                    isLoading={this.props.leaders.isLoading}
                    errMess={this.props.leaders.errMess} />
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(Home);
