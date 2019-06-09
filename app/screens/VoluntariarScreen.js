import React from 'react';
import {
    AsyncStorage,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    ActivityIndicator,
    Image
} from 'react-native';

import RNPickerSelect from 'react-native-picker-select';

import StyledText from '../components/StyledText'


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ValidationComponent from 'react-native-form-validator';

import { WSnackBar } from 'react-native-smart-tip';

import api from '../services/api';

const atividades = [
    {
        label: 'Palestra',
        value: 'Palestra',
    },
    {
        label: 'Serviço comunitário',
        value: 'Serviço comunitário',
    },
    {
        label: 'Serviço médico',
        value: 'Serviço médico',
    },
];

export default class VoluntariarScreen extends ValidationComponent {

    inputRefs = {
        atividade: null
    };

    state = {
        atividade: '',
        mensagem: '',
        enviandoRequisicao: false
    };

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#d75156',
        },
        headerTintColor: '#fff',
        headerTitle: <StyledText text={'Seja um voluntário.'} />
    };

    Cadastrar = () => {

        const { navigation } = this.props;


        this.setState({
            enviandoRequisicao: true
        });

        api.post('/voluntariados',
            {
                atividade: this.state.atividade,
                mensagem: this.state.mensagem
            })
            .then(async response => {
                if (response.status == 200) {

                    this.setState({
                        enviandoRequisicao: false
                    });

                    WSnackBar.show({
                        data: 'Voluntariado enviado.',
                        position: WSnackBar.position.BOTTOM, // 1.TOP 2.CENTER 3.BOTTOM
                        duration: WSnackBar.duration.LONG, //1.SHORT 2.LONG 3.INDEFINITE
                        textColor: '#F5F5F5',
                        backgroundColor: '#d75156',
                        actionTextColor: '#F5F5F5',
                        height: 60,
                    });
                }
            }).catch(err => {
                this.setState({
                    enviandoRequisicao: false
                });

                WSnackBar.show({
                    data: 'Erro ao processar solicitação.',
                    position: WSnackBar.position.BOTTOM, // 1.TOP 2.CENTER 3.BOTTOM
                    duration: WSnackBar.duration.LONG, //1.SHORT 2.LONG 3.INDEFINITE
                    textColor: '#F5F5F5',
                    backgroundColor: '#d75156',
                    actionTextColor: '#F5F5F5',
                    height: 60,
                });
            })
    };

    render() {

        return (
            <KeyboardAwareScrollView enableOnAndroid={true} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.wrapper}>

                    <View style={styles.iconContainer}>
                        <Image
                            source={require('../assets/images/voluntariar-icon.png')}
                            style={styles.iconImage}
                        />
                    </View>

                    <Text style={styles.text}>
                        Escolha uma atividade para se voluntariar e diga-nos como você quer ajudar. Vamos até você!
                    </Text>

                    <View style={styles.containerPicker}>
                        <RNPickerSelect
                            placeholder={{
                                label: 'Selecione uma atividade,.',
                                value: null,
                                color: '#9EA0A4',
                            }}
                            items={atividades}
                            onValueChange={value => {
                                this.setState({
                                    atividade: value,
                                });
                            }}
                            style={pickerSelectStyles}
                            value={this.state.atividade}
                            ref={el => {
                                this.inputRefs.atividade = el;
                            }}
                        />
                    </View>

                    <TextInput
                        style={styles.textInput}
                        placeholder="Mensagem"
                        multiline={true}
                        numberOfLines={6}
                        placeholderTextColor="#999"
                        underlineColorAndroid={'transparent'}
                        value={this.state.email}
                        onChangeText={text => {
                            this.setState({
                                email: text
                            })
                        }}
                    />

                    <Button
                        onPress={() => { this.Cadastrar() }}
                        style={styles.button}
                        title="Voluntariar"
                        color="#FC6663"
                        disabled={this.state.enviandoRequisicao}
                    />

                    {
                        this.state.enviandoRequisicao &&
                        <View style={styles.containerLoading}>
                            <ActivityIndicator size="large" color="#FF9D9D" />
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
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#F5F5F5',
        paddingLeft: 30,
        paddingRight: 30
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
        height: 80,
        marginBottom: 30,
        marginRight: 5,
        marginLeft: 5,
        color: '#444',
        borderBottomColor: '#FF9D9D',
        borderBottomWidth: 1,
        fontSize: 16,
    },
    picker: {

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
    containerPicker: {
        borderBottomColor: '#FF9D9D',
        borderBottomWidth: 1,
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        borderBottomColor: '#FF9D9D',
        borderBottomWidth: 1,
        color: 'black',
    },
    inputAndroid: {
        borderBottomColor: '#FF9D9D',
        borderBottomWidth: 1,
        color: 'black',
    },
});