import React from 'react';
import {Text, StyleSheet, View} from 'react-native'
import {Font} from '../utils/font'
import {PRIMARY_COLOR, SECONDARY_COLOR} from "../utils/constants";

const HeaderText = ({children, style = {}, ...rest}) => {
    return (
        <Text style={[styles.textDefault, style]} {...rest}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    textDefault: {
        fontSize: 28,
        fontFamily: Font.MontserratBold,
        marginBottom: 20,
        color: PRIMARY_COLOR
    }
});


export default HeaderText;
