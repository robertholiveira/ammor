import React, { Component } from 'react';
import { View, StyleSheet, Button, WebView, Image, Text } from 'react-native';
import StyledText from '../components/StyledText';

import { TextInputMask } from 'react-native-masked-text';

export default class DoacaoScreen extends Component {

    state = {
        mostrarWebView: false,
        valor: '',
        email: 'contato@ammor.org.br',
        descricaoDoacao: encodeURI('Doação Ammor')
    }

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#d75156',
        },
        headerTintColor: '#fff',
        headerTitle: <StyledText text={'Faça uma doação'} />
    };

    renderWebview() {
        return (
            <WebView
            source={{
                uri: 'https://pagseguro.uol.com.br/v2/checkout/payment.html',
                method:'POST',
                body: `receiverEmail=roberth.oliveira52@gmail.com&currency=BRL&itemId1=1&itemDescription1=${this.state.descricaoDoacao}&itemAmount1=${this.state.valor}&itemQuantity1=1&itemWeight1=1`
            }}
            style={{marginTop: 20}}
            scalesPageToFit
            javaScriptEnabled
            domStorageEnabled
            startInLoadingState
          />
        );
    }

    render() {
        return (
            <View style={styles.wrapper}>
                {this.state.mostrarWebView
                    ? this.renderWebview() :
                    <View style={styles.formContainer}>
                        <View style={styles.iconContainer}>
                            <Image
                                source={require('../assets/images/doacao-icon.png')}
                                style={styles.iconImage}
                            />
                        </View>

                        <Text style={styles.text}>
                            Escolha um valor para doação
                        </Text>

                        <TextInputMask
                            style={styles.textInput}
                            type={'money'}
                            options={{
                                precision: 2,
                                separator: '.',
                                delimiter: ',',
                                unit: 'R$ ',
                                suffixUnit: ''
                            }}
                            placeholder="Valor"
                            textAlign={'center'}
                            placeholderTextColor="#666"
                            underlineColorAndroid={'transparent'}
                            value={this.state.valor}
                            onChangeText={text => {
                                var valor = text.split(' ');
                                this.setState({
                                    valor: valor[1]
                                });
                            }}
                        />
    
                        <Button
                            style={styles.button}
                            title="Fazer doação"
                            color="#FC6663"
                            onPress={() => this.setState({ mostrarWebView: true })}
                        />
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingRight:20,
        paddingLeft:20
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'stretch',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#F5F5F5',
    },
    textInput: {
        alignItems: 'stretch',
        height: 40,
        marginBottom: 30,
        marginRight: 5,
        marginLeft: 5,
        color: '#FC6663',
        borderBottomColor: '#666',
        borderBottomWidth: 1,
        fontSize: 20,
        fontFamily: 'poppins-bold'
        
    },
    iconContainer: {
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconImage: {
        width: 100,
        height: 120,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    text: {
        fontSize: 15,
        color: '#666',
        lineHeight: 24,
        textAlign: 'center',
        fontFamily: 'poppins'
    },
});