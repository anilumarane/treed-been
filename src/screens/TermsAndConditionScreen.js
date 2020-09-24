import React from 'react';
import {View, StyleSheet, ScrollView, SafeAreaView} from 'react-native'
import {Font} from "../utils/font";
import {DARK_COLOR} from "../utils/constants";
import GlobalStyles from "../styles/GlobalStyles";
import MainText from "../components/MainText";

const TermsAndConditionScreen = () => {
    return (

        <SafeAreaView style={[GlobalStyles.container, styles.container]}>

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={GlobalStyles.viewContainer}>

                    <View style={styles.itemContainer}>

                        <MainText style={styles.itemHeader}>1. Terms of use</MainText>

                        <View style={styles.itemContents}>


                            <MainText style={styles.itemText}>QuantaProfile is fully committed to safeguard your
                                By accessing http://QuantaProfile.com you agree to comply with, and to be bound by,
                                these Terms
                                & Conditions. Please review the Terms & Conditions carefully for protection of your
                                interests.
                            </MainText>


                            <MainText style={styles.itemText}>
                                This website, including any content or information contained in it or any site related
                                service,
                                or any product or service licensed or purchased through this website, is provided on an
                                “as is”
                                basis and without warranties of any kind, express or implied, as to the service,
                                including, but
                                not limited to, merchantability, non-infringement, title, or fitness for a particular
                                purpose or
                                use.
                            </MainText>

                            <MainText style={styles.itemText}>
                                Access to and use of this platform and the information therein is at the user’s risk and
                                the
                                owner does not undertake any accountability for any irregularities, viruses or damage to
                                any.
                            </MainText>


                            <MainText style={styles.itemText}>
                                computer or handheld device that results from accessing, availing or downloading of any
                                information from this site.
                            </MainText>


                            <MainText style={styles.itemText}>
                                This service does not constitute an offer of sale or a solicitation to any person in any
                                jurisdiction where it is unlawful to make such an offer or solicitation.
                            </MainText>


                            <MainText style={styles.itemText}>
                                Partners Rights, Copyrights & No Re-Transmission of Information
                                We authorize http://QuantaProfile.com to send informative updates (notifications) on my
                                registered mobile number and email address.
                            </MainText>


                            <MainText style={styles.itemText}>
                                All intellectual property rights in and to this website, including but not limited to
                                text,
                                content, photographs, video, audio and graphics, products and services herein, are owned
                                by
                                http://QuantaProfile.com absolutely. Those rights include, but are not limited to,
                                database
                                rights, copyright, design rights (whether registered or unregistered), trademarks and
                                service
                                marks (whether registered or unregistered), trade secrets and other similar proprietary
                                rights,
                                wherever existing in the world and including those rights as protected under
                                international
                                treaties, together with the right to apply for protection of the same.
                            </MainText>


                            <MainText style={styles.itemText}>
                                No part of this website shall be reproduced, redistributed, commercially exploited,
                                stored in
                                retrieval system, or transmitted in any form or by any means – electronic,
                                electrostatic,
                                magnetic tape, mechanical, printing, photocopying, recording, or otherwise including the
                                right
                                of translation in any language, without the express permission of the owner. This
                                Website and
                                its contents may be used only for personal and non-commercial use. This service is
                                completely
                                and unconditionally free for the user. Only those individuals and entities that have
                                valid email
                                addresses may register for this Website’s service.
                            </MainText>

                        </View>

                    </View>

                    <View style={styles.itemContainer}>

                        <MainText style={styles.itemHeader}>2. Access Restriction</MainText>

                        <View style={styles.itemContents}>


                            <MainText style={styles.itemText}>
                                The owner of this service has the absolute discretion to permanently deny access and
                                stop
                                services to a registered user if it is observed and deemed that the user is attempting
                                to or has
                                attempted to act in any manner contrary to the nature and scope of our Disclaimer,
                                Privacy
                                Policy and Terms of Service. The owner of the Website retains the complete right to bar
                                any
                                person from using the service of this website, at its discretion, without any prior
                                notice.
                            </MainText>


                            <MainText style={styles.itemText}>
                                Jurisdiction Any dispute arising between the registered user and the owner of the
                                Website shall
                                be subject to the jurisdiction of the relevant authority and court of law situated in
                                Karnataka.
                            </MainText>

                        </View>
                    </View>

                </View>


            </ScrollView>

        </SafeAreaView>


    );
};

const styles = StyleSheet.create({


    itemContainer: {
        marginBottom: 35
    },

    itemContents: {
        marginLeft: 8
    },

    itemHeader: {
        marginBottom: 12,
        fontSize: 18,
        fontFamily: Font.MontserratSemiBold,
    },

    itemText: {
        marginBottom: 8,
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'justify',
        color: DARK_COLOR,
        fontFamily: Font.MontserratMedium
    },

});


export default TermsAndConditionScreen;
