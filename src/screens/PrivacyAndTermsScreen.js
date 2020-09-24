import React from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native'
import GlobalStyles from "../styles/GlobalStyles";
import MainText from "../components/MainText";
import {Font} from "../utils/font";
import {
    DARK_COLOR,
    PRIMARY_DARK_COLOR,
} from "../utils/constants";

const PrivacyAndTermsScreen = () => {


    return (

        <SafeAreaView style={[GlobalStyles.container]}>

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={GlobalStyles.viewContainer}>

                    <View style={styles.itemContainer}>

                        <MainText style={styles.itemHeader}>1. Privacy Policy</MainText>

                        <View style={styles.itemContents}>


                            <MainText style={styles.itemText}>QuantaProfile is fully committed to safeguard your
                                personal information at all times.
                                We must obtain
                                some basic personal information like Full Name, address, telephone numbers, Email
                                address etc., from you
                                to provide you with the QuantaProfile services. This information is helpful to both
                                QuantaProfile and you
                                to fetch services easily and to connect in time.
                                As there is a great risk of giving your personal information and we understand your
                                concern, so, our way
                                of maintaining the information is such that we assure you of the following
                                points:
                            </MainText>


                            <MainText style={styles.itemText}>
                                We only use your personal information to provide you the service to your account, to
                                take your
                                feedback, to take suggestions regarding any improvement material, and to update you
                                about additional
                                products or services that may be of interest to you.
                            </MainText>

                            <MainText style={styles.itemText}>
                                We do not leak your personal information to third parties who do spamming. We however,
                                may share
                                selected information under certain conditions as part of normal business operations
                                under
                                confidentiality agreements. All information regarding to Payment Gateway will be safe
                                and secured on our
                                site.
                            </MainText>

                            <MainText style={[styles.itemText, styles.importantText]}>
                                Note: Our site may contain links to other websites. QuantaProfile/Trading Been is not
                                responsible for
                                the privacy practices or the content of such websites.
                            </MainText>

                        </View>

                    </View>

                    <View style={styles.itemContainer}>

                        <MainText style={styles.itemHeader}>2. Disclaimer</MainText>

                        <View style={styles.itemContents}>

                            <MainText style={styles.itemText}>
                                The website, including any content or information contained with it or any site related
                                service, or any
                                product or service licensed or purchased through the site, is provided on an ” as is”
                                basis and without
                                warranties of any kind, either express or implied, including, but not limited to
                                warranties of title or
                                non-infringement or implied or warranties of merchantability and fitness for a
                                particular purpose, other
                                than those warranties which are implied by and incapable of exclusion, restriction or
                                modification under
                                the laws applicable to this agreement. You acknowledge that any warranty that is
                                provided in connection
                            </MainText>

                            <MainText style={styles.itemText}>
                                with any of the products or services described herein is provided solely by the owner,
                                advertiser,
                                manufacturer or supplier of that product and/or service, and not by
                                http://QuantaProfile.com
                            </MainText>

                            <MainText style={styles.itemText}>
                                http://QuantaProfile.com/ does not warrant that your access to the site and/or related
                                services will be
                                uninterrupted or error-free, that defects will be corrected, or that this site or the
                                server that makes
                                it available is free of viruses or other harmful components. Access to and use of this
                                site and the
                                information is at your risk and http://QuantaProfile.com /does not undertake any
                                accountability for any
                                irregularities, viruses or damage to any computer that results from accessing, availing
                                or downloading
                                of any information from this site. http://QuantaProfile.com /does not warrant or make
                                any
                                representations regarding the use or the results of the use of any product and/or
                                service purchased in
                                terms of its compatibility, correctness, accuracy and reliability or otherwise. You
                                assume total
                                responsibility and risk for your use of this site and site-related services.
                            </MainText>

                            <MainText style={styles.itemText}>
                                A possibility exists that the site could include inaccuracies or errors. Additionally, a
                                possibility
                                exists that unauthorized additions, deletions or alterations could be made by third
                                parties to the site.
                                Although http://QuantaProfile.com /attempts to ensure the integrity, correctness and
                                authenticity of the
                                site, it makes no guarantees whatsoever as to its completeness, correctness or accuracy.
                                In the event
                                that such an inaccuracy arises, please inform the staff at http://QuantaProfile.com /so
                                that it can be
                                corrected.
                            </MainText>

                            <MainText style={styles.itemText}>
                                http://QuantaProfile.com /does not take any compensation of any kind whatsoever from any
                                company that
                                they
                                mention on this website. All data and reports at http://QuantaProfile.com /are only
                                information services
                                for
                                investors and are not individualized recommendations to buy or sell securities, nor
                                offers to buy or
                                sell
                                securities. The publishers of reports, reviews and analysis under
                                http://QuantaProfile.com /are not
                                acting
                                in any way to influence the purchase or sale of securities. The information provided is
                                obtained from
                                sources deemed reliable but is not guaranteed as to accuracy or completeness or as to
                                the results
                                obtained
                                by individuals using such information. It is possible at this or some subsequent date,
                                the publishers of
                                reports, reviews and analysis at http://QuantaProfile.com /may own, buy or sell
                                securities presented.
                            </MainText>

                            <MainText style={styles.itemText}>
                                Each user shall be responsible for the risks of their own investment activities and, in
                                no event, shall
                                http://QuantaProfile.com /, its publishers, employees, owners or investors, be liable
                                for any losses or
                                damages, monetary or otherwise, that result from actions taken after reading the
                                contents of reports,
                                reviews and analysis published on http://QuantaProfile.com/. The publishers recommend
                                that anyone
                                trading securities should do so with caution and consult with a broker and financial
                                advisor before
                                doing so. Past performance may not be indicative of future performance. Some of the
                                securities presented
                                herein should be considered speculative with a high degree of volatility and risk
                            </MainText>

                            <MainText style={styles.itemText}>
                                Price and availability of products and services offered on the site are subject to
                                change without prior
                                notice. To the extent we provide information on the availability of products or services
                                you should not
                                rely on such information. http://QuantaProfile.com /will not be liable for any lack of
                                availability of
                                products and services you may order through the site.
                            </MainText>

                            <MainText style={styles.itemText}>
                                Registration Status with SEBI: We Are Not Registered With SEBI Under the (Research
                                Analyst) Regulations
                                2014 And as Per Clarifications provided by SEBI: “Any Person Who Makes Recommendation or
                                Offers an
                                Opinion Concerning Securities or Public Offers Only through Public Media is not required
                                to Obtain
                                Registration as Research Analyst under RA Regulations”. Trading room is educative in
                                nature. Mr.
                                Shrinivas N Developed a Market Profile Chart with Derivative Analysis (Available in
                                Google with Free
                                Information) through in his personal trades set up for illustrative purpose to make the
                                members
                                understand the concepts better. His Market Profile trading software’s Information or
                                RoBo Digit’s
                                informative things should not be taken as recommendations.
                            </MainText>


                            <MainText style={styles.itemText}>
                                Transactions between you and http://QuantaProfile.com /shall be governed by and
                                construed in accordance
                                with the laws of India, without regard to the laws regarding conflicts of law. Any
                                litigation regarding
                                this agreement or any transaction between customer and http://QuantaProfile.com /or any
                                action at law or
                                in equity arising out of or relating to these agreement or transaction shall be filed
                                only in the
                                Competent Courts of Ramanagaram alone and the customer hereby agrees, consents and
                                submits to the
                                jurisdiction of such courts for the purpose of litigating any such action.
                            </MainText>
                        </View>
                    </View>

                    <View style={styles.itemContainer}>

                        <MainText style={styles.itemHeader}>3. Terms and Condition</MainText>

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

                        <MainText style={styles.itemHeader}>4. Access Restriction</MainText>

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


    importantText: {
        color: PRIMARY_DARK_COLOR
    }


});

export default PrivacyAndTermsScreen;
