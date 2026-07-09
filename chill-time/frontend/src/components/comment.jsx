import { useState } from "react";
import { useReviews } from "../hooks/useReview";
import useAuth from "../hooks/useAuth";

export default function Comment({ movieId, moviename }) {
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");

    const { user } = useAuth();
    const { reviews, isLoading, create, update, remove } = useReviews(movieId);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!reviewText.trim() || rating === 0) return;
        create({ movie_id: Number(movieId), movie_title: moviename, rating: Number(rating), review: reviewText });
        setReviewText("");
        setRating(0);
    }

    async function handleUpdate(e) {
        e.preventDefault();
        update({ id: editId, movie_id: movieId, movie_title: moviename, rating: Number(rating), review: editText });
        setEditId(null);
        setEditText("");
    }

    if (isLoading) return <div>Loading reviews...</div>;

    return (
        <div className="flex flex-col gap-6">
            {/* Form Section */}
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    {user ? (
                        !editId ? (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <h2 className="text-xl font-bold dark:text-white">
                                        Write a Review
                                    </h2>
                                    <p className="mt-1 text-sm text-zinc-500">
                                        Share your thoughts with other movie fans.
                                    </p>
                                </div>

                                {/* Star Rating */}
                                <div className="flex items-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className={`text-3xl transition ${
                                                star <= rating
                                                    ? "text-yellow-400"
                                                    : "text-zinc-400 dark:text-zinc-700"
                                            }`}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>

                                <textarea
                                    rows={5}
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    placeholder="What did you think about this movie?"
                                    className="w-full rounded-xl border border-zinc-300 bg-white p-4 outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                                />

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
                                    >
                                        Publish Review
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleUpdate} className="space-y-4">
                                <h3 className="text-lg font-semibold text-orange-500">
                                    Editing Review
                                </h3>

                                <textarea
                                    rows={5}
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className="w-full rounded-xl border border-zinc-300 p-4 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                                />

                                <div className="flex gap-3">
                                    <button
                                        className="rounded-lg bg-green-600 px-5 py-2 text-white"
                                        type="submit"
                                    >
                                        Save Changes
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setEditId(null)}
                                        className="rounded-lg border px-5 py-2 dark:border-zinc-700"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )
                    ) : (
                        <p className="text-center text-zinc-500 dark:text-zinc-400">
                            Please{" "}
                            <a href="/login" className="text-blue-500 underline">
                                Login
                            </a>{" "}
                            or{" "}
                            <a href="/signup" className="text-blue-500 underline">
                                Sign Up
                            </a>{" "}
                            to write a review.
                        </p>
                    )}
                </div>
            {/* List Section */}
            <div className="flex flex-col gap-4">
                {reviews?.length === 0 && <p className="dark:text-zinc-400">No reviews yet. Be the first to share your thoughts!</p>}
                {reviews?.map((review) => (
                    <div key={review.id} className="flex justify-between items-start border-b pb-4 dark:border-zinc-800">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-sm font-bold">
                                    ⭐ {review.rating}/5
                                </span>
                                <small className="text-gray-400">
                                    {review.created_at ? new Date(review.created_at).toLocaleDateString() : "Just now"}
                                </small>
                            </div>
                            <p className="mt-2 text-gray-700 dark:text-zinc-300">{review.review}</p>
                        </div>
                        {user && (
                            <div className="flex gap-2">
                                <button onClick={() => { setEditId(review.id); setEditText(review.review); setRating(review.rating); }} className="text-blue-500 hover:underline">Edit</button>
                                <button onClick={() => remove(review.id)} className="bg-red-500 text-white px-3 py-1 rounded text-xs">Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}