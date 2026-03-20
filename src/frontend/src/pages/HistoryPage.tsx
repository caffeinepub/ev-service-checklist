import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  PlusCircle,
  Search,
} from "lucide-react";
import { useState } from "react";
import { loadRecords } from "../lib/faultLogic";
import type { Page, ServiceRecord } from "../types";

function StatusBadge({ status }: { status: "ok" | "fault" }) {
  if (status === "ok")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
        <CheckCircle2 size={10} /> All OK
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
      <AlertCircle size={10} /> Fault Found
    </span>
  );
}

export function HistoryPage({
  onNavigate,
  onViewRecord,
}: {
  onNavigate: (page: Page) => void;
  onViewRecord: (record: ServiceRecord) => void;
}) {
  const [search, setSearch] = useState("");
  const records = loadRecords();

  const filtered = records.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.vehicleNumber.toLowerCase().includes(q) ||
      r.phoneNumber.toLowerCase().includes(q) ||
      r.ownerName.toLowerCase().includes(q)
    );
  });

  function handleRowSelect(record: ServiceRecord) {
    onViewRecord(record);
    onNavigate("reports");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Service History</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {records.length} record{records.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <Button
          onClick={() => onNavigate("diagnosis")}
          className="flex items-center gap-2 bg-primary text-white"
          data-ocid="history.new_diagnosis.button"
        >
          <PlusCircle size={14} /> New Diagnosis
        </Button>
      </div>

      <div className="relative">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by phone number, vehicle number, or owner name…"
          className="pl-9"
          data-ocid="history.search.input"
        />
      </div>

      {filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border rounded-xl"
          data-ocid="history.empty_state"
        >
          <div className="text-4xl mb-3">🔍</div>
          {records.length === 0 ? (
            <>
              <p className="font-semibold">No service records yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Start a new diagnosis to create your first record
              </p>
              <Button
                onClick={() => onNavigate("diagnosis")}
                variant="outline"
                className="mt-4 flex items-center gap-2"
                data-ocid="history.start_diagnosis.button"
              >
                <PlusCircle size={14} /> Start Diagnosis
              </Button>
            </>
          ) : (
            <p className="text-muted-foreground text-sm">
              No records match your search
            </p>
          )}
        </div>
      ) : (
        <div
          className="bg-white rounded-xl border border-border overflow-hidden shadow-xs"
          data-ocid="history.table"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b">
                  <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground">
                    Date
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground">
                    Vehicle No.
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground">
                    Owner
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground">
                    Model
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground">
                    Fault Category
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide text-muted-foreground" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((record, index) => (
                  <tr
                    key={record.id}
                    className="border-b last:border-0 hover:bg-muted/30 cursor-pointer transition-colors"
                    onClick={() => handleRowSelect(record)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        handleRowSelect(record);
                    }}
                    tabIndex={0}
                    data-ocid={`history.record.item.${index + 1}`}
                  >
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(record.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 font-mono font-medium">
                      {record.vehicleNumber}
                    </td>
                    <td className="px-4 py-3">{record.ownerName}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {record.vehicleModel}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {record.faultCategory}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={record.overallStatus} />
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs flex items-center gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowSelect(record);
                        }}
                        data-ocid={`history.view_report.button.${index + 1}`}
                      >
                        <FileText size={12} /> View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
