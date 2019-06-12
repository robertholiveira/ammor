import React, { Component } from 'react';
import { View, StyleSheet, Button, TextInput, Text, ActivityIndicator, AsyncStorage } from 'react-native';
import StyledText from '../components/StyledText';

import api from '../services/api';
import { WSnackBar } from 'react-native-smart-tip';


export default class ConfiguracoesAssociadoScreen extends Component {

    state = {
        associadoId: [],
        senha: '',
        confirmaSenha: ''
    }

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#d75156',
        },
        headerTintColor: '#fff',
        headerTitle: <StyledText text={'Configurações'} />
    };

    async componentDidMount() {
        const response = await api.get('/verifyToken');
        const associadoId = response.data.decoded.associadoId;
        this.setState({ associadoId });
    }

    Atualizar = () => {

        if (this.state.senha.length != 0 && this.state.senha === this.state.confirmaSenha) {
            this.setState({
                enviandoRequisicao: true
            });

            api.patch('/associados/' + this.state.associadoId,
            {
                novaSenha: this.state.senha
            })
            .then(async response => {
                if (response.status == 200) {

                    this.setState({
                        enviandoRequisicao: false
                    });

                    WSnackBar.show({
                        data: 'Senha atualizada com sucesso.',
                        position: WSnackBar.position.BOTTOM, // 1.TOP 2.CENTER 3.BOTTOM
                        duration: WSnackBar.duration.LONG, //1.SHORT 2.LONG 3.INDEFINITE
                        textColor: '#F5F5F5',
                        backgroundColor: '#d75156',
                        height: 60,
                    });
                }
            })
            .catch(err => {
                WSnackBar.show({
                    data: 'Erro ao processar requisiçao.',
                    position: WSnackBar.position.BOTTOM, // 1.TOP 2.CENTER 3.BOTTOM
                    duration: WSnackBar.duration.SHORT, //1.SHORT 2.LONG 3.INDEFINITE
                    textColor: '#F5F5F5',
                    backgroundColor: '#d75156',
                    height: 60
                });
            });
        }
        else{
            WSnackBar.show({
                data: 'Confirme a senha corretamente.',
                position: WSnackBar.position.BOTTOM, // 1.TOP 2.CENTER 3.BOTTOM
                duration: WSnackBar.duration.SHORT, //1.SHORT 2.LONG 3.INDEFINITE
                textColor: '#F5F5F5',
                backgroundColor: '#d75156',
                height: 60
            });   
        }
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.wrapper}>
                <Text style={styles.header}>Altere sua senha:</Text>

                <TextInput
                    style={styles.textInput}
                    placeholder="Nova senha"
                    placeholderTextColor="#999"
                    underlineColorAndroid={'transparent'}
                    secureTextEntry
                    onChangeText={text => {
                        this.setState({
                            senha: text
                        })
                    }}
                />

                <TextInput
                    style={styles.textInput}
                    placeholder="Confirme sua nova senha"
                    placeholderTextColor="#999"
                    underlineColorAndroid={'transparent'}
                    secureTextEntry
                    onChangeText={text => {
                        this.setState({
                            confirmaSenha: text
                        })
                    }}
                />

                <Button
                    onPress={() => { this.Atualizar() }}
                    style={styles.button}
                    title="Atualizar senha"
                    color="#d75156"
                    disabled={this.state.enviandoRequisicao}
                />

                <View style={styles.buttonExit}>
                    <Button
                        onPress={() => { 
                            AsyncStorage.removeItem('loginToken');
                            AsyncStorage.removeItem('isAdmin');
                            navigation.navigate('Auth');
                        }}
                        title="Sair da sessão"
                        color="#999"
                        disabled={this.state.enviandoRequisicao}
                    />
                </View>
                {
                    this.state.enviandoRequisicao &&
                    <View style={styles.containerLoading}>
                        <ActivityIndicator size="large" color="#F5F5F5" />
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
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 60
    },
    header: {
        fontSize: 24,
        color: '#FC6663',
        paddingBottom: 10,
        fontFamily: 'poppins-bold',
    },
    textInput: {
        alignItems: 'stretch',
        height: 40,
        marginBottom: 30,
        marginRight: 5,
        marginLeft: 5,
        color: '#666',
        borderBottomColor: '#FF9D9D',
        borderBottomWidth: 1,
        fontSize: 16,
    },
    textInputDisabled: {
        alignItems: 'stretch',
        height: 40,
        marginBottom: 30,
        marginRight: 5,
        marginLeft: 5,
        paddingLeft: 5,
        color: '#999',
        borderBottomColor: '#999',
        borderBottomWidth: 1,
        fontSize: 16,
    },
    buttonExit: {
        marginTop: 20
    },
    text: {
        fontSize: 15,
        color: '#666',
        lineHeight: 24,
        textAlign: 'center',
        fontFamily: 'poppins'
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