import SectionHeader from "@/components/SectionHeader.jsx";
import { AlertCircle, Award, CheckCircle } from "lucide-react";
import React from "react";

export const CertificatePanel = ({ cert }) => {
  return (
    <div className="panel-landing">
      <SectionHeader
        title="Certificate"
        sub="Your blockchain-verified academic certificate"
      />
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Certificate preview area */}
        <div
          className="relative flex flex-col items-center justify-center py-20 px-6 text-center"
          style={{
            background: "linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)",
          }}
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-lg"
            style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}
          >
            <Award className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Certificate Not Yet Available
          </h3>
          <p className="text-gray-500 text-sm max-w-sm">
            Your certificate will be issued after all clearance processes are
            completed and verified by your institution.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
              Check Requirements
            </button>
            <button className="px-6 py-2.5 border border-gray-200 text-gray-600 hover:border-blue-200 text-sm font-semibold rounded-xl transition-colors">
              Contact Registry
            </button>
          </div>
        </div>
        <div className="border-t border-gray-100 p-6">
          <p className="text-xs text-gray-400 font-medium mb-3">
            Certificate requirements checklist
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cert.map((req, i) => (
              <div key={i} className="flex items-center gap-2.5">
                {req.done ? (
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-orange-400 shrink-0" />
                )}
                <span
                  className={`text-sm ${req.done ? "text-gray-600" : "text-gray-400"}`}
                >
                  {req.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
