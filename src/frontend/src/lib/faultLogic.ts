import type { FaultCategoryName, TestParam } from "../types";

interface FaultDef {
  keywords: string[];
  category: FaultCategoryName;
  checks: string[];
  expectedValues: { label: string; value: string }[];
  testParams: TestParam[];
  tools: string[];
}

export const FAULT_DEFS: FaultDef[] = [
  {
    keywords: [
      "not starting",
      "won't start",
      "wont start",
      "dead",
      "no start",
      "not start",
      "doesnt start",
      "doesn't start",
    ],
    category: "No Start",
    checks: ["Battery", "BMS", "Controller", "Ignition Switch", "Main Fuse"],
    expectedValues: [
      { label: "Battery voltage (full charge)", value: "48V–72V" },
      { label: "Controller input voltage", value: "≥ 42V" },
      { label: "Key switch voltage", value: "12V" },
      { label: "BMS output voltage", value: "Same as battery pack" },
    ],
    testParams: [
      {
        parameter: "Battery Voltage",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
      {
        parameter: "Controller Input Voltage",
        expectedValue: "≥ 42 V",
        expectedMin: 42,
        expectedMax: 80,
        unit: "V",
      },
      {
        parameter: "BMS Output Voltage",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
      {
        parameter: "Key Switch Voltage",
        expectedValue: "11–13 V",
        expectedMin: 11,
        expectedMax: 13,
        unit: "V",
      },
    ],
    tools: ["Multimeter", "Clamp Meter", "Diagnostic Scanner"],
  },
  {
    keywords: [
      "low pickup",
      "low speed",
      "slow",
      "no acceleration",
      "weak",
      "sluggish",
      "poor pickup",
    ],
    category: "Poor Performance",
    checks: ["Motor", "Throttle", "Controller", "Battery Charge Level"],
    expectedValues: [
      { label: "Battery voltage", value: "48V–72V" },
      { label: "Throttle signal", value: "0.8V – 4.2V" },
      { label: "Phase current (normal)", value: "< 30A" },
      { label: "Motor RPM (no load)", value: "2000–4000 RPM" },
    ],
    testParams: [
      {
        parameter: "Battery Voltage",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
      {
        parameter: "Throttle Signal Voltage",
        expectedValue: "0.8–4.2 V",
        expectedMin: 0.8,
        expectedMax: 4.2,
        unit: "V",
      },
      {
        parameter: "Phase Current",
        expectedValue: "< 30 A",
        expectedMin: 0,
        expectedMax: 30,
        unit: "A",
      },
      {
        parameter: "Motor RPM (Estimated)",
        expectedValue: "2000–4000 RPM",
        expectedMin: 2000,
        expectedMax: 4000,
        unit: "RPM",
      },
    ],
    tools: ["Multimeter", "Clamp Meter", "Diagnostic Scanner"],
  },
  {
    keywords: [
      "no power",
      "power off",
      "shutdown",
      "turns off",
      "cuts off",
      "switching off",
      "shuts down",
    ],
    category: "Power Loss",
    checks: ["Battery", "BMS", "Main Fuse", "Wiring", "Main Switch"],
    expectedValues: [
      { label: "Battery voltage", value: "48V–72V" },
      { label: "BMS output", value: "Matches battery pack" },
      { label: "Fuse continuity", value: "0 Ω (intact)" },
      { label: "Main switch voltage", value: "12V when ON" },
    ],
    testParams: [
      {
        parameter: "Battery Voltage",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
      {
        parameter: "Fuse Continuity (Ω)",
        expectedValue: "0–1 Ω",
        expectedMin: 0,
        expectedMax: 1,
        unit: "Ω",
      },
      {
        parameter: "BMS Output Voltage",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
      {
        parameter: "Main Switch Voltage",
        expectedValue: "11–13 V",
        expectedMin: 11,
        expectedMax: 13,
        unit: "V",
      },
    ],
    tools: ["Multimeter", "Clamp Meter", "Diagnostic Scanner"],
  },
  {
    keywords: [
      "charging",
      "not charging",
      "won't charge",
      "wont charge",
      "no charge",
      "charger",
    ],
    category: "Charging Issue",
    checks: ["Charger Unit", "Charging Port", "BMS", "Battery Cells"],
    expectedValues: [
      { label: "Charger output voltage", value: "54V–84V" },
      { label: "Charging current", value: "5–15A" },
      { label: "Port resistance", value: "< 0.5Ω" },
      { label: "Battery input voltage", value: "Accepts charge V" },
    ],
    testParams: [
      {
        parameter: "Charger Output Voltage",
        expectedValue: "54–84 V",
        expectedMin: 54,
        expectedMax: 84,
        unit: "V",
      },
      {
        parameter: "Battery Input Voltage",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
      {
        parameter: "Charging Current",
        expectedValue: "5–15 A",
        expectedMin: 5,
        expectedMax: 15,
        unit: "A",
      },
      {
        parameter: "Port Resistance",
        expectedValue: "< 0.5 Ω",
        expectedMin: 0,
        expectedMax: 0.5,
        unit: "Ω",
      },
    ],
    tools: ["Multimeter", "Clamp Meter", "Diagnostic Scanner"],
  },
  {
    keywords: [
      "noise",
      "sound",
      "vibration",
      "rattle",
      "grinding",
      "squeaking",
      "clunking",
    ],
    category: "Mechanical Noise",
    checks: ["Motor Bearings", "Wheel Hub", "Chain/Belt Drive", "Suspension"],
    expectedValues: [
      { label: "Motor bearing play", value: "0 mm (no play)" },
      { label: "Wheel runout", value: "< 1mm" },
      { label: "Chain tension", value: "10–15mm slack" },
    ],
    testParams: [
      {
        parameter: "Battery Voltage",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
      {
        parameter: "Motor Voltage",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
      {
        parameter: "Controller Output",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
      {
        parameter: "Throttle Signal",
        expectedValue: "0.8–4.2 V",
        expectedMin: 0.8,
        expectedMax: 4.2,
        unit: "V",
      },
    ],
    tools: ["Multimeter", "Clamp Meter", "Diagnostic Scanner"],
  },
  {
    keywords: [
      "brake",
      "braking",
      "brake fail",
      "no brakes",
      "brake not working",
    ],
    category: "Brake Issue",
    checks: [
      "Brake Pads",
      "Brake Fluid Level",
      "Brake Cut-off Switch",
      "Brake Cable",
    ],
    expectedValues: [
      { label: "Brake pad thickness", value: "≥ 3mm" },
      { label: "Brake cut-off signal", value: "0V (when pressed)" },
      { label: "Brake fluid level", value: "Between MIN-MAX" },
    ],
    testParams: [
      {
        parameter: "Battery Voltage",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
      {
        parameter: "Brake Cut-off Signal",
        expectedValue: "0–1 V",
        expectedMin: 0,
        expectedMax: 1,
        unit: "V",
      },
      {
        parameter: "Controller Output",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
      {
        parameter: "Throttle Signal",
        expectedValue: "0.8–4.2 V",
        expectedMin: 0.8,
        expectedMax: 4.2,
        unit: "V",
      },
    ],
    tools: ["Multimeter", "Clamp Meter", "Diagnostic Scanner"],
  },
  {
    keywords: [
      "display",
      "screen",
      "meter",
      "dashboard",
      "cluster",
      "indicator",
    ],
    category: "Display Issue",
    checks: [
      "Display Unit",
      "Wiring Harness",
      "Connectors",
      "Instrument Cluster",
    ],
    expectedValues: [
      { label: "Display supply voltage", value: "12V" },
      { label: "CAN bus voltage", value: "2.5V (both lines)" },
      { label: "Wiring harness resistance", value: "< 1 Ω" },
    ],
    testParams: [
      {
        parameter: "Battery Voltage",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
      {
        parameter: "Display Supply Voltage",
        expectedValue: "11–13 V",
        expectedMin: 11,
        expectedMax: 13,
        unit: "V",
      },
      {
        parameter: "Controller Output",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
      {
        parameter: "Throttle Signal",
        expectedValue: "0.8–4.2 V",
        expectedMin: 0.8,
        expectedMax: 4.2,
        unit: "V",
      },
    ],
    tools: ["Multimeter", "Clamp Meter", "Diagnostic Scanner"],
  },
];

const DEFAULT_FAULT: FaultDef = {
  keywords: [],
  category: "General Fault",
  checks: ["Battery", "Motor", "Controller", "Wiring"],
  expectedValues: [
    { label: "Battery voltage", value: "48V–72V" },
    { label: "Motor voltage", value: "48V–72V" },
    { label: "Controller output", value: "48V–72V" },
    { label: "Throttle signal", value: "0.8V – 4.2V" },
  ],
  testParams: [
    {
      parameter: "Battery Voltage",
      expectedValue: "48–72 V",
      expectedMin: 48,
      expectedMax: 72,
      unit: "V",
    },
    {
      parameter: "Motor Voltage",
      expectedValue: "48–72 V",
      expectedMin: 48,
      expectedMax: 72,
      unit: "V",
    },
    {
      parameter: "Controller Output",
      expectedValue: "48–72 V",
      expectedMin: 48,
      expectedMax: 72,
      unit: "V",
    },
    {
      parameter: "Throttle Signal",
      expectedValue: "0.8–4.2 V",
      expectedMin: 0.8,
      expectedMax: 4.2,
      unit: "V",
    },
  ],
  tools: ["Multimeter", "Clamp Meter", "Diagnostic Scanner"],
};

export function detectFault(description: string): FaultDef {
  const lower = description.toLowerCase();
  for (const def of FAULT_DEFS) {
    if (def.keywords.some((kw) => lower.includes(kw))) {
      return def;
    }
  }
  return DEFAULT_FAULT;
}

export function calcStatus(
  actualValue: string,
  param: TestParam,
): "ok" | "fault" | "pending" {
  if (!actualValue.trim()) return "pending";
  const num = Number.parseFloat(actualValue);
  if (Number.isNaN(num)) return "pending";
  const inRange =
    num >= param.expectedMin - param.expectedMin * 0.05 &&
    num <= param.expectedMax + param.expectedMax * 0.05;
  return inRange ? "ok" : "fault";
}

export const STORAGE_KEY = "ev_service_records";

export function loadRecords(): import("../types").ServiceRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveRecord(record: import("../types").ServiceRecord): void {
  const records = loadRecords();
  const idx = records.findIndex((r) => r.id === record.id);
  if (idx >= 0) {
    records[idx] = record;
  } else {
    records.unshift(record);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}
