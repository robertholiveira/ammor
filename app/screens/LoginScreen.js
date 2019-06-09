import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import api from '../services/api';

import {
    Container,
    Logo,
    Input,
    ErrorMessage,
    Button,
    ButtonText,
    SignUpLink,
    SignUpLinkText,
} from './styles';

export default class LoginScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
            dispatch: PropTypes.func,
        }).isRequired,
    };

    state = {
        email: '',
        password: '',
        error: '',
    };

    handleEmailChange = (email) => {
        this.setState({ email });
    };

    handlePasswordChange = (password) => {
        this.setState({ password });
    };

    handleCreateAccountPress = () => {
        console.log('isso');
    };

    handleLoginScreenPress = async () => {
        const {navigation} = this.props;
        if (this.state.email.length === 0 || this.state.password.length === 0) {
            this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
        } else {
            try {
                const response = await api.post('/associados/login', {
                    email: this.state.email,
                    senha: this.state.password,
                });

                await AsyncStorage.setItem('loginToken', response.data.token);

                console.log(response.data.token);

                navigation.navigate('Main');

            } catch (err) {
                console.log(err);
                this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
            }
        }
    };

    render() {
        return (
            <Container>
                <StatusBar hidden />
                <Logo source={require('../assets/images/logo-ammor.png')} resizeMode="contain" />
                <Input
                    placeholder="Endereço de e-mail"
                    value={this.state.email}
                    onChangeText={this.handleEmailChange}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Input
                    placeholder="Senha"
                    value={this.state.password}
                    onChangeText={this.handlePasswordChange}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                />
                {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
                <Button onPress={this.handleLoginScreenPress}>
                    <ButtonText>Entrar</ButtonText>
                </Button>
                <SignUpLink onPress={this.handleCreateAccountPress}>
                    <SignUpLinkText>Criar conta grátis</SignUpLinkText>
                </SignUpLink>
            </Container>
        );
    }
}