import stra from "../assets/excalidraw strategy.png";
import movix from "../assets/excalidraw movix.png";
import wavvy from "../assets/wavvy.png";
export const ProjectDetail=[
        {
            id: "strategy-game",
            title: "Strategy Game",
            featured: true,
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
            id: "wavvy",
            title: "Wavvy",
            featured: true,
            subtitle: "Real-time group chat platform with end-to-end socket integration and presence tracking.",
            systems: [
                { 
                    title: "Socket Management", 
                    detail: "Centralized socket lifecycle within a Zustand store — implementing a singleton connection pattern that prevents multiple socket instantiations via connection state tracking." 
                },
                { 
                    title: "Presence Engine", 
                    detail: "Real-time online status tracking using server-side maps keyed by userId, broadcasted via Socket.io to all clients on join/disconnect events." 
                },
                { 
                    title: "Message Persistence", 
                    detail: "Optimistic UI updates for instant messaging, synchronized with a PostgreSQL backend through a RESTful API and real-time socket events for multi-client state consistency." 
                },
                { 
                    title: "Group Room Logic", 
                    detail: "Dynamic room management using socket.join/leave rooms patterned by groupId, enabling targeted message broadcasting to active group participants only." 
                },
            ],
            challenges: [
                "Architecting around serverless lifecycle limitations by implementing an automatic reconnection strategy and state re-hydration on socket re-establishment.",
                "Ensuring UI consistency between the primary database (PostgreSQL) and temporary socket-based state using optimistic updates and rollback handling.",
                "Managing socket connection overhead by implementing singleton patterns to prevent 'ghost' connections during React component re-renders.",
            ],
            stateStructure: `chatState = { socket, onlineUsers: [{ userId, username }], messages: [Message], users: [User], isLoading }`,
            architectureImg: wavvy
        },
        {
            id:"movix",
            title: "Movix",
            featured: true,
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