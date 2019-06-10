import React from 'react';
import {
    AsyncStorage,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    ActivityIndicator
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ValidationComponent from 'react-native-form-validator';

import { WSnackBar } from 'react-native-smart-tip';

import api from '../services/api';

export default class CadastroScreen extends ValidationComponent {

    state = {
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        senha: '',
        confirmaSenha: '',
        errors: '',
        enviandoRequisicao: false
    };

    static navigationOptions = {
        header: null,
    };

    Cadastrar = () => {

        const { navigation } = this.props;

        this.validate({
            nome: { minlength: 3, maxlength: 25, required: true },
            cpf: { minlength: 13, maxlength: 14 },
            email: { email: true },
            telefone: { minlength: 14, maxlength: 16, required: true, },
            senha: { required: true }
        });

        this.setState({
            errors: this.getErrorMessages()
        });

        if (this.isFormValid()) {

            this.setState({
                enviandoRequisicao: true
            });

            api.post('/associados',
                {
                    cpf: this.state.cpf,
                    nome: this.state.nome,
                    email: this.state.email,
                    telefone: this.state.telefone,
                    senha: this.state.senha
                })
                .then(async response => {
                    if (response.status == 200) {

                        await AsyncStorage.setItem('loginToken', response.data.token);

                        this.setState({
                            enviandoRequisicao: false
                        });

                        WSnackBar.show({
                            data: 'Cadastro efetuado.',
                            position: WSnackBar.position.BOTTOM, // 1.TOP 2.CENTER 3.BOTTOM
                            duration: WSnackBar.duration.INDEFINITE, //1.SHORT 2.LONG 3.INDEFINITE
                            textColor: '#F5F5F5',
                            backgroundColor: '#d75156',
                            actionText: 'ACESSAR',
                            actionTextColor: '#F5F5F5',
                            height: 60,
                            actionClick: () => { navigation.navigate('Associado') },
                        });
                    }
                })
                .catch( err =>{
                    WSnackBar.show({
                        data: 'E-mail ou CPF já cadastrados.',
                        position: WSnackBar.position.BOTTOM, // 1.TOP 2.CENTER 3.BOTTOM
                        duration: WSnackBar.duration.SHORT, //1.SHORT 2.LONG 3.INDEFINITE
                        textColor: '#F5F5F5',
                        backgroundColor: '#d75156',
                        height: 60
                    });
                });
        };
    };

    render() {
        
        return (
            <KeyboardAwareScrollView enableOnAndroid={true} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.wrapper}>

                    <Text style={styles.header}>Cadastre-se no Ammor.</Text>

                    <TextInput
                        style={styles.textInput}
                        placeholder="Nome"
                        placeholderTextColor="#fff"
                        underlineColorAndroid={'transparent'}
                        value={this.state.nome}
                        onChangeText={text => {
                            this.setState({
                                nome: text
                            })
                        }}
                    />

                    <TextInput
                        style={styles.textInput}
                        placeholder="E-mail"
                        placeholderTextColor="#fff"
                        underlineColorAndroid={'transparent'}
                        keyboardType="email-address"
                        value={this.state.email}
                        onChangeText={text => {
                            this.setState({
                                email: text
                            })
                        }}
                    />

                    <View style={styles.row}>
                        <View style={styles.column} >
                            <TextInputMask
                                type={'cpf'}
                                value={this.state.cpf}
                                style={styles.textInput}
                                placeholder="CPF" placeholderTextColor="#fff"
                                value={this.state.cpf}
                                onChangeText={text => {
                                    this.setState({
                                        cpf: text
                                    })
                                }}
                            />
                        </View>
                        <View style={styles.column} >
                            <TextInputMask
                                style={styles.textInput}
                                placeholder="Telefone"
                                placeholderTextColor="#fff"
                                underlineColorAndroid={'transparent'}
                                value={this.state.telefone}
                                type={'cel-phone'}
                                options={{
                                    maskType: 'BRL',
                                    withDDD: true,
                                    dddMask: '(99) '
                                }}
                                onChangeText={text => {
                                    this.setState({
                                        telefone: text
                                    })
                                }}
                            />
                        </View>
                    </View>

                    <TextInput
                        style={styles.textInput}
                        placeholder="Senha"
                        placeholderTextColor="#fff"
                        underlineColorAndroid={'transparent'}
                        secureTextEntry
                        onChangeText={text => {
                            this.setState({
                                senha: text
                            })
                        }}
                    />

                    <Button
                        onPress={() => { this.Cadastrar() }}
                        style={styles.button}
                        title="Cadastrar"
                        color="#d75156"
                        disabled={this.state.enviandoRequisicao}
                    />

                    {
                        this.state.enviandoRequisicao &&
                        <View style={styles.containerLoading}>
                            <ActivityIndicator size="large" color="#F5F5F5" />
                        </View>
                    }

                    <Text style={styles.errorMessage}>
                        {this.state.errors}
                    </Text>
                </View>
            </KeyboardAwareScrollView>
        );
    }
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    column: {
        flex: 5,
        flexDirection: 'column'
    },
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
    errorMessage: {
        color: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        fontFamily: 'poppins',
        fontSize: 12
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
    }
});
