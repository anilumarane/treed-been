import React from 'react';
import {Text, StyleSheet, View, SafeAreaView, ScrollView, TouchableNativeFeedback} from 'react-native'
import GlobalStyles from "../styles/GlobalStyles";
import MainText from "../components/MainText";
import {Font} from "../utils/font";
import {
    CONTACT_EMAIL,
    DARK_COLOR,
    GREY_DARK, PAYMENT_EMAIL,
    PRIMARY_COLOR,
    PRIMARY_DARK_COLOR,
    SECONDARY_COLOR
} from "../utils/constants";
import {openLink} from "../utils/helper";

const SubscriptionScreen = props => {
    return (
        <SafeAreaView style={[GlobalStyles.container, styles.container]}>

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={[GlobalStyles.viewContainer, styles.viewContainer]}>

                    <View style={[styles.cardContainer]}>

                        <View style={styles.secHeader}>
                            <Text style={styles.secHeaderTxt}>Subscriptions</Text>
                            <Text style={styles.secHeaderBorder}> </Text>
                        </View>

                        <View style={styles.cards}>

                            <View style={styles.card}>
                                <View style={styles.header}>
                                    <Text style={styles.headerText}>3 Days</Text>
                                </View>
                                <View style={styles.body}>
                                    <Text style={styles.bodyText}>Free</Text>
                                </View>
                                <View style={styles.footer}>
                                    <Text style={styles.footerText}>Enjoy free access to our services for 3 days.</Text>
                                </View>
                            </View>


                            <View style={[styles.card, styles.cardLong]}>
                                <View style={styles.header}>
                                    <Text style={[styles.headerText, styles.cardLongTxt]}> 1 Month</Text>
                                </View>
                                <View style={styles.body}>
                                    <View style={styles.priceContainer}>
                                        <Text style={[styles.bodyText, styles.cardLongTxt]}>₹ 5900</Text>
                                        <Text style={[styles.gstText, styles.cardLongTxt]}>*GST inluded</Text>
                                    </View>
                                </View>
                                <View style={styles.footer}>
                                    <Text style={[styles.footerText, styles.cardLongTxt]}>Enjoy 1 month access to our
                                        services for just Rs
                                        5900.</Text>
                                </View>
                            </View>


                        </View>

                    </View>


                    <View style={styles.cardContainer}>

                        <View style={styles.secHeader}>
                            <Text style={styles.secHeaderTxt}>Payment Details</Text>
                            <Text style={styles.secHeaderBorder}> </Text>
                        </View>


                        <View style={[styles.card, styles.paymentCard]}>

                            <View style={styles.paymentInfoWrap}>
                                <Text style={styles.paymentInfoLabel}>Kindly contact for payment details.</Text>
                                <TouchableNativeFeedback onPress={() => openLink(`mailto:${PAYMENT_EMAIL}`)}>
                                    <Text style={styles.paymentInfoEmail}>{PAYMENT_EMAIL}</Text>
                                </TouchableNativeFeedback>
                            </View>


                            {/*


                            <View style={styles.paymentItem}>
                                <MainText style={styles.paymentLabel}>Name: </MainText>
                                <MainText style={styles.paymentVal}>Tradebeen</MainText>
                            </View>

                            <View style={styles.paymentItem}>
                                <MainText style={styles.paymentLabel}>Account Type: </MainText>
                                <MainText style={styles.paymentVal}>Current Account</MainText>
                            </View>

                            <View style={styles.paymentItem}>
                                <MainText style={styles.paymentLabel}>Account Number: </MainText>
                                <MainText style={styles.paymentVal}>8913052437</MainText>
                            </View>

                            <View style={styles.paymentItem}>
                                <MainText style={styles.paymentLabel}>Bank: </MainText>
                                <MainText style={styles.paymentVal}>Kotak Bank</MainText>
                            </View>

                            <View style={styles.paymentItem}>
                                <MainText style={styles.paymentLabel}>Branch: </MainText>
                                <MainText style={styles.paymentVal}>Bidadi Branch</MainText>
                            </View>

                            <View style={styles.paymentItem}>
                                <MainText style={styles.paymentLabel}>IFSC CODE: </MainText>
                                <MainText style={styles.paymentVal}>kkbk0000445</MainText>
                            </View>

                            <View style={styles.paymentItem}>
                                <MainText style={styles.paymentLabel}>Email: </MainText>
                                <MainText style={styles.paymentVal}>admin@quantaprofile.com.</MainText>
                            </View>
*/}


                            <View style={styles.paymentNoteContainer}>

                                <Text style={styles.paymentNote}>Note : After payment kindly send the payment details
                                    to</Text>
                                <TouchableNativeFeedback onPress={() => openLink(`mailto:${CONTACT_EMAIL}`)}>
                                    <Text style={[styles.paymentNote, styles.paymentNoteEmail]}>{CONTACT_EMAIL}</Text>
                                </TouchableNativeFeedback>

                            </View>


                        </View>


                    </View>


                    <View style={styles.cardContainer}>

                        <Text style={styles.blogHeaderTxt}>Microstructure analysis for traders</Text>

                        <View style={styles.blogContents}>

                            <MainText style={styles.blogTxt}>
                                RoBo-Digi is a Scientific Programming tool for traders. It recognizes the Data and
                                calculate Future outcomes, And Reading the Most probable trading Patterns in Financial
                                Market.
                            </MainText>

                            <View style={styles.blogOverview}>

                                <Text style={styles.blogOverviewHeader}>Overview : </Text>

                                <View style={styles.blogOverviewList}>

                                    <Text style={styles.blogOverviewItem}>Recognize and notice immediately.</Text>

                                    <Text style={styles.blogOverviewItem}>
                                        Alert goes to Subscriber most probable analyzes
                                    </Text>

                                    <Text style={styles.blogOverviewItem}>
                                        TradingBeen is a Mother company of this App.
                                    </Text>

                                    <Text style={styles.blogOverviewItem}>
                                        Finding Market Profile Analyses along with Quanta (New) analysis.
                                    </Text>

                                </View>

                            </View>

                        </View>


                        <MainText style={styles.blogNote}>
                            Note: Kindly Read all the Policies & terms Condition. Quanta Profile/TradingBeen is not own
                            any Risk. And App doesn’t provide any Advisory, it is Educational App.
                        </MainText>


                    </View>


                </View>


            </ScrollView>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    viewContainer: {
        paddingTop: '10%'
    },
    container: {
        backgroundColor: '#f5f5f5'
    },
    cardContainer: {
        marginBottom: 30
    },
    cards: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },

    card: {
        flex: 0.48,
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: 'white',
        borderRadius: 4,
        overflow: 'hidden',
        elevation: 0.5,

    },

    cardLong: {
        backgroundColor: '#59c4b0',
    },

    header: {
        paddingVertical: 8
    },

    headerText: {
        fontFamily: Font.MontserratMedium,
        color: '#515254',
        fontSize: 18

    },
    body: {
        paddingVertical: 15
    },
    bodyText: {

        fontFamily: Font.MontserratSemiBold,
        color: '#33373b',
        fontSize: 28,
    },
    footer: {
        paddingVertical: 8
    },

    footerText: {
        fontFamily: Font.Montserrat,
        color: 'rgba(51,55,59,0.57)',
        lineHeight: 18,
        fontSize: 14,
    },

    priceContainer: {
        flexDirection: 'row',
    },

    gstText: {
        paddingBottom: 5,
        fontFamily: Font.MontserratMedium,
        fontSize: 9,
        color: '#515254',

    },

    cardLongTxt: {
        color: 'white'
    },

    secHeader: {
        marginBottom: 15,
        marginRight: 'auto'
    },

    secHeaderTxt: {
        fontFamily: Font.MontserratBold,
        fontSize: 20,
        color: PRIMARY_DARK_COLOR,
        marginBottom: 5
    },

    secHeaderBorder: {
        width: 30,
        height: 2,
        backgroundColor: SECONDARY_COLOR
    },

    paymentItem: {
        flexDirection: "row",
        marginTop: 7
    },

    paymentLabel: {
        flex: 0.4,
        fontSize: 13,
        fontFamily: Font.Montserrat,
        color: '#515254',

    },
    paymentVal: {
        flex: 0.6,
        fontSize: 13,
        color: '#33373b',
        fontFamily: Font.Montserrat,
        paddingLeft: 20
    },

    blogHeaderTxt: {
        fontFamily: Font.MontserratBold,
        fontSize: 16,
        color: PRIMARY_DARK_COLOR,
        marginBottom: 5
    },
    blogTxt: {
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'justify',
        color: DARK_COLOR,
    },
    blogContents: {
        paddingRight: 10,
    },
    blogOverview: {
        marginTop: 5
    },
    blogOverviewHeader: {
        fontFamily: Font.MontserratSemiBold,
        fontSize: 16,
        color: PRIMARY_DARK_COLOR,
        marginBottom: 5
    },
    blogOverviewList: {
        marginLeft: 10
    },
    blogOverviewItem: {
        fontSize: 13,
        fontFamily: Font.Montserrat,
        lineHeight: 17,
        marginBottom: 3,
        color: DARK_COLOR,
    },
    blogNote: {
        marginTop: 10,
        lineHeight: 19,
        fontSize: 13,
        fontFamily: Font.Montserrat,
        color: PRIMARY_DARK_COLOR,
    },

    paymentCard: {
        paddingHorizontal: 20,
        elevation: 1
    },


    paymentNoteContainer: {
        marginTop: 15,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },


    paymentNote: {
        color: DARK_COLOR,
        fontFamily: Font.MontserratBold,
        fontSize: 12,
        marginRight: 3
    },

    paymentNoteEmail: {},

    paymentInfoLabel: {
        fontFamily: Font.MontserratBold,
        fontSize: 15,
        color: PRIMARY_DARK_COLOR,
        marginBottom: 2,
        letterSpacing : 0.2
    },

    paymentInfoEmail: {
        fontFamily: Font.MontserratBold,
        letterSpacing : 0.2,
        fontSize: 15,
        color: '#1168c0',
        marginBottom: 5,
        textTransform : "uppercase"
    },

    paymentInfoWrap: {}

});

export default SubscriptionScreen;
