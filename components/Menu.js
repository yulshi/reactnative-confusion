import React from 'react'
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

export default function Menu({ dishes }) {

    const renderMenuItem = ({ item, index }) => {
        return (
            <ListItem key={index}
                title={item.name}
                subtitle={item.description}
                chevron={false}
                leftAvatar={{ source: require("./images/uthappizza.png") }} />
        );
    }

    return (
        <FlatList data={dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()} />
    )
}
