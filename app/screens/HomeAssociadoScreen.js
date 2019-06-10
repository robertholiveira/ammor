import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    Button,
    View,
    AsyncStorage
} from 'react-native';

export default class HomeHomeAssociadoScreenScreen extends React.Component {
    
    static navigationOptions = {
        header: null,
    };

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.wrapper}>

                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/images/logo-ammor.png')}
                        style={styles.LogoImage}
                    />
                </View>

                <View style={styles.textContainer}>

                    <Text style={styles.getStartedTitle}>Bem-vindo ao app Ammor!</Text>

                    <Text style={styles.getStartedText}>
                        Faça doações, acompanhe os status financeiros da ONG e se inscreva em ações voluntárias!
                    </Text>

                    <View style={styles.buttonContainer}>
                        <Button
                            onPress={() => navigation.navigate('Doacao')}
                            title="Faça uma doação"
                            color="#FC6663"
                            style={styles.button}
                        />
                    </View>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#F5F5F5',
        flex: 1,
        justifyContent: 'center',
       
    },
    imageContainer: {
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    LogoImage: {
        width: 180,
        height: 160,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    textContainer: {
        marginHorizontal: 30,    
    },
    getStartedText: {
        fontSize: 17,
        color: '#666',
        lineHeight: 24,
        textAlign: 'center',
        fontFamily: 'poppins'
    },
    getStartedTitle: {
        fontSize: 19,
        color: '#FC6663',
        lineHeight: 24,
        marginBottom: 5,
        textAlign: 'center',
        fontFamily: 'poppins-bold'
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%'
    },
    button:{
    }
});
