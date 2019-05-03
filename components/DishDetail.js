import React from 'react'
import {
    ScrollView, View, Text, Alert,
    FlatList, Modal, Button, TextInput, StyleSheet,
    PanResponder
} from 'react-native'
import { Card, Icon, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorate, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

class DishDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCommentModal: false,
            rating: 0,
            author: '',
            comment: ''
        }
    }

    static navigationOptions = {
        title: "Dish Details"
    }

    toggleCommentModal = () => {
        this.setState({ showCommentModal: !this.state.showCommentModal });
    }

    handleFavorate = (dishId) => () => {
        this.props.postFavorate(dishId);
    }

    handleSubmitComment = (dishId) => () => {
        const { rating, author, comment } = this.state;
        this.props.postComment(dishId, rating, author, comment);
        this.toggleCommentModal();
        this.setState({
            rating: 0,
            author: '',
            comment: ''
        });
    }

    handleViewRef = ref => this.view = ref;

    render() {

        const dishId = this.props.navigation.getParam("dishId", "");
        const dish = this.props.dishes.dishes[+dishId];

        const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
            console.log(moveX, moveY, dx, dy);
            return dx < -50 ? true : false;
        }

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gestrueState) => {
                return true;
            },
            onPanResponderGrant: () => {
                this.view.rubberBand(1000).then(
                    endState => console.log(endState ? "finished" : "cancelled")
                )
            },
            onPanResponderEnd: (e, gestrueState) => {
                if (recognizeDrag(gestrueState)) {
                    Alert.alert(
                        "Add to Favorite",
                        `Are your sure you wish to add ${dish.name} to your favorite?`,
                        [
                            {
                                text: "Cancel",
                                type: "cancel"
                            },
                            {
                                text: "OK",
                                onPress: this.handleFavorate(dishId)
                            }
                        ],
                        { cancelable: false }
                    )
                }
                return true;
            }
        });


        if (dish == null) {
            return (<View></View>);
        } else {
            return (
                <ScrollView>
                    <Animatable.View
                        animation="fadeInDown"
                        duration={2000}
                        delay={100}
                        ref={this.handleViewRef}
                        {...panResponder.panHandlers}>
                        <RenderDishDetail
                            dish={dish}
                            favorite={this.props.favorites.some(id => id === dishId)}
                            handleFavorate={this.handleFavorate}
                            toggleCommentModal={this.toggleCommentModal} />
                    </Animatable.View>
                    <Animatable.View animation="fadeInUp" duration={2000} delay={100} >
                        <RenderComments
                            comments={this.props.comments.comments.filter(comment => comment.dishId === dishId)} />
                    </Animatable.View>
                    <Modal visible={this.state.showCommentModal}>
                        <Animatable.View animation="fadeInUp" duration={2000} delay={100} >
                            <ScrollView
                                contentContainerStyle={{ justifyContent: "center" }}
                                style={{ paddingTop: 50 }}>
                                <Rating
                                    type="star"
                                    showRating={true}
                                    ratingCount={5}
                                    startingValue={this.state.rating}
                                    minValue={0}
                                    imageSize={28}
                                    onFinishRating={(val) => { this.setState({ rating: val }) }} />
                                <View style={styles.modalControl}>
                                    <TextInput
                                        style={styles.modalTextInput}
                                        value={this.state.author}
                                        onChangeText={(text) => { this.setState({ author: text }) }}
                                        placeholder="please enter your name" />
                                </View>
                                <View style={styles.modalControl}>
                                    <TextInput
                                        style={styles.modalTextInput}
                                        value={this.state.comment}
                                        onChangeText={(text) => { this.setState({ comment: text }) }}
                                        placeholder="please leave your comment" />
                                </View>
                                <View style={styles.modalButtonContaner}>
                                    <Button
                                        style={styles.modalButton}
                                        title="Close"
                                        color="grey"
                                        onPress={this.toggleCommentModal} />
                                    <Button
                                        style={styles.modalButton}
                                        title="Submit"
                                        color="blue"
                                        onPress={this.handleSubmitComment(dishId)} />
                                </View>
                            </ScrollView>
                        </Animatable.View>
                    </Modal>
                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
    modalControl: {
        padding: 20,
        justifyContent: "center"
    },
    modalTextInput: {
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderBottomColor: "grey"
    },
    modalButtonContaner: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        margin: 20
    },
    modalButton: {

    }
});

function RenderDishDetail({ dish, favorite, handleFavorate, toggleCommentModal }) {

    return (
        <Card featuredTitle={dish.name}
            image={{ uri: baseUrl + dish.image }}>
            <Text style={{ margin: 10 }}>
                {dish.description}
            </Text>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
                <Icon
                    name={favorite ? 'heart' : 'heart-o'}
                    raised
                    reverse
                    size={16}
                    color="#f50"
                    type="font-awesome"
                    onPress={handleFavorate(dish.id)} />
                <Icon
                    name="pencil"
                    reverse
                    size={16}
                    type="font-awesome"
                    onPress={toggleCommentModal} />
            </View>
        </Card>
    );
}

function RenderComments({ comments }) {

    const renderCommentItem = ({ item, index }) => {

        const formater = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        });

        let date = new Date(Date.parse(item.date));
        date = formater.format(date);

        return (
            <View key={index} style={{ flex: 1, alignItems: "flex-start", margin: 10 }}>
                <Text style={{ fontSize: 14, paddingBottom: 5 }}>{item.comment}</Text>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    {Array(item.rating).fill('', 0).map((ele, index) =>
                        <Icon key={index} name="star" type="font-awesome" color="gold" size={10} />
                    )}
                </View>
                <Text style={{ fontSize: 12, paddingTop: 5 }}>{'-- ' + item.author + ', ' + date} </Text>
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
    comments: state.comments,
    favorites: state.favorites
})

const mapDispatchToProps = (dispatch) => ({
    postFavorate: (dishId) => dispatch(postFavorate(dishId)),
    postComment: (dishId, rating, author, comment) =>
        dispatch(postComment(dishId, rating, author, comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);