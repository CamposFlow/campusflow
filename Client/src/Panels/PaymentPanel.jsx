import SectionHeader from "../components/SectionHeader.jsx";
import { ShieldCheck, Hash } from "lucide-react";

export const PaymentsPanel = ({ payment }) => {
  return (
    <div className="panel-landing">
      <SectionHeader
        title="Payment Records"
        sub="Blockchain-verified payment transactions"
      />
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex gap-4 items-start mb-8">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          All transactions are{" "}
          <span className="font-semibold">
            hashed and stored on the blockchain
          </span>
          . Payment records cannot be altered or deleted.
        </p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-gray-900 mb-5 text-sm uppercase tracking-wide">
          Transaction History
        </h3>
        <div className="space-y-4">
          {payment.map((t, i) => (
            <div
              key={i}
              className="border border-gray-100 rounded-xl p-5 hover:border-blue-200 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {t.desc}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{t.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{t.amount}</p>
                  <span className="text-[11px] font-semibold text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                    {t.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                <Hash className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <code className="text-[11px] text-gray-500 font-mono truncate">
                  {t.hash}
                </code>
                <span className="text-[10px] text-blue-500 ml-auto cursor-pointer group-hover:underline">
                  Verify
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
