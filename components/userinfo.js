import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { Form, Label, Item, Input, Icon, Spinner } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { signupuser ,alreadyuser} from '../store/action/action';
import firebase from 'react-native-firebase';
import {Actions} from 'react-native-router-flux';


class Userinfo extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            rollno: '',
        }
    }

 
//    componentDidMount() {

        //this.setState({loader : this.props.myloader});
     //   this.props.alreadyuser();
        // AsyncStorage.getItem('uid').then(res => {
        //     firebase.database().ref("Users").on('value', snap => {
        //         let data = snap.val();
        //         console.log(data);
        //         if(data){

        //             for (var key in data) {
        //                 console.log(key , res);
        //                 if (key === res) {
        //                     this.setState({ loader: false });
        //                     Actions.push('/tabpanel');
        //                 }
        //                 else{
        //                     this.setState({loader : false})
        //                 }
        //             }
        //         }
        //         else{
        //             this.setState({loader : false});
        //         }
        //         })
        // })
 //   }
    // componentWillReceiveProps(nextprops){
    //     console.log("======",nextprops,this.props.myloaders);
    // }
    code() {
        if (this.state.username === "" || this.state.username === null || this.state.rollno === "" || this.state.rollno === null) {
            alert('Please Enter fields');
        }
        else {
            // alert(this.state.countrycode + this.state.number);

            let info = {
                username: this.state.username,
                rollno: this.state.rollno
            }
            this.props.signupuser(info);
        }
    }
    render() {
        return (
            <LinearGradient colors={['#f8f6f2', '#dbdbdb',]}>
                <View style={styles.container}>

                    {/* {
                        this.props.myloader ?
                            <View>
                                <Spinner color="green" />
                            </View>
                            : */}
                            <View>

                                <Item>
                                    <Text style={{ color: '#03b060', fontSize: 40 }}>
                                        Enter Information
                                </Text>
                                </Item>

                                <Item style={styles.field} floatingLabel>
                                    <Label>Username</Label>
                                    <Input maxLength={10} onChangeText={(e) => this.setState({ username: e })} />
                                </Item>
                                <Item style={styles.field} floatingLabel>
                                    <Label>Roll Number</Label>
                                    <Input maxLength={10} onChangeText={(e) => this.setState({ rollno: e })} />
                                </Item>

                                <TouchableOpacity onPress={() => this.code()} style={styles.button}>
                                    <Text style={styles.text}>
                                        Submit
                                     </Text>
                                </TouchableOpacity>
                            </View>

                    
                </View>
            </LinearGradient>

        );
    }
}

function mapStateToProps(state) {
    return {
        myloader: state.root.loader
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // userSignIn : (userInfo) => {dispatch(userSignIn(userInfo))}
        signupuser: (info) => { dispatch(signupuser(info)) },
      //  alreadyuser : () => {dispatch(alreadyuser())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Userinfo);

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
        width: '90%',

    }
});