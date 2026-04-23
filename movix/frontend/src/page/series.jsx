import { useState } from "react";
import { Link } from "react-router-dom";
import useSeries from "../hooks/useSeries";

export default function Series(){
    const [page,setPage]=useState(1);
    const {data,status}=useSeries(page);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return(
        <>
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">All Movies</h1>

            {/* Movie Grid - Replaces content every time page changes */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 min-h-[600px]">
                {status === 'loading' ? (
                    <div className="col-span-full text-center py-20 text-gray-400">Loading...</div>
                ) : (
                    data?.map((movie) => (
                        <Link key={movie.id} to={`/tv/${movie.id}`} className="group">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                className="rounded-xl shadow-lg group-hover:scale-105 transition"
                                alt={movie.title}
                            />
                            <h2 className="mt-2 text-sm font-bold truncate">{movie.name}</h2>
                        </Link>
                    ))
                )}
            </div>

            {/* Pagination UI */}
            <div className="flex justify-center items-center gap-2 mt-12 border-t pt-8">
                {/* Previous Button */}
                <button 
                    disabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-30"
                >
                    Prev
                </button>

                {/* Simple Page Numbers (showing a small window) */}
                {[...Array(5)].map((_, i) => {
                    const pageNum = page <= 3 ? i + 1 : page - 2 + i;
                    return (
                        <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`w-10 h-10 rounded ${page === pageNum ? 'bg-black text-white' : 'bg-gray-100'}`}
                        >
                            {pageNum}
                        </button>
                    );
                })}

                {/* Next Button */}
                <button 
                    onClick={() => handlePageChange(page + 1)}
                    className="px-4 py-2 bg-gray-200 rounded"
                >
                    Next
                </button>
            </div>
        </div>
        </>
    )
}