import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { InputComponent } from '../components/InputComponent';

const AddProductScreen = () => {
    const [productData, setProductData] = useState({
        productName: '',
        imagePath: '',
        category: null,
        description: '',
        price: null,
        instagram: '',
        facebook: '',
        phoneNumber: ''
    });

    const addImage = () => {
        ImagePicker.openPicker({
            width: 2000,
            height: 2000,
            cropping: true
        }).then(image => {
            console.log(image)
            setProductData({
                ...productData,
                imagePath: image.path
            });
        }).catch(errorMessage => {
            console.log(errorMessage);
        });
    };

    const onInputChange = (type, value) => {
        setProductData({
            ...productData,
            [type]: value
        });
    };

    return (
        <View style={styles.mainContainer}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.imageContainer}>
                    <TouchableOpacity
                        style={styles.imageButton}
                        onPress={() => addImage()}
                    >
                        <Image
                            style={{
                                width: productData.imagePath !== '' ? 200 : 50,
                                height: productData.imagePath !== '' ? 200 : 50
                            }}
                            source={{
                                uri: productData.imagePath !== '' ?
                                    productData.imagePath
                                    :
                                    'https://assets.webiconspng.com/uploads/2017/02/Photograph-Icon-PNG.png'
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.horizontalContainer}>
                    <InputComponent
                        placeholder='Product Name'
                        value={productData.productName}
                        onChangeText={(text) => onInputChange('productName', text)}
                    />
                </View>
                <View style={styles.horizontalContainer}>
                    <InputComponent
                        placeholder='Description'
                        value={productData.description}
                        onChangeText={(text) => onInputChange('description', text)}
                        isDescription={true}
                    />
                    <InputComponent
                        placeholder="Price"
                        value={productData.price}
                        onChangeText={(text) => onInputChange('price', text)}
                        isIcon={true}
                        name="dollar"
                        type="font-awesome"
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    scroll: {
        margin: 8,
        paddingBottom: 8
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 8
    },
    imageButton: {
        width: 200,
        height: 200,
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    horizontalContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
});

export default AddProductScreen