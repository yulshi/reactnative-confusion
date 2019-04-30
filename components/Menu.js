import React from 'react'
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import DishDetail from './DishDetail';

export default function Menu({ dishes, handlePress }) {

    const renderMenuItem = ({ item, index }) => {
        return (
            <ListItem key={index}
                title={item.name}
                subtitle={item.description}
                chevron={false}
                leftAvatar={{ source: require("./images/uthappizza.png") }} 
                onPress={handlePress(item.id)} />
        );
    }

    return (
        <FlatList data={dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()} />
    )
}
