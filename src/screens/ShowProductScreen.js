import React, { useEffect, useState } from 'react';
import realm from '../../store/realm';
import { Icon } from 'react-native-elements';
import {
    View, Text, FlatList,
    Image, TouchableOpacity, StyleSheet
} from 'react-native';

const ShowProductScreen = (props) => {
    const { navigation } = props;
    const [data, setData] = useState([]);
    const { route } = props;
    const category = route.params.categoryId;

    const collectData = () => {
        const allData = realm.objects('Product').filtered(`category = ${category}`);
        setData(allData);
    };

    useEffect(() => {
        const productPage = navigation.addListener('focus', () => {
            collectData();
        });
        return productPage;
    }, []);

    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={data}
                contentContainerStyle={styles.flatListContainer}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={styles.itemButton}
                        >
                            <View style={styles.productContainer}>
                                <Image
                                    style={styles.image}
                                    source={{ uri: item.imagePath }}
                                />
                                <View style={styles.textContainer}>
                                    <Text style={styles.title}>
                                        {item.productName}
                                    </Text>
                                    <Text style={styles.text}>
                                        {item.description}
                                    </Text>
                                    <Text style={styles.text}>
                                        $ {item.price}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <Icon
                                    name="shoppingcart"
                                    type="antdesign"
                                    size={30}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )
                }}
                ListEmptyComponent={
                    <View style={{ alignItems: 'center' }}>
                        <Text>No items.</Text>
                    </View>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    flatListContainer: {
        padding: 8
    },
    itemButton: {
        margin: 8,
        padding: 16,
        borderColor: '#7CAF58',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    productContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    image: {
        width: 100,
        height: 100
    },
    textContainer: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center'
    },
    title: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'
    },
    text: {
        color: 'black',
        fontSize: 16
    }
});

export default ShowProductScreen