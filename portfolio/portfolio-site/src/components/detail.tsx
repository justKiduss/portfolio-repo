import { useParams } from "react-router-dom";
import { ProjectDetail } from "./project";

export default function Detail() {
  const { id } = useParams();
  const project = ProjectDetail.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Project Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0c10] text-gray-200 px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-12">

        {/* HEADER */}
        <header className="space-y-3 border-b border-gray-800 pb-6">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            {project.title}
          </h1>
          <p className="text-gray-400 max-w-2xl">
            {project.subtitle}
          </p>
        </header>

        {/* SYSTEMS */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">
            Core Systems
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {project.systems.map((sys, i) => (
              <div
                key={i}
                className="bg-[#111318] border border-gray-800 rounded-xl p-5 hover:border-purple-500/40 transition"
              >
                <h3 className="text-white font-medium mb-2">
                  {sys.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {sys.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CHALLENGES */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">
            Engineering Challenges
          </h2>

          <div className="space-y-3">
            {project.challenges.map((challenge, i) => (
              <div
                key={i}
                className="bg-[#0f1116] border border-gray-800 rounded-lg p-4 text-sm text-gray-300"
              >
                {challenge}
              </div>
            ))}
          </div>
        </section>

        {/* ARCHITECTURE */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">
            System Architecture
          </h2>

          <details className="group bg-[#111318] border border-gray-800 rounded-xl p-5">
            <summary className="cursor-pointer text-purple-400 font-medium flex justify-between items-center">
              View State Structure
              <span className="text-xs text-gray-500 group-open:rotate-180 transition">
                ▼
              </span>
            </summary>

            <pre className="mt-4 text-xs text-gray-300 overflow-x-auto leading-relaxed bg-[#0b0c10] p-4 rounded-md">
              {project.stateStructure}
            </pre>
          </details>

          <div className="bg-[#111318] border border-gray-800 rounded-xl p-4">
            <img
              src={project.architectureImg}
              alt="architecture"
              className="rounded-md w-full object-cover"
            />
          </div>
        </section>

      </div>
    </div>
  );
}