import { useState, useEffect, useRef } from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import { AlertCircle, ChevronRight, ChevronLeft, Loader2, FileText, CheckCircle2, Upload, Trash2 } from "lucide-react";
import api from "@/api/axios.js";

const StepBar = ({ current, selectedStage }) => {
  const docSteps = selectedStage?.required_documents || [];

  const steps = [
    "Select Stage",
    ...docSteps,
    "Review",
    "Done"
  ];

  return (
      <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
        {steps.map((label, i) => {
          const idx = i + 1;
          const done = idx < current;
          const active = idx === current;
          return (
              <div key={i} className="flex items-center gap-1 flex-1 last:flex-none min-w-0">
                <div className="flex flex-col items-center gap-1 min-w-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all shrink-0
                                ${done ? "bg-green-500 border-green-500 text-white" :
                      active ? "bg-blue-600 border-blue-600 text-white" :
                          "bg-white border-gray-200 text-gray-400"}`}>
                    {done ? "✓" : idx}
                  </div>
                  <span className={`text-[9px] font-medium hidden sm:block text-center truncate max-w-[60px]
                                ${active ? "text-blue-600" : "text-gray-400"}`}>
                                {label}
                            </span>
                </div>
                {i < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mb-4 shrink-0 min-w-[8px]
                                ${done ? "bg-green-400" : "bg-gray-200"}`} />
                )}
              </div>
          );
        })}
      </div>
  );
};

export const ClearancePanel = () => {
  const [step, setStep] = useState(1);
  const [stages, setStages] = useState([]);
  const [selectedStage, setSelectedStage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [barLoaded, setBarLoaded] = useState(false);
  const fileInputRef = useRef(null);
  const [filesByDoc, setFilesByDoc] = useState({});

  // Mock static status cards for the top view (Replaces original crash source)
  const clearanceStatusSummary = [
    { label: "Departmental", status: "Pending Action", pct: 40, bg: "bg-amber-50", color: "text-amber-600", border: "border-amber-100", icon: FileText },
    { label: "ICT", status: "Completed", pct: 100, bg: "bg-green-50", color: "text-green-600", border: "border-green-100", icon: CheckCircle2 },
    { label: "Library", status: "Not Started", pct: 0, bg: "bg-gray-50", color: "text-gray-400", border: "border-gray-100", icon: FileText },
  ];

  useEffect(() => {
    api.get("/student/clearance-stages")
        .then(res => setStages(res.data.data || []))
        .catch(() => setError("Failed to load clearance stages."))
        .finally(() => setLoading(false));

    const timer = window.setTimeout(() => setBarLoaded(true), 750);
    return () => window.clearTimeout(timer);
  }, []);
  // Step 2 to (2 + docs.length - 1) are the upload steps
  const docSteps = selectedStage?.required_documents || [];
  const totalSteps = 1 + docSteps.length + 2; // select + docs + review + done
  const currentDocIndex = step - 2; // step 2 = doc[0], step 3 = doc[1], etc
  const isUploadStep = step >= 2 && step <= docSteps.length + 1;
  const isReviewStep = step === docSteps.length + 2;
  const isDoneStep = step === docSteps.length + 3;
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError("");
      for (const doc of docSteps) {
        const file = filesByDoc[doc];
        if (!file) continue;
        const formData = new FormData();
        formData.append("document", file);
        formData.append("stageName", selectedStage.stage_name);
        await api.post("/student/upload-document", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }
      setStep(s => s + 1); // moves to Done
    } catch (err) {
      setError(err.response?.data?.message || "Submission failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };


  return (
      <div className="panel-landing max-w-4xl mx-auto p-4 space-y-8">

        <div>
          <SectionHeader
              title="Clearance Status"
              sub="Track your departmental clearance in real time"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-6">
            {clearanceStatusSummary.map((c, i) => (
                <div
                    key={i}
                    className={`bg-white rounded-2xl border ${c.border} p-6 shadow-sm duration-300 hover:scale-[1.02] hover:shadow-md transition-all`}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-11 h-11 ${c.bg} rounded-xl flex items-center justify-center`}>
                      <c.icon className={`w-5 h-5 ${c.color}`} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{c.label} Clearance</p>
                      <p className={`text-xs font-semibold ${c.color}`}>{c.status}</p>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                        className={`${c.pct === 100 ? "bg-green-500" : "bg-orange-400"} h-full rounded-full transition-all duration-1000`}
                        style={{ width: barLoaded ? `${c.pct}%` : "0%" }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2 text-right">{c.pct}%</p>
                </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: Submission Flow Panel */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <SectionHeader
              title="Clearance Submission"
              sub="Submit your documents stage by stage"
          />

          <div className="mt-6">
            <StepBar current={step} selectedStage={selectedStage} />
          </div>

          {/* STEP 1: Select Stage */}
          {step === 1 && (
              <div className="space-y-5">
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Select Clearance Stage</h3>
                  <p className="text-xs text-gray-400">Choose the stage you want to submit documents for</p>
                </div>

                {loading ? (
                    <div className="flex items-center gap-2 text-gray-400 text-sm py-4">
                      <Loader2 className="w-4 h-4 animate-spin" /> Loading stages...
                    </div>
                ) : error ? (
                    <p className="text-sm text-red-500 py-2">{error}</p>
                ) : (
                    <div className="space-y-3">
                      {stages.map((stage) => (
                          <div
                              key={stage.id}
                              onClick={() => setSelectedStage(stage)}
                              className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                      ${selectedStage?.id === stage.id ? "border-blue-500 bg-blue-50" : "border-gray-100 hover:border-blue-200 hover:bg-gray-50"}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${selectedStage?.id === stage.id ? "bg-blue-100" : "bg-gray-100"}`}>
                                <FileText className={`w-4 h-4 ${selectedStage?.id === stage.id ? "text-blue-600" : "text-gray-400"}`} />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-800">{stage.stage_name}</p>
                                <p className="text-xs text-gray-400">{stage.required_documents?.length || 0} document(s) required</p>
                              </div>
                            </div>
                            <div className={`w-4 h-4 rounded-full border-2 ${selectedStage?.id === stage.id ? "border-blue-500 bg-blue-500" : "border-gray-300"}`} />
                          </div>
                      ))}
                    </div>
                )}

                {selectedStage && (
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 animate-fadeIn">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Required Documents</p>
                      <ul className="space-y-1">
                        {(selectedStage.required_documents || []).map((doc, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <span className="text-blue-400 mt-0.5">•</span> {doc}
                            </li>
                        ))}
                      </ul>
                    </div>
                )}

                <div className="flex justify-end pt-4">
                  <button
                      onClick={() => {
                        setFilesByDoc({});
                        setStep(2);
                      }}
                      disabled={!selectedStage}
                      className="flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
          )}

          {/* STEP 2: Upload Documents */}
          {/* DYNAMIC UPLOAD STEPS */}
          {isUploadStep && (
              <div className="space-y-5">
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">
                    Upload Document {currentDocIndex + 1} of {docSteps.length}
                  </h3>
                  <p className="text-xs text-gray-400">
                    Stage: <span className="font-semibold text-blue-600">{selectedStage?.stage_name}</span>
                  </p>
                  <p className="text-sm font-semibold text-gray-700 mt-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2">
                    📄 {docSteps[currentDocIndex]}
                  </p>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setFilesByDoc(prev => ({ ...prev, [docSteps[currentDocIndex]]: file }));
                      e.target.value = null;
                    }}
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg"
                />

                {/* Upload zone */}
                {!filesByDoc[docSteps[currentDocIndex]] ? (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all"
                    >
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm font-semibold text-gray-700">Click to upload</p>
                      <p className="text-xs text-gray-400 mt-1">PDF, PNG, JPG — max 10MB</p>
                    </div>
                ) : (
                    <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-gray-800 truncate max-w-[200px]">
                            {filesByDoc[docSteps[currentDocIndex]].name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {(filesByDoc[docSteps[currentDocIndex]].size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <button
                          onClick={() => setFilesByDoc(prev => {
                            const updated = { ...prev };
                            delete updated[docSteps[currentDocIndex]];
                            return updated;
                          })}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                )}

                <div className="flex justify-between pt-4">
                  <button
                      onClick={() => setStep(s => s - 1)}
                      className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                      onClick={() => setStep(s => s + 1)}
                      disabled={!filesByDoc[docSteps[currentDocIndex]]}
                      className="flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
          )}

        </div>


        {isReviewStep && (
            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Review & Confirm</h3>
                <p className="text-xs text-gray-400">Double-check everything before submitting — this cannot be undone</p>
              </div>


              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Selected Stage</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{selectedStage?.stage_name}</p>
                    <p className="text-xs text-gray-400">{docSteps.length} document(s)</p>
                  </div>
                </div>
              </div>


              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Documents to Submit</p>
                <div className="space-y-3">
                  {docSteps.map((doc, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500 mb-0.5">{doc}</p>
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {filesByDoc[doc]?.name || "—"}
                          </p>
                          <p className="text-xs text-gray-400">
                            {filesByDoc[doc] ? `${(filesByDoc[doc].size / 1024).toFixed(1)} KB` : ""}
                          </p>
                        </div>
                      </div>
                  ))}
                </div>
              </div>


              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 items-start">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 font-medium">
                  Once submitted, your documents will be sent for staff review. You cannot edit or retract this submission.
                </p>
              </div>

              {error && (
                  <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>
              )}

              <div className="flex justify-between pt-4">
                <button
                    onClick={() => setStep(s => s - 1)}
                    className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                >
                  {submitting
                      ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                      : "Submit"}
                </button>
              </div>
            </div>
        )}
        {isDoneStep && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
                <h3 className="font-bold text-gray-800 text-lg">Submission Successful!</h3>
                <p className="text-sm text-gray-500 max-w-sm mx-auto">
                  Your documents have been submitted for staff review.
                </p>
                <button
                    onClick={() => { setStep(1); setSelectedStage(null); setFilesByDoc({}); }}
                    className="mt-4 text-sm text-blue-600 font-semibold hover:underline"
                >
                  Submit Another Stage
                </button>
              </div>
            </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex gap-4 items-start">
          <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-800">Department clearance is pending</p>
            <p className="text-xs text-blue-600 mt-1">
              Visit the Computer Science department office with your completed forms to continue your clearance process.
            </p>
          </div>
        </div>
      </div>
  );
};