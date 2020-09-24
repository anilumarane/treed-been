import React from 'react';
import {Text, StyleSheet, View, TextInput} from 'react-native'
import {Font} from '../utils/font'
import {Icon, Input} from "react-native-elements";
import {GREY_COLOR, PRIMARY_COLOR, SECONDARY_LIGHT_COLOR} from "../utils/constants";

const InputText = (props) => {
    const {inputContainerStyle, errorStyle, mainContainerStyle, inputStyle, onInputChange, name,  value, error=''} = props;
    return (
        <Input
            {...props}
            inputContainerStyle={[styles.inputContainerStyle, inputContainerStyle]}
            errorStyle={[styles.errorStyle, errorStyle]}
            containerStyle={[styles.mainContainerStyle, mainContainerStyle]}
            inputStyle={[styles.inputStyle, inputStyle]}
            onChangeText={(data) => onInputChange(name, data)}
            errorMessage={error}
            selectionColor={GREY_COLOR}
            value={value}
        />
    );
};

const styles = StyleSheet.create({
    mainContainerStyle: {
        marginBottom: 30
    },
    inputContainerStyle: {
        alignSelf: 'stretch',
        borderBottomColor: PRIMARY_COLOR,

    },
    errorStyle: {
        color: 'tomato',
        fontFamily: Font.MontserratSemiBold,
        top : '100%',
        position : "absolute"
    },
    labelStyle: {
        color: PRIMARY_COLOR,
        fontFamily: Font.Montserrat
    },
    inputStyle: {
        color: PRIMARY_COLOR,
        fontFamily: Font.MontserratMedium
    }
});


export default InputText;
