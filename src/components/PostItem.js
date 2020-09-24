import React from 'react';
import {StyleSheet, View, Dimensions, Image, TouchableOpacity, Modal} from 'react-native'
import {
    DARK_COLOR,
    PRIMARY_BACKGROUND_COLOR,
    PRIMARY_COLOR,
} from "../utils/constants";
import {Font} from "../utils/font";
import GlobalStyles from "../styles/GlobalStyles";

import {Icon} from "react-native-elements";
import MainText from "./MainText";
import {getCurrStrTime} from "../utils/helper";
import ImageViewer from 'react-native-image-zoom-viewer';

const {width, height} = Dimensions.get("window");

const PostItem = ({data, navigation, handleImagePress}) => {

    const {created_on, image, title} = data;

/*    const handleImagePress = (url) => {
        navigation.navigate('ImageViewer', {
            image: url
        })
    };*/


    return (
        <View style={[GlobalStyles.container, styles.container]}>
            <View style={styles.viewWrapper}>


                <View style={styles.card}>

                    <View style={styles.cardHeader}>


                        <TouchableOpacity onPress={() => handleImagePress(image)}>
                            <Image
                                source={{uri: image}}
                                style={styles.imgStyle}
                            />
                        </TouchableOpacity>

                        {(created_on || title) &&

                        <View style={styles.cardContents}>

                            {
                                created_on
                                &&
                                <View style={styles.lastUpdatedTxtWrap}>
                                    <Icon name='calendar-clock' type='material-community' color='rgba(0,0,0,0.25)'
                                          size={12}/>
                                    <MainText
                                        style={styles.lastUpdatedTxt}
                                    >
                                        {getCurrStrTime(created_on)}
                                    </MainText>
                                </View>
                            }


                            {
                                title
                                &&
                                <View style={styles.cardBody}>
                                    <MainText style={styles.contentTxt}>{title}</MainText>
                                </View>
                            }

                        </View>


                        }


                    </View>


                </View>


            </View>

        </View>

    );
};


const styles = StyleSheet.create({
    container: {},
    viewWrapper: {
        padding: 20,
        flex: 1,
        marginTop: '20%',
    },
    imgStyle: {
        width: width,
        height: 300,
        resizeMode: 'cover'
    },

    card: {
        marginTop: 10,
        backgroundColor: PRIMARY_BACKGROUND_COLOR,
        width: "100%",
        borderRadius: 8,
        overflow: "hidden",
        elevation: 10
    },

    cardHeader: {

        position: 'relative'
    },

    cardBody: {
        marginTop: 10
    },

    lastUpdatedTxtWrap: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        position: "absolute",
        right: 15,
        top: 10
    },

    lastUpdatedTxt: {
        fontSize: 12,
        fontFamily: Font.MontserratSemiBold,
        color: 'rgba(0,0,0,0.25)',
        marginLeft: 3
    },

    headerTxt: {
        fontSize: 20,
        borderBottomWidth: 2,
        borderColor: PRIMARY_COLOR,
        paddingBottom: 5,
        marginRight: 'auto',
        marginBottom: 50
    },
    contentTxt: {
        fontSize: 13,
        color: DARK_COLOR,
        fontFamily: Font.MontserratMedium,
        textAlign: 'justify',
        lineHeight: 21
    },
    placeholderStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
    },

    cardContents: {
        borderTopColor: '#eee',
        borderTopWidth: 1,
        paddingHorizontal: 30,
        paddingVertical: 22,
    }

});


export default PostItem;
