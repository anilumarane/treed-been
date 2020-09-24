import React from 'react';
import {Text, StyleSheet, View, TextInput} from 'react-native'
import {GREY_COLOR, GREY_DARK, PRIMARY_COLOR} from "../utils/constants";
import {Font} from "../utils/font";

const DefaultInputText = ({containerStyle = '', inputStyle = '', errorStyle = '', placeholder = '', name, value, error = '', onTextChange, children, ...rest}) => {
    return (
        <View style={[styles.inputContainer, containerStyle]}>
            <TextInput
                onChangeText={(text) => onTextChange(name, text)}
                placeholder={placeholder}
                value={value}
                placeholderTextColor={GREY_DARK}
                style={[styles.inputText, inputStyle]}
                selectionColor={GREY_COLOR}
                {...rest}
            />
              <Text style={[styles.errorTxt, errorStyle]}>{error}</Text>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        position: 'relative'
    },
    inputText: {
        flex: 1,
        padding: 10,
        fontSize: 15,
        fontFamily: Font.MontserratMedium,
        color: "#333",
        lineHeight: 22,
    },

    errorTxt: {
        color: '#f55c33',
        fontSize: 12,
        fontFamily: Font.MontserratSemiBold,
        bottom: 0,
        right: 4,
        position: "absolute"
    }
});

export default DefaultInputText;
