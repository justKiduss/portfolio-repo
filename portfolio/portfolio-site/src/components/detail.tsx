import stra from "../assets/excalidraw strategy.png";
export default function Detail() {
  return (
    <div className="space-y-10 text-left text-gray-200">

      {/* TITLE */}
      <header className="space-y-2">
        <h2 className="text-3xl font-semibold">
          Strategy Game — Technical Overview
        </h2>
        <p className="text-gray-400 text-sm">
          Turn-based strategy game built with custom state management and AI systems.
        </p>
      </header>

      {/* SYSTEMS */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Core Systems</h3>

        <ul className="space-y-3 text-sm text-gray-300">
          <li className="bg-[#111318] p-4 rounded-lg border border-gray-800">
            <span className="text-white font-medium">State Engine:</span> Custom Redux-like dispatcher with pure reducers handling movement, combat, and turns.
          </li>

          <li className="bg-[#111318] p-4 rounded-lg border border-gray-800">
            <span className="text-white font-medium">Fog of War:</span> Manhattan distance-based vision system tied to unit positions per render cycle.
          </li>

          <li className="bg-[#111318] p-4 rounded-lg border border-gray-800">
            <span className="text-white font-medium">AI System:</span> Greedy pathfinding AI with obstacle handling and delayed action execution for visual clarity.
          </li>

          <li className="bg-[#111318] p-4 rounded-lg border border-gray-800">
            <span className="text-white font-medium">Terrain Logic:</span> Grid-based terrain modifiers affecting movement cost and combat stats.
          </li>
        </ul>
      </section>

      {/* CHALLENGES */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-white">
          Engineering Challenges
        </h3>

        <ul className="space-y-3 text-sm text-gray-300">
          <li className="bg-[#0f1116] p-4 rounded-lg border border-gray-800">
            Preventing player input during AI execution using a blocking state flag.
          </li>

          <li className="bg-[#0f1116] p-4 rounded-lg border border-gray-800">
            Visualizing AI decisions using staggered execution delays.
          </li>

          <li className="bg-[#0f1116] p-4 rounded-lg border border-gray-800">
            Designing fog-of-war visibility logic based on distance calculations per unit.
          </li>
        </ul>
      </section>

      {/* STATE (COLLAPSIBLE) */}
      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-white">
          System Architecture
        </h3>

        <details className="bg-[#111318] border border-gray-800 rounded-lg p-4">
          <summary className="cursor-pointer text-purple-400 font-medium">
            View State Structure
          </summary>

          <pre className="mt-4 text-xs text-gray-300 overflow-x-auto leading-relaxed">
                {`state = {
                grid: { rows: 10, cols: 10 },

                units: {
                    unit1: { owner: "player1", hp: 10, movement: 3 },
                    unit2: { owner: "player2", hp: 10, movement: 3 }
                },

                turn: { currentPlayer: "player1", number: 1 },

                unitLocations: {
                    "2-4": "unit1",
                    "6-5": "unit2"
                },

                ui: {
                    highlightedTiles: [],
                    explosion: null }
            }`}
          </pre>
        </details>
        <img src={stra} alt="strategy game architecture" className="mt-4 rounded-lg border border-gray-800 w-full"/>
      </section>

    </div>
  );
}