import React, { Component } from 'react';
import { View, StyleSheet, WebView } from 'react-native';
import StyledText from '../components/StyledText';


export default class RelatorioScreen extends Component {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#d75156',
        },
        headerTintColor: '#fff',
        headerTitle: <StyledText text={'Relatórios'} />
    }


    render() {
        return (
            <View style={styles.wrapper}>
                <WebView
                    source={{
                        uri: 'https://app.powerbi.com/view?r=eyJrIjoiYTI5M2RkMjYtZmM4Yi00OTg1LTliMjUtZWUwYWZmY2QxZDhjIiwidCI6IjljODUzYmE1LWNlN2MtNGI3MS05YjE0LTQyOWNlNGRiNzlkZCJ9',
                        method: 'GET',
                    }}
                    style={{ marginTop: 20 }}
                    scalesPageToFit
                    javaScriptEnabled
                    domStorageEnabled
                    startInLoadingState
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingRight: 20,
        paddingLeft: 20
    },
});