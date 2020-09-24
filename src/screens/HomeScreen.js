import React, {useState, useEffect} from 'react';
import {
    Dimensions,
    View,
    SafeAreaView,
    ScrollView,
    RefreshControl,
    StyleSheet,
    Text,
    ToastAndroid, Modal, TouchableOpacity
} from 'react-native';
import {getAuth, getAuthHeaderObj, handleLogout} from '../utils/helper'
import Spinner from "../components/Spinner";
import PostItem from "../components/PostItem";
import Carousel, {Pagination} from 'react-native-snap-carousel';
import GlobalStyles from "../styles/GlobalStyles";
import HttpService from "../../services/HttpService";
import {PRIMARY_DARK_COLOR} from "../utils/constants";
import {Font} from "../utils/font";
import ImageViewer from "react-native-image-zoom-viewer";
import {Icon} from "react-native-elements";
import {useFocusEffect} from '@react-navigation/native';


const screenWidth = Dimensions.get("window").width;

const HomeScreen = ({navigation}) => {

    const [data, setData] = useState([]);
    const [activeSlide, setActiveSlide] = useState(0);
    const [refreshing, setRefreshing] = React.useState(false);
    const [loader, setLoader] = useState(false);
    const [userName, setUserName] = useState('');
    const [showModal, setModalVisibility] = useState(false);
    const [fullScreenImgUrl, setFullScreenImageUrl] = useState("");


    const fetchPost = async () => {
        const header = await getAuthHeaderObj();
        try {
            const post = await HttpService.get(
                '/Blog/home_image_list',
                {
                    headers: header
                }
            );
            console.log('Post details', post);
            if (post.status === 200) return setData(post.data.result);
            ToastAndroid.show('Something went wrong, Please try again later', ToastAndroid.LONG);
        } catch (e) {
            console.log('Error occurred while fetching home screen data', e);
            if (e.response.status === 401) {
                ToastAndroid.show('Session expired... Logging out', ToastAndroid.LONG);
                return await handleLogout(navigation);
            }
            ToastAndroid.show('Unexpected error occurred .....', ToastAndroid.LONG)
        }
    };

    const initHomepage = async () => {
        try {
            const {first_name} = await getAuth();
            setUserName(first_name);
        } catch (e) {
            console.log('Error while init homepage', e);
        }
    };

    useEffect(() => {
        setLoader(true);
        initHomepage().then((success, error) => {
            if (error) console.log('Error in home page init promise', error);
        });

    }, []);


    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            fetchPost().then((success, error) => {
                setLoader(false);
            });
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );


    const onRefresh = () => {
        setRefreshing(true);
        fetchPost().then((success, error) => {
            setRefreshing(false);
        })
    };

    const renderNoItemFound = () => (
        <View style={styles.noItemContainer}>
            <Text style={styles.itemTitle}>No data found</Text>
        </View>
    );


    // rendering modal header if modal is  visible
    const renderModalHeader = (index) => {
        console.log('curr index', index);
        return (
            <View style={styles.modalHeaderContainer}>

                <View style={styles.modalLeftContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisibility(false);
                            setFullScreenImageUrl("");
                        }}
                    >
                        <View style={[styles.modalHeadItem, styles.modalHeaderLeft]}>
                            <Icon name='arrow-back' color='#eee' type='material' size={20}/>
                            <Text style={styles.modalText}>Go Back</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/*

                <View style={styles.modalRightContainer}>
                    <TouchableOpacity onPress={() => false}>
                        <View style={[styles.modalHeadItem, styles.modalHeaderRight,]}>
                            <Icon name='md-save' color='#eee' type='ionicon' size={17}/>
                            <Text style={[styles.modalText, styles.saveText]}>Save</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                */}


            </View>
        )
    };


    const handleImagePress = (imgUrl) => {
        setFullScreenImageUrl(imgUrl);
        setModalVisibility(true);
    };


    return (
        <SafeAreaView style={[GlobalStyles.container, GlobalStyles.flexCenter]}>

            {(userName !== '') && <Text style={styles.userNameTxt}>Welcome {userName}</Text>}

            {loader && <Spinner message='Loading'/>}

            {(data.length === 0) && renderNoItemFound()}

            {
                (data.length !== 0)
                &&
                <ScrollView
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                >

                    <View style={styles.contentContainer}>

                        <Carousel
                            layout='stack'
                            data={data}
                            renderItem={({item}) => <PostItem handleImagePress={handleImagePress} data={item}
                                                              navigation={navigation}/>}
                            sliderWidth={screenWidth}
                            itemWidth={screenWidth - 60}
                            layoutCardOffset={18}
                            onSnapToItem={(index) => setActiveSlide(index)}
                            activeAnimationType='decay'
                            activeAnimationOptions={{
                                friction: 4,
                                tension: 40
                            }}
                            loop={false}
                            autoplay
                            autoplayDelay={7000}
                            autoplayInterval={5000}
                        />

                        <Pagination
                            dotsLength={data.length}
                            activeDotIndex={activeSlide}
                            containerStyle={styles.paginationContainerStyle}
                            dotStyle={{
                                width: 7,
                                height: 7,
                                borderRadius: 4,
                                marginHorizontal: 0,
                                backgroundColor: PRIMARY_DARK_COLOR
                            }}
                            inactiveDotStyle={{
                                // Define styles for inactive dots here
                            }}
                            inactiveDotOpacity={0.2}
                            inactiveDotScale={0.6}
                        />

                    </View>
                </ScrollView>

            }


            <Modal visible={showModal} transparent={true}>
                <ImageViewer
                    renderHeader={renderModalHeader}
                    renderIndicator={() => <Text></Text>}
                    imageUrls={[{url: fullScreenImgUrl}]}
                    saveToLocalByLongPress={false}
                />
            </Modal>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    paginationContainerStyle: {width: '80%'},
    contentContainer: {
        alignItems: 'center',
        position: 'relative'

    },
    noItemContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemTitle: {
        fontFamily: Font.MontserratSemiBold,
        fontSize: 16,
        marginBottom: 2,
        color: 'rgba(0, 0, 0, 0.5)'
    },

    userNameTxt: {
        color: 'rgba(0, 0, 0, 0.2)',
        position: 'absolute',
        right: 20,
        top: 20,
        zIndex: 999,
        fontSize: 14,
        fontFamily: Font.MontserratSemiBold
    },


    modalHeaderContainer: {
        position: "absolute",
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        top: 12,
        zIndex: 9999,
        justifyContent: 'space-between'
    },
    modalHeadItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 13,
        paddingVertical: 10,
        borderRadius: 3,
        justifyContent: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    modalHeaderLeft: {
        marginLeft: 5,
    },

    modalHeaderRight: {
        marginRight: 5,
    },

    modalLeftContainer: {},
    modalRightContainer: {
        marginLeft: 'auto'

    },

    modalText: {
        fontFamily: Font.MontserratBold,
        color: "#eee",
        fontSize: 17,
        marginLeft: 5
    },

    saveText: {
        marginLeft: 7
    }

});


export default HomeScreen;


