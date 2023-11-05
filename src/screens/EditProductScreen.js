import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { InputComponent } from '../components/InputComponent';
import SelectDropdown from 'react-native-select-dropdown';
import { categoryList } from '../../data/Data';
import realm from '../../store/realm';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen-hooks';

const EditProductScreen = () => {
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
                                width: productData.imagePath !== '' ? wp('50%') : 50,
                                height: productData.imagePath !== '' ? wp('50%') : 50
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
                    <SelectDropdown
                        data={categoryList}
                        defaultButtonText='Select category'
                        onSelect={(item) => {
                            onInputChange('category', item.id)
                        }}
                        buttonTextAfterSelection={(item) => {
                            return item.name
                        }}
                        rowTextForSelection={(item) => {
                            return item.name
                        }}
                        buttonStyle={styles.selectDropdown}
                        buttonTextStyle={styles.selectText}
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
                <Text style={styles.sellerText}>Seller Contact</Text>
                <InputComponent
                    placeholder='Whastapp number (ex : +4498739230)'
                    value={productData.phoneNumber}
                    onChangeText={(text) => onInputChange('phoneNumber', text)}
                    isIcon={true}
                    name="whatsapp"
                    type="font-awesome"
                />
                <InputComponent
                    placeholder='Instagram username (ex : timedooracademy)'
                    value={productData.instagram}
                    onChangeText={(text) => onInputChange('instagram', text)}
                    isIcon={true}
                    name="instagram"
                    type="font-awesome"
                />
                <InputComponent
                    placeholder='Facebook username (ex : timedooracademy)'
                    value={productData.facebook}
                    onChangeText={(text) => onInputChange('facebook', text)}
                    isIcon={true}
                    name="facebook-square"
                    type="font-awesome"
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={() => saveData()}
                    >
                        <Text style={styles.saveText}>Edit</Text>
                    </TouchableOpacity>
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
        width: wp('50%'),
        height: wp('50%'),
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    horizontalContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    sellerText: {
        fontSize:hp('2.5%'),
        fontWeight: 'bold',
        marginTop: 16,
        marginLeft: 8,
        marginBottom: 0,
        color: 'black'
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8
    },
    saveButton: {
        marginTop: 16,
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: 'mistyrose'
    },
    saveText: {
        color: 'black'
    },
    selectDropdown: {
        borderRadius: 10,
        backgroundColor: 'skyblue',
        width: wp('40%'),
        height: hp('4%'),
        marginLeft: 8
    },
    selectText: {
        fontSize: hp('1.5%'),
    }
});

export default EditProductScreen