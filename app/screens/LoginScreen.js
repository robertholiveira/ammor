import React, { Component } from 'react';
import { AsyncStorage, TextInput, ActivityIndicator, Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';

import { WSnackBar } from 'react-native-smart-tip';
import { TextInputMask } from 'react-native-masked-text';
import RNPickerSelect from 'react-native-picker-select';

import api from '../services/api';

export default class LoginScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    inputRefs = {
        funcao: null
    };    

    state = {
        cpf: '',
        senha: '',
        funcao: '',
        tentativas: 0,
        enviandoRequisicao: false
    };

    handleCpfChange = (cpf) => {
        this.setState({ cpf });
    };

    handleSenhaChange = (senha) => {
        this.setState({ senha });
    };

    handleLogin = async () => {

        const { navigation } = this.props;

        if (this.state.cpf.length != 14 || this.state.senha.length === 0 || this.state.funcao.length === 0) {
            WSnackBar.show({
                data: 'Preencha os campos.',
                position: WSnackBar.position.BOTTOM, // 1.TOP 2.CENTER 3.BOTTOM
                duration: WSnackBar.duration.SHORT, //1.SHORT 2.LONG 3.INDEFINITE
                textColor: '#F5F5F5',
                backgroundColor: '#d75156',
                height: 60,
            });
        } else {
            if (this.state.tentativas >=3) {
                WSnackBar.show({
                    data: 'Tentativas de login excedido.',
                    position: WSnackBar.position.BOTTOM, // 1.TOP 2.CENTER 3.BOTTOM
                    duration: WSnackBar.duration.SHORT, //1.SHORT 2.LONG 3.INDEFINITE
                    textColor: '#F5F5F5',
                    backgroundColor: '#d75156',
                    height: 60,
                    actionText: 'Sair',
                    actionTextColor: '#F5F5F5',
                    height: 60,
                    actionClick: () => { navigation.navigate('Home')  },
                });
            } else {
                try {

                    this.setState({
                        enviandoRequisicao: true
                    });

                    const response = await api.post('/login', {
                        cpf: this.state.cpf,
                        senha: this.state.senha,
                        funcao: this.state.funcao
                    });

                    await AsyncStorage.setItem('loginToken', response.data.token);
                    await AsyncStorage.setItem('isAdmin', this.state.funcao === "gerenciador" ? JSON.stringify(true) : JSON.stringify(false) );


                    WSnackBar.show({
                        data: 'Login sucedido.',
                        position: WSnackBar.position.BOTTOM, // 1.TOP 2.CENTER 3.BOTTOM
                        duration: WSnackBar.duration.INDEFINITE, //1.SHORT 2.LONG 3.INDEFINITE
                        textColor: '#F5F5F5',
                        backgroundColor: '#d75156',
                        actionText: 'ACESSAR',
                        actionTextColor: '#F5F5F5',
                        height: 60,
                        actionClick: () => { this.state.funcao == 'associado' ?  navigation.navigate('Associado') : navigation.navigate('Gerenciador')  },
                    });

                    this.setState({
                        enviandoRequisicao: false
                    });


                } catch (err) {

                    console.log(err);

                    this.setState({
                        enviandoRequisicao: false,
                        tentativas: this.state.tentativas+=1
                    });

                    WSnackBar.show({
                        data: 'CPF ou senha incorretos.',
                        position: WSnackBar.position.BOTTOM, // 1.TOP 2.CENTER 3.BOTTOM
                        duration: WSnackBar.duration.SHORT, //1.SHORT 2.LONG 3.INDEFINITE
                        textColor: '#F5F5F5',
                        backgroundColor: '#d75156',
                        height: 60
                    });
                }
            }
        }
    };

    render() {

        const { navigation } = this.props;

        const funcoes = [
            {
                label: 'Associado',
                value: 'associado',
            },
            {
                label: 'Gerenciador',
                value: 'gerenciador',
            },
        ];

        return (
            <View style={styles.wrapper}>
                <Text style={styles.header}>Faça login</Text>

                <View style={styles.containerPicker}>
                    <RNPickerSelect
                        placeholder={{
                            label: 'Selecione uma função',
                            value: null,
                            color: '#9EA0A4',
                        }}
                        items={funcoes}
                        onValueChange={value => {
                            this.setState({
                                funcao: value,
                            });
                        }}
                        style={pickerSelectStyles}
                        value={this.state.funcao}
                        ref={el => {
                            this.inputRefs.funcao = el;
                        }}
                    />
                </View>

                <TextInputMask
                    type={'cpf'}
                    value={this.state.cpf}
                    style={styles.textInput}
                    placeholder="CPF" placeholderTextColor="#fff"
                    value={this.state.cpf}
                    onChangeText={this.handleCpfChange}
                />

                <TextInput
                    placeholder="Senha" placeholderTextColor="#fff"
                    value={this.state.senha}
                    style={styles.textInput}
                    onChangeText={this.handleSenhaChange}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                />

                <Button
                    onPress={() => { this.handleLogin() }}
                    style={styles.button}
                    title="Fazer login"
                    color="#d75156"
                    disabled={this.state.enviandoRequisicao}
                />
                <TouchableOpacity
                    onPress={() => { navigation.navigate('Cadastro') }}
                >
                    <Text style={styles.signUpText}>
                        Não tem uma conta? Cadastre-se
                    </Text>
                </TouchableOpacity>

                {
                    this.state.enviandoRequisicao &&
                    <View style={styles.containerLoading}>
                        <ActivityIndicator size="large" color="#F5F5F5" />
                    </View>
                }

            </View>
        );
    }
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#FC6663',
        paddingLeft: 30,
        paddingRight: 30
    },
    header: {
        fontSize: 24,
        color: '#fff',
        paddingBottom: 10,
        marginBottom: 20,
        fontFamily: 'poppins-bold',
    },
    textInput: {
        alignItems: 'stretch',
        height: 40,
        marginBottom: 30,
        marginRight: 5,
        marginLeft: 5,
        color: '#fff',
        borderBottomColor: '#FF9D9D',
        borderBottomWidth: 1,
        fontFamily: 'poppins'
    },
    button: {
        padding: 20,
        fontFamily: 'poppins-bold',
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 30
    },
    signUpText: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'poppins',
        paddingTop: 20
    },
    containerPicker: {
        borderBottomColor: '#FF9D9D',
        borderBottomWidth: 1,
        marginBottom: 20
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        borderBottomColor: '#FF9D9D',
        borderBottomWidth: 1,
        color: '#fff',
    },
    inputAndroid: {
        borderBottomColor: '#FF9D9D',
        borderBottomWidth: 1,
        color: '#fff',
    },
});
