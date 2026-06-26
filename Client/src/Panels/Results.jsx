import SectionHeader from "@/components/SectionHeader.jsx";
import React from "react";

export const ResultsPanel = ({ result }) => {
  return (
    <div className="panel-landing">
      <SectionHeader
        title="Academic Results"
        sub="Your semester grades and GPA overview"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {result.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div
              className={`w-10 h-10 ${s.bg}  rounded-xl flex items-center justify-center mb-4 `}
            >
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <p className={`text-3xl font-bold ${s.color} mb-1`}>{s.value}</p>
            <p className="text-xs text-gray-400 font-medium">{s.label}</p>
            <p className="text-[11px] text-gray-300 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-gray-900 mb-5 text-sm uppercase tracking-wide">
          400 Level — 1st Semester
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase tracking-wide border-b border-gray-100">
                <th className="pb-3 font-semibold">Course</th>
                <th className="pb-3 font-semibold">Title</th>
                <th className="pb-3 font-semibold text-center">Units</th>
                <th className="pb-3 font-semibold text-center">Score</th>
                <th className="pb-3 font-semibold text-center">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                ["CSC 401", "Software Engineering", "3", "88", "A"],
                ["CSC 403", "Computer Networks", "3", "76", "B"],
                ["CSC 405", "Database Systems", "3", "92", "A"],
                ["MTH 401", "Numerical Methods", "2", "65", "C"],
                ["CSC 407", "Compiler Design", "3", "80", "A"],
              ].map(([code, title, units, score, grade], i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 font-mono text-xs text-blue-600 font-semibold">
                    {code}
                  </td>
                  <td className="py-3 text-gray-700">{title}</td>
                  <td className="py-3 text-center text-gray-500">{units}</td>
                  <td className="py-3 text-center font-semibold text-gray-800">
                    {score}
                  </td>
                  <td className="py-3 text-center">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        grade === "A"
                          ? "bg-green-50 text-green-600 border border-green-200"
                          : grade === "B"
                            ? "bg-blue-50 text-blue-600 border border-blue-200"
                            : "bg-orange-50 text-orange-600 border border-orange-200"
                      }`}
                    >
                      {grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
