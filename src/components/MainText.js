import React from 'react';
import {Text, StyleSheet, View} from 'react-native'
import {Font} from '../utils/font'

const MainText = ({children, style={}}) => {
    return (
        <Text style={[styles.textDefault, style]}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    textDefault: {
        color : "#333",
        fontSize : 16,
        fontFamily : Font.Montserrat
    }
});




export default MainText;
