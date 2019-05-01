import React from 'react'
import { ScrollView, View, Text, FlatList } from 'react-native'
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

class DishDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            favorates: []
        }
    }

    static navigationOptions = {
        title: "Dish Details"
    }

    handleFavorate = (dishId) => () => {
        this.setState({
            favorates: this.state.favorates.concat(dishId)
        });
    }

    render() {

        const dishId = this.props.navigation.getParam("dishId", "");

        const dish = this.props.dishes.dishes[+dishId];

        if (dish == null) {
            return (<View></View>);
        } else {
            return (
                <ScrollView>
                    <RenderDishDetail dish={dish}
                        favorate={this.state.favorates.some(id => id === dishId)}
                        handleFavorate={this.handleFavorate} />
                    <RenderComments
                        comments={this.props.comments.comments.filter(comment => comment.dishId === dishId)} />
                </ScrollView>
            )
        }
    }
}

function RenderDishDetail({ dish, favorate, handleFavorate }) {

    return (
        <Card featuredTitle={dish.name}
            image={{uri: baseUrl + dish.image}}>
            <Text style={{ margin: 10 }}>
                {dish.description}
            </Text>
            <Icon name={favorate ? 'heart' : 'heart-o'}
                raised
                reverse
                color="#f50"
                type="font-awesome"
                onPress={handleFavorate(dish.id)} />
        </Card>
    );
}

function RenderComments({ comments }) {

    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
                <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };

    return (
        <Card title="Comments">
            <FlatList data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()} />
        </Card>
    );

}

const mapStateToProps = (state) => ({
    dishes: state.dishes,
    comments: state.comments
})

export default connect(mapStateToProps)(DishDetail);