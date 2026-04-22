export default function MovieReducer(state,action){
    switch(action.type){
        case "LOADING":{
            return {...state,status:"loading",data:[],error:null}
        }
        case "SUCCESS":{
            return {...state,status:"success",data:action.payload,error:null}
        }
        case "FAILURE":{
            return {...state,status:"failure",data:[],error:action.payload}
        }
        default:{
            return state;
        }
    }
}