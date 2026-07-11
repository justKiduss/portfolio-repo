import { useState } from "react";
import { useReviews } from "../hooks/useReview";
import useAuth from "../hooks/useAuth";

// Deterministic color per username so avatars aren't all the same flat blue
const AVATAR_COLORS = [
    "bg-blue-600",
    "bg-purple-600",
    "bg-pink-600",
    "bg-emerald-600",
    "bg-amber-600",
    "bg-rose-600",
    "bg-indigo-600",
    "bg-teal-600",
];

function avatarColor(name = "Anonymous") {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function Avatar({ name, size = "h-10 w-10" }) {
    return (
        <div
            className={`flex ${size} shrink-0 items-center justify-center rounded-full text-white font-semibold ${avatarColor(
                name
            )}`}
        >
            {(name || "A")[0].toUpperCase()}
        </div>
    );
}

function StarRating({ value, onChange, size = "text-3xl" }) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    type="button"
                    key={star}
                    onClick={() => onChange(star)}
                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    className={`${size} transition-transform hover:scale-110 ${
                        star <= value ? "text-yellow-400" : "text-zinc-300 dark:text-zinc-600"
                    }`}
                >
                    ★
                </button>
            ))}
        </div>
    );
}

function ReplyCard({ reply, replyMutation, user, remove }) {
    const [replyText, setReplyText] = useState("");
    const [showReply, setShowReply] = useState(false);

    function handleReply() {
        if (!replyText.trim()) return;

        replyMutation({
            parentId: reply.id,
            data: {
                movie_id: reply.movie_id,
                movie_title: reply.movie_title,
                review: replyText,
            },
        });

        setReplyText("");
        setShowReply(false);
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            handleReply();
        }
    }

    return (
        <div className="ml-6 mt-4 border-l-2 border-zinc-200 pl-4 dark:border-zinc-700">
            <div className="flex gap-3">
                <Avatar name={reply.username} size="h-8 w-8" />

                <div className="flex-1">
                    <h4 className="text-sm font-semibold dark:text-white">
                        {reply.username || "Anonymous"}
                    </h4>

                    <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                        {reply.review}
                    </p>

                    <div className="mt-2 flex gap-4 text-xs font-medium text-zinc-500">
                        <button
                            onClick={() => setShowReply(!showReply)}
                            className="transition-colors hover:text-blue-600"
                        >
                            Reply
                        </button>

                        {user && (
                            <button
                                onClick={() => remove(reply.id)}
                                className="transition-colors hover:text-red-500"
                            >
                                Delete
                            </button>
                        )}
                    </div>

                    {showReply && (
                        <div className="mt-3 flex gap-2">
                            <input
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                autoFocus
                                className="flex-1 rounded-lg border border-zinc-300 p-2 text-sm outline-none transition-colors focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
                                placeholder="Write a reply..."
                            />

                            <button
                                onClick={handleReply}
                                disabled={!replyText.trim()}
                                className="rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
                            >
                                Send
                            </button>
                        </div>
                    )}

                    {reply.replies?.map((child) => (
                        <ReplyCard
                            key={child.id}
                            reply={child}
                            replyMutation={replyMutation}
                            user={user}
                            remove={remove}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function ReviewCard({ review, replyMutation, user, remove, setEdit, isEditing, children }) {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(review.likes || 0);

    function toggleLike() {
        setLiked((prev) => {
            setLikeCount((c) => (prev ? c - 1 : c + 1));
            return !prev;
        });
    }

    return (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex gap-4">
                <Avatar name={review.username} size="h-12 w-12" />

                <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h3 className="font-bold dark:text-white">
                                {review.username || "Anonymous"}
                            </h3>
                            <div className="mt-0.5 text-yellow-400">
                                {"★".repeat(review.rating)}
                                <span className="text-zinc-300 dark:text-zinc-700">
                                    {"★".repeat(Math.max(0, 5 - review.rating))}
                                </span>
                            </div>
                        </div>

                        <small className="shrink-0 text-zinc-500">
                            {new Date(review.created_at).toLocaleDateString()}
                        </small>
                    </div>

                    {isEditing ? (
                        children
                    ) : (
                        <>
                            <p className="mt-4 whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">
                                {review.review}
                            </p>

                            <div className="mt-5 flex items-center gap-4 text-sm text-zinc-500">
                                <button
                                    onClick={toggleLike}
                                    className={`flex items-center gap-1 transition-colors ${
                                        liked ? "text-red-500" : "hover:text-red-500"
                                    }`}
                                >
                                    <span>{liked ? "♥" : "♡"}</span>
                                    {likeCount > 0 && <span>{likeCount}</span>}
                                    <span>Like</span>
                                </button>

                                {user && (
                                    <>
                                        <button
                                            onClick={() => setEdit(review)}
                                            className="transition-colors hover:text-blue-600"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => remove(review.id)}
                                            className="transition-colors hover:text-red-500"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </>
                    )}

                    {!isEditing &&
                        review.replies?.map((reply) => (
                            <ReplyCard
                                key={reply.id}
                                reply={reply}
                                replyMutation={replyMutation}
                                user={user}
                                remove={remove}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default function Comment({ movieId, moviename }) {
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0);

    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState("");
    const [editRating, setEditRating] = useState(0);

    const { user } = useAuth();

    const { reviews, isLoading, create, reply, update, remove } = useReviews(movieId);

    function handleSubmit(e) {
        e.preventDefault();

        if (!reviewText.trim() || rating === 0) return;

        create({
            movie_id: Number(movieId),
            movie_title: moviename,
            rating,
            review: reviewText,
        });

        setReviewText("");
        setRating(0);
    }

    function startEdit(review) {
        setEditId(review.id);
        setEditText(review.review);
        setEditRating(review.rating);
    }

    function cancelEdit() {
        setEditId(null);
        setEditText("");
        setEditRating(0);
    }

    function handleUpdate(e) {
        e.preventDefault();

        if (!editText.trim() || editRating === 0) return;

        update({
            id: editId,
            movie_id: Number(movieId),
            movie_title: moviename,
            rating: editRating,
            review: editText,
        });

        cancelEdit();
    }

    function handleRemove(id) {
        remove(id);
        if (id === editId) cancelEdit();
    }

    return (
        <div className="space-y-8">
            <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
                {user ? (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <h2 className="text-xl font-bold dark:text-white">Write a Review</h2>

                        <StarRating value={rating} onChange={setRating} />

                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            rows={3}
                            className="w-full resize-none rounded-xl border border-zinc-300 p-4 outline-none transition-colors focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
                            placeholder="What did you think?"
                        />

                        <button
                            type="submit"
                            disabled={!reviewText.trim() || rating === 0}
                            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
                        >
                            Publish
                        </button>
                    </form>
                ) : (
                    <p className="text-zinc-500">Log in to write a review.</p>
                )}
            </div>

            <div className="space-y-5">
                {isLoading ? (
                    // simple skeleton instead of a bare "Loading..." string
                    [...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="animate-pulse rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
                        >
                            <div className="flex gap-4">
                                <div className="h-12 w-12 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                                <div className="flex-1 space-y-3">
                                    <div className="h-4 w-1/4 rounded bg-zinc-200 dark:bg-zinc-800" />
                                    <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
                                </div>
                            </div>
                        </div>
                    ))
                ) : reviews?.length ? (
                    reviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                            replyMutation={reply}
                            user={user}
                            remove={handleRemove}
                            setEdit={startEdit}
                            isEditing={editId === review.id}
                        >
                            <form onSubmit={handleUpdate} className="mt-4 space-y-4">
                                <StarRating value={editRating} onChange={setEditRating} size="text-2xl" />

                                <textarea
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    rows={3}
                                    autoFocus
                                    className="w-full resize-none rounded-xl border border-zinc-300 p-3 outline-none transition-colors focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
                                />

                                <div className="flex gap-2">
                                    <button
                                        type="submit"
                                        disabled={!editText.trim() || editRating === 0}
                                        className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={cancelEdit}
                                        className="rounded-lg border border-zinc-300 px-5 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </ReviewCard>
                    ))
                ) : (
                    <div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center text-zinc-500 dark:border-zinc-700">
                        No reviews yet — be the first to share your thoughts.
                    </div>
                )}
            </div>
        </div>
    );
}
