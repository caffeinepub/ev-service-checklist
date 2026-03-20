import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, CheckCircle2, Printer } from "lucide-react";
import type { ServiceRecord, TestResult } from "../types";

function StatusBadge({ status }: { status: TestResult["status"] }) {
  if (status === "ok")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
        <CheckCircle2 size={10} /> OK
      </span>
    );
  if (status === "fault")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
        <AlertCircle size={10} /> Fault
      </span>
    );
  return <span className="text-xs text-muted-foreground">—</span>;
}

export function ReportPage({
  record,
  onBack,
}: {
  record: ServiceRecord | null;
  onBack: () => void;
}) {
  if (!record) {
    return (
      <div
        className="flex flex-col items-center justify-center py-24 text-center"
        data-ocid="reports.empty_state"
      >
        <div className="text-5xl mb-4">📋</div>
        <h2 className="text-xl font-bold mb-2">No Report Yet</h2>
        <p className="text-muted-foreground text-sm">
          Complete a diagnosis to generate a report
        </p>
        <Button
          onClick={onBack}
          variant="outline"
          className="mt-6 flex items-center gap-2"
          data-ocid="reports.back.button"
        >
          <ArrowLeft size={14} /> Back to Diagnosis
        </Button>
      </div>
    );
  }

  const date = new Date(record.date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="space-y-6">
      {/* Actions bar */}
      <div
        className="flex items-center justify-between no-print"
        data-ocid="reports.actions.panel"
      >
        <div>
          <h1 className="text-2xl font-bold">Service Report</h1>
          <p className="text-muted-foreground text-sm">Generated on {date}</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2"
            data-ocid="reports.back.button"
          >
            <ArrowLeft size={14} /> Back to Diagnosis
          </Button>
          <Button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-primary text-white"
            data-ocid="reports.print.button"
          >
            <Printer size={14} /> Print Report
          </Button>
        </div>
      </div>

      {/* Report document */}
      <div
        className="bg-white rounded-xl border border-border shadow-paper p-8 space-y-8 print-container"
        data-ocid="reports.report.card"
      >
        {/* Header */}
        <div
          className="rounded-xl p-6 text-white"
          style={{
            background:
              "linear-gradient(135deg, oklch(var(--sidebar-bg)) 0%, oklch(var(--primary)) 100%)",
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">
                EV Service Pro
              </div>
              <h2 className="text-2xl font-bold">EV Service Report</h2>
              <p className="text-white/70 text-sm mt-1">{date}</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-white/60 mb-1">Overall Status</div>
              {record.overallStatus === "ok" ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 font-semibold text-sm">
                  <CheckCircle2 size={14} /> All OK
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-400/30 text-red-300 font-semibold text-sm">
                  <AlertCircle size={14} /> Fault Found
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Customer & Vehicle Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 border-b pb-2">
              Customer Details
            </h3>
            <dl className="space-y-2">
              <div className="flex justify-between text-sm">
                <dt className="text-muted-foreground">Owner Name</dt>
                <dd className="font-medium">{record.ownerName || "—"}</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-muted-foreground">Phone Number</dt>
                <dd className="font-medium">{record.phoneNumber || "—"}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 border-b pb-2">
              Vehicle Details
            </h3>
            <dl className="space-y-2">
              <div className="flex justify-between text-sm">
                <dt className="text-muted-foreground">Vehicle Number</dt>
                <dd className="font-medium">{record.vehicleNumber || "—"}</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-muted-foreground">Vehicle Model</dt>
                <dd className="font-medium">{record.vehicleModel || "—"}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Problem & Fault */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 border-b pb-2">
            Problem Description
          </h3>
          <p className="text-sm">{record.problemDescription || "—"}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Detected Fault Category:
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              {record.faultCategory}
            </span>
          </div>
        </div>

        {/* Test Results */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 border-b pb-2">
            Test Results
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 rounded">
                  <th className="text-left p-2 font-semibold text-xs">
                    Parameter
                  </th>
                  <th className="text-left p-2 font-semibold text-xs">
                    Expected
                  </th>
                  <th className="text-left p-2 font-semibold text-xs">
                    Actual
                  </th>
                  <th className="text-left p-2 font-semibold text-xs">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {record.testResults.map((r, i) => (
                  <tr
                    key={r.parameter}
                    className="border-b"
                    data-ocid={`reports.result.item.${i + 1}`}
                  >
                    <td className="p-2 font-medium">{r.parameter}</td>
                    <td className="p-2 text-muted-foreground">
                      {r.expectedValue}
                    </td>
                    <td className="p-2">
                      {r.actualValue || "—"} {r.actualValue ? r.unit : ""}
                    </td>
                    <td className="p-2">
                      <StatusBadge status={r.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Final Diagnosis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 border-b pb-2">
              Final Diagnosis
            </h3>
            <p className="text-sm">
              {record.rootCause || "No diagnosis recorded"}
            </p>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 border-b pb-2">
              Recommended Solution
            </h3>
            {record.repairItems.length > 0 ? (
              <ul className="space-y-1">
                {record.repairItems.map((item) => (
                  <li key={item} className="text-sm flex items-start gap-2">
                    <AlertCircle
                      size={13}
                      className="text-red-600 mt-0.5 flex-shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No repairs required — all parameters OK
              </p>
            )}
          </div>
        </div>

        {/* Signature */}
        <div className="flex justify-between items-end pt-4 border-t">
          <div>
            <div className="w-48 h-12 border-b-2 border-foreground/30 mb-1" />
            <p className="text-xs text-muted-foreground">
              Technician Signature
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">
              Report ID: {record.id}
            </div>
          </div>
        </div>
      </div>

      {/* Caffeine footer */}
      <div className="text-xs text-muted-foreground text-center pb-4 no-print">
        © {new Date().getFullYear()}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          caffeine.ai
        </a>
      </div>
    </div>
  );
}
