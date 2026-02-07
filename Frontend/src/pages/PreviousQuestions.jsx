import { useEffect, useState } from "react";

export default function PreviousQuestions() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    company: "",
    role: "",
    round: ""
  });

  const fetchQuestions = async () => {
    const params = new URLSearchParams(filters);
    const res = await fetch(
      `http://localhost:4000/api/questions?${params}`
    );
    const json = await res.json();
    setData(json.data || []);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">
        Previous Asked Questions
      </h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-white">
        <input
          placeholder="Company"
          onChange={(e) =>
            setFilters({ ...filters, company: e.target.value })
          }
          className="border p-2 rounded"
        />

        <select
          onChange={(e) =>
            setFilters({ ...filters, role: e.target.value })
          }
          className="border p-2 rounded text-white"
        >
          <option value="">Role</option>
          <option>Tech</option>
          <option>Non-Tech</option>
        </select>

        <select
          onChange={(e) =>
            setFilters({ ...filters, round: e.target.value })
          }
          className="border p-2 rounded text-white"
        >
          <option value="">Round</option>
          <option>Coding</option>
          <option>Interview</option>
        </select>
      </div>

      <button
        onClick={fetchQuestions}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>

      {/* Questions */}
      {data.map((item) => (
        <div
          key={item._id}
          className="bg-white shadow p-4 rounded-lg mb-4"
        >
          <h3 className="font-semibold text-lg">
            {item.company} — {item.round}
          </h3>

          <p className="text-sm text-gray-500 mb-2">
            Role: {item.role} | Asked: {item.timeRange} ago
          </p>

          <ul className="list-disc ml-5 space-y-1">
            {item.questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
