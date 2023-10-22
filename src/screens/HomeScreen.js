import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import { imageSlider } from '../../data/Data';
import { SliderBox } from 'react-native-image-slider-box';

const HomeScreen = () => {
    return (
        <View style={styles.mainContainer}>
            <SliderBox
                images={imageSlider}
                autoplay={true}
                circleLoop={true}
                sliderBoxHeight={250}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        flex: 1
    }
});

export default HomeScreen