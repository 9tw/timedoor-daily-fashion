import {
    View, Text, FlatList,
    Image, TouchableOpacity, StyleSheet,
    Linking
} from 'react-native';
import realm from '../../store/realm';
import React, { useState, useEffect } from 'react';
import { Icon } from 'react-native-elements';
import { MediaComponent } from '../components/MediaComponent';

const ShowProductScreen = (props) => {
    const { navigation } = props
    const { route } = props;
    const category = route.params.categoryId;
    const [data, setData] = useState([]);
    const [isBuy, setIsBuy] = useState(false);
    const [contact, setContact] = useState({
        phoneNumber: '',
        instagram: '',
        facebook: ''
    });

    const collectData = () => {
        const allData = realm.objects('Product').filtered(`category = ${category}`);
        setData(allData);
    };

    const buyProduct = (whatsapp, instagramId,
        facebookId) => {
        setContact({
            phoneNumber: whatsapp,
            instagram: instagramId,
            facebook: facebookId
        });
        setIsBuy(true);
    };

    const onClickMedia = (type) => {
        if (type === 'whatsapp') {
            Linking.openURL(`https://wa.me/${contact.phoneNumber} `);
        } else if (type === 'instagram') {
            Linking.openURL(`https://www.instagram.com/${contact.instagram}`);
        } else if (type === 'facebook') {
            Linking.openURL(`https://m.me/${contact.facebook} `);
        }
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
                            <TouchableOpacity
                                onPress={() => buyProduct(item.phoneNumber, item.instagram, item.facebook)}
                            >
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
                    <Text style={{
                        alignItems: 'center'
                    }}>
                        No Items
                    </Text>
                }
            />
            {
                isBuy ?
                    <View style={styles.modalContainer}>
                        <View style={styles.box}>
                            <TouchableOpacity
                                style={styles.cancel}
                                onPress={() => setIsBuy(false)}
                            >
                                <Icon
                                    name="close"
                                    type="antdesign"
                                    size={18}
                                />
                            </TouchableOpacity>
                            <Text style={[

                                styles.sellerText,
                                styles.title

                            ]}>

                                Contact the seller through this

                                media :
                            </Text>
                            {
                                contact.phoneNumber !== '' ?
                                    <MediaComponent
                                        source={require('../../assets/images/whatsapp.png')}
                                        value={contact.phoneNumber}
                                        onPress={() => onClickMedia('whatsapp')}
                                    />
                                    :
                                    null
                            }
                            {
                                contact.instagram !== '' ?
                                    <MediaComponent
                                        source={require('../../assets/images/instagram.png')}
                                        value={contact.instagram}
                                        onPress={() => onClickMedia('instagram')}
                                    />
                                    :
                                    null
                            }
                            {
                                contact.facebook !== '' ?
                                    <MediaComponent
                                        source={require('../../assets/images/facebook.png')}
                                        value={contact.facebook}
                                        onPress={() => onClickMedia('facebook')}
                                    />
                                    :
                                    null
                            }
                        </View>
                    </View>
                    :
                    null
            }
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
    },
    modalContainer: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        width: '80%',
        backgroundColor: 'white',
        padding: 16,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center'
    },
    cancel: {
        padding: 8,
        position: 'absolute',
        right: 8,
        top: 8
    },
    sellerText: {
        marginBottom: 8,
        marginTop: 32
    }
}
);

export default ShowProductScreen