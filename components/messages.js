import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
    View, StyleSheet, TouchableOpacity,
    Dimensions, Modal, ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import { Form, Textarea, Text, Left, Body, Right, Item } from 'native-base';
import { sendmsg } from '../store/action/action';

const { height, width, fontScale } = Dimensions.get("window");

class Messages extends Component {
    constructor() {
        super();
        this.state = {
            msg: ''
        }
    }

    sendmsg() {
        if(this.state.msg === ""){
            alert('Please enter some message');
        }
        else{
            let data= {
                msg  :  this.state.msg,
                sendmsg : this.props.selectedgroup,
                user : this.props.user
            }
            this.props.sendmsg(data);
            this.setState({msg :''})
        }
   }
    render() {
        return (
            <ScrollView style={{ backgroundColor: 'red' }} scrollEnabled={true}>
                <LinearGradient colors={['#f8f6f2', '#dbdbdb',]} >

                    <View>

                        <View style={{ height: height / 1.25, backgroundColor: 'red' }}>
                            
                        </View>
                        <Form>

                            <View style={{ flexDirection: 'row', alignItems: 'center', height: height / 5 }}>

                                <Textarea rowSpan={5} style={{ width: width / 1.3 }} value={this.state.msg}
                                 onChangeText={(e) => this.setState({msg:e})}
                                bordered placeholder="Type Message Here" />

                                <TouchableOpacity
                                    onPress={() => this.sendmsg()}
                                    style={{
                                        alignItems: 'center',
                                        backgroundColor: '#03b060',
                                        padding: 10,
                                        borderRadius: 10,
                                        borderColor: '#03b060',
                                        borderWidth: 3,
                                        width: 100,
                                        marginTop: 50,
                                    }}>
                                    <Text>Send </Text>
                                </TouchableOpacity>

                            </View>
                        </Form>
                    </View>
                </LinearGradient>
            </ScrollView>
        );
    }
}
function mapStateToProps(state) {
    return {
        selectedgroup : state.root.currentchat,
        user :  state.root.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        creategroupdata: (data) => { dispatch(creategroupdata(data)) },
        sendmsg: (data) => {dispatch(sendmsg(data))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Messages);