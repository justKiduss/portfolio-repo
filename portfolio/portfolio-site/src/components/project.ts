import stra from "../assets/excalidraw strategy.png";
import movix from "../assets/excalidraw movix.png";
export const ProjectDetail=[
        {
            id: "strategy-game",
            title: "Strategy Game",
            subtitle: "Turn-based strategy game built with custom state management and AI systems.",
            systems: [
            { title: "State Engine", detail: "Custom Redux-like dispatcher with pure reducers handling movement, combat, and turns." },
            { title: "Fog of War", detail: "Manhattan distance-based vision system tied to unit positions per render cycle." },
            { title: "AI System", detail: "Greedy pathfinding AI with obstacle handling and delayed action execution for visual clarity." },
            { title: "Terrain Logic", detail: "Grid-based terrain modifiers affecting movement cost and combat stats." },
            ],
            challenges: [
            "Preventing player input during AI execution using a blocking state flag.",
            "Visualizing AI decisions using staggered execution delays.",
            "Designing fog-of-war visibility logic based on distance calculations per unit.",
            ],
            stateStructure: `state = { grid, units, turn, unitLocations, ui }`,
            architectureImg: stra,
        },
        {
            id:"movix",
            title: "Movix",
            subtitle: "Full-stack movie streaming platform with auth, reviews and watch history.",
            systems: [
                { title: "Review State Engine", detail: "Normalized useReducer with byIds/allIds structure — all CRUD operations flow through a custom useReview hook with useCallback and useMemo to prevent re-renders." },
                { title: "Authentication", detail: "JWT auth with role-based authorization plus Google OAuth — tokens passed via URL params on OAuth callback, consumed and cleaned on mount." },
                { title: "REST API Architecture", detail: "Layered Express backend — routes → controllers → services → models — with input validation middleware, rate limiting, and Winston structured logging." },
                { title: "Watch History", detail: "localStorage persistence tracking continue-watching state per movie and series, including season and episode position with deduplication and 10-entry cap." },
            ],
            challenges: [
                "Preventing stale state in search by using an ignore flag pattern inside useEffect to cancel outdated fetch responses.",
                "Handling Google OAuth token handoff — backend redirects with token in URL params, frontend consumes and cleans the URL on mount.",
                "Designing normalized review state to support fast lookups by ID without scanning arrays on every render.",
            ],
            stateStructure: `reviewState = { byIds: { [id]: { id, movie_id, rating, review } }, allIds: [...], loading, error }`,
            architectureImg: movix,
        }
    ]