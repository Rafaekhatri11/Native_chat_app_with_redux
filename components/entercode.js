import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity,AsyncStorage } from 'react-native';
import { Form, Label,Item, Input } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';

 class Entercode extends Component {
     
     constructor(){
         super();
         this.state ={ 
             codenumber : '',
             confirmResult: null
         }
     }


     code(){

        if(this.state.codenumber==='' || this.state.codenumber === null){
            alert('Please Enter Number');
        } 
        else {
           
            this.props.confirmcode.confirm(this.state.codenumber).then(abc => {
                console.log(abc._user.uid);
             // AsyncStorage.setItem('uid',abc._user.uid);
                // AsyncStorage.getItem('uid').then(uid =>{
                //     console.log(uid);
                // })
                if(abc._user.uid){

                    Actions.push('/userinfo');
                }
            })
                .catch(err => console.log(err));
            
            
           }
     }
    render() {
        return (
            <LinearGradient colors={['#f8f6f2', '#dbdbdb',]}>
                <View style={styles.container}>

                        <Item>
                            <Text  style={{color:'#03b060',fontSize:40}}>
                                    Enter Code Here
                            </Text>
                        </Item>
                        <Item style={styles.field} floatingLabel>
                            <Label>Code</Label>
                             <Input maxLength={10} onChangeText={(e) => this.setState({codenumber:e})}/>
                        </Item>
                  
                    <TouchableOpacity onPress={() => this.code()} style={styles.button}>
                        <Text style={styles.text}>
                            Enter
                    </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>

        );
    }
}

function mapStateToProps(state){
    console.log(state);
    return{
        confirmcode : state.root.codenumber
    }
}

function mapDispatchToProps(dispatch){
    return{
        // userSignIn : (userInfo) => {dispatch(userSignIn(userInfo))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Entercode);
const styles = StyleSheet.create({
    container: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    button: {
        alignItems: 'center',
        backgroundColor: '#03b060',
        padding: 10,
        borderRadius: 10,
        borderColor: '#03b060',
        borderWidth: 3,
        width: 200,
        marginTop: 50,

    },
    text: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    field:{
        width:'90%',
    
    }
});