import React from 'react';
import {View, Image, StyleSheet, TouchableNativeFeedback, ScrollView, SafeAreaView} from 'react-native';
import {Icon} from 'react-native-elements';
import GlobalStyles from "../styles/GlobalStyles";
import MainText from "../components/MainText";
import {
    CONTACT_ADDRESS,
    CONTACT_EMAIL,
    CONTACT_PHONE,
    CONTACT_WEBSITE,
    PRIMARY_COLOR,
    SECONDARY_COLOR
} from "../utils/constants";
import {Font} from "../utils/font";
import {openLink} from "../utils/helper";


const ContactUsScreen = () => {


    return (

        <SafeAreaView style={[GlobalStyles.container, styles.container]}>

            <ScrollView showsVerticalScrollIndicator={false}>


                <View style={GlobalStyles.viewContainer}>

                    <View style={styles.imgContainer}>
                        <Image
                            source={require('../assets/image/contact-us-illustration.png')}
                            style={styles.image}
                        />
                    </View>

                    <View style={styles.card}>

                        <MainText style={styles.cardHeaderText}>We are here to answer any questions you
                            may have about our services. Reach our to us
                            and we"ll respond as soon as we can.
                        </MainText>



{/*
                        <TouchableNativeFeedback
                            onPress={() => openLink(`tel:${CONTACT_PHONE}`)}
                        >
                            <View style={styles.contactItemContainer}>
                                <Icon name='phone' size={20} color={SECONDARY_COLOR}/>
                                <View style={styles.contactItemTextContainer}>
                                    <MainText style={styles.contactItemLabel}>Phone</MainText>
                                    <MainText style={styles.contactItemVal}>{CONTACT_PHONE}</MainText>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
*/}




                        {/* Website */}
                        <TouchableNativeFeedback
                            onPress={() => openLink(`https://${CONTACT_WEBSITE}`)}
                        >
                            <View style={styles.contactItemContainer}>

                                <Icon size={20} name='globe' type='entypo' color={SECONDARY_COLOR}/>

                                <View style={styles.contactItemTextContainer}>
                                    <MainText style={styles.contactItemLabel}>Website</MainText>
                                    <MainText style={styles.contactItemVal}>{CONTACT_WEBSITE}</MainText>
                                </View>
                            </View>
                        </TouchableNativeFeedback>


                        <TouchableNativeFeedback
                            onPress={() => openLink(`mailto:${CONTACT_EMAIL}`)}
                        >

                            <View style={styles.contactItemContainer}>
                                <Icon name='email' size={20} color={SECONDARY_COLOR}/>
                                <View style={styles.contactItemTextContainer}>
                                    <MainText style={styles.contactItemLabel}>Email</MainText>
                                    <MainText style={styles.contactItemVal}>{CONTACT_EMAIL}</MainText>
                                </View>
                            </View>
                        </TouchableNativeFeedback>


                        {/* Address */}
                        <TouchableNativeFeedback
                            onPress={() => openLink(`https://www.google.com/maps/search/?api=1&query=${CONTACT_ADDRESS}`)}
                        >
                            <View style={[styles.contactItemContainer, styles.addressItemContainer]}>
                                <Icon size={20} name='location' type='entypo' color={SECONDARY_COLOR}/>

                                <View style={styles.contactItemTextContainer}>
                                    <MainText style={styles.contactItemLabel}>Address</MainText>
                                    <MainText style={styles.contactItemVal}>
                                        {CONTACT_ADDRESS}
                                    </MainText>
                                </View>
                            </View>
                        </TouchableNativeFeedback>

                    </View>

                </View>
            </ScrollView>

        </SafeAreaView>


    );
};

const styles = StyleSheet.create({

    container: {},

    image: {
        width: '100%',
        height: 200,
    },
    imgContainer: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        backgroundColor: 'white',
        elevation: 1,
        borderRadius: 2,
        overflow: 'hidden',
    },

    card: {
        paddingVertical: 40,
        borderRadius: 2,
        overflow: 'hidden',
        paddingHorizontal: 20,
        backgroundColor: 'white',
        elevation: 1,
        justifyContent: 'center'
    },

    cardHeaderText: {
        fontSize: 16,
        fontFamily: Font.MontserratSemiBold,
        marginBottom: 35,
        color: PRIMARY_COLOR,
        lineHeight: 23
    },

    contactItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 12,
        elevation: 1,
        borderLeftColor: SECONDARY_COLOR,
        borderLeftWidth: 2,

    },


    contactItemTextContainer: {
        marginLeft: 20
    },

    addressItemContainer: {
        marginBottom: 0
    },

    contactItemLabel: {
        color: SECONDARY_COLOR,
        fontFamily: Font.MontserratMedium,
        marginBottom: 2
    },

    contactItemVal: {
        fontSize: 12,
        fontFamily: Font.MontserratMedium,
        lineHeight: 18
    }


});

export default ContactUsScreen;
