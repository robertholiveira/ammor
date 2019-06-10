import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    ActivityIndicator,
    Image
} from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
import StyledText from '../components/StyledText';
import { TextInputMask } from 'react-native-masked-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ValidationComponent from 'react-native-form-validator';
import { WSnackBar } from 'react-native-smart-tip';

import api from '../services/api';


export default class AddLancamentoScreen extends ValidationComponent {

    inputRefs = {
        tipo: null
    };

    state = {
        descricao: '',
        valor: 0,
        tipo: null
    };

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#d75156',
        },
        headerTintColor: '#fff',
        headerTitle: <StyledText text={'Adicionar lançamento'} />
    };

    FazerLancamento = () => {

    
        if (this.state.descricao.length == 0 || this.state.valor == 0 || this.state.tipo == null) {

            WSnackBar.show({
                data: 'Preencha os campos.',
                position: WSnackBar.position.BOTTOM, // 1.TOP 2.CENTER 3.BOTTOM
                duration: WSnackBar.duration.LONG, //1.SHORT 2.LONG 3.INDEFINITE
                textColor: '#F5F5F5',
                backgroundColor: '#d75156',
                actionTextColor: '#F5F5F5',
                height: 60,
            });

        }
        else {

            this.setState({
                enviandoRequisicao: true
            });
    
            api.post('/lancamentos',
            {
                descricao: this.state.descricao,
                valor: this.state.valor,
                tipo: this.state.tipo
            })
            .then(async response => {
                if (response.status == 200) {

                    this.setState({
                        enviandoRequisicao: false
                    });

                    WSnackBar.show({
                        data: 'Lançamento adicionado.',
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
        }
    };

    render() {


        const tipos = [
            {
                label: 'Receita',
                value: true,
            },
            {
                label: 'Despesa',
                value: false,
            }
        ];

        return (
            <KeyboardAwareScrollView enableOnAndroid={true} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.wrapper}>

                    <Text style={styles.text}>
                        Faça o lançamento de uma receita ou despesa da ONG.
                    </Text>

                    <View style={styles.containerPicker}>
                        <RNPickerSelect
                            placeholder={{
                                label: 'Selecione um tipo',
                                value: null,
                                color: '#9EA0A4',
                            }}
                            items={tipos}
                            onValueChange={value => {
                                this.setState({
                                    tipo: value,
                                });
                            }}
                            style={pickerSelectStyles}
                            value={this.state.tipo}
                            ref={el => {
                                this.inputRefs.tipo = el;
                            }}
                        />
                    </View>

                    <TextInput
                        style={styles.textInput}
                        placeholder="Descrição"
                        multiline={true}
                        numberOfLines={6}
                        placeholderTextColor="#999"
                        underlineColorAndroid={'transparent'}
                        value={this.state.descricao}
                        onChangeText={text => {
                            this.setState({
                                descricao: text
                            })
                        }}
                    />

                    <TextInputMask
                        style={styles.textValor}
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
                        onPress={() => { this.FazerLancamento() }}
                        style={styles.button}
                        title="Enviar lançamento"
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
    textValor: {
        alignItems: 'stretch',
        height: 40,
        marginBottom: 30,
        marginRight: 5,
        marginLeft: 5,
        color: '#FC6663',
        borderBottomColor: '#FF9D9D',
        borderBottomWidth: 1,
        fontSize: 20,
        fontFamily: 'poppins-bold'
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