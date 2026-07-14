// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { X, Bookmark } from "lucide-react";
// import SectionHeader from "./sectionHeader";
// import { addWatchLaterService, getAllWatchLaterService } from "../service/watchLater";

// const STORAGE_KEY = "watchLaterList";

// function mergeContinueWatching(backendItems, localItems) {
//   const byId = new Map();
//   for (const item of localItems) byId.set(item.movieId, item);
//   for (const item of backendItems) byId.set(item.movieId, item);
//   return Array.from(byId.values());
// }

// let movieObj;
// export function asyncWatchLater(movie){
//     const watchLater = {
//       movieId:movie.id,
//       title: movie.original_title,
//       poster: movie.poster_path,
//       type:type?"tv":"movie" ,
//       timestamp: Date.now(),
//     };
//     movieObj=watchLater;
// }

// export function WatchLaterPage() {
//   // const [items, setItems] = useState([]);
//   const [data,setData]=useState();
//   // useEffect(() => {
//   //   const saved = localStorage.getItem(STORAGE_KEY);
//   //   setItems(saved ? JSON.parse(saved) : []);
//   // }, []);
//   useEffect(() => {
//       async function load() {
//         // Read localStorage synchronously first, so guests / offline users
//         // still see something immediately even if the backend call fails.
//         const saved = localStorage.getItem("watchLaterList");
//         const localItems = saved ? JSON.parse(saved) : [];
//         setData(localItems);

//         async function syncToBackend() {
//               try {
//                 await addWatchLaterService(movieObj);
//               } catch (err) {
//                 // Backend unreachable (logged out, network error) — localStorage
//                 // write above already succeeded, so this fails silently.
//                 return "Internal Server error";
//               }
//             }
//           syncToBackend();
//         try {
//           const backendItems = await getAllWatchLaterService();
//           setData(mergeContinueWatching(backendItems || [], localItems));
//         } catch (err) {
//           // Backend unreachable (e.g. logged out, network error) — just keep
//           // showing what we already loaded from localStorage.
//         }
//       }
//       load();
//     }, []);

//   function handleRemove(e, id) {
//     e.preventDefault();
//     e.stopPropagation();

//     const updated = items.filter((item) => item.id !== id);
//     setItems(updated);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-black transition-colors">
//       <div className="p-4 md:p-10 max-w-[1800px] mx-auto">
//         <SectionHeader label="Saved" title="Watch Later" />

//         {data.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
//             <Bookmark className="w-10 h-10 text-gray-400 dark:text-zinc-600" />
//             <p className="font-['JetBrains_Mono'] text-sm text-gray-500 dark:text-zinc-500">
//               Nothing saved yet.
//             </p>
//             <p className="text-sm text-gray-400 dark:text-zinc-600 max-w-xs">
//               Tap the bookmark icon on any title to add it to your Watch Later list.
//             </p>
//             <Link
//               to="/"
//               className="mt-2 text-sm font-semibold text-cyan-600 dark:text-[#2DE2C1] hover:underline"
//             >
//               Browse titles →
//             </Link>
//           </div>
//         ) : (
//           <div
//             className="grid gap-4"
//             style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
//           >
//             {data.map((item) => {
//               const title = item.title || item.name;
//               const year = (item.release_date || item.first_air_date)?.split("-")[0];
//               const type = item.media_type || "movie";

//               return (
//                 <Link
//                   key={item.id}
//                   to={`/${type}/${item.id}`}
//                   className="group relative flex flex-col"
//                 >
//                   <div className="relative overflow-hidden rounded-lg shadow-md dark:shadow-none border border-transparent dark:border-zinc-800 group-hover:border-cyan-500/30 dark:group-hover:border-[#2DE2C1]/30 transition-colors">
//                     <img
//                       src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
//                       alt={title}
//                       className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
//                     />
//                     <button
//                       onClick={(e) => handleRemove(e, item.id)}
//                       aria-label={`Remove ${title} from Watch Later`}
//                       className="absolute top-2 right-2 bg-black/70 backdrop-blur p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 hover:bg-rose-500 transition-all"
//                     >
//                       <X size={14} />
//                     </button>
//                   </div>
//                   <p className="mt-2 text-sm font-semibold truncate dark:text-zinc-200">
//                     {title}
//                   </p>
//                   {year && (
//                     <p className="text-xs font-['JetBrains_Mono'] text-gray-500 dark:text-zinc-500">
//                       {year}
//                     </p>
//                   )}
//                 </Link>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X, Bookmark } from "lucide-react";
import SectionHeader from "./sectionHeader";
import { getAllWatchLaterService } from "../service/watchLater";
import useWatchLater from "../hooks/useWatchLater";

function mergeWatchLater(backendItems, localItems) {
  const byId = new Map();
  for (const item of localItems) byId.set(item.id, item);
  for (const item of backendItems) byId.set(item.id, item);
  return Array.from(byId.values());
}

export default function WatchLaterPage() {
  // `list` here is the same localStorage-backed state every other component
  // shares via the hook — no more separate, disconnected local copy.
  const { list: localItems, toggle } = useWatchLater();

  // FIX: was `useState()` with no initial value — `data.length` on first
  // render threw before the effect below ever ran. Now starts as [].
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(localItems);

    async function loadBackend() {
      try {
        const backendItems = await getAllWatchLaterService();
        setData(mergeWatchLater(backendItems || [], localItems));
      } catch (err) {
        // Backend unreachable — keep showing what localStorage already gave us.
      }
    }
    loadBackend();
  }, [localItems]);

  // FIX: was referencing `items`/`setItems`, which no longer exist in this
  // component. Removing now goes through the shared hook's toggle, which
  // updates localStorage (and every other mounted component using the hook).
  function handleRemove(e, item) {
    e.preventDefault();
    e.stopPropagation();
    toggle(item);
    setData((prev) => prev.filter((i) => i.id !== item.id));
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black transition-colors">
      <div className="p-4 md:p-10 max-w-[1800px] mx-auto">
        <SectionHeader label="Saved" title="Watch Later" />

        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
            <Bookmark className="w-10 h-10 text-gray-400 dark:text-zinc-600" />
            <p className="font-['JetBrains_Mono'] text-sm text-gray-500 dark:text-zinc-500">
              Nothing saved yet.
            </p>
            <p className="text-sm text-gray-400 dark:text-zinc-600 max-w-xs">
              Tap the bookmark icon on any title to add it to your Watch Later list.
            </p>
            <Link
              to="/"
              className="mt-2 text-sm font-semibold text-cyan-600 dark:text-[#2DE2C1] hover:underline"
            >
              Browse titles →
            </Link>
          </div>
        ) : (
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
          >
            {data.map((item) => {
              const title = item.title || item.name;
              const year = (item.release_date || item.first_air_date)?.split("-")[0];
              const type = item.media_type || "movie";

              return (
                <Link
                  key={item.id}
                  to={`/${type}/${item.id}`}
                  className="group relative flex flex-col"
                >
                  <div className="relative overflow-hidden rounded-lg shadow-md dark:shadow-none border border-transparent dark:border-zinc-800 group-hover:border-cyan-500/30 dark:group-hover:border-[#2DE2C1]/30 transition-colors">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={title}
                      className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={(e) => handleRemove(e, item)}
                      aria-label={`Remove ${title} from Watch Later`}
                      className="absolute top-2 right-2 bg-black/70 backdrop-blur p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 hover:bg-rose-500 transition-all"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <p className="mt-2 text-sm font-semibold truncate dark:text-zinc-200">
                    {title}
                  </p>
                  {year && (
                    <p className="text-xs font-['JetBrains_Mono'] text-gray-500 dark:text-zinc-500">
                      {year}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}