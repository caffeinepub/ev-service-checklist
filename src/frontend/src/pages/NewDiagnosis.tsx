import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Gauge,
  ListChecks,
  Wrench,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { calcStatus, detectFault, saveRecord } from "../lib/faultLogic";
import type { FaultCategoryName, ServiceRecord, TestResult } from "../types";

const VEHICLE_MODELS = [
  "Ola S1",
  "Ola S1 Pro",
  "Ather 450X",
  "TVS iQube",
  "Bajaj Chetak",
  "Hero Optima",
  "Revolt RV400",
  "Other",
];

const CATEGORY_COLORS: Record<string, string> = {
  "No Start": "bg-red-100 text-red-700 border-red-200",
  "Poor Performance": "bg-yellow-100 text-yellow-700 border-yellow-200",
  "Power Loss": "bg-red-100 text-red-700 border-red-200",
  "Charging Issue": "bg-blue-100 text-blue-700 border-blue-200",
  "Mechanical Noise": "bg-orange-100 text-orange-700 border-orange-200",
  "Brake Issue": "bg-red-100 text-red-700 border-red-200",
  "Display Issue": "bg-purple-100 text-purple-700 border-purple-200",
  "General Fault": "bg-gray-100 text-gray-700 border-gray-200",
};

function StatusBadge({ status }: { status: "ok" | "fault" | "pending" }) {
  if (status === "ok")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
        <CheckCircle2 size={11} /> OK
      </span>
    );
  if (status === "fault")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
        <AlertCircle size={11} /> Fault
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 border border-gray-200">
      <Clock size={11} /> Pending
    </span>
  );
}

export function NewDiagnosis({
  onReportSaved,
}: { onReportSaved: (record: ServiceRecord) => void }) {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [saved, setSaved] = useState(false);

  const fault =
    problemDescription.trim().length > 3
      ? detectFault(problemDescription)
      : null;

  const prevCategoryRef = useRef<string | null>(null);

  useEffect(() => {
    const currentCategory = fault?.category ?? null;
    if (currentCategory !== prevCategoryRef.current) {
      prevCategoryRef.current = currentCategory;
      if (fault) {
        setTestResults(
          fault.testParams.map((p) => ({
            parameter: p.parameter,
            expectedValue: p.expectedValue,
            actualValue: "",
            status: "pending" as const,
            unit: p.unit,
          })),
        );
        setSaved(false);
      }
    }
  });

  function updateActualValue(index: number, value: string) {
    setTestResults((prev) => {
      const next = [...prev];
      const param = fault!.testParams[index];
      next[index] = {
        ...next[index],
        actualValue: value,
        status: calcStatus(value, param),
      };
      return next;
    });
  }

  const faultedParams = testResults.filter((r) => r.status === "fault");
  const allFilled =
    testResults.length > 0 &&
    testResults.every((r) => r.actualValue.trim() !== "");
  const overallStatus: "ok" | "fault" =
    faultedParams.length > 0 ? "fault" : "ok";

  const rootCause =
    faultedParams.length > 0
      ? `Fault detected in: ${faultedParams.map((r) => r.parameter).join(", ")}`
      : allFilled
        ? "All parameters within expected range"
        : "";

  const repairItems =
    faultedParams.length > 0
      ? faultedParams.map(
          (r) =>
            `Check/replace ${r.parameter} — reading: ${r.actualValue} ${r.unit}`,
        )
      : [];

  function handleGenerateReport() {
    const record: ServiceRecord = {
      id: `rec_${Date.now()}`,
      date: new Date().toISOString(),
      vehicleNumber,
      ownerName,
      phoneNumber,
      vehicleModel,
      problemDescription,
      faultCategory: (fault?.category ?? "General Fault") as FaultCategoryName,
      checkItems: fault?.checks ?? [],
      testResults,
      rootCause,
      repairItems,
      overallStatus,
    };
    saveRecord(record);
    setSaved(true);
    onReportSaved(record);
  }

  const formValid = vehicleNumber && ownerName && phoneNumber && vehicleModel;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">New Diagnosis</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Enter vehicle details and describe the fault to begin smart diagnosis
        </p>
      </div>

      {/* Step 1 */}
      <Card data-ocid="diagnosis.form.card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
              1
            </span>
            Customer &amp; Vehicle Info
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="vehicleNumber"
                className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Vehicle Number
              </Label>
              <Input
                id="vehicleNumber"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                placeholder="e.g. MH12AB1234"
                className="mt-1"
                data-ocid="diagnosis.vehicle_number.input"
              />
            </div>
            <div>
              <Label
                htmlFor="ownerName"
                className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Owner Name
              </Label>
              <Input
                id="ownerName"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="Full name"
                className="mt-1"
                data-ocid="diagnosis.owner_name.input"
              />
            </div>
            <div>
              <Label
                htmlFor="phoneNumber"
                className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+91 98765 43210"
                className="mt-1"
                data-ocid="diagnosis.phone_number.input"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Vehicle Model
              </Label>
              <Select value={vehicleModel} onValueChange={setVehicleModel}>
                <SelectTrigger
                  className="mt-1"
                  data-ocid="diagnosis.vehicle_model.select"
                >
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {VEHICLE_MODELS.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Label
                htmlFor="problem"
                className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Problem / Fault Description
              </Label>
              <Textarea
                id="problem"
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="Describe the fault, e.g. not starting, low pickup, no power…"
                className="mt-1 resize-none"
                rows={3}
                data-ocid="diagnosis.problem.textarea"
              />
              {problemDescription.trim().length > 3 && (
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Activity size={11} /> Analysing fault…
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Steps 2–6 */}
      <AnimatePresence>
        {fault && (
          <motion.div
            key={fault.category}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Step 2 */}
            <Card data-ocid="diagnosis.fault_detection.card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  Fault Detection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">
                    Detected Category:
                  </span>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${
                      CATEGORY_COLORS[fault.category]
                    }`}
                    data-ocid="diagnosis.fault_category.badge"
                  >
                    {fault.category}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
                  3
                </span>
                <h2 className="text-base font-bold">Diagnosis Guide</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2 text-primary">
                      <ListChecks size={15} /> What to Check
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1.5">
                      {fault.checks.map((c) => (
                        <li key={c} className="flex items-center gap-2 text-sm">
                          <ChevronRight
                            size={12}
                            className="text-primary flex-shrink-0"
                          />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2 text-primary">
                      <Gauge size={15} /> Expected Values
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {fault.expectedValues.map((ev) => (
                        <li key={ev.label} className="text-xs">
                          <span className="text-muted-foreground">
                            {ev.label}:
                          </span>
                          <span className="ml-1 font-semibold text-foreground">
                            {ev.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2 text-primary">
                      <Wrench size={15} /> Tools Required
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1.5">
                      {fault.tools.map((t) => (
                        <li key={t} className="flex items-center gap-2 text-sm">
                          <ChevronRight
                            size={12}
                            className="text-primary flex-shrink-0"
                          />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Step 4 */}
            <Card data-ocid="diagnosis.test_table.card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
                    4
                  </span>
                  Live Test Readings
                </CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                        Parameter
                      </th>
                      <th className="text-left py-2 pr-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                        Expected
                      </th>
                      <th className="text-left py-2 pr-4 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                        Actual Value
                      </th>
                      <th className="text-left py-2 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {testResults.map((result, index) => (
                      <tr
                        key={result.parameter}
                        className="border-b last:border-0"
                        data-ocid={`diagnosis.test.item.${index + 1}`}
                      >
                        <td className="py-2.5 pr-4 font-medium">
                          {result.parameter}
                        </td>
                        <td className="py-2.5 pr-4 text-muted-foreground">
                          {result.expectedValue}
                        </td>
                        <td className="py-2.5 pr-4">
                          <div className="flex items-center gap-1">
                            <Input
                              value={result.actualValue}
                              onChange={(e) =>
                                updateActualValue(index, e.target.value)
                              }
                              placeholder="Enter value"
                              className="h-8 w-28 text-sm"
                              data-ocid={`diagnosis.test.input.${index + 1}`}
                            />
                            <span className="text-muted-foreground text-xs">
                              {result.unit}
                            </span>
                          </div>
                        </td>
                        <td className="py-2.5">
                          <StatusBadge status={result.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* Step 5 */}
            {allFilled && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className={`border-2 ${
                    overallStatus === "ok"
                      ? "border-green-300 bg-green-50"
                      : "border-red-300 bg-red-50"
                  }`}
                  data-ocid="diagnosis.result.card"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
                        5
                      </span>
                      Diagnosis Result
                      {overallStatus === "ok" ? (
                        <Badge
                          className="bg-green-600 text-white ml-auto"
                          data-ocid="diagnosis.result.success_state"
                        >
                          <CheckCircle2 size={12} className="mr-1" /> All OK
                        </Badge>
                      ) : (
                        <Badge
                          className="bg-red-600 text-white ml-auto"
                          data-ocid="diagnosis.result.error_state"
                        >
                          <AlertCircle size={12} className="mr-1" /> Fault Found
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Root Cause
                      </span>
                      <p className="text-sm mt-0.5 font-medium">
                        {rootCause || "—"}
                      </p>
                    </div>
                    {repairItems.length > 0 && (
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          What Needs Repair
                        </span>
                        <ul className="mt-1 space-y-1">
                          {repairItems.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-sm"
                            >
                              <AlertCircle
                                size={13}
                                className="text-red-600 mt-0.5 flex-shrink-0"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 6 */}
            {!saved ? (
              <div className="flex justify-end">
                <Button
                  onClick={handleGenerateReport}
                  disabled={!formValid || !allFilled}
                  className="flex items-center gap-2 bg-primary text-white px-6"
                  data-ocid="diagnosis.generate_report.button"
                >
                  <FileText size={15} />
                  Generate &amp; Save Report
                </Button>
              </div>
            ) : (
              <div
                className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm font-medium"
                data-ocid="diagnosis.report_saved.success_state"
              >
                <CheckCircle2 size={16} />
                Report saved! View it in the Reports or History section.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!fault && problemDescription.trim().length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-border rounded-xl"
          data-ocid="diagnosis.empty_state"
        >
          <Activity size={40} className="text-muted-foreground/40 mb-3" />
          <p className="text-muted-foreground text-sm">
            Fill in vehicle details and describe the fault above
          </p>
          <p className="text-muted-foreground/60 text-xs mt-1">
            Smart fault detection will appear automatically
          </p>
        </div>
      )}
    </div>
  );
}
