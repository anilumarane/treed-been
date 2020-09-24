import React from 'react';
import {Text, StyleSheet, View, ActivityIndicator} from 'react-native'
import {
    SECONDARY_COLOR
} from "../utils/constants";
import {Font} from "../utils/font";

const Spinner = ({message = "", ...rest}) => {

    return (
        <View style={styles.container} pointerEvents='none'>
            <ActivityIndicator accessibilityLabel='text' size={48} color='#fff' {...rest} />
            <Text style={styles.textStyle}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    textStyle: {
        color: '#fff',
        marginTop: 10,
        fontSize: 13,
        fontFamily: Font.MontserratSemiBold
    }
});

export default Spinner;
