import { useState } from "react";
import Warning from "./Warning";
import { Link } from "react-router-dom";

export default function MovieList({ movies, reviews, reviewState,query}) {
  const [reviewId, setReviewId] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [removeId, setRemoveId] = useState(null);
  const [rating, setRating] = useState(0);

  const isAnyActionActive =
    removeId !== null || editId !== null || reviewId !== null;

  const handleEdit = (e, movie) => {
    e.preventDefault();
    if (!editText.trim() || rating < 1) return;

    reviews.update(editId, movie.id, movie.original_title, rating, editText);

    setEditId(null);
    setEditText("");
    setRating(0);
  };

  const handleReview = (e, movie) => {
    e.preventDefault();
    if (!reviewText.trim() || rating < 1) return;

    reviews.create(movie.id, movie.original_title, rating, reviewText);

    setReviewId(null);
    setReviewText("");
    setRating(0);
  };

  const atBegining = (movie) => {
    setEditId(movie.id);
    setEditText(reviewState.byIds[movie.id]?.review || "");
    setRating(reviewState.byIds[movie.id]?.rating || 0);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.data.map((movie) => (
        <div
          key={movie.id}
          className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
        >
          <Link to={`/${movie.media_type || "movie"}/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.original_title}
              className="h-40 w-full object-cover"
            />
          </Link>
          {/* Content */}
          <div className="p-4 flex flex-col gap-2">
            <h3 className="font-semibold text-sm">
              {movie.original_title}
            </h3>

            {reviewState.loading && (
              <p className="text-xs text-gray-400">Loading...</p>
            )}

            {reviewState.error && (
              <p className="text-xs text-red-500">
                Error while fetching
              </p>
            )}

            <p className="text-sm text-gray-700">
              {reviewState?.byIds?.[movie.id]?.review ?? ""}
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-2 mt-2">

              {/* Review */}
              {reviewId === movie.id ? (
                <form
                  onSubmit={(e) => handleReview(e, movie)}
                  className="flex flex-col gap-2"
                >
                  <input
                    type="text"
                    placeholder="Write review..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="border p-2 rounded text-sm"
                  />
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="border p-2 rounded text-sm"
                  />
                  <button className="bg-black text-white py-1 rounded text-sm">
                    Submit
                  </button>
                </form>
              ) : (
                !isAnyActionActive && (
                  <button
                    onClick={() => {
                      setReviewId(movie.id);
                      setRating(0);
                    }}
                    className="text-sm bg-gray-200 py-1 rounded"
                  >
                    Review
                  </button>
                )
              )}

              {/* Edit */}
              {editId === movie.id ? (
                <form
                  onSubmit={(e) => handleEdit(e, movie)}
                  className="flex flex-col gap-2"
                >
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="border p-2 rounded text-sm"
                  />
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="border p-2 rounded text-sm"
                  />
                  <button className="bg-black text-white py-1 rounded text-sm">
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditId(null)}
                    className="text-xs text-gray-500"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                !isAnyActionActive && (
                  <button
                    onClick={() => atBegining(movie)}
                    className="text-sm bg-gray-200 py-1 rounded"
                  >
                    Edit
                  </button>
                )
              )}

              {/* Delete */}
              {!isAnyActionActive && (
                <button
                  onClick={() => setRemoveId(movie.id)}
                  className="text-sm bg-red-500 text-white py-1 rounded"
                >
                  Delete
                </button>
              )}

              {removeId === movie.id && (
                <Warning
                  onConfirm={() => {
                    reviews.remove(removeId);
                    setRemoveId(null);
                  }}
                  onCancel={() => setRemoveId(null)}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}