import React, {useState, useEffect} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    SafeAreaView,
    Text,
    TouchableNativeFeedback,
    RefreshControl,
    ToastAndroid,
    AppState
} from 'react-native'
import GlobalStyles from "../styles/GlobalStyles";
import Http from '../../services/HttpService'
import {Font} from "../utils/font";
import {DARK_COLOR, GREY_DARK, PRIMARY_COLOR} from "../utils/constants";

import {getAuthHeaderObj, getCurrStrTime, handleLogout} from "../utils/helper";
import Spinner from "../components/Spinner";
import MainText from "../components/MainText";
import {Icon} from "react-native-elements";
import {useFocusEffect} from '@react-navigation/native';


const NotificationsScreen = ({navigation}) => {

    const [commentList, setNotificationList] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [loader, setLoader] = useState(false);


    const fetchPost = async () => {
        const header = await getAuthHeaderObj();
        try {
            const res = await Http.get(
                'Blog/comment_lists',
                {
                    headers: header
                }
            );
            console.log('Comment details', res);
            // max 10 posts allowed on home page
            if (res.status === 200) return setNotificationList(res.data?.result);
            ToastAndroid.show('Something went wrong, Please try again later', ToastAndroid.LONG)
        } catch (e) {

            if (e.response.status === 401) {
                ToastAndroid.show('Session expired... Logging out', ToastAndroid.LONG);
                return await handleLogout(navigation);
            }

            console.log('Error occurred while fetching notifications', e.response);
            ToastAndroid.show('Unexpected error occurred .....', ToastAndroid.LONG);
        }
    };


    useEffect(
        () => {
            setLoader(true);
            AppState.addEventListener('change', _handleAppStateChange);

            return () => {
                console.log('Removing Listener...');
                AppState.removeEventListener('change', _handleAppStateChange);
            };
        },
        []
    );


    // Api call when the screen is focused
    useFocusEffect(
        React.useCallback(() => {
            console.log('Screen focused');
            fetchPost().then((success, error) => {
                setLoader(false);
            });
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );


    const _handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'active') {
            console.log('App has come to the foreground!');
            fetchPost().then((success, error) => {
                setLoader(false);
            });
        }
    };


    const onRefresh = () => {
        setRefreshing(true);
        fetchPost().then((success, error) => {
            setRefreshing(false);
        })
    };

    const renderNoItemFound = () => (
        <View style={styles.noItemContainer}>
            <Text style={styles.itemTitle}>No Notification available</Text>
        </View>
    );

    return (
        <SafeAreaView style={[GlobalStyles.container, styles.container]}>
            {loader && <Spinner message='Loading'/>}
            {(commentList.length === 0) && renderNoItemFound()}
            {(commentList.length !== 0)
            &&
            <View style={styles.viewWrapper}>
                <FlatList
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                    style={styles.flatList}
                    keyExtractor={(item, index) => index.toString()}
                    data={commentList}
                    renderItem={({item}) => {
                        return (
                            <TouchableNativeFeedback>
                                <View style={styles.listItem}>

                                    <Text style={styles.indicator}> </Text>

                                    <View style={styles.itemOverviewContainer}>
                                        <Text style={styles.itemTitle}>{item?.title}</Text>
                                        <MainText style={styles.itemContent}>{item?.comment}</MainText>
                                    </View>

                                    <View style={styles.itemTimeContainer}>
                                        <Icon
                                            name='date-range'
                                            type='material'
                                            size={12}
                                            color={GREY_DARK}
                                        />

                                        <Text style={styles.itemTime}>
                                            {getCurrStrTime(item?.created_at)}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        )
                    }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            }
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {},
    viewWrapper: {
        padding: 20
    },

    headerTxt: {
        fontSize: 20,
        borderBottomWidth: 2,
        borderColor: PRIMARY_COLOR,
        paddingBottom: 5,
        marginRight: 'auto',
        marginBottom: 30
    },


    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: "relative",
        paddingHorizontal: 15,
        paddingVertical: 20,
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 13,
        borderRadius: 3,
        elevation: 1,
    },

    indicator: {
        position: 'absolute',
        width: 2,
        height: 25,
        backgroundColor: PRIMARY_COLOR,
        left: 0,

    },

    itemOverviewContainer: {
        flex: 1,
        marginLeft: 2,
        justifyContent: 'center',

    },
    listImg: {
        width: 40,
        height: 40,
        borderRadius: 100,

    },

    itemTitle: {
        fontFamily: Font.MontserratSemiBold,
        fontSize: 16,
        marginBottom: 2,
        color: 'rgba(0, 0, 0, 0.5)'
    },


    itemTimeContainer: {
        flexDirection: 'row',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 15,
        top: 3
    },

    itemTime: {
        fontSize: 12,
        fontFamily: Font.MontserratSemiBold,
        color: GREY_DARK,
        marginLeft: 2,

    },

    itemContent: {
        fontSize: 14,
        color: DARK_COLOR,
        fontFamily: Font.Montserrat,
        textAlign: 'justify',
        lineHeight: 20

    },
    itemSeperator: {
        borderBottomColor: '#e4e4e4',
        borderBottomWidth: 0.7
    },
    flatList: {},

    noItemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default NotificationsScreen;
