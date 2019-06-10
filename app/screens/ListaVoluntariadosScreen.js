import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';

import StyledText from '../components/StyledText'
import ValidationComponent from 'react-native-form-validator';

import api from '../services/api';


export default class ListaVoluntariados extends ValidationComponent {

    state = {
        voluntariados: []
    };

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#d75156',
        },
        headerTintColor: '#fff',
        headerTitle: <StyledText text={'Voluntários'} />
    };

    async componentDidMount() {
        const response = await api.get('/voluntariados');
        this.setState({voluntariados: response.data.data});
    }

    render() {

        return (
            <View style={styles.wrapper}>

                <Text style={styles.text}>
                    Veja os associados que se voluntariaram em atividades
                </Text>

                <FlatList
                    data={this.state.voluntariados}
                    showsVerticalScrollIndicator={true}
                    renderItem={({ item }) =>
                        <View style={styles.flatview}>
                            <Text style={styles.flatText} >Nome: {item.associadoVoluntario.nome}</Text>
                            <Text style={styles.flatText}>Telefone: {item.associadoVoluntario.telefone}</Text>
                            <Text style={styles.flatText}>E-mail: {item.associadoVoluntario.email}</Text>
                            <Text style={styles.flatText}>Atividade: {item.atividade}</Text>
                            {item.mensagem != "" && <Text style={styles.flatText}>Mensagem: {item.mensagem}</Text>}
                        </View>
                    }
                    keyExtractor={item => item.id}
                />

            </View>
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
        paddingRight: 30,
        paddingTop: 20
    },
    text: {
        fontSize: 15,
        color: '#666',
        lineHeight: 24,
        textAlign: 'center',
        fontFamily: 'poppins'
    },
    flatText:{
        fontSize: 13,
        color: '#666',
        lineHeight: 24,
        fontFamily: 'poppins'
    },
    flatview: {
        justifyContent: 'center',
        paddingTop: 30,
        borderRadius: 2,
        backgroundColor: '#f5f5f5'
    },
});
