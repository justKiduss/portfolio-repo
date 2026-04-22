export default function ReviewReducer(state,action){
    switch(action.type){
        case 'HYDRATE_REVIEW_REQUEST':{
            return {...state,loading:true,error:null}
        }
        case 'HYDRATE_REVIEW_SUCCESS':{
            return {...state, byIds: action.payload.byIds,
                    allIds: action.payload.allIds,loading:false,error:null}
        }
        case 'HYDRATE_REVIEW_FAILURE':{
            return {...state,loading:false,error:action.payload}
        }
        case "CREATE_REVIEW_REQUEST":{
            return {...state,loading:true,error:null}
        }
        case "CREATE_REVIEW_SUCCESS":{
            const newReview=action.payload;
            return {
                ...state,
                byIds:{
                    ...state.byIds,
                    [newReview.id]:newReview
                },
                allIds: state.allIds.includes(newReview.id)
                    ? state.allIds
                    : [newReview.id, ...state.allIds],
                loading:false,
                error:null
            }
        }
        case "CREATE_REVIEW_FAILURE":{
            return {...state,loading:false,error:action.payload}
        }
        case "UPDATE_REVIEW_REQUEST":{
            return {...state,loading:true,error:null}
        }
        case "UPDATE_REVIEW_SUCCESS":{
            const updateReview=action.payload;
            return {
                ...state,
                byIds:{
                    ...state.byIds,
                    [updateReview.id]:updateReview
                },
                allIds: state.allIds.includes(updateReview.id)
                          ? state.allIds
                          : [updateReview.id, ...state.allIds],
            
                loading:false,
                error:null
            };}
        case "UPDATE_REVIEW_FAILURE":{
            return {...state,loading:false,error:action.payload}
        }
        case "DELETE_REVIEW_REQUEST":{
            return {...state,loading:true,error:null}
        }
        case "DELETE_REVIEW_SUCCESS":{
            const id=action.payload;
            const newByIds={...state.byIds};
            delete newByIds[id];
            return {
                ...state,
                byIds:newByIds,
                allIds:state.allIds.filter(itemId => itemId !== id),
                loading:false,
                error:null
            }
        } 
        case "DELETE_REVIEW_FAILURE":{
            return {...state,loading:false,error:action.payload}
        }
        default:
            return state
    }
}