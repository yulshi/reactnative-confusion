import React from 'react'
import { ScrollView, View, Text, FlatList } from 'react-native'
import { Card, Icon } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments'

export default class DishDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
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

        const dish = this.state.dishes[+dishId];

        if (dish == null) {
            return (<View></View>);
        } else {
            return (
                <ScrollView>
                    <RenderDishDetail dish={dish}
                        favorate={this.state.favorates.some(id => id === dishId)}
                        handleFavorate={this.handleFavorate} />
                    <RenderComments
                        comments={this.state.comments.filter(comment => comment.dishId === dishId)} />
                </ScrollView>
            )
        }
    }
}

function RenderDishDetail({ dish, favorate, handleFavorate }) {

    return (
        <Card featuredTitle={dish.name}
            image={require('./images/uthappizza.png')}>
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