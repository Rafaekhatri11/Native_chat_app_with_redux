import firebase from 'react-native-firebase';
import typesOfAction from '../constants/constant';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

export function getregistercode(number) {
    return dispatch => {
        alert(number);
        firebase.auth().signInWithPhoneNumber(number)
            .then(result =>

                dispatch({ type: typesOfAction.codenumber, payload: result })
            ).catch(err => alert('catch error' + err))
    }
}

export function alreadyuser() {
    return dispatch => {

        
     
        // AsyncStorage.getItem('uid').then(res => {
        //     firebase.database().ref("Users").on('value', snap => {
        //         let data = snap.val();
        //         if (data) {

        //             for (var key in data) {
        //                 if (res === key) {
        //                     dispatch({ type: typesOfAction.loader, payload: false });
        //                     Actions.push('/tabpanel');
        //                 }
        //                 else{
        //                     Actions.push('/phonepage');
        //                 }
        //             }
        //         }
        //         else {
        //             Actions.push('/phonepage');
        //         }

        //     })
        // })


        // firebase.auth().onAuthStateChanged(data => {
        //     if(data._user.uid ){
        //         dispatch({type: typesOfAction.loader , payload: false});
        //         Actions.push('/tabpanel');
        //     }
        //     else{
        //         Actions.push('/phonepage');
        //     }
        // })
    }
}

export function getuserinformation(info){
    return dispatch => {
        console.log(info)
        dispatch({type: typesOfAction.userinfo, payload:info})
    }
}

export function creategroupdata(data){
    return dispatch => {
        console.log(data);
        let storage = firebase.storage().ref(`/images/${data.image.uri}/`)
        storage.put(data.image.uri).then((res) => {
            storage.getDownloadURL().then((myimageurl) =>{
                console.log(myimageurl);
                firebase.database().ref("Groups").push({
                    groupname : data.group,
                    description : data.description,
                    imageurl : myimageurl
                })
                alert('Group Created Successfully');
            })
        })

    }
}

export function signupuser(info) {
    return dispatch => {
        // AsyncStorage.getItem('uid').then(res => {
        //     if (res) {
                firebase.auth().onAuthStateChanged(data => {
                    if(data){
                        firebase.database().ref(`/Users/${data._user.uid}/`).set({
                            name: info.username,
                            rollno: info.rollno
                        });
                        Actions.push('/tabpanel');
                    }
                })
              
              //  dispatch({ type: typesOfAction.loader, payload: true })
            // }
            // else {
            //     alert('Catch error');
            // }
        //})
    }
}


export function joingroups(data){
    return dispatch => {
        firebase.database().ref(`/Groups/${data.id}/Members/${data.userkey}/`).set(data);
        firebase.database().ref(`/Users/${data.userkey}/Groups/${data.id}/`).set(data);

    }
}


export function currentchat(data){
    return dispatch => {
        console.log(data);
        dispatch({type: typesOfAction.currentchat , payload: data});
        
    }
}

export function sendmsg(data){
    return dispatch => {
        console.log(data)
        firebase.database().ref(`/Messages//${data.sendmsg.key}/`).push({
            id : data.user.userkey,
             name :  data.user.name,
             rollno :  data.user.rollno,
             msg : data.msg
        })
    }
}