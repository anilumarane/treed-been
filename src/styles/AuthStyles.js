import {StyleSheet} from "react-native";
import {GREY_DARK, PRIMARY_BACKGROUND_COLOR, PRIMARY_COLOR} from "../utils/constants";
import {Font} from "../utils/font";

export default  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PRIMARY_BACKGROUND_COLOR,
        paddingTop: "20%",
    },
    headerText: {
        marginBottom: 50,
    },
    authContainer: {
        flex: 1,
        padding: 30,
    },
    formContainer: {
        alignSelf: 'stretch',
    },
    buttonStyle: {
        height: 55,
        marginLeft: 'auto',
        width: 180,
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 100,

    },
    titleStyle: {
        fontFamily: Font.MontserratSemiBold,
        fontSize: 18
    },
    authFlipContainer: {
        flexDirection: 'row',
        marginTop : 40
    },
    btnFlip: {
        marginLeft: 8,
        flexDirection: 'row',
        alignItems : 'center',
    },

    btnLabel: {
        paddingBottom: 1,
        fontFamily: Font.MontserratSemiBold,
        color: PRIMARY_COLOR,
        marginRight: 2
    },
    authLabelMsg: {
        fontFamily: Font.MontserratSemiBold,
        color: GREY_DARK,
    },
    inputError : {

    }
});
