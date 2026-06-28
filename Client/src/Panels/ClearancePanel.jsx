import { useState, useEffect, useRef } from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import { AlertCircle } from "lucide-react";

export const ClearancePanel = ({ clearances }) => {
  const [selected, setSelected] = useState(() => {
    try {
      return localStorage.getItem("selectedClearance") || "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("selectedClearance", selected);
    } catch {
      // ignore localStorage write errors
    }
  }, [selected]);

  const dropdownOptions = [
    "Departmental",
    "Old Seat Head",
    "ICT",
    "Medical",
    "Library",
  ];

  const requiredDocs = {
    Departmental: [
      "Completed clearance form",
      "Student ID card copy",
      "Department approval letter",
    ],
    "Old Seat Head": [
      "DEVELOPMENT LEVY REMITA RECEIPT",
      "NIN SLIP",
      "Postume application slip",
      "CANDIDATE PROFILE SLIP",
      "FUTO ADMISSION LETTER",
      "CONFIRMATION OF ADMISSION LETTER",
      "FORM 18(SIGN ACCEPTANCE LETTER)",
      "FORM 19(VALIDITY FORM)",
      "OFFICIAL SCHOOL FEE RECEIPT",
      "SCREENING RESULTS",
      "JAMB ORIGINAL RESULT",
      "JAMB ADMISSION LETTER",
      "OLEVEL RESULT(WAEC RESULT,NECO RESULT,NABTEB E.TC",
      "ONLINE PRINTOUT OR ORIGINAL COPY",
      "OLEVEL RESULT CHECKER(WAEC RESULT CHECKER,NECO TOKEN, NABTEB PIN E.T.C",
      "LOCAL GOVERNMENT IDENTIFICATION LETTER",
      "BIRTH CERTIFICATE",
      "ATTESTATION LETTER",
      "Passport",
    ],
    ICT: ["ICT clearance form", "Device receipt if applicable"],
    Medical: ["Medical report", "Vaccination card"],
    Library: ["Library card", "Overdue/fees receipt"],
  };

  const [filesByOption, setFilesByOption] = useState({});
  const [barLoaded, setBarLoaded] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setBarLoaded(true), 750);
    return () => window.clearTimeout(timer);
  }, []);

  const handleFiles = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (!selectedFiles.length) return;
    setFilesByOption((prev) => {
      const prevList = prev[selected] || [];
      return { ...prev, [selected]: [...prevList, ...selectedFiles] };
    });
    e.target.value = null;
  };

  const removeFile = (index) => {
    setFilesByOption((prev) => {
      const list = (prev[selected] || []).slice();
      list.splice(index, 1);
      return { ...prev, [selected]: list };
    });
  };

  const openFilePicker = () =>
    fileInputRef.current && fileInputRef.current.click();

  return (
    <div className="panel-landing">
      <SectionHeader
        title="Clearance Status"
        sub="Track your departmental clearance in real time"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {clearances.map((c, i) => (
          <div
            key={i}
            className={`bg-white rounded-2xl border ${c.border} p-6 shadow-sm duration-300 hover:scale-105 hover:shadow-lg transition-all`}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className={`w-11 h-11 ${c.bg} rounded-xl flex items-center justify-center`}
              >
                <c.icon className={`w-5 h-5 ${c.color}`} />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">
                  {c.label} Clearance
                </p>
                <p className={`text-xs font-semibold ${c.color}`}>{c.status}</p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className={`${c.pct === 100 ? "bg-green-500" : "bg-orange-400"} h-full rounded-full progress-fill`}
                style={{ width: barLoaded ? `${c.pct}%` : "0%" }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2 text-right">{c.pct}%</p>
          </div>
        ))}
      </div>
      <div
        style={{ width: 210 }}
        className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-3 flex gap-4 items-start mb-4 pulse-button"
      >
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="text-sm text-blue-700 bg-transparent"
        >
          <option value="">List of Clearance</option>
          {dropdownOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Details panel */}
      {selected ? (
        <div className="mb-6 bg-white border border-gray-100 rounded-2xl p-5">
          <h4 className="text-sm font-semibold mb-3">Details for {selected}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-2">Required documents</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                {(requiredDocs[selected] || []).map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-2">Upload documents</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={openFilePicker}
                  className="px-3 py-2 rounded-2xl text-sm pulse-button border-2 border-blue-200 text-blue-700 bg-transparent hover:bg-blue-50 transition-all duration-300"
                >
                  Upload files
                </button>
                <span className="text-sm text-gray-500">
                  {(filesByOption[selected] || []).length} file(s) selected
                </span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFiles}
              />
              <div className="mt-3 space-y-2">
                {(filesByOption[selected] || []).map((f, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 border rounded-md"
                  >
                    <div className="truncate text-sm">{f.name}</div>
                    <button
                      onClick={() => removeFile(idx)}
                      className="text-xs text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex gap-4 items-start">
        <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-blue-800">
            Department clearance is pending
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Visit the Computer Science department office with your completed
            forms to continue your clearance process.
          </p>
        </div>
      </div>
    </div>
  );
};
