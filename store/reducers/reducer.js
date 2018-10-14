import typesOfAction from '../constants/constant';

const initalState={
    register : '',
    codenumber : null,
    loader : true,
    userinfo: {},
    joingroup:'',
    currentchat: {},
    sendmsg: ""
}



export default (state= initalState , action) =>{
    switch(action.type){
      
        case typesOfAction.register:
        return({
            ...state,
            register : action.payload
        })

        case typesOfAction.codenumber:
        return({
            ...state,
            codenumber : action.payload
        })

        case typesOfAction.loader:
        console.log("reached")
        return({
            ...state,
            loader : action.payload
        })

        case typesOfAction.userinfo:
        return({
            ...state,
            userinfo: action.payload
        })

        case typesOfAction.currentchat:
        return({
            ...state,
            currentchat : action.payload
        })
        case typesOfAction.sendmsg:
        return({
            ...state,
            sendmsg : action.payload
        })
        // case typesOfAction.ApplicantsData:
        // return({
        //     ...state,
        //     ApplicantsData: action.payload
        // })
        default:
    }
   
    return state
}

