import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { Form, Label, Item, Input } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { getregistercode,getuserinformation } from '../store/action/action';
import firebase from 'react-native-firebase';

class Phonepage extends Component {
    constructor() {
        super();
        this.state = {
            number: '+92',
            countrycode: '+92'
        }
    }

    componentDidMount() {
    //    console.log("=======================")
     
        firebase.auth().onAuthStateChanged(data => {
            console.log(data);
            if(data){
                firebase.database().ref(`/Users/${data._user.uid}/`).once('value').then(abc =>{
                    if(abc.val()){
                        let user = abc.val();
                        let info = {
                            userkey : data._user.uid,
                            name : user.name,
                            rollno : user.rollno
                        }
                        console.log("=======",user);
                        this.props.getuserinformation(info);
                        Actions.push('/tabpanel');
                    }
                }).catch((err) => {
                    alert(err);
                })
            }
        })
         //   firebase.auth().onAuthStateChanged(data => {
                //console.log(data);
                //if (data) {
                  //  firebase.database().ref(`/Users/${data._user.uid}/`).once('value').then( db =>{
                   //     console.log(db)
                 //   })
                        // let data = snap.val();
                        // if (data) {
                        //     for (var key in data) {
                        //         if (res === key) {
                        //             Actions.push('/tabpanel');
        
                        //         else {
                        //             Actions.push('/phonepage');
                        //         }
                        //     }
                        // } else{
                        //     Actions.push('/phonepage')
                      //  }
                //        else {
              //              Actions.push('/phonepage');
                    
            //           }
                
              
            
         //   }).catch(err => console.log("===",err))

            //  firebase.database().ref("Users").on('value', snap =>{
            //      let data = snap.val();
            //      if (data) {

            //         for (var key in data) {
            //             if (res === key) {
            //                 Actions.push('/tabpanel');
            //             }
            //             else{
            //                 Actions.push('/phonepage');
            //             }
            //         }
            //     }
            //     else {
            //         Actions.push('/phonepage');x
            //     }
            //  })
            //  if(res){
            //      console.log(res)
            //      Actions.push('/userinfo');
            //     }
        
    }
    register() {
        if (this.state.number === "" || this.state.number === null) {
            alert('Please Enter Number');
        }
        else {
            // alert(this.state.countrycode+this.state.number);

            this.props.getregistercode(this.state.number);
            Actions.push('/codepage');
        }
    }
    render() {
        return (
            <LinearGradient colors={['#f8f6f2', '#dbdbdb',]}>
                <View style={styles.container}>

                    <Item>
                        <Text style={{ color: '#03b060', fontSize: 40 }}>
                            Enter Phone No
                            </Text>
                    </Item>
                    <Item style={styles.field} floatingLabel>

                        <Label>Phone No.</Label>
                        <Input maxLength={13} onChangeText={(e) => this.setState({ number: e })}
                            value={this.state.number}
                        />
                    </Item>

                    <TouchableOpacity onPress={() => this.register()} style={styles.button}>
                        <Text style={styles.text}>
                            Register
                    </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>

        );
    }
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // userSignIn : (userInfo) => {dispatch(userSignIn(userInfo))}
        getregistercode: (number) => { dispatch(getregistercode(number)) },
        getuserinformation : (info) => {dispatch(getuserinformation(info))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Phonepage);
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
    field: {
        width: '80%',
        flexDirection: 'row'

    }
});