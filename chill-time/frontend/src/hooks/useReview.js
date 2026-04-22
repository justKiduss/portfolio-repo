import { createReview, deleteReviews, getAllReviews, updateReviews } from "../service/reviewService"
import { useMemo } from "react";
export default function useReview(state,dispatch){
    
    async function hydrate(movie_id) {
        dispatch({
            type:"HYDRATE_REVIEW_REQUEST"
        })
        try{
            const data=await getAllReviews(movie_id);
            const normalized={
                byIds:{},
                allIds:[]
            }
            data.forEach(r => {
                normalized.byIds[r.id]=r;
                normalized.allIds.push(r.id);
            });
            console.log("normalized",normalized);
            dispatch({
                type:"HYDRATE_REVIEW_SUCCESS",
                payload:normalized
            })
        }catch(err){
            dispatch({
                type:"HYDRATE_REVIEW_FAILURE",
                payload:err.message
            })
        }
    }
    async function create(movie_id,movie_title,rating,review){
        dispatch({
            type:"CREATE_REVIEW_REQUEST"
        })
        console.log("creating a review",movie_id,movie_title,rating,review);
        try{
            const payload=await createReview(movie_id,movie_title,rating,review);
            dispatch({
                type:"CREATE_REVIEW_SUCCESS",
                payload:payload
            })
        }catch(err){
            dispatch({
                type:'CREATE_REVIEW_FAILURE',
                payload:err.message
            })
        }
    }
    async function update(id,movie_id,movie_title,rating,review){
            dispatch({
                type:"UPDATE_REVIEW_REQUEST"
            })
        try{
            const res=await updateReviews(id,movie_id,movie_title,rating,review);
            const payload=res.data ?? res;
            dispatch({
                type:"UPDATE_REVIEW_SUCCESS",
                payload
            })
        }catch(err){
            dispatch({
                type:"UPDATE_REVIEW_FAILURE",
                payload:err.message
            })
        }
    }
    async function remove(id){
        dispatch({
            type:"DELETE_REVIEW_REQUEST",
            payload:{id}
        })
        try{
            await deleteReviews(id);
                dispatch({
                    type:"DELETE_REVIEW_SUCCESS",
                    payload:id
                })
        }catch(err){
            dispatch({
                type:"DELETE_REVIEW_FAILURE",
                payload:err.message
            })
        }
    }
    return useMemo(() => ({
        create,
        update,
        remove,
        hydrate
    }), []);
}
