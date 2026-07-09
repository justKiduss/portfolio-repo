// import { useState } from "react";
// import { useReviews } from "../hooks/useReview";
// import useAuth from "../hooks/useAuth";

// export default function Comment({ movieId, moviename }) {
//     const [reviewText, setReviewText] = useState("");
//     const [rating, setRating] = useState(0);
//     const [editId, setEditId] = useState(null);
//     const [editText, setEditText] = useState("");

//     const { user } = useAuth();
//     const { reviews, isLoading, create, update, remove } = useReviews(movieId);

//     async function handleSubmit(e) {
//         e.preventDefault();
//         if (!reviewText.trim() || rating === 0) return;
//         create({ movie_id: Number(movieId), movie_title: moviename, rating: Number(rating), review: reviewText });
//         setReviewText("");
//         setRating(0);
//     }

//     async function handleUpdate(e) {
//         e.preventDefault();
//         update({ id: editId, movie_id: movieId, movie_title: moviename, rating: Number(rating), review: editText });
//         setEditId(null);
//         setEditText("");
//     }

//     if (isLoading) return <div>Loading reviews...</div>;

//     return (
//         <div className="flex flex-col gap-6">
//             {/* Form Section */}
//                 <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
//                     {user ? (
//                         !editId ? (
//                             <form onSubmit={handleSubmit} className="space-y-5">
//                                 <div>
//                                     <h2 className="text-xl font-bold dark:text-white">
//                                         Write a Review
//                                     </h2>
//                                     <p className="mt-1 text-sm text-zinc-500">
//                                         Share your thoughts with other movie fans.
//                                     </p>
//                                 </div>

//                                 {/* Star Rating */}
//                                 <div className="flex items-center gap-2">
//                                     {[1, 2, 3, 4, 5].map((star) => (
//                                         <button
//                                             key={star}
//                                             type="button"
//                                             onClick={() => setRating(star)}
//                                             className={`text-3xl transition ${
//                                                 star <= rating
//                                                     ? "text-yellow-400"
//                                                     : "text-zinc-400 dark:text-zinc-700"
//                                             }`}
//                                         >
//                                             ★
//                                         </button>
//                                     ))}
//                                 </div>

//                                 <textarea
//                                     rows={5}
//                                     value={reviewText}
//                                     onChange={(e) => setReviewText(e.target.value)}
//                                     placeholder="What did you think about this movie?"
//                                     className="w-full rounded-xl border border-zinc-300 bg-white p-4 outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
//                                 />

//                                 <div className="flex justify-end">
//                                     <button
//                                         type="submit"
//                                         className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
//                                     >
//                                         Publish Review
//                                     </button>
//                                 </div>
//                             </form>
//                         ) : (
//                             <form onSubmit={handleUpdate} className="space-y-4">
//                                 <h3 className="text-lg font-semibold text-orange-500">
//                                     Editing Review
//                                 </h3>

//                                 <textarea
//                                     rows={5}
//                                     value={editText}
//                                     onChange={(e) => setEditText(e.target.value)}
//                                     className="w-full rounded-xl border border-zinc-300 p-4 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
//                                 />

//                                 <div className="flex gap-3">
//                                     <button
//                                         className="rounded-lg bg-green-600 px-5 py-2 text-white"
//                                         type="submit"
//                                     >
//                                         Save Changes
//                                     </button>

//                                     <button
//                                         type="button"
//                                         onClick={() => setEditId(null)}
//                                         className="rounded-lg border px-5 py-2 dark:border-zinc-700"
//                                     >
//                                         Cancel
//                                     </button>
//                                 </div>
//                             </form>
//                         )
//                     ) : (
//                         <p className="text-center text-zinc-500 dark:text-zinc-400">
//                             Please{" "}
//                             <a href="/login" className="text-blue-500 underline">
//                                 Login
//                             </a>{" "}
//                             or{" "}
//                             <a href="/signup" className="text-blue-500 underline">
//                                 Sign Up
//                             </a>{" "}
//                             to write a review.
//                         </p>
//                     )}
//                 </div>
//             {/* List Section */}

//             <div className="flex flex-col gap-4">
//                 {reviews?.length === 0 && <p className="dark:text-zinc-400">No reviews yet. Be the first to share your thoughts!</p>}
//                 {reviews?.map((review) => (
//                     <div key={review.id} className="flex justify-between items-start border-b pb-4 dark:border-zinc-800">
//                         <div>
//                             <div className="flex items-center gap-2">
//                                 <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-sm font-bold">
//                                     ⭐ {review.rating}/5
//                                 </span>
//                                 <small className="text-gray-400">
//                                     {review.created_at ? new Date(review.created_at).toLocaleDateString() : "Just now"}
//                                 </small>
//                             </div>
//                             <p className="mt-2 text-gray-700 dark:text-zinc-300">{review.review}</p>
//                         </div>
//                         {user && (
//                             <div className="flex gap-2">
//                                 <button onClick={() => { setEditId(review.id); setEditText(review.review); setRating(review.rating); }} className="text-blue-500 hover:underline">Edit</button>
//                                 <button onClick={() => remove(review.id)} className="bg-red-500 text-white px-3 py-1 rounded text-xs">Delete</button>
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }


import { useState } from "react";
import { useReviews } from "../hooks/useReview";
import useAuth from "../hooks/useAuth";


function ReplyCard({ reply, replyMutation, user, remove }) {

    const [replyText, setReplyText] = useState("");
    const [showReply, setShowReply] = useState(false);


    function handleReply(){

        if(!replyText.trim()) return;

        replyMutation({
            parentId: reply.id,
            data:{
                movie_id: reply.movie_id,
                movie_title: reply.movie_title,
                review: replyText
            }
        });

        setReplyText("");
        setShowReply(false);
    }


    return (
        <div className="ml-10 mt-4 border-l-2 pl-4 dark:border-zinc-700">

            <div className="flex gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                    {(reply.username || "A")[0].toUpperCase()}
                </div>


                <div className="flex-1">

                    <h4 className="font-semibold dark:text-white">
                        {reply.username || "Anonymous"}
                    </h4>

                    <p className="mt-2 text-zinc-700 dark:text-zinc-300">
                        {reply.review}
                    </p>


                    <div className="mt-3 flex gap-4 text-sm text-zinc-500">

                        <button
                            onClick={()=>setShowReply(!showReply)}
                        >
                            Reply
                        </button>


                        {user && (
                            <button
                                onClick={()=>remove(reply.id)}
                                className="text-red-500"
                            >
                                Delete
                            </button>
                        )}

                    </div>


                    {
                        showReply && (

                            <div className="mt-3 flex gap-2">

                                <input
                                    value={replyText}
                                    onChange={
                                        e=>setReplyText(e.target.value)
                                    }
                                    className="flex-1 rounded-lg border p-2 dark:bg-zinc-900"
                                    placeholder="Reply..."
                                />

                                <button
                                    onClick={handleReply}
                                    className="rounded-lg bg-blue-600 px-4 text-white"
                                >
                                    Send
                                </button>

                            </div>

                        )
                    }


                    {
                        reply.replies?.map(child=>(
                            <ReplyCard
                                key={child.id}
                                reply={child}
                                replyMutation={replyMutation}
                                user={user}
                                remove={remove}
                            />
                        ))
                    }


                </div>

            </div>

        </div>
    );
}




function ReviewCard({review, replyMutation, user, remove, setEdit}){


    return (

        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">


            <div className="flex gap-4">


                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
                    {(review.username || "A")[0].toUpperCase()}
                </div>


                <div className="flex-1">


                    <div className="flex justify-between">

                        <div>

                            <h3 className="font-bold dark:text-white">
                                {review.username || "Anonymous"}
                            </h3>

                            <div className="text-yellow-400">
                                {"★".repeat(review.rating)}
                            </div>

                        </div>


                        <small className="text-zinc-500">
                            {new Date(review.created_at).toLocaleDateString()}
                        </small>


                    </div>



                    <p className="mt-4 text-zinc-700 dark:text-zinc-300">
                        {review.review}
                    </p>



                    <div className="mt-5 flex gap-4 text-sm text-zinc-500">


                        <button>
                            Like
                        </button>


                        {user && (
                            <>
                                <button
                                    onClick={()=>setEdit(review)}
                                >
                                    Edit
                                </button>


                                <button
                                    onClick={()=>remove(review.id)}
                                    className="text-red-500"
                                >
                                    Delete
                                </button>
                            </>
                        )}

                    </div>



                    {
                        review.replies?.map(reply=>(
                            <ReplyCard
                                key={reply.id}
                                reply={reply}
                                replyMutation={replyMutation}
                                user={user}
                                remove={remove}
                            />
                        ))
                    }


                </div>

            </div>

        </div>

    );
}




export default function Comment({movieId,moviename}){


    const [reviewText,setReviewText]=useState("");
    const [rating,setRating]=useState(0);

    const [editId,setEditId]=useState(null);
    const [editText,setEditText]=useState("");


    const {user}=useAuth();


    const {
        reviews,
        isLoading,
        create,
        reply,
        update,
        remove

    }=useReviews(movieId);



    function handleSubmit(e){

        e.preventDefault();


        if(!reviewText.trim() || rating===0)
            return;


        create({
            movie_id:Number(movieId),
            movie_title:moviename,
            rating,
            review:reviewText
        });


        setReviewText("");
        setRating(0);

    }



    function handleUpdate(e){

        e.preventDefault();


        update({
            id:editId,
            movie_id:movieId,
            movie_title:moviename,
            rating,
            review:editText
        });


        setEditId(null);
        setEditText("");

    }



    if(isLoading)
        return <div>Loading...</div>;



    return (

        <div className="space-y-8">


            <div className="rounded-2xl border p-6 dark:border-zinc-800">


                {
                    user ? (

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            <h2 className="text-xl font-bold dark:text-white">
                                Write Review
                            </h2>


                            <div className="flex gap-2">

                                {
                                    [1,2,3,4,5].map(star=>(
                                        <button
                                            type="button"
                                            key={star}
                                            onClick={()=>setRating(star)}
                                            className={
                                                star<=rating
                                                ?"text-yellow-400 text-3xl"
                                                :"text-zinc-400 text-3xl"
                                            }
                                        >
                                            ★
                                        </button>
                                    ))

                                }

                            </div>


                            <textarea
                                value={reviewText}
                                onChange={e=>setReviewText(e.target.value)}
                                className="w-full rounded-xl border p-4 dark:bg-zinc-900"
                                placeholder="Your opinion..."
                            />


                            <button className="rounded-xl bg-blue-600 px-6 py-3 text-white">
                                Publish
                            </button>


                        </form>


                    ):(

                        <p>
                            Login to write a review.
                        </p>

                    )
                }


            </div>




            <div className="space-y-5">

                {
                    reviews?.map(review=>(

                        <ReviewCard
                            key={review.id}
                            review={review}
                            replyMutation={reply}
                            user={user}
                            remove={remove}
                            setEdit={(review)=>{
                                setEditId(review.id);
                                setEditText(review.review);
                                setRating(review.rating);
                            }}
                        />

                    ))
                }
            </div>
        </div>

    );

}