import React, { Component } from 'react'
import {
    View, Text, StyleSheet, TouchableOpacity,
    Dimensions, Modal, TouchableHighlight, Alert
} from 'react-native';
import {
    FooterTab, Footer, Button, Header, List, Fab, Icon, Form, Input, Item, Label,
    ListItem, Left, Body, Right, Thumbnail, Container, Content
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';
import { creategroupdata, joingroups, currentchat } from '../store/action/action';


const { height, width, fontScale } = Dimensions.get("window");

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

class Tabpanel extends Component {

    componentDidMount() {
        firebase.database().ref('Groups').on('value', snap => {
            let data = snap.val();
            console.log(data);
            let array = [];
            let group = [];
            for (var key in data) {
                if (data[key].Members) {
                    let newdata = data[key].Members;
                    for (var key1 in newdata) {
                        if (key1 != this.props.userinfo.userkey) {
                            array.push({
                                key: key,
                                image: data[key].imageurl,
                                description: data[key].description,
                                grouptitle: data[key].groupname
                            })
                        }
                        else {
                            group.push({
                                key: key,
                                image: data[key].imageurl,
                                description: data[key].description,
                                grouptitle: data[key].groupname
                            })
                        }
                    }
                }
                else {
                    array.push({
                        key: key,
                        image: data[key].imageurl,
                        description: data[key].description,
                        grouptitle: data[key].groupname
                    })
                }



            }
            console.log(array);
            this.setState({ Groups: array, listgroup: group })
            console.log(this.state.Groups)
        })
    }
    constructor() {
        super();
        this.state = {
            tab: true,
            modalVisible: false,
            avatarSource: null,
            groupname: '',
            listgroup: [],
            description: '',
            Groups: [],
   
        }
    }


    logout() {
        firebase.auth().signOut().then(() => {

            Actions.push('/phonepage');
        }).catch((er) => alert(er))
    }
    showModal() {
        this.setState({ modalVisible: true })
    }
    hideModal() {
        this.setState({ modalVisible: false })
    }

    sendimageanddata() {
        if (this.state.avatarSource === null || this.state.groupname === "" || this.state.description === "") {
            alert('Fill all the fields');
        }
        else {
            let data = {
                image: this.state.avatarSource,
                group: this.state.groupname,
                description: this.state.description
            }
            this.props.creategroupdata(data);
            this.setState({ modalVisible: false, avatarSource: null, groupname: '', description: '' });
        }
    }

    Joingroup(ev) {
        console.log(ev);

        let data = {
            id: ev.key,
            userkey: this.props.userinfo.userkey,
            username: this.props.userinfo.name,
            rollno: this.props.userinfo.rollno
        }
        this.props.joingroups(data);
        this.setState({ tab: true });

    }

    chatbot(text){
        console.log(text);
        this.props.currentchat(text);
        Actions.push('/chatbot')
    }

    opengallery() {
        ImagePicker.launchImageLibrary(options, (res) => {

            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
            } else {
                const source = { uri: res.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
                console.log(this.state.avatarSource);
            }
        })
    }

    render() {
        return (
            <LinearGradient colors={['#f8f6f2', '#dbdbdb',]} >

                <View>
                    <Header style={{ backgroundColor: '#03b060' }} >
                        <Button onPress={() => this.logout()}>

                            <Text>
                                Log Out
                            </Text>
                        </Button>
                    </Header>



                    {
                        this.state.tab ?
                            <View style={{ height: height / 1.25, }}>
                                <List>
                                    <ListItem avatar>
                                        <Left>
                                            <Thumbnail source={require('./person.jpg')} />
                                        </Left>
                                        <Body>
                                            <Text>Kumar Pratik</Text>
                                            <Text note>Doing what you like will always keep you happy . .</Text>
                                        </Body>
                                        <Right>
                                            <Text note>3:43 pm</Text>
                                        </Right>
                                    </ListItem>

                                    {
                                        this.state.listgroup.map((text, index) => {
                                            return (
                                                <ListItem key={index} avatar>
                                                    <Left>
                                                        <Thumbnail source={{ uri: text.image }} />
                                                    </Left>
                                                    <TouchableOpacity onPress={()=> this.chatbot(text)}>
                                                        
                                                    <Body style={{width:width}}>
                                                        <Text>{text.grouptitle}</Text>
                                                        <Text note>{text.description}</Text>
                                                    </Body>
                                                    </TouchableOpacity>
                                                    
                                                </ListItem>
                                            )
                                        })
                                    }
                                </List>
                            </View>
                            :
                            <View style={{ height: height / 1.25, }}>
                                <Fab

                                    onPress={() => this.showModal()}
                                    style={{ backgroundColor: '#5067FF' }}
                                    position="bottomRight"
                                >
                                    <Icon name="add" />


                                </Fab>

                                <List>
                                    <ListItem avatar>
                                        <Left>
                                            <Thumbnail source={require('./person.jpg')} />
                                        </Left>
                                        <Body style={{ backgroundColor: 'yellow' }}>
                                            <Text>Kumar Pratik</Text>
                                        </Body>

                                        <Right>
                                            <Button onPress={() => this.Joingroup(ev)} style={{ backgroundColor: '#03b060', width: 100, justifyContent: 'center' }}>
                                                <Text style={{ textAlign: 'center' }}>Join</Text>
                                            </Button>
                                        </Right>
                                    </ListItem>
                                    {
                                        this.state.Groups.map((text, index) => {
                                            return (
                                                <ListItem key={index} avatar>
                                                    <Left>
                                                        <Thumbnail source={{ uri: text.image }} />
                                                    </Left>
                                                    <Body>
                                                        <Text>{text.grouptitle}</Text>
                                                        <Text note>{text.description}</Text>
                                                    </Body>
                                                    <Right>
                                                        <Button onPress={() => this.Joingroup(text)} style={{ backgroundColor: '#03b060', width: 100, justifyContent: 'center' }}>
                                                            <Text style={{ textAlign: 'center' }}>Join</Text>
                                                        </Button>
                                                    </Right>
                                                </ListItem>
                                            )
                                        })
                                    }

                                </List>

                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={this.state.modalVisible}
                                    onRequestClose={() => {
                                        Alert.alert('Modal has been closed.');
                                    }}>
                                    <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}>

                                        <View style={{ backgroundColor: "rgba(0,0,0,0.5)", width: width / 1.2, height: height / 1.5, alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={{ justifyContent: 'center', width: width / 1.2 }}>
                                                <TouchableOpacity onPress={() => this.opengallery()} style={{ alignSelf: 'center', borderRadius: 10, width: width / 3, }}>

                                                    <Text style={{ textAlign: 'center' }}>
                                                        <Icon name="camera" style={{ fontSize: 50, color: this.state.avatarSource ? "blue" : "white" }}  ></Icon>
                                                    </Text>
                                                </TouchableOpacity>
                                                <Form>
                                                    <Item floatingLabel>
                                                        <Label>Group Name</Label>
                                                        <Input onChangeText={(e) => this.setState({ groupname: e })} />
                                                    </Item>
                                                    <Item floatingLabel last>
                                                        <Label>Description</Label>
                                                        <Input onChangeText={(e) => this.setState({ description: e })} />
                                                    </Item>
                                                </Form>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                                    <TouchableHighlight style={{
                                                        alignItems: 'center',
                                                        backgroundColor: '#03b060',
                                                        padding: 10,
                                                        borderRadius: 10,
                                                        borderColor: '#03b060',
                                                        borderWidth: 3,
                                                        width: 150,
                                                        marginTop: 50,
                                                    }}
                                                        onPress={() => this.sendimageanddata()}
                                                    >
                                                        <Text>Create Group</Text>
                                                    </TouchableHighlight>
                                                    <TouchableHighlight style={{
                                                        alignItems: 'center',
                                                        backgroundColor: '#03b060',
                                                        padding: 10,
                                                        borderRadius: 10,
                                                        borderColor: '#03b060',
                                                        borderWidth: 3,
                                                        width: 150,
                                                        marginTop: 50,
                                                    }}
                                                        onPress={() => this.hideModal()}>
                                                        <Text>Cancel</Text>
                                                    </TouchableHighlight>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                    }
                    <Content />
                    <Footer>
                        <FooterTab style={{ backgroundColor: '#03b060' }}>
                            <Button onPress={() => this.setState({ tab: true })}>
                                <Text>My Group</Text>
                            </Button>
                            <Button onPress={() => this.setState({ tab: false })}>
                                <Text>Create Group</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </View>
            </LinearGradient>

        );
    }
}

function mapStateToProps(state) {
    return {
        myloader: state.root.loader,
        userinfo: state.root.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        creategroupdata: (data) => { dispatch(creategroupdata(data)) },
        joingroups: (data) => { dispatch(joingroups(data)) },
        currentchat : (data) => {dispatch(currentchat(data))}
        // userSignIn : (userInfo) => {dispatch(userSignIn(userInfo))}
        //  getregistercode: (number) => { dispatch(getregistercode(number)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabpanel);
const styles = StyleSheet.create({


    field: {
        width: '90%',

    }
});