import type { FaultCategoryName, TestParam } from "../types";

interface FaultDef {
  keywords: string[];
  category: FaultCategoryName;
  checks: string[];
  expectedValues: { label: string; value: string }[];
  testParams: TestParam[];
  tools: string[];
  rootCause?: string;
  repairSteps?: string[];
}

export const FAULT_DEFS: FaultDef[] = [
  // ─── CHARGING PORT FAULT (high-priority, before general charging) ──────────
  {
    keywords: [
      "port burn",
      "port melting",
      "port damage",
      "charger pin",
      "pin burn",
      "connector melting",
      "charging only when pressed",
      "loose port",
      "charging port",

      "charging port damage",
      "port damaged",
      "port fault",
      "charger port",
    ],
    category: "Charging Port Fault",
    checks: [
      "Charging Port Pins",
      "Port Temperature During Charging",
      "Port Resistance",
      "Connector Lock Mechanism",
      "Earthing / Ground Connection",
    ],
    expectedValues: [
      { label: "Port pin resistance", value: "< 0.1 Ω" },
      { label: "Port temp during charging", value: "< 60°C" },
      { label: "Charger output voltage", value: "54–84V" },
      { label: "Earthing resistance", value: "< 1 Ω" },
    ],
    testParams: [
      {
        parameter: "Port Pin Resistance",
        expectedValue: "< 0.1 Ω",
        expectedMin: 0,
        expectedMax: 0.1,
        unit: "Ω",
      },
      {
        parameter: "Port Temperature",
        expectedValue: "< 60 °C",
        expectedMin: 0,
        expectedMax: 60,
        unit: "°C",
      },
      {
        parameter: "Charger Output Voltage",
        expectedValue: "54–84 V",
        expectedMin: 54,
        expectedMax: 84,
        unit: "V",
      },
      {
        parameter: "Ground Resistance",
        expectedValue: "< 1 Ω",
        expectedMin: 0,
        expectedMax: 1,
        unit: "Ω",
      },
    ],
    tools: ["Multimeter", "Infrared Thermometer", "Contact Cleaner"],
    rootCause:
      "Burnt port pins due to high resistance, reverse polarity damage, missing earth ground, or poor connector contact.",
    repairSteps: [
      "Inspect port pins for burn marks or melting",
      "Measure pin resistance — replace port if > 0.1Ω",
      "Check and secure ground connection",
      "Replace charging port assembly",
      "Verify charger polarity before reconnecting",
    ],
  },

  // ─── NO START ─────────────────────────────────────────────────────────────
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

      "battery dead",
      "battery not starting",
      "no battery output",
      "fuse blown battery",
      "ignition not working",
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
    rootCause:
      "Possible dead battery, blown fuse, BMS cut-off, or faulty ignition switch.",
    repairSteps: [
      "Check and charge battery",
      "Test and replace blown fuse",
      "Inspect BMS status LED",
      "Verify ignition switch continuity",
    ],
  },

  // ─── POOR PERFORMANCE ─────────────────────────────────────────────────────
  {
    keywords: [
      "low pickup",
      "low speed",
      "slow",
      "no acceleration",
      "weak",
      "sluggish",
      "poor pickup",

      "low torque",
      "speed limit issue",
      "limited speed",
      "partial acceleration",
      "slow acceleration",
      "weak pull",
      "no pulling power",
      "torque loss",
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
    rootCause:
      "Low battery state of charge, worn throttle sensor, controller current limit active, or motor winding degradation.",
    repairSteps: [
      "Fully charge battery",
      "Test throttle sensor output",
      "Check controller current settings",
      "Inspect motor phase wires",
    ],
  },

  // ─── POWER LOSS ───────────────────────────────────────────────────────────
  {
    keywords: [
      "no power",
      "power off",
      "shutdown",
      "turns off",
      "cuts off",
      "switching off",
      "shuts down",

      "cut while riding",
      "sudden motor stop",
      "sudden cutoff",
      "sudden stop",
      "power cut",
      "power cuts",
      "cuts while riding",
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
    rootCause:
      "BMS over-discharge protection triggered, blown main fuse, or wiring short circuit.",
    repairSteps: [
      "Check BMS fault LED",
      "Replace blown fuse",
      "Inspect main harness for shorts",
      "Test main switch contacts",
    ],
  },

  // ─── CHARGING ISSUE ───────────────────────────────────────────────────────
  {
    keywords: [
      "charging",
      "not charging",
      "won't charge",
      "wont charge",
      "no charge",
      "charger",

      "battery not charging",
      "slow charging",
      "charger not working",
      "low charger output",
      "overvoltage charger",
      "charger output low",
      "charger faulty",
      "charging cable cut",
      "charger cable cut",
      "overcharging",
      "overcharge",
      "charging stops midway",
      "charging stops halfway",
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
    rootCause:
      "Defective charger, corroded charging port, BMS over-voltage protection, or damaged battery cells.",
    repairSteps: [
      "Test charger output voltage",
      "Clean or replace charging port",
      "Reset BMS",
      "Check individual cell voltages",
    ],
  },

  // ─── CELL IMBALANCE ───────────────────────────────────────────────────────
  {
    keywords: [
      "cell imbalance",
      "cell weak",
      "one cell",
      "cell low",
      "unbalanced",
      "cell voltage",
      "cell difference",
      "range drop",
      "soc mismatch",
      "30% cutoff",
      "40% cutoff",
      "shuts at 30",
      "shuts at 40",
      "battery swelling",
      "battery swell",

      "reverse polarity",
      "internal fuse",
      "battery leakage",
      "battery leak",
      "battery drip",
      "battery smell",
      "fast drain",
      "fast battery drain",
    ],
    category: "Cell Imbalance",
    checks: [
      "Individual Cell Voltages",
      "Cell Voltage Delta (Max-Min)",
      "BMS Balance Circuit",
      "Weak Cell Group Under Load",
      "SOC Indicator Accuracy",
    ],
    expectedValues: [
      { label: "Cell voltage (Li-Ion)", value: "3.0V–4.2V per cell" },
      { label: "Cell voltage delta (max-min)", value: "< 50mV" },
      { label: "Pack voltage (48V system)", value: "43.2V–50.4V" },
      { label: "Weak cell under load drop", value: "< 200mV drop" },
    ],
    testParams: [
      {
        parameter: "Highest Cell Voltage",
        expectedValue: "3.0–4.2 V",
        expectedMin: 3.0,
        expectedMax: 4.2,
        unit: "V",
      },
      {
        parameter: "Lowest Cell Voltage",
        expectedValue: "3.0–4.2 V",
        expectedMin: 3.0,
        expectedMax: 4.2,
        unit: "V",
      },
      {
        parameter: "Cell Delta (Max-Min)",
        expectedValue: "< 0.05 V",
        expectedMin: 0,
        expectedMax: 0.05,
        unit: "V",
      },
      {
        parameter: "Pack Voltage",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
    ],
    tools: ["Multimeter", "Battery Cell Tester", "BMS Diagnostic Tool"],
    rootCause:
      "One or more weak/aged cells pulling down pack voltage, causing BMS under-voltage protection to cut off prematurely at 30–40% SOC.",
    repairSteps: [
      "Measure all individual cell group voltages",
      "Identify cells below 3.0V or with delta > 50mV",
      "Perform balance charging cycle if BMS supports it",
      "Replace weak cell groups",
      "Recalibrate SOC after battery service",
    ],
  },

  // ─── PRE-CHARGE FAULT ─────────────────────────────────────────────────────
  {
    keywords: [
      "pre-charge",
      "precharge",
      "pre charge",
      "relay stuck",
      "relay click",
      "relay no output",
      "battery relay",
      "main relay",
      "relay fault",
      "contactor",
      "inrush",
    ],
    category: "Pre-Charge Fault",
    checks: [
      "Pre-charge Resistor",
      "Main Contactor / Relay",
      "Pre-charge Timer Circuit",
      "Controller Capacitor Bank",
      "BMS Output Relay",
    ],
    expectedValues: [
      { label: "Pre-charge resistor", value: "10–100 Ω (OEM spec)" },
      { label: "Capacitor charge time", value: "0.5–2 seconds" },
      { label: "Relay coil resistance", value: "50–200 Ω" },
      { label: "Relay output after pre-charge", value: "= Pack voltage" },
    ],
    testParams: [
      {
        parameter: "Pre-charge Resistor",
        expectedValue: "10–100 Ω",
        expectedMin: 10,
        expectedMax: 100,
        unit: "Ω",
      },
      {
        parameter: "Relay Coil Resistance",
        expectedValue: "50–200 Ω",
        expectedMin: 50,
        expectedMax: 200,
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
        parameter: "Controller Input Voltage",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
    ],
    tools: ["Multimeter", "Oscilloscope"],
    rootCause:
      "Failed pre-charge resistor, stuck relay (open or closed), or failed controller capacitor.",
    repairSteps: [
      "Check relay clicks and output voltage",
      "Measure pre-charge resistor value",
      "Verify controller receives full voltage after relay closes",
      "Replace pre-charge resistor or relay as needed",
    ],
  },

  // ─── HALL SENSOR FAULT ────────────────────────────────────────────────────
  {
    keywords: [
      "hall sensor",
      "hall fault",
      "hall error",
      "hall signal",
      "position sensor",
      "motor cogging",
      "cogging",
      "motor jerk startup",
      "motor reverse",
      "runs reverse",
      "wrong direction",

      "sensor fault",
      "hall brake sensor",
      "sensor not working",
      "hall signal missing",
      "sensor failure",
      "sensor error",
    ],
    category: "Hall Sensor Fault",
    checks: [
      "Hall Sensor Supply Voltage (5V)",
      "Hall Sensor Signal A/B/C",
      "Hall Sensor Wiring Order",
      "Hall Sensor Magnet Alignment",
      "Controller Hall Input",
    ],
    expectedValues: [
      { label: "Hall supply voltage", value: "4.8–5.2V" },
      { label: "Hall signal HIGH", value: "4.5–5.0V" },
      { label: "Hall signal LOW", value: "0–0.5V" },
      { label: "Signal sequence (A→B→C)", value: "120° phase apart" },
    ],
    testParams: [
      {
        parameter: "Hall Supply Voltage",
        expectedValue: "4.8–5.2 V",
        expectedMin: 4.8,
        expectedMax: 5.2,
        unit: "V",
      },
      {
        parameter: "Hall Signal A (High)",
        expectedValue: "4.5–5.0 V",
        expectedMin: 4.5,
        expectedMax: 5.0,
        unit: "V",
      },
      {
        parameter: "Hall Signal B (High)",
        expectedValue: "4.5–5.0 V",
        expectedMin: 4.5,
        expectedMax: 5.0,
        unit: "V",
      },
      {
        parameter: "Hall Signal C (High)",
        expectedValue: "4.5–5.0 V",
        expectedMin: 4.5,
        expectedMax: 5.0,
        unit: "V",
      },
    ],
    tools: ["Multimeter", "Oscilloscope", "Diagnostic Scanner"],
    rootCause:
      "Failed hall sensor, broken or swapped hall wiring, or no 5V supply to hall sensors.",
    repairSteps: [
      "Verify 5V supply to all three hall sensors",
      "Rotate wheel slowly and check each signal transitions between 0V and 5V",
      "If one signal is stuck, replace that hall sensor",
      "Check wiring order — swapped A/B/C wires cause reverse rotation",
      "Replace hall sensor board if all three are dead",
    ],
  },

  // ─── REGEN BRAKING FAULT ──────────────────────────────────────────────────
  {
    keywords: [
      "regen",
      "regenerative braking",
      "regen braking",
      "regen not working",
      "regen too aggressive",
      "regen strong",
      "engine braking",
      "coasting",
      "braking too hard",
    ],
    category: "Regen Braking Fault",
    checks: [
      "Controller Regen Settings",
      "Battery State of Charge (SOC)",
      "BMS Charge Protection",
      "Brake Signal Input to Controller",
      "Motor Phase Current During Regen",
    ],
    expectedValues: [
      { label: "Battery voltage (regen limit)", value: "< max charge voltage" },
      { label: "Regen current", value: "5–15A (OEM spec)" },
      { label: "Brake signal (during regen)", value: "0–1V" },
      { label: "BMS charge current limit", value: "Per BMS spec" },
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
        parameter: "Brake Signal Voltage",
        expectedValue: "0–1 V",
        expectedMin: 0,
        expectedMax: 1,
        unit: "V",
      },
      {
        parameter: "Phase Current (Regen)",
        expectedValue: "5–15 A",
        expectedMin: 0,
        expectedMax: 15,
        unit: "A",
      },
      {
        parameter: "Controller 5V Ref",
        expectedValue: "4.8–5.2 V",
        expectedMin: 4.8,
        expectedMax: 5.2,
        unit: "V",
      },
    ],
    tools: ["Multimeter", "Clamp Meter", "Diagnostic Scanner"],
    rootCause:
      "Regen disabled in controller settings, battery at full charge (BMS blocks regen), or brake signal not reaching controller.",
    repairSteps: [
      "Check controller regen parameter setting (enable if disabled)",
      "Ensure battery is not at 100% SOC (regen inhibited when full)",
      "Test brake signal reaches controller when lever is pulled",
      "Reduce regen strength setting if too aggressive",
    ],
  },

  // ─── WATER DAMAGE ─────────────────────────────────────────────────────────
  {
    keywords: [
      "water",
      "rain",
      "wet",
      "water damage",
      "flood",
      "after rain",
      "moisture",
      "water entry",
      "corrosion",
      "green corrosion",
      "oxidation",
      "rust",
      "intermittent fault",
      "works sometimes",
      "fault after rain",

      "moisture inside",
      "moisture in display",
      "water in motor",
      "water damaged controller",
      "corroded",
      "water damage wiring",
    ],
    category: "Water Damage",
    checks: [
      "Controller Moisture / Corrosion",
      "Motor Winding Insulation",
      "Connector Corrosion (Green Oxidation)",
      "Wiring Insulation Resistance",
      "Display / Dashboard Moisture",
      "Battery Pack IP Rating & Seals",
    ],
    expectedValues: [
      { label: "Insulation resistance (wiring)", value: "> 1 MΩ" },
      { label: "Phase insulation (motor to GND)", value: "> 1 MΩ" },
      { label: "Connector resistance", value: "< 0.5 Ω" },
      { label: "Battery voltage", value: "48–72V" },
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
        parameter: "Controller Supply Voltage",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
      {
        parameter: "Ground Resistance",
        expectedValue: "< 1 Ω",
        expectedMin: 0,
        expectedMax: 1,
        unit: "Ω",
      },
      {
        parameter: "Connector Resistance",
        expectedValue: "< 0.5 Ω",
        expectedMin: 0,
        expectedMax: 0.5,
        unit: "Ω",
      },
    ],
    tools: [
      "Multimeter",
      "Insulation Resistance Tester (Megger)",
      "Contact Cleaner",
      "Corrosion Inhibitor Spray",
    ],
    rootCause:
      "Water ingress causing corrosion, short circuits, insulation breakdown, or sensor reading errors. Intermittent faults worsen over time if untreated.",
    repairSteps: [
      "Visually inspect all connectors for green corrosion",
      "Clean connectors with contact cleaner and dry thoroughly",
      "Test insulation resistance on all phase wires",
      "Check controller PCB for moisture — dry with heat gun (low setting)",
      "Apply dielectric grease to all connectors after cleaning",
      "Replace any corroded connectors or harness sections",
    ],
  },

  // ─── WIRING / CONNECTOR FAULT ─────────────────────────────────────────────
  {
    keywords: [
      "loose wiring",
      "wiring fault",
      "loose connector",
      "connector fault",
      "loose connection",
      "random reset",
      "grounding issue",
      "ground fault",
      "fuse blown",
      "crimp loose",
      "internal wire break",
      "harness fault",

      "loose wire",
      "open circuit",
      "short circuit",
      "burnt wire",
      "insulation damage",
      "corroded pin",
      "harness damage",
      "repeated fuse blow",
      "repeated fuse blowing",
      "voltage drop wire",
      "wire overheating",
      "loose ground",
      "broken pin",
      "signal wire cut",
      "ignition wire fault",
      "ignition wire",
      "lighting wire fault",
      "charger wire cut",
      "controller wiring loose",
      "wire break",
      "wire fault",
      "loose terminal",
      "terminal loose",
      "tighten terminal",
    ],
    category: "Wiring / Connector Fault",
    checks: [
      "Main Harness Continuity",
      "Ground Connection at Frame",
      "All Connector Pin Fits",
      "Fuse (Visual + Continuity)",
      "Crimp Quality on Critical Wires",
    ],
    expectedValues: [
      { label: "Wire continuity", value: "< 1 Ω" },
      { label: "Ground resistance", value: "< 0.5 Ω" },
      { label: "Fuse continuity", value: "0 Ω" },
      { label: "Connector pin resistance", value: "< 0.2 Ω" },
    ],
    testParams: [
      {
        parameter: "Fuse Continuity",
        expectedValue: "0–0.5 Ω",
        expectedMin: 0,
        expectedMax: 0.5,
        unit: "Ω",
      },
      {
        parameter: "Ground Resistance",
        expectedValue: "< 0.5 Ω",
        expectedMin: 0,
        expectedMax: 0.5,
        unit: "Ω",
      },
      {
        parameter: "Main Harness Continuity",
        expectedValue: "< 1 Ω",
        expectedMin: 0,
        expectedMax: 1,
        unit: "Ω",
      },
      {
        parameter: "Battery Voltage",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
    ],
    tools: ["Multimeter", "Wiring Probe Set", "Connector Extraction Tool"],
    rootCause:
      "Loose crimp, internal wire break (continuity OK at rest but open under vibration), bad ground causing random resets, or visually intact fuse that is internally open.",
    repairSteps: [
      "Test fuse continuity — replace even if visually intact",
      "Wiggle harness while monitoring voltage to find intermittent break",
      "Check ground strap from battery negative to frame",
      "Re-crimp or replace suspect connectors",
      "Apply dielectric grease and re-seat all connectors",
    ],
  },

  // ─── MECHANICAL NOISE ─────────────────────────────────────────────────────
  {
    keywords: [
      "noise",
      "sound",
      "vibration",
      "rattle",
      "grinding",
      "squeaking",
      "clunking",

      "bearing noise",
      "motor noise",
      "motor vibration",
      "suspension fault",
      "suspension problem",
      "dragging wheel",
      "wheel drag",
      "hard rotation",
      "disc rubbing",
      "brake drag",
      "loose motor mounting",
      "motor mounting vibration",
      "belt slip",
      "belt slipping",
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
    tools: ["Multimeter", "Clamp Meter", "Bearing Puller", "Torque Wrench"],
    rootCause:
      "Worn motor bearings, loose wheel hub bolts, slack chain/belt, or damaged suspension components.",
    repairSteps: [
      "Inspect motor bearings for play",
      "Check hub bolt torque",
      "Adjust or replace chain/belt",
      "Inspect suspension joints",
    ],
  },

  // ─── BRAKE ISSUE ──────────────────────────────────────────────────────────
  {
    keywords: [
      "brake",
      "braking",
      "brake fail",
      "no brakes",
      "brake not working",
      "brake sensor",
      "brake stuck",
      "brake signal stuck",
      "won't accelerate",
      "cant accelerate",

      "brake failure",
      "weak brake",
      "brake fault",
      "brake problem",
    ],
    category: "Brake Issue",
    checks: [
      "Brake Pads",
      "Brake Fluid Level",
      "Brake Cut-off Switch",
      "Brake Cable",
      "Brake Sensor Alignment",
    ],
    expectedValues: [
      { label: "Brake pad thickness", value: "≥ 3mm" },
      { label: "Brake cut-off signal (released)", value: "4.5–5V" },
      { label: "Brake cut-off signal (pressed)", value: "0V" },
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
        parameter: "Brake Cut-off Signal (Released)",
        expectedValue: "4.5–5 V",
        expectedMin: 4.5,
        expectedMax: 5.0,
        unit: "V",
      },
      {
        parameter: "Brake Cut-off Signal (Pressed)",
        expectedValue: "0–0.5 V",
        expectedMin: 0,
        expectedMax: 0.5,
        unit: "V",
      },
      {
        parameter: "Controller Output",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
    ],
    tools: ["Multimeter", "Clamp Meter", "Brake Bleed Kit"],
    rootCause:
      "Worn brake pads, faulty brake cut-off switch stuck ON (blocks acceleration), low brake fluid, or stretched brake cable.",
    repairSteps: [
      "Check brake cut-off signal at rest — if stuck at 0V, vehicle won't move",
      "Measure brake pad thickness",
      "Test brake cut-off switch signal",
      "Top up or bleed brake fluid",
      "Adjust or replace brake cable",
    ],
  },

  // ─── DISPLAY ISSUE ────────────────────────────────────────────────────────
  {
    keywords: [
      "display",
      "screen",
      "meter",
      "dashboard",
      "cluster",
      "indicator",

      "display not working",
      "display dead",
      "display off",
      "no display",
      "screen dead",
      "screen not working",
      "display blank",
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
        parameter: "CAN-H Voltage",
        expectedValue: "2.5–3.5 V",
        expectedMin: 2.5,
        expectedMax: 3.5,
        unit: "V",
      },
      {
        parameter: "CAN-L Voltage",
        expectedValue: "1.5–2.5 V",
        expectedMin: 1.5,
        expectedMax: 2.5,
        unit: "V",
      },
    ],
    tools: ["Multimeter", "CAN Bus Analyzer", "Diagnostic Scanner"],
    rootCause:
      "No display power supply, broken CAN bus communication, damaged connector, or failed instrument cluster.",
    repairSteps: [
      "Check 12V supply to display",
      "Inspect CAN-H/CAN-L wiring",
      "Clean display connector pins",
      "Replace instrument cluster if needed",
    ],
  },

  // ─── ECU / CONTROLLER FAULT ───────────────────────────────────────────────
  {
    keywords: [
      "ecu",
      "ecm",
      "controller fault",
      "controller error",
      "controller failure",
      "controller problem",
      "controller not working",
      "no controller",
      "ecu fault",
      "ecu error",
      "ecu failure",
      "ecu problem",
      "ecu dead",
      "controller dead",
      "controller hot",
      "controller beep",
      "controller blink",
      "controller light",
      "controller reset",
      "motor controller",
      "controller overheat",
      "mosfet",
      "gate driver",
      "controller not detecting",

      "no throttle response",
      "controller cut-off",
      "controller cutoff",
      "mosfet burn",
      "controller short",
      "error code display",
      "jerky drive",
      "speed limit issue",
      "reset failure",
      "no restart",
      "water damaged controller",
      "loose controller wiring",
      "overcurrent cut",
      "undervoltage cut",
      "no controller output",
      "signal delay",
      "pcb damage",
      "pcb burnt",
      "intermittent controller",
      "driver ic fault",
      "full controller failure",
      "controller replacement",
      "controller not responding",
      "jerky",
      "jerk at startup",
      "startup jerk",
    ],
    category: "ECU / Controller Fault",
    checks: [
      "ECU/Controller Power Supply",
      "Controller Ground Connection",
      "Phase Wire Connections (U, V, W)",
      "Hall Sensor Signals",
      "Throttle Input to Controller",
      "Brake Signal Input",
      "CAN Bus / Communication Lines",
      "Controller Heat Sink",
      "Controller Firmware",
      "MOSFET Drain-Source Resistance",
    ],
    expectedValues: [
      { label: "Controller supply voltage", value: "48V–72V" },
      { label: "Controller 5V ref output", value: "4.8V–5.2V" },
      { label: "Phase wire resistance (U-V, V-W, U-W)", value: "0.1–0.5 Ω" },
      { label: "Hall sensor supply voltage", value: "4.8–5.2V" },
      { label: "Hall sensor signal (High)", value: "4.5–5V" },
      { label: "Hall sensor signal (Low)", value: "0–0.5V" },
      { label: "Throttle input at idle", value: "0.8–1.2V" },
      { label: "Throttle input at full", value: "3.8–4.2V" },
      { label: "Controller heat sink temp", value: "< 80°C" },
      { label: "MOSFET Drain-Source (OFF)", value: "> 100 kΩ (no short)" },
    ],
    testParams: [
      {
        parameter: "Controller Supply Voltage",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
      {
        parameter: "Controller 5V Reference",
        expectedValue: "4.8–5.2 V",
        expectedMin: 4.8,
        expectedMax: 5.2,
        unit: "V",
      },
      {
        parameter: "Phase Resistance U-V",
        expectedValue: "0.1–0.5 Ω",
        expectedMin: 0.1,
        expectedMax: 0.5,
        unit: "Ω",
      },
      {
        parameter: "Phase Resistance V-W",
        expectedValue: "0.1–0.5 Ω",
        expectedMin: 0.1,
        expectedMax: 0.5,
        unit: "Ω",
      },
      {
        parameter: "Hall Sensor Supply",
        expectedValue: "4.8–5.2 V",
        expectedMin: 4.8,
        expectedMax: 5.2,
        unit: "V",
      },
      {
        parameter: "Throttle Input (Idle)",
        expectedValue: "0.8–1.2 V",
        expectedMin: 0.8,
        expectedMax: 1.2,
        unit: "V",
      },
      {
        parameter: "Throttle Input (Full)",
        expectedValue: "3.8–4.2 V",
        expectedMin: 3.8,
        expectedMax: 4.2,
        unit: "V",
      },
      {
        parameter: "Controller Heat Sink Temp",
        expectedValue: "< 80 °C",
        expectedMin: 0,
        expectedMax: 80,
        unit: "°C",
      },
    ],
    tools: [
      "Multimeter",
      "Clamp Meter",
      "Oscilloscope",
      "Diagnostic Scanner",
      "Infrared Thermometer",
    ],
    rootCause:
      "ECU/controller failure due to overvoltage, overheating, corrupted firmware, MOSFET short (drain-source), damaged phase connections, or faulty hall sensor feedback.",
    repairSteps: [
      "Check supply voltage to controller",
      "Inspect all phase wire (U/V/W) connections",
      "Test hall sensor signals with multimeter",
      "Verify throttle signal range",
      "Measure controller heat sink temperature",
      "Test MOSFET drain-source — if < 1Ω when OFF, MOSFET is shorted",
      "Reset or reflash controller firmware if possible",
      "Replace controller if supply is OK but no output",
    ],
  },

  // ─── OVERHEAT ─────────────────────────────────────────────────────────────
  {
    keywords: [
      "overheat",
      "overheating",
      "hot",
      "too hot",
      "heating",
      "temperature",
      "thermal",
      "heat",
      "burning smell",

      "wire overheating",
      "motor overheating",
      "phase wire heat",
      "controller overheating",
      "controller overheat",
      "battery overheating",
    ],
    category: "Overheat",
    checks: [
      "Motor Temperature",
      "Controller Temperature",
      "Battery Temperature",
      "Cooling / Ventilation",
      "Ambient Temperature",
    ],
    expectedValues: [
      { label: "Motor operating temperature", value: "< 100°C" },
      { label: "Controller heat sink temp", value: "< 80°C" },
      { label: "Battery pack temperature", value: "15°C – 45°C" },
      { label: "Ambient temperature", value: "≤ 40°C" },
    ],
    testParams: [
      {
        parameter: "Motor Temperature",
        expectedValue: "< 100 °C",
        expectedMin: 0,
        expectedMax: 100,
        unit: "°C",
      },
      {
        parameter: "Controller Temp",
        expectedValue: "< 80 °C",
        expectedMin: 0,
        expectedMax: 80,
        unit: "°C",
      },
      {
        parameter: "Battery Temp",
        expectedValue: "15–45 °C",
        expectedMin: 15,
        expectedMax: 45,
        unit: "°C",
      },
      {
        parameter: "Battery Voltage",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
      {
        parameter: "Phase Current",
        expectedValue: "< 30 A",
        expectedMin: 0,
        expectedMax: 30,
        unit: "A",
      },
    ],
    tools: ["Infrared Thermometer", "Multimeter", "Thermal Camera"],
    rootCause:
      "Excessive current draw, blocked ventilation, high ambient temperature, or defective temperature sensor causing no thermal cutoff.",
    repairSteps: [
      "Measure motor, controller, and battery temperatures",
      "Ensure ventilation slots are not blocked",
      "Check for continuous high current load",
      "Allow components to cool before retesting",
      "Test temperature sensor continuity",
      "Check phase wire connections for heat or discoloration",
      "Check for disc brake drag or bearing resistance increasing motor load",
    ],
  },

  // ─── THROTTLE FAULT ───────────────────────────────────────────────────────
  {
    keywords: [
      "throttle",
      "accelerator",
      "twist grip",
      "handle",
      "throttle stuck",
      "throttle not working",
      "throttle error",
      "throttle jerky",
      "throttle unresponsive",
      "throttle high",
      "throttle low",
      "acceleration jerky",
      "jerky",

      "no acceleration",
      "sudden acceleration",
      "no throttle signal",
      "throttle wire cut",
      "no variation in throttle",
      "loose throttle",
      "throttle delay",
      "partial acceleration",
      "erratic throttle",
      "throttle fluctuation",
      "throttle not responding",
      "throttle fixed",
      "throttle no change",
    ],
    category: "Throttle Fault",
    checks: [
      "Throttle Hall Sensor",
      "Throttle Cable / Assembly",
      "5V Throttle Supply",
      "Throttle Signal Output",
      "Controller Throttle Input",
    ],
    expectedValues: [
      { label: "Throttle supply voltage", value: "4.8–5.2V" },
      { label: "Throttle at idle", value: "0.8–1.2V" },
      { label: "Throttle at half", value: "~2.5V" },
      { label: "Throttle at full", value: "3.8–4.2V" },
    ],
    testParams: [
      {
        parameter: "Throttle Supply Voltage",
        expectedValue: "4.8–5.2 V",
        expectedMin: 4.8,
        expectedMax: 5.2,
        unit: "V",
      },
      {
        parameter: "Throttle Signal (Idle)",
        expectedValue: "0.8–1.2 V",
        expectedMin: 0.8,
        expectedMax: 1.2,
        unit: "V",
      },
      {
        parameter: "Throttle Signal (Full)",
        expectedValue: "3.8–4.2 V",
        expectedMin: 3.8,
        expectedMax: 4.2,
        unit: "V",
      },
      {
        parameter: "Battery Voltage",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
    ],
    tools: ["Multimeter", "Diagnostic Scanner"],
    rootCause:
      "Faulty throttle hall sensor, no 5V supply, damaged wiring, or throttle stuck mechanically.",
    repairSteps: [
      "Check 5V supply to throttle sensor",
      "Measure throttle output at idle and full twist",
      "Inspect throttle connector pins",
      "Replace throttle assembly if signal out of range",
    ],
  },

  // ─── MOTOR FAULT ──────────────────────────────────────────────────────────
  {
    keywords: [
      "motor fault",
      "motor fail",
      "motor not running",
      "motor problem",
      "motor dead",
      "motor error",
      "motor stall",
      "motor locked",
      "motor windings",
      "hub motor",
      "wheel not spinning",

      "motor jerking",
      "motor overheating",
      "motor noise",
      "motor vibration",
      "bearing failure",
      "winding burn",
      "water in motor",
      "phase wire cut",
      "low torque",
      "sudden motor stop",
      "high current draw",
      "phase imbalance",
      "coil short",
      "open winding",
      "weak magnet",
      "motor runs reverse",
      "motor reverse",
      "no torque",
      "motor no torque",
      "motor cogging",
      "motor phase heating",
      "low torque under load",
      "motor locked up",
      "dragging motor",
    ],
    category: "Motor Fault",
    checks: [
      "Phase Wires (U, V, W)",
      "Hall Sensors (A, B, C)",
      "Motor Winding Resistance",
      "Motor Insulation",
      "Motor Encoder",
    ],
    expectedValues: [
      { label: "Phase resistance U-V", value: "0.1–0.5 Ω" },
      { label: "Phase resistance V-W", value: "0.1–0.5 Ω" },
      { label: "Phase resistance U-W", value: "0.1–0.5 Ω" },
      { label: "Insulation resistance (Phase to GND)", value: "> 1 MΩ" },
      { label: "Hall sensor supply", value: "4.8–5.2V" },
    ],
    testParams: [
      {
        parameter: "Phase Resistance U-V",
        expectedValue: "0.1–0.5 Ω",
        expectedMin: 0.1,
        expectedMax: 0.5,
        unit: "Ω",
      },
      {
        parameter: "Phase Resistance V-W",
        expectedValue: "0.1–0.5 Ω",
        expectedMin: 0.1,
        expectedMax: 0.5,
        unit: "Ω",
      },
      {
        parameter: "Phase Resistance U-W",
        expectedValue: "0.1–0.5 Ω",
        expectedMin: 0.1,
        expectedMax: 0.5,
        unit: "Ω",
      },
      {
        parameter: "Hall Sensor Supply",
        expectedValue: "4.8–5.2 V",
        expectedMin: 4.8,
        expectedMax: 5.2,
        unit: "V",
      },
      {
        parameter: "Motor Phase Voltage",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
    ],
    tools: ["Multimeter", "Clamp Meter", "Oscilloscope", "Insulation Tester"],
    rootCause:
      "Open or shorted motor winding, burnt phase wire, failed hall sensors, or motor insulation breakdown.",
    repairSteps: [
      "Test all three phase resistances (should be equal)",
      "Check insulation from phase wire to motor body",
      "Verify hall sensor supply and signal outputs",
      "Inspect phase wire connectors for burn marks",
      "Replace motor if winding resistance is unequal or open",
    ],
  },

  // ─── BMS FAULT ────────────────────────────────────────────────────────────
  {
    keywords: [
      "bms",
      "bms fault",
      "bms error",
      "bms failure",
      "bms problem",
      "battery management",
      "battery protection",
      "cell balancing",
      "battery cutoff",
      "battery cut off",
      "low battery",
      "battery draining",
      "battery drain fast",
      "range low",
      "bms mosfet",
      "bms sleep",
      "bms not waking",
      "battery heating idle",
      "charging stops 80",
      "charging stops 90",
      "bms lock",
      "battery no output",

      "battery not charging",
      "fast battery drain",
      "battery heating",
      "voltage drop",
      "loose terminal",
      "overcharging",
      "slow charging",
      "cut while riding",
      "bms cut-off",
      "battery backup low",
      "low backup",
      "intermittent battery",
      "no battery output",
      "battery leakage",
      "battery fuse blown",
      "negative terminal spark",
      "terminal spark",
      "battery relay",
    ],
    category: "BMS Fault",
    checks: [
      "BMS Status LED",
      "Cell Voltages (individual)",
      "BMS Output Voltage",
      "BMS Temperature Sensor",
      "BMS Balance Wires",
      "BMS Protection Triggers (OVP, UVP, OCP, OTP)",
      "BMS MOSFET (Charge/Discharge FETs)",
    ],
    expectedValues: [
      { label: "Cell voltage (Li-Ion)", value: "3.0V–4.2V per cell" },
      { label: "BMS output voltage", value: "Matches pack voltage" },
      { label: "BMS temperature", value: "< 60°C" },
      { label: "Cell balance delta", value: "< 50mV" },
    ],
    testParams: [
      {
        parameter: "BMS Output Voltage",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
      {
        parameter: "Cell Voltage (Sample)",
        expectedValue: "3.0–4.2 V",
        expectedMin: 3.0,
        expectedMax: 4.2,
        unit: "V",
      },
      {
        parameter: "BMS Temperature",
        expectedValue: "< 60 °C",
        expectedMin: 0,
        expectedMax: 60,
        unit: "°C",
      },
      {
        parameter: "Battery Voltage",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
    ],
    tools: [
      "Multimeter",
      "Battery Cell Tester",
      "Infrared Thermometer",
      "Diagnostic Scanner",
    ],
    rootCause:
      "BMS protection triggered due to over-voltage, under-voltage, over-current, or over-temperature. May also be BMS MOSFET burned, BMS stuck in sleep mode, cell imbalance, or failed BMS board.",
    repairSteps: [
      "Check BMS status LED or fault code",
      "Measure individual cell voltages",
      "Look for cells below 3.0V (replace if needed)",
      "Check BMS MOSFET resistance (should be < 0.1Ω when conducting)",
      "Wake BMS from sleep by connecting charger momentarily",
      "Reset BMS protection (if supported)",
      "Replace BMS board if no output despite good cells",
    ],
  },

  // ─── COMMUNICATION FAULT ──────────────────────────────────────────────────
  {
    keywords: [
      "can bus",
      "canbus",
      "communication error",
      "communication fault",
      "no communication",
      "bus error",
      "communication lost",
      "uart",
      "rs485",
      "modbus",
    ],
    category: "Communication Fault",
    checks: [
      "CAN-H / CAN-L Wiring",
      "120Ω Termination Resistors",
      "ECU & BMS CAN Nodes",
      "CAN Connector Pins",
    ],
    expectedValues: [
      { label: "CAN-H voltage", value: "2.5–3.5V" },
      { label: "CAN-L voltage", value: "1.5–2.5V" },
      { label: "CAN bus differential", value: "~2V" },
      { label: "Termination resistance", value: "60Ω (two 120Ω end-to-end)" },
    ],
    testParams: [
      {
        parameter: "CAN-H Voltage",
        expectedValue: "2.5–3.5 V",
        expectedMin: 2.5,
        expectedMax: 3.5,
        unit: "V",
      },
      {
        parameter: "CAN-L Voltage",
        expectedValue: "1.5–2.5 V",
        expectedMin: 1.5,
        expectedMax: 2.5,
        unit: "V",
      },
      {
        parameter: "Termination Resistance",
        expectedValue: "55–65 Ω",
        expectedMin: 55,
        expectedMax: 65,
        unit: "Ω",
      },
      {
        parameter: "Battery Voltage",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
    ],
    tools: ["Multimeter", "CAN Bus Analyzer", "Oscilloscope"],
    rootCause:
      "Broken CAN-H/CAN-L wire, missing termination resistor, faulty ECU node, or corrupted firmware.",
    repairSteps: [
      "Check CAN-H and CAN-L voltages at ECU connector",
      "Verify 120Ω resistor at each end of CAN bus",
      "Inspect connector pins for corrosion or bends",
      "Reflash affected ECU node if communication lost",
    ],
  },

  // ─── ERROR CODE ───────────────────────────────────────────────────────────
  {
    keywords: [
      "error code",
      "error",
      "fault code",
      "e1",
      "e2",
      "e3",
      "e4",
      "e5",
      "e6",
      "e7",
      "e8",
      "e9",
      "e10",
      "err",
      "code",
      "blink code",
      "flash code",
      "warning code",
    ],
    category: "Error Code",
    checks: [
      "Error Code Lookup (OEM Service Manual)",
      "Controller Fault Memory",
      "BMS Fault LED Pattern",
      "Sensor Related to Code",
    ],
    expectedValues: [
      { label: "E1 — Hall sensor fault", value: "Check hall sensor wiring" },
      { label: "E2 — Throttle fault", value: "Check throttle signal 0.8–4.2V" },
      { label: "E3 — Motor phase fault", value: "Check U/V/W wire resistance" },
      { label: "E4 — Over-voltage", value: "Battery < max pack voltage" },
      { label: "E5 — Under-voltage", value: "Battery > 42V (48V system)" },
      { label: "E6 — Over-current", value: "Current < controller rating" },
      { label: "E7 — Controller overheat", value: "Temp < 80°C" },
      { label: "E8 — Communication fault", value: "CAN bus OK" },
      { label: "E9 — Brake signal fault", value: "Check brake cut-off switch" },
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
        parameter: "Throttle Signal",
        expectedValue: "0.8–4.2 V",
        expectedMin: 0.8,
        expectedMax: 4.2,
        unit: "V",
      },
      {
        parameter: "Hall Sensor Supply",
        expectedValue: "4.8–5.2 V",
        expectedMin: 4.8,
        expectedMax: 5.2,
        unit: "V",
      },
      {
        parameter: "Controller Temp",
        expectedValue: "< 80 °C",
        expectedMin: 0,
        expectedMax: 80,
        unit: "°C",
      },
    ],
    tools: ["Multimeter", "Diagnostic Scanner", "OEM Service Manual"],
    rootCause:
      "Error code indicates a specific sensor, wiring, or firmware fault. Cross-reference code with OEM manual for accurate root cause.",
    repairSteps: [
      "Note the exact error code from display",
      "Cross-reference code in OEM service manual",
      "Test the specific sensor or circuit related to that code",
      "Clear fault memory after repair and road-test",
    ],
  },

  // ─── HORN / ACCESSORIES FAULT ─────────────────────────────────────────────
  {
    keywords: [
      "horn",
      "horn not working",
      "horn no sound",
      "horn dead",
      "hooter",
      "beep",
      "beeper",
    ],
    category: "Horn / Accessories Fault" as const,
    checks: [
      "Horn unit (apply direct 12V — if no sound, horn is faulty)",
      "Horn relay (listen for click, check continuity)",
      "Horn fuse (may look OK but be open internally — test with multimeter)",
      "Handlebar horn switch (check switch continuity in pressed position)",
      "Wiring from switch to horn (check for breaks or loose crimp)",
      "Ground connection at horn terminal",
    ],
    expectedValues: [
      { label: "Horn supply voltage", value: "11V–14V DC" },
      { label: "Horn switch continuity", value: "0 Ω (closed when pressed)" },
      { label: "Horn relay coil resistance", value: "70–90 Ω" },
      { label: "Fuse continuity", value: "0 Ω (OK)" },
    ],
    testParams: [
      {
        parameter: "Horn Supply Voltage",
        expectedValue: "11–14 V",
        expectedMin: 11,
        expectedMax: 14,
        unit: "V",
      },
      {
        parameter: "Horn Switch Continuity",
        expectedValue: "0 Ω when pressed",
        expectedMin: 0,
        expectedMax: 2,
        unit: "Ω",
      },
      {
        parameter: "Horn Fuse Continuity",
        expectedValue: "0 Ω (not open)",
        expectedMin: 0,
        expectedMax: 1,
        unit: "Ω",
      },
    ],
    tools: ["Multimeter", "12V Test Light", "Jumper Wire"],
    rootCause:
      "Horn circuit fault — check horn unit, relay, fuse, switch, and wiring before replacing parts.",
    repairSteps: [
      "Apply direct 12V to horn terminals — if no sound, replace horn unit",
      "Check relay: swap with known working relay or test coil with multimeter",
      "Test fuse with multimeter continuity mode (not visual inspection)",
      "Check horn switch continuity with multimeter while pressing button",
      "Inspect wire from switch to horn for breaks, corrosion, or loose crimp",
      "Check ground connection at horn — poor ground is a common cause",
    ],
  },
  // ─── LIGHTS / INDICATOR FAULT ─────────────────────────────────────────────
  {
    keywords: [
      "light not working",
      "headlight",
      "taillight",
      "indicator not working",
      "turn signal",
      "blinker",
      "blinker not working",
      "signal light",
      "no headlight",
      "lights off",
      "led not working",
      "drl",
    ],
    category: "Lights / Indicator Fault" as const,
    checks: [
      "Bulb / LED unit (check for burn or damage)",
      "Light fuse (test with multimeter — visual check is not reliable)",
      "Light relay or flasher relay (for indicators)",
      "Switch on handlebar (check continuity)",
      "Wiring harness to light unit",
      "Ground connection at light unit",
    ],
    expectedValues: [
      { label: "Headlight supply voltage", value: "11V–14V DC" },
      { label: "Indicator flash rate", value: "60–120 flashes/min" },
      { label: "Fuse continuity", value: "0 Ω (OK)" },
    ],
    testParams: [
      {
        parameter: "Headlight Supply Voltage",
        expectedValue: "11–14 V",
        expectedMin: 11,
        expectedMax: 14,
        unit: "V",
      },
      {
        parameter: "Light Fuse Continuity",
        expectedValue: "0 Ω (not open)",
        expectedMin: 0,
        expectedMax: 1,
        unit: "Ω",
      },
    ],
    tools: ["Multimeter", "12V Test Light"],
    rootCause:
      "Lighting circuit fault — isolate whether fuse, bulb/LED, switch, relay, or wiring is the cause.",
    repairSteps: [
      "Check fuse with multimeter continuity mode",
      "Inspect bulb or LED unit for physical damage",
      "Check supply voltage at light connector",
      "Test switch continuity at handlebar",
      "Check flasher relay for indicators (swap with known working unit)",
      "Inspect wiring for breaks, corrosion, or loose connectors",
    ],
  },
  // ─── LOW TORQUE / MOTOR WINDING ─────────────────────────────────────────────
  {
    keywords: [
      "low torque",
      "weak pickup",
      "no pulling power",
      "poor torque",
      "slow acceleration under load",
      "torque loss",
      "phase imbalance",
      "coil short",
      "open winding",
      "weak magnet",
      "winding burn",
      "burnt winding",
      "motor winding",
      "phase resistance unequal",
      "motor resistance",
      "motor coil",
    ],
    category: "Motor Fault",
    checks: [
      "Motor Phase Resistance (U-V, V-W, U-W)",
      "Phase Current Under Load",
      "Motor Temperature",
      "Bearing Condition",
      "Insulation Resistance (Phase to GND)",
    ],
    expectedValues: [
      { label: "Phase resistance (equal)", value: "0.1–5 Ω (equal ± 0.5 Ω)" },
      { label: "Current under load", value: "Within rated amps" },
      { label: "Motor temp", value: "< 80°C" },
      { label: "Insulation resistance", value: "> 1 MΩ" },
    ],
    testParams: [
      {
        parameter: "Phase A Resistance",
        expectedValue: "0.5–5 Ω",
        expectedMin: 0.5,
        expectedMax: 5,
        unit: "Ω",
      },
      {
        parameter: "Phase B Resistance",
        expectedValue: "0.5–5 Ω",
        expectedMin: 0.5,
        expectedMax: 5,
        unit: "Ω",
      },
      {
        parameter: "Phase C Resistance",
        expectedValue: "0.5–5 Ω",
        expectedMin: 0.5,
        expectedMax: 5,
        unit: "Ω",
      },
      {
        parameter: "Motor Temperature",
        expectedValue: "< 80 °C",
        expectedMin: 0,
        expectedMax: 80,
        unit: "°C",
      },
    ],
    tools: [
      "DC Clamp Meter",
      "Digital Multimeter",
      "IR Thermometer",
      "Insulation Tester",
    ],
    rootCause:
      "Motor winding damage, phase imbalance, coil short, or bearing drag reducing torque output.",
    repairSteps: [
      "Measure phase resistance for all three pairs (U-V, V-W, U-W) — should be equal",
      "If resistance is unequal or very low (coil short), replace motor",
      "If resistance is infinite on any phase (open winding), replace motor",
      "Check current draw under load — high current = mechanical drag or short",
      "Inspect bearings for drag by spinning wheel by hand",
      "Repair or replace motor winding or full motor assembly",
    ],
  },

  // ─── HIGH CURRENT DRAW ───────────────────────────────────────────────────────
  {
    keywords: [
      "high current draw",
      "high current",
      "high amps",
      "excess current",
      "current too high",
      "current draw high",
      "overcurrent",
      "drawing too much current",
    ],
    category: "Motor Fault",
    checks: [
      "Current Draw During Run",
      "Bearing Condition (Wheel Spin Test)",
      "Motor Phase Resistance",
      "Brake Drag Check",
      "Controller Current Limit",
    ],
    expectedValues: [
      { label: "Running current (normal load)", value: "< 30A" },
      { label: "Phase resistance", value: "Equal 0.1–5 Ω" },
      { label: "Wheel spin (free)", value: "Spins freely by hand" },
    ],
    testParams: [
      {
        parameter: "Phase Current",
        expectedValue: "< 30 A",
        expectedMin: 0,
        expectedMax: 30,
        unit: "A",
      },
      {
        parameter: "Phase A Resistance",
        expectedValue: "0.1–5 Ω",
        expectedMin: 0.1,
        expectedMax: 5,
        unit: "Ω",
      },
      {
        parameter: "Motor Temperature",
        expectedValue: "< 80 °C",
        expectedMin: 0,
        expectedMax: 80,
        unit: "°C",
      },
    ],
    tools: [
      "DC Clamp Meter (UNI-T UT203)",
      "Digital Multimeter",
      "IR Thermometer",
    ],
    rootCause:
      "Motor or controller fault causing excess current — could be bearing drag, coil short, or mechanical load issue.",
    repairSteps: [
      "Measure current during normal riding with clamp meter",
      "Spin wheel by hand — should be free, no drag from brake or bearing",
      "Check brake adjustment — dragging brake increases current draw",
      "Test motor phase resistance — coil short causes high current",
      "Check controller current limit settings",
      "Replace motor or repair mechanical drag source",
    ],
  },

  // ─── DRAGGING WHEEL / MECHANICAL LOAD ────────────────────────────────────────
  {
    keywords: [
      "dragging wheel",
      "wheel drag",
      "hard rotation",
      "wheel not free",
      "hard wheel",
      "disc rubbing",
      "brake drag",
      "bearing drag",
      "wheel heavy",
      "wheel stuck",
      "wheel resistance",
      "wheel spin test",
    ],
    category: "Mechanical Noise",
    checks: [
      "Wheel Free Spin (Manual)",
      "Brake Pad Clearance",
      "Bearing Condition",
      "Disc Rotor Check",
      "Motor Mounting",
    ],
    expectedValues: [
      { label: "Wheel spin (free)", value: "Spins freely — no resistance" },
      { label: "Brake pad clearance", value: "0.3–1 mm from disc" },
      { label: "Bearing play", value: "0 mm (no play)" },
    ],
    testParams: [
      {
        parameter: "Bearing Play",
        expectedValue: "0 mm",
        expectedMin: 0,
        expectedMax: 0.5,
        unit: "mm",
      },
      {
        parameter: "Battery Voltage",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
    ],
    tools: ["Wheel Stand", "Hand Tools", "Bearing Puller Tool", "Feeler Gauge"],
    rootCause:
      "Dragging brake pads, worn wheel bearing, or disc rotor warping causing high mechanical resistance.",
    repairSteps: [
      "Lift wheel and spin by hand — check for drag or noise",
      "Inspect brake pads for contact with disc",
      "Adjust brake cable or hydraulic pressure to clear pads",
      "Check disc rotor for warping or debris",
      "Replace wheel bearings if grinding or play detected",
      "Check motor mounting bolts for looseness",
    ],
  },

  // ─── BATTERY SAFETY / LEAKAGE ────────────────────────────────────────────────
  {
    keywords: [
      "battery leakage",
      "battery leak",
      "battery drip",
      "battery acid",
      "battery smell",
      "burning battery",
      "battery fire risk",
      "battery swell",
      "battery overheating",
      "swollen battery",
      "battery safety",
      "negative terminal spark",
      "terminal spark",
    ],
    category: "BMS Fault",
    checks: [
      "Battery Pack Visual Inspection",
      "Battery Temperature",
      "Battery Voltage",
      "BMS Protection Status",
      "Physical Damage / Swelling",
    ],
    expectedValues: [
      { label: "Battery temperature (idle)", value: "< 45°C" },
      { label: "Battery voltage", value: "48–72V normal range" },
      { label: "Physical condition", value: "No swelling, no leakage" },
    ],
    testParams: [
      {
        parameter: "Battery Temperature",
        expectedValue: "< 45 °C",
        expectedMin: 0,
        expectedMax: 45,
        unit: "°C",
      },
      {
        parameter: "Battery Voltage",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
    ],
    tools: [
      "Safety Gloves",
      "Inspection Torch",
      "IR Thermometer Gun",
      "Digital Multimeter",
    ],
    rootCause:
      "Battery cell damage, overcharging, or BMS failure causing thermal runaway risk, swelling, or electrolyte leakage.",
    repairSteps: [
      "⚠️ DO NOT USE — isolate vehicle immediately if swelling or leakage detected",
      "Wear safety gloves and avoid sparks near battery",
      "Measure battery temperature with IR thermometer",
      "Inspect pack for swelling, cracks, or liquid residue",
      "Check BMS for overcharge protection fault",
      "Replace battery pack — do not attempt to repair swollen or leaking pack",
    ],
  },

  // ─── IGNITION / SWITCH FAULT ─────────────────────────────────────────────────
  {
    keywords: [
      "ignition wire fault",
      "ignition wire",
      "ignition not working",
      "key switch",
      "key not working",
      "ignition fault",
      "key switch fault",
      "main switch",
      "switch fault",
      "ignition switch fault",
    ],
    category: "Wiring / Connector Fault",
    checks: [
      "Key Switch Continuity",
      "Ignition Wire from Switch to Controller",
      "Key Switch Voltage Output",
      "Fuse on Ignition Line",
    ],
    expectedValues: [
      { label: "Key switch voltage (ON)", value: "11–14V" },
      { label: "Switch continuity (ON)", value: "0 Ω" },
      { label: "Fuse continuity", value: "0 Ω" },
    ],
    testParams: [
      {
        parameter: "Key Switch Voltage (ON)",
        expectedValue: "11–14 V",
        expectedMin: 11,
        expectedMax: 14,
        unit: "V",
      },
      {
        parameter: "Switch Continuity",
        expectedValue: "0 Ω",
        expectedMin: 0,
        expectedMax: 2,
        unit: "Ω",
      },
      {
        parameter: "Ignition Fuse",
        expectedValue: "0 Ω",
        expectedMin: 0,
        expectedMax: 1,
        unit: "Ω",
      },
    ],
    tools: ["Digital Multimeter", "Test Leads"],
    rootCause:
      "Key switch failure, broken ignition wire, or blown ignition fuse.",
    repairSteps: [
      "Check key switch continuity with multimeter in ON position",
      "Test ignition wire continuity from switch to controller",
      "Check ignition fuse (test with multimeter — do not rely on visual check)",
      "Replace key switch or repair wiring as needed",
    ],
  },

  // ─── SUSPENSION FAULT ────────────────────────────────────────────────────────
  {
    keywords: [
      "suspension fault",
      "suspension problem",
      "suspension hard",
      "suspension soft",
      "suspension loose",
      "shock absorber",
      "shock fault",
      "fork stiff",
      "fork loose",
    ],
    category: "Mechanical Noise",
    checks: [
      "Front Fork Compression",
      "Rear Shock Absorber",
      "Suspension Linkage",
      "Fork Oil Level (if applicable)",
    ],
    expectedValues: [
      { label: "Front fork travel", value: "Smooth full travel" },
      { label: "Rear shock rebound", value: "Smooth — no bottoming" },
    ],
    testParams: [
      {
        parameter: "Battery Voltage",
        expectedValue: "48–72 V",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
    ],
    tools: ["Hand Tools", "Spring Compressor (if needed)"],
    rootCause:
      "Worn shock absorber, broken spring, or seized suspension linkage.",
    repairSteps: [
      "Press suspension by hand — check for smooth travel",
      "Inspect shock absorber for oil leaks or physical damage",
      "Check front fork for stiffness or looseness",
      "Tighten or replace suspension components as needed",
    ],
  },
  // ─── MOTOR PHASE IMBALANCE ───────────────────────────────────────────────────
  {
    keywords: [
      "phase imbalance",
      "uneven torque",
      "vibration at speed",
      "heating one side",
      "motor phase",
    ],
    category: "Motor Fault",
    checks: [
      "Phase Resistance U-V",
      "Phase Resistance V-W",
      "Phase Resistance W-U",
    ],
    expectedValues: [
      { label: "Phase resistance U-V", value: "0.2–1 Ω" },
      { label: "Phase resistance V-W", value: "0.2–1 Ω" },
      { label: "Phase resistance W-U", value: "0.2–1 Ω" },
    ],
    testParams: [
      {
        parameter: "Phase Resistance U-V",
        expectedValue: "0.2–1 Ω",
        expectedMin: 0.2,
        expectedMax: 1.0,
        unit: "Ω",
      },
      {
        parameter: "Phase Resistance V-W",
        expectedValue: "0.2–1 Ω",
        expectedMin: 0.2,
        expectedMax: 1.0,
        unit: "Ω",
      },
      {
        parameter: "Phase Resistance W-U",
        expectedValue: "0.2–1 Ω",
        expectedMin: 0.2,
        expectedMax: 1.0,
        unit: "Ω",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Unequal phase winding resistance causing uneven torque and overheating on one side.",
    repairSteps: [
      "Measure phase resistance across U-V, V-W, W-U with multimeter",
      "All three values must be equal (typically 0.2–1Ω)",
      "If one phase reads higher, winding damage is present",
      "Repair phase winding or replace motor",
    ],
  },

  // ─── HALL SENSOR TIMING MISMATCH ─────────────────────────────────────────────
  {
    keywords: [
      "hall timing",
      "hall timing error",
      "motor stutter",
      "low rpm cut-off",
      "misfiring",
      "hall mismatch",
    ],
    category: "Motor Fault",
    checks: ["Hall Sensor Sequence Output", "Phase Shift Angle"],
    expectedValues: [
      { label: "Hall sequence", value: "Proper 120° phase shift" },
      { label: "Hall signal", value: "0V or 5V (digital)" },
    ],
    testParams: [
      {
        parameter: "Hall Sensor A Signal",
        expectedValue: "0V or 5V",
        expectedMin: 0,
        expectedMax: 5.2,
        unit: "V",
      },
      {
        parameter: "Hall Sensor B Signal",
        expectedValue: "0V or 5V",
        expectedMin: 0,
        expectedMax: 5.2,
        unit: "V",
      },
      {
        parameter: "Hall Sensor C Signal",
        expectedValue: "0V or 5V",
        expectedMin: 0,
        expectedMax: 5.2,
        unit: "V",
      },
    ],
    tools: ["Multimeter", "Oscilloscope"],
    rootCause:
      "Hall sensors out of sequence or incorrect 120° phase shift causing motor stutter or misfiring.",
    repairSteps: [
      "Check hall sensor output signals A, B, C with multimeter",
      "Verify 120° phase shift between signals using oscilloscope",
      "Replace faulty hall sensor if signal is missing or wrong",
      "Correct wiring sequence if sensors are miswired",
    ],
  },

  // ─── MOTOR SEIZED ────────────────────────────────────────────────────────────
  {
    keywords: [
      "motor seized",
      "wheel stuck",
      "motor not rotating",
      "motor locked",
      "bearing jam",
      "motor lock",
    ],
    category: "Motor Fault",
    checks: ["Mechanical Rotation", "Bearing Condition"],
    expectedValues: [
      { label: "Manual rotation", value: "Free rotation by hand" },
      { label: "Bearing play", value: "No excessive play" },
    ],
    testParams: [
      {
        parameter: "Wheel Rotation Resistance",
        expectedValue: "Free spin",
        expectedMin: 0,
        expectedMax: 1,
        unit: "Nm",
      },
    ],
    tools: ["Manual Inspection", "Bearing Puller"],
    rootCause: "Seized bearings or mechanical jam preventing motor rotation.",
    repairSteps: [
      "Try rotating wheel by hand — should spin freely",
      "If stuck, check for bearing jam or debris",
      "Remove hub motor and inspect bearings",
      "Replace bearings or replace motor if windings are damaged",
    ],
  },

  // ─── BACK EMF FAILURE ─────────────────────────────────────────────────────────
  {
    keywords: [
      "back emf",
      "emf missing",
      "controller error",
      "motor not syncing",
      "back emf failure",
    ],
    category: "Motor Fault",
    checks: ["Back EMF Voltage from Motor"],
    expectedValues: [
      { label: "Back EMF (wheel spinning)", value: "Small AC voltage present" },
    ],
    testParams: [
      {
        parameter: "Back EMF Voltage",
        expectedValue: ">1 V AC (spinning)",
        expectedMin: 1,
        expectedMax: 100,
        unit: "V AC",
      },
    ],
    tools: ["Multimeter (AC mode)"],
    rootCause:
      "Motor winding failure causing no back EMF signal, controller cannot sync to motor.",
    repairSteps: [
      "Spin wheel by hand and measure AC voltage across motor phase wires",
      "Should show small AC voltage — if zero, winding is open",
      "Repair motor winding or replace motor",
      "If winding OK but issue persists, replace controller",
    ],
  },

  // ─── HIDDEN WIRE CUT ─────────────────────────────────────────────────────────
  {
    keywords: [
      "hidden wire",
      "partial wire",
      "works sometimes",
      "vibration fault",
      "intermittent wire",
      "wire break inside",
    ],
    category: "Wiring / Connector Fault",
    checks: ["Wire Continuity while bending", "Insulation Integrity"],
    expectedValues: [
      { label: "Continuity (static)", value: "0 Ω (continuous)" },
      { label: "Continuity (bending)", value: "Stable — no break" },
    ],
    testParams: [
      {
        parameter: "Wire Continuity (bending test)",
        expectedValue: "0 Ω stable",
        expectedMin: 0,
        expectedMax: 0.5,
        unit: "Ω",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Internal wire strand break inside insulation, invisible externally but breaks continuity when bent.",
    repairSteps: [
      "Set multimeter to continuity/resistance mode",
      "Probe wire ends and flex/bend wire along its length",
      "If continuity drops or breaks during bending, wire is internally broken",
      "Replace the affected wire section",
    ],
  },

  // ─── HIGH RESISTANCE CONNECTION ───────────────────────────────────────────────
  {
    keywords: [
      "high resistance joint",
      "high resistance connection",
      "voltage drop",
      "heating wire",
      "connector resistance",
    ],
    category: "Wiring / Connector Fault",
    checks: ["Voltage Drop across Connector"],
    expectedValues: [
      { label: "Voltage drop across connector", value: "< 0.5 V" },
    ],
    testParams: [
      {
        parameter: "Voltage Drop (connector)",
        expectedValue: "< 0.5 V",
        expectedMin: 0,
        expectedMax: 0.5,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Corroded or loose connector joint with high resistance causing voltage drop and heat generation.",
    repairSteps: [
      "Measure voltage on both sides of connector under load",
      "If voltage drop > 0.5V, connector resistance is too high",
      "Clean terminals with contact cleaner",
      "Tighten or replace connector if cleaning does not fix it",
    ],
  },

  // ─── WATER INGRESS IN HARNESS ─────────────────────────────────────────────────
  {
    keywords: [
      "water ingress",
      "water in harness",
      "rainy season fault",
      "random shutdown rain",
      "moisture harness",
    ],
    category: "Water Damage",
    checks: ["Moisture in Connectors", "Insulation Integrity"],
    expectedValues: [
      { label: "Connector condition", value: "Dry — no moisture" },
      { label: "Insulation resistance", value: "> 1 MΩ to chassis" },
    ],
    testParams: [
      {
        parameter: "Insulation Resistance",
        expectedValue: "> 1 MΩ",
        expectedMin: 1000000,
        expectedMax: 99999999,
        unit: "Ω",
      },
    ],
    tools: ["Visual Inspection", "Multimeter"],
    rootCause:
      "Water entered wiring harness causing short circuits or high resistance intermittent faults.",
    repairSteps: [
      "Visually inspect all connectors for moisture or corrosion",
      "Open connector housings and check for water inside",
      "Dry harness with compressed air or heat gun (low heat)",
      "Apply insulation spray on recovered sections",
      "Replace damaged wire sections",
    ],
  },

  // ─── IMPROPER GROUND (FLOATING GROUND) ────────────────────────────────────────
  {
    keywords: [
      "floating ground",
      "improper ground",
      "erratic behavior",
      "sensor fault ground",
      "ground issue",
      "ground problem",
    ],
    category: "Wiring / Connector Fault",
    checks: ["Ground Continuity to Chassis"],
    expectedValues: [{ label: "Ground resistance to chassis", value: "0 Ω" }],
    testParams: [
      {
        parameter: "Ground Continuity (chassis)",
        expectedValue: "0 Ω",
        expectedMin: 0,
        expectedMax: 0.5,
        unit: "Ω",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Poor or missing ground connection causing erratic sensor behavior and system faults.",
    repairSteps: [
      "Measure resistance from component ground wire to vehicle chassis",
      "Should read 0 Ω — any value above 0.5Ω is a problem",
      "Tighten existing ground point",
      "Add a new grounding wire if needed",
      "Clean rust or corrosion from ground contact point",
    ],
  },

  // ─── CONTROLLER-MOTOR MISMATCH ────────────────────────────────────────────────
  {
    keywords: [
      "controller mismatch",
      "incompatible controller",
      "controller motor mismatch",
      "wrong controller",
      "low speed overheating",
    ],
    category: "ECU / Controller Fault",
    checks: [
      "Motor Rating vs Controller Rating",
      "Voltage Compatibility",
      "Current Rating Match",
    ],
    expectedValues: [
      { label: "Motor voltage rating", value: "Must match controller" },
      { label: "Motor current rating", value: "Must match controller" },
    ],
    testParams: [
      {
        parameter: "Controller Output Voltage",
        expectedValue: "Matches motor voltage",
        expectedMin: 48,
        expectedMax: 72,
        unit: "V",
      },
    ],
    tools: ["Spec Sheet", "Multimeter"],
    rootCause:
      "Controller and motor have mismatched voltage or current ratings causing low speed, overheating, or noise.",
    repairSteps: [
      "Check motor nameplate for voltage and current ratings",
      "Compare with controller specifications",
      "If ratings do not match, performance will be degraded",
      "Install the correct rated controller that matches the motor",
    ],
  },

  // ─── HIGH SPEED CUT-OFF ───────────────────────────────────────────────────────
  {
    keywords: [
      "high speed cut",
      "cuts at top speed",
      "sudden power cut",
      "power cut high speed",
      "resets at speed",
    ],
    category: "BMS Fault",
    checks: [
      "Battery Voltage under Load",
      "Overcurrent Protection Setting",
      "Controller Current Limit",
    ],
    expectedValues: [
      { label: "Battery voltage under load", value: "Stable (< 5V drop)" },
      { label: "Current draw at top speed", value: "Within controller limit" },
    ],
    testParams: [
      {
        parameter: "Battery Voltage (under load)",
        expectedValue: "> 45 V (48V pack)",
        expectedMin: 44,
        expectedMax: 72,
        unit: "V",
      },
      {
        parameter: "Peak Current Draw",
        expectedValue: "Within rated limit",
        expectedMin: 0,
        expectedMax: 60,
        unit: "A",
      },
    ],
    tools: ["Clamp Meter", "Multimeter"],
    rootCause:
      "Battery voltage sag or overcurrent protection triggering at high speed due to weak battery cells.",
    repairSteps: [
      "Measure battery voltage at rest and under full load",
      "If voltage drops > 5V under load, battery is weak",
      "Check controller overcurrent protection setting",
      "Replace weak battery pack",
      "Check controller — replace if faulty",
    ],
  },

  // ─── BRAKE ALWAYS ON SIGNAL ───────────────────────────────────────────────────
  {
    keywords: [
      "brake always on",
      "brake sensor always active",
      "no acceleration brake",
      "brake light always on",
      "brake stuck signal",
    ],
    category: "Brake Issue",
    checks: ["Brake Switch Continuity (released)", "Brake Sensor Signal"],
    expectedValues: [
      { label: "Brake switch (released)", value: "Open circuit (0V)" },
      { label: "Brake sensor signal (released)", value: "0 V" },
    ],
    testParams: [
      {
        parameter: "Brake Sensor Signal (released)",
        expectedValue: "0 V",
        expectedMin: 0,
        expectedMax: 0.5,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Brake switch stuck closed or sensor short circuit keeping brake signal permanently active, blocking acceleration.",
    repairSteps: [
      "Check brake sensor signal with lever fully released — should be 0V",
      "If signal shows 5V with lever released, switch is stuck",
      "Check for jammed brake lever mechanism",
      "Replace brake switch or sensor",
    ],
  },

  // ─── UNEVEN BRAKE FORCE ───────────────────────────────────────────────────────
  {
    keywords: [
      "uneven braking",
      "uneven brake force",
      "pulling side",
      "unstable braking",
      "one side braking",
    ],
    category: "Brake Issue",
    checks: ["Brake Pad Wear (both sides)", "Cable Tension Balance"],
    expectedValues: [
      { label: "Brake pad thickness", value: "> 1.5 mm both sides" },
      { label: "Cable tension", value: "Equal both sides" },
    ],
    testParams: [
      {
        parameter: "Brake Pad Thickness (front)",
        expectedValue: "> 1.5 mm",
        expectedMin: 1.5,
        expectedMax: 10,
        unit: "mm",
      },
      {
        parameter: "Brake Pad Thickness (rear)",
        expectedValue: "> 1.5 mm",
        expectedMin: 1.5,
        expectedMax: 10,
        unit: "mm",
      },
    ],
    tools: ["Vernier Caliper", "Inspection Tools"],
    rootCause:
      "Unequal pad wear or cable tension causing vehicle to pull to one side during braking.",
    repairSteps: [
      "Measure pad thickness on both sides",
      "Check cable tension — both sides must be equal",
      "Adjust cable tension on the weaker side",
      "Replace worn pads on both sides together",
    ],
  },

  // ─── WARPED BRAKE DISC ────────────────────────────────────────────────────────
  {
    keywords: [
      "warped disc",
      "brake disc warp",
      "vibration while braking",
      "brake vibration",
      "disc warping",
    ],
    category: "Brake Issue",
    checks: ["Disc Flatness / Runout"],
    expectedValues: [{ label: "Disc runout", value: "< 0.1 mm" }],
    testParams: [
      {
        parameter: "Disc Runout",
        expectedValue: "< 0.1 mm",
        expectedMin: 0,
        expectedMax: 0.1,
        unit: "mm",
      },
    ],
    tools: ["Dial Gauge", "Visual Inspection"],
    rootCause:
      "Brake disc warped due to overheating or impact, causing vibration during braking.",
    repairSteps: [
      "Spin wheel slowly and watch for disc wobble",
      "Use dial gauge to measure runout — should be < 0.1mm",
      "If warped beyond tolerance, replace disc",
      "Do not machine disc if below minimum thickness",
    ],
  },

  // ─── EXCESSIVE COGGING ────────────────────────────────────────────────────────
  {
    keywords: [
      "cogging",
      "excessive cogging",
      "jerky rotation by hand",
      "magnetic lock",
      "cogging feel",
    ],
    category: "Motor Fault",
    checks: ["Magnet Alignment", "Manual Rotation Feel"],
    expectedValues: [
      {
        label: "Manual rotation",
        value: "Smooth with slight cogging (normal)",
      },
      { label: "Excessive resistance", value: "Not present" },
    ],
    testParams: [
      {
        parameter: "Wheel Rotation Resistance",
        expectedValue: "Smooth",
        expectedMin: 0,
        expectedMax: 2,
        unit: "Nm",
      },
    ],
    tools: ["Manual Check"],
    rootCause:
      "Magnet misalignment or damaged magnets causing excessive cogging torque.",
    repairSteps: [
      "Rotate wheel by hand — slight cogging is normal",
      "Excessive jerky resistance indicates magnet damage",
      "Open motor and inspect magnet alignment",
      "Replace motor if magnets are shifted or damaged",
    ],
  },

  // ─── EMI NOISE IN WIRING ─────────────────────────────────────────────────────
  {
    keywords: [
      "emi noise",
      "signal interference",
      "random controller error",
      "sensor glitch emi",
      "interference harness",
    ],
    category: "Wiring / Connector Fault",
    checks: ["Signal Wire Routing", "Power/Signal Separation"],
    expectedValues: [
      { label: "Signal wire isolation", value: "Separated from power wires" },
    ],
    testParams: [
      {
        parameter: "Signal Line Voltage (idle)",
        expectedValue: "Clean 0V or 5V",
        expectedMin: 0,
        expectedMax: 5.2,
        unit: "V",
      },
    ],
    tools: ["Multimeter", "Oscilloscope"],
    rootCause:
      "Signal wires routed too close to high-current motor/power wires causing electromagnetic interference.",
    repairSteps: [
      "Inspect harness routing — signal and power wires must be separated",
      "Re-route signal wires away from phase wires and battery cables",
      "Add ferrite beads or shielding to signal wires",
      "Ensure all ground connections are solid",
    ],
  },

  // ─── PHASE SEQUENCE ERROR ─────────────────────────────────────────────────────
  {
    keywords: [
      "phase sequence error",
      "motor reverse",
      "reverse running",
      "wrong direction",
      "motor runs backward",
    ],
    category: "Motor Fault",
    checks: ["Phase Wire Order (U, V, W)"],
    expectedValues: [{ label: "Motor direction", value: "Forward rotation" }],
    testParams: [
      {
        parameter: "Motor Direction (test run)",
        expectedValue: "Forward",
        expectedMin: 0,
        expectedMax: 1,
        unit: "state",
      },
    ],
    tools: ["Multimeter", "Visual Inspection"],
    rootCause:
      "Phase wires connected in wrong sequence causing motor to run in reverse direction.",
    repairSteps: [
      "Test motor direction at low speed",
      "If running reverse, swap any two phase wires (e.g., swap U and V)",
      "Re-test direction after swapping",
      "Also check hall sensor order if stutter persists after swap",
    ],
  },

  // ─── REPEATED FUSE FAILURE ────────────────────────────────────────────────────
  {
    keywords: [
      "fuse blowing",
      "repeated fuse failure",
      "fuse blowing again and again",
      "fuse keeps blowing",
      "fuse problem",
    ],
    category: "General Fault",
    checks: ["Short Circuit in Load", "Controller MOSFET", "Wiring Short"],
    expectedValues: [
      {
        label: "Resistance to ground (circuit off)",
        value: "No short (> 1 kΩ)",
      },
    ],
    testParams: [
      {
        parameter: "Load Circuit Resistance",
        expectedValue: "> 1000 Ω",
        expectedMin: 1000,
        expectedMax: 9999999,
        unit: "Ω",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Short circuit in wiring, motor, or controller MOSFET failure causing excessive current and fuse failure.",
    repairSteps: [
      "Remove fuse and measure resistance across fuse holder to ground",
      "If near 0Ω, there is a short circuit",
      "Disconnect components one by one to isolate the short",
      "Check controller MOSFET for drain-source short",
      "Replace faulty component",
    ],
  },

  // ─── LOW EFFICIENCY MOTOR ─────────────────────────────────────────────────────
  {
    keywords: [
      "low efficiency motor",
      "high battery drain mileage",
      "low mileage",
      "motor efficiency drop",
    ],
    category: "Motor Fault",
    checks: ["Motor Current Draw", "Phase Resistance"],
    expectedValues: [
      { label: "Current draw (normal riding)", value: "Within rated current" },
    ],
    testParams: [
      {
        parameter: "Motor Current Draw",
        expectedValue: "< rated amps",
        expectedMin: 0,
        expectedMax: 30,
        unit: "A",
      },
    ],
    tools: ["Clamp Meter"],
    rootCause:
      "Motor drawing excessive current due to winding degradation or mechanical friction reducing efficiency.",
    repairSteps: [
      "Clamp meter on phase wires during normal riding",
      "Compare with motor rated current specification",
      "Check for mechanical friction (bearing, brake drag)",
      "Replace motor or controller if efficiency is not recoverable",
    ],
  },

  // ─── EXCESS BRAKE FREE PLAY ───────────────────────────────────────────────────
  {
    keywords: [
      "excess brake free play",
      "loose lever",
      "delayed braking",
      "brake play",
      "brake lever loose",
    ],
    category: "Brake Issue",
    checks: ["Brake Cable Slack", "Lever Free Play Distance"],
    expectedValues: [{ label: "Lever free play", value: "2–5 mm" }],
    testParams: [
      {
        parameter: "Brake Lever Free Play",
        expectedValue: "2–5 mm",
        expectedMin: 2,
        expectedMax: 5,
        unit: "mm",
      },
    ],
    tools: ["Ruler / Spanner"],
    rootCause:
      "Excessive cable slack reducing brake effectiveness and increasing stopping distance.",
    repairSteps: [
      "Pull brake lever and measure play before resistance starts",
      "Should be 2–5mm — more than 5mm means too much slack",
      "Adjust cable tension using cable adjuster at lever or caliper",
      "Tighten lock nut after adjustment",
    ],
  },

  // ─── BURNT CONNECTOR PIN ─────────────────────────────────────────────────────
  {
    keywords: [
      "burnt connector",
      "blackened pin",
      "melted socket",
      "burnt pin",
      "melted connector",
    ],
    category: "Wiring / Connector Fault",
    checks: ["Connector Pin Condition", "Contact Resistance"],
    expectedValues: [
      { label: "Pin condition", value: "Clean metal contact — no blackening" },
      { label: "Contact resistance", value: "< 0.1 Ω" },
    ],
    testParams: [
      {
        parameter: "Connector Contact Resistance",
        expectedValue: "< 0.1 Ω",
        expectedMin: 0,
        expectedMax: 0.1,
        unit: "Ω",
      },
    ],
    tools: ["Visual Inspection", "Multimeter"],
    rootCause:
      "High current through corroded or undersized connector pin causing heat, burning, and increased resistance.",
    repairSteps: [
      "Visually inspect all high-current connectors for blackening or melting",
      "Measure contact resistance — burnt pins show high resistance",
      "Replace burnt connector with correct rated connector",
      "Ensure correct current-rated connector is used",
    ],
  },

  // ─── SHAFT MISALIGNMENT ───────────────────────────────────────────────────────
  {
    keywords: [
      "shaft misalignment",
      "motor shaft",
      "uneven rotation",
      "noise misalignment",
      "shaft bent",
    ],
    category: "Motor Fault",
    checks: ["Shaft Straightness", "Hub Wobble"],
    expectedValues: [{ label: "Shaft runout", value: "< 0.05 mm" }],
    testParams: [
      {
        parameter: "Shaft Runout",
        expectedValue: "< 0.05 mm",
        expectedMin: 0,
        expectedMax: 0.05,
        unit: "mm",
      },
    ],
    tools: ["Dial Gauge", "Visual Inspection"],
    rootCause:
      "Bent or misaligned motor shaft causing vibration, noise, and uneven bearing wear.",
    repairSteps: [
      "Spin motor shaft slowly and watch for wobble",
      "Use dial gauge on shaft to measure runout",
      "If runout > 0.05mm, shaft is bent",
      "Replace shaft assembly or entire motor",
    ],
  },
  // ─── MOSFET SHORT CIRCUIT ─────────────────────────────────────────────────────
  {
    keywords: [
      "mosfet short",
      "wheel locked heavy jerk",
      "fuse blows instantly",
      "controller phase short",
      "wheel locked jerk",
    ],
    category: "ECU / Controller Fault",
    checks: ["Controller Phase Output Short", "Phase-to-Phase Continuity"],
    expectedValues: [
      { label: "Phase-to-phase resistance", value: "No continuity (open)" },
    ],
    testParams: [
      {
        parameter: "Phase-to-Phase Resistance",
        expectedValue: "Open / infinite",
        expectedMin: 10000,
        expectedMax: 999999,
        unit: "Ω",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Internal MOSFET short circuit causing phase-to-phase short, locking wheel and blowing fuse.",
    repairSteps: [
      "Disconnect motor and measure resistance between phase outputs on controller",
      "Any near-zero reading = MOSFET shorted",
      "Replace controller — not field-repairable",
    ],
  },

  // ─── MOTOR LEAKAGE TO CHASSIS ─────────────────────────────────────────────────
  {
    keywords: [
      "electric shock ev",
      "tingling body ev",
      "phase leakage chassis",
      "chassis shock motor",
      "motor leakage chassis",
    ],
    category: "Motor Fault",
    checks: ["Phase Wire to Chassis Insulation Resistance"],
    expectedValues: [{ label: "Phase-to-chassis resistance", value: "> 1 MΩ" }],
    testParams: [
      {
        parameter: "Phase-to-Chassis Resistance",
        expectedValue: "> 1 MΩ",
        expectedMin: 1000000,
        expectedMax: 999999999,
        unit: "Ω",
      },
    ],
    tools: ["Multimeter", "Megger"],
    rootCause:
      "Damaged winding insulation causing phase voltage to leak to chassis, creating shock hazard.",
    repairSteps: [
      "SAFETY: Wear insulated gloves before testing",
      "Measure resistance between each phase wire and chassis",
      "Any reading < 1MΩ = insulation failure",
      "Replace motor or re-insulate damaged wiring immediately",
    ],
  },

  // ─── GATE DRIVER FAULT ────────────────────────────────────────────────────────
  {
    keywords: [
      "gate driver fault",
      "random jerks controller",
      "uneven motor switching",
      "pwm fault controller",
    ],
    category: "ECU / Controller Fault",
    checks: ["PWM Signal to MOSFET Gate"],
    expectedValues: [
      { label: "PWM switching", value: "Stable pulses (0–12V)" },
    ],
    testParams: [
      {
        parameter: "PWM Gate Signal",
        expectedValue: "0–12 V stable",
        expectedMin: 0,
        expectedMax: 12,
        unit: "V",
      },
    ],
    tools: ["Oscilloscope"],
    rootCause:
      "Gate driver IC failure causing erratic MOSFET switching and motor jerking.",
    repairSteps: [
      "Probe PWM signal at MOSFET gate with oscilloscope",
      "Unstable or missing pulses = gate driver failure",
      "Replace controller PCB",
    ],
  },

  // ─── REGEN OVERVOLTAGE ────────────────────────────────────────────────────────
  {
    keywords: [
      "regen overvoltage",
      "battery swelling regen",
      "cutoff during braking",
      "regenerative overvoltage",
    ],
    category: "No Start",
    checks: ["Battery Voltage During Regen Braking"],
    expectedValues: [
      { label: "Battery voltage (regen)", value: "< 60V for 48V system" },
    ],
    testParams: [
      {
        parameter: "Battery Voltage (Regen)",
        expectedValue: "< 60 V",
        expectedMin: 0,
        expectedMax: 60,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Uncontrolled regen current pushing battery above safe voltage limit, risking swelling or damage.",
    repairSteps: [
      "Measure battery voltage with multimeter during braking",
      "If > rated max voltage, regen circuit is uncontrolled",
      "Disable regen in controller settings or replace controller",
    ],
  },

  // ─── MOTOR THERMAL RUNAWAY ────────────────────────────────────────────────────
  {
    keywords: [
      "thermal runaway motor",
      "extreme heat motor",
      "motor smoke runaway",
      "motor overheating runaway",
    ],
    category: "Motor Fault",
    checks: ["Motor Continuous Current Draw", "Motor Temperature"],
    expectedValues: [{ label: "Phase current", value: "Within rated current" }],
    testParams: [
      {
        parameter: "Phase Current",
        expectedValue: "Within rated A",
        expectedMin: 0,
        expectedMax: 50,
        unit: "A",
      },
    ],
    tools: ["Clamp Meter"],
    rootCause:
      "Sustained overcurrent causing motor to overheat beyond recovery — risk of fire.",
    repairSteps: [
      "STOP vehicle immediately if smoke or extreme heat detected",
      "Measure current with clamp meter on phase wires",
      "Current exceeding rated value = motor or controller fault",
      "Replace motor immediately — do not continue use",
    ],
  },

  // ─── HALL SIGNAL DROP AT RPM ─────────────────────────────────────────────────
  {
    keywords: [
      "hall signal drop rpm",
      "cuts at speed hall",
      "jerks only at high speed",
      "hall intermittent high speed",
    ],
    category: "Motor Fault",
    checks: ["Hall Signal Stability at Rotation Speed"],
    expectedValues: [{ label: "Hall signal", value: "Stable 0–5V switching" }],
    testParams: [
      {
        parameter: "Hall Signal Voltage",
        expectedValue: "0–5 V stable",
        expectedMin: 0,
        expectedMax: 5,
        unit: "V",
      },
    ],
    tools: ["Oscilloscope"],
    rootCause:
      "Hall sensor signal dropout at high RPM causing controller to lose commutation, cutting power.",
    repairSteps: [
      "Test hall sensors at low speed first — compare at high speed",
      "Look for signal dropouts on oscilloscope",
      "Replace hall sensors with matching type",
    ],
  },

  // ─── PHASE CABLE OVERLOAD ─────────────────────────────────────────────────────
  {
    keywords: [
      "phase cable overload",
      "cable melting motor",
      "burning smell phase",
      "phase wire heating load",
    ],
    category: "Wiring / Connector Fault",
    checks: ["Phase Cable Current vs Rating"],
    expectedValues: [
      { label: "Phase cable current", value: "Within rated amp capacity" },
    ],
    testParams: [
      {
        parameter: "Phase Cable Current",
        expectedValue: "< rated capacity",
        expectedMin: 0,
        expectedMax: 60,
        unit: "A",
      },
    ],
    tools: ["Clamp Meter"],
    rootCause:
      "Undersized phase cable carrying excess current, causing insulation melt and fire risk.",
    repairSteps: [
      "Measure current on phase cables under load with clamp meter",
      "Compare with cable current rating",
      "Replace with correctly rated thicker cable",
    ],
  },

  // ─── REVERSE CURRENT DAMAGE ───────────────────────────────────────────────────
  {
    keywords: [
      "reverse current",
      "controller dead push start",
      "backflow current",
      "controller damaged push",
    ],
    category: "ECU / Controller Fault",
    checks: ["Reverse Voltage at Controller Input"],
    expectedValues: [
      { label: "Controller input polarity", value: "No reverse voltage" },
    ],
    testParams: [
      {
        parameter: "Controller Input Voltage",
        expectedValue: "> 0 V (no reverse)",
        expectedMin: 0,
        expectedMax: 80,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Back-EMF from push-starting motor flows into controller without protection diode, destroying it.",
    repairSteps: [
      "Check controller input for reverse voltage during push",
      "Never push-start an EV with a dead controller",
      "Replace damaged controller",
    ],
  },

  // ─── HARNESS BURNOUT ──────────────────────────────────────────────────────────
  {
    keywords: [
      "harness burnout",
      "full wiring burnt",
      "smoke wiring",
      "main harness meltdown",
    ],
    category: "Wiring / Connector Fault",
    checks: ["Full Harness Visual Inspection"],
    expectedValues: [
      { label: "Harness condition", value: "No burnt insulation" },
    ],
    testParams: [
      {
        parameter: "Harness Insulation",
        expectedValue: "No damage",
        expectedMin: 1,
        expectedMax: 10,
        unit: "score",
      },
    ],
    tools: ["Visual Inspection"],
    rootCause:
      "Overcurrent or short circuit causing full wiring harness to overheat and burn.",
    repairSteps: [
      "Visually inspect entire harness for burn marks",
      "Check main fuse and battery connector for short",
      "Replace full harness — partial repair not safe",
    ],
  },

  // ─── BATTERY CONNECTOR ARCING ─────────────────────────────────────────────────
  {
    keywords: [
      "connector arcing",
      "spark battery connection",
      "spark when connecting battery",
      "arc battery connector",
    ],
    category: "No Start",
    checks: ["Battery Connector Pin Condition"],
    expectedValues: [
      { label: "Connector surface", value: "No pitting, clean metal" },
    ],
    testParams: [
      {
        parameter: "Connector Contact Resistance",
        expectedValue: "< 0.1 Ω",
        expectedMin: 0,
        expectedMax: 0.1,
        unit: "Ω",
      },
    ],
    tools: ["Visual Inspection", "Multimeter"],
    rootCause:
      "Worn or pitted connector causing arc on connection, damaging pins and creating fire risk.",
    repairSteps: [
      "Inspect battery connector for pitting or burn marks",
      "Replace connector with correct rated type",
      "Add pre-charge resistor if large capacitors are present",
    ],
  },

  // ─── FLOATING GROUND FAILURE ──────────────────────────────────────────────────
  {
    keywords: [
      "floating ground failure",
      "intermittent ground loss",
      "random shutdown ground",
      "ground failure critical",
    ],
    category: "Wiring / Connector Fault",
    checks: ["Ground Line Resistance Under Load"],
    expectedValues: [
      { label: "Ground resistance under load", value: "0 Ω stable" },
    ],
    testParams: [
      {
        parameter: "Ground Resistance",
        expectedValue: "0 Ω",
        expectedMin: 0,
        expectedMax: 0.5,
        unit: "Ω",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Intermittent ground connection causing sensor errors, random shutdowns, and erratic behavior.",
    repairSteps: [
      "Measure ground to chassis under load (lights, motor running)",
      "Resistance > 0.5Ω under load = bad ground",
      "Trace and rebuild grounding points",
    ],
  },

  // ─── SEVERE VOLTAGE DROP ──────────────────────────────────────────────────────
  {
    keywords: [
      "severe voltage drop",
      "vehicle dies acceleration",
      "voltage sag acceleration",
      "high voltage drop load",
    ],
    category: "No Start",
    checks: ["Battery Voltage at Rest vs Under Load"],
    expectedValues: [{ label: "Voltage drop under load", value: "< 3–5V" }],
    testParams: [
      {
        parameter: "Battery Voltage Drop",
        expectedValue: "< 5 V",
        expectedMin: 0,
        expectedMax: 5,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Severely degraded battery or high-resistance wiring causing large voltage drop on acceleration.",
    repairSteps: [
      "Measure battery voltage at rest and during full throttle",
      "Drop > 5V = weak battery or high resistance wiring",
      "Replace battery or inspect wiring joints",
    ],
  },

  // ─── SIGNAL CROSS-TALK ────────────────────────────────────────────────────────
  {
    keywords: [
      "signal cross-talk",
      "throttle not responding brake released",
      "brake signal interference",
      "throttle brake conflict",
    ],
    category: "Wiring / Connector Fault",
    checks: ["Throttle Signal Independence", "Brake Signal Routing"],
    expectedValues: [
      { label: "Signal isolation", value: "Independent signals" },
    ],
    testParams: [
      {
        parameter: "Throttle Signal (brake pressed)",
        expectedValue: "Unaffected",
        expectedMin: 0.8,
        expectedMax: 4.2,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Throttle and brake signal wires routed together causing electromagnetic interference.",
    repairSteps: [
      "Check signal wires are separate from power wires",
      "Separate throttle and brake wiring runs",
      "Use shielded cable for signal wires if needed",
    ],
  },

  // ─── RELAY STUCK ON ───────────────────────────────────────────────────────────
  {
    keywords: [
      "relay stuck on",
      "vehicle won't turn off relay",
      "relay welded",
      "power relay stuck",
    ],
    category: "ECU / Controller Fault",
    checks: ["Relay Contact Continuity with Key Off"],
    expectedValues: [
      { label: "Relay (key off)", value: "Open — no continuity" },
    ],
    testParams: [
      {
        parameter: "Relay Continuity (key off)",
        expectedValue: "Open",
        expectedMin: 10000,
        expectedMax: 999999,
        unit: "Ω",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "High current surge welding relay contacts closed, preventing vehicle from shutting off.",
    repairSteps: [
      "Measure continuity across relay contacts with key off",
      "Continuity = relay welded shut",
      "Replace relay with correct current-rated type",
    ],
  },

  // ─── BRAKE FADE ───────────────────────────────────────────────────────────────
  {
    keywords: [
      "brake fade",
      "brake works then fails",
      "brake fails at speed",
      "brake fade heat",
    ],
    category: "Brake Issue",
    checks: ["Brake Pad Heat Buildup", "Braking Consistency"],
    expectedValues: [{ label: "Braking", value: "Consistent at all speeds" }],
    testParams: [
      {
        parameter: "Brake Effectiveness",
        expectedValue: "Consistent",
        expectedMin: 8,
        expectedMax: 10,
        unit: "score",
      },
    ],
    tools: ["Visual Inspection"],
    rootCause:
      "Brake pads overheating under repeated use causing temporary loss of friction (fade).",
    repairSteps: [
      "Allow brakes to cool and test again",
      "If fade recurs, inspect pad compound and thickness",
      "Replace pads with higher performance compound",
      "Check for dragging caliper causing pre-heating",
    ],
  },

  // ─── HYDRAULIC BRAKE FAILURE ──────────────────────────────────────────────────
  {
    keywords: [
      "hydraulic brake failure",
      "lever goes free brake",
      "no brake hydraulic",
      "brake lever spongy",
    ],
    category: "Brake Issue",
    checks: ["Brake Fluid Level", "Caliper and Line Leakage"],
    expectedValues: [{ label: "Brake fluid", value: "Full — no leakage" }],
    testParams: [
      {
        parameter: "Brake Lever Pressure",
        expectedValue: "Firm, full pressure",
        expectedMin: 8,
        expectedMax: 10,
        unit: "score",
      },
    ],
    tools: ["Visual Inspection"],
    rootCause:
      "Brake fluid leak or air in hydraulic line causing complete loss of braking pressure.",
    repairSteps: [
      "STOP riding immediately if brake lever goes free",
      "Inspect caliper, line, and master cylinder for leaks",
      "Fix leak point",
      "Bleed brake line and refill with correct fluid",
    ],
  },

  // ─── ELECTRONIC BRAKE LOCK ────────────────────────────────────────────────────
  {
    keywords: [
      "electronic brake lock",
      "sudden wheel lock regen",
      "regen brake lock",
      "controller brake lock",
    ],
    category: "Brake Issue",
    checks: ["Regen Braking Malfunction", "Controller Regen Output"],
    expectedValues: [{ label: "Regen braking", value: "Smooth, proportional" }],
    testParams: [
      {
        parameter: "Regen Smoothness",
        expectedValue: "Smooth",
        expectedMin: 8,
        expectedMax: 10,
        unit: "score",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Controller regen malfunction applying full regenerative force and locking the wheel.",
    repairSteps: [
      "Test regen at slow speed first",
      "Sudden wheel lock = controller regen fault",
      "Disable regen if possible, replace controller",
    ],
  },

  // ─── CRITICAL BRAKE IMBALANCE ─────────────────────────────────────────────────
  {
    keywords: [
      "critical brake imbalance",
      "vehicle pulling dangerously",
      "flip risk braking",
      "brake pull dangerous",
    ],
    category: "Brake Issue",
    checks: ["Left and Right Brake Force Balance"],
    expectedValues: [{ label: "L/R brake force difference", value: "< 10%" }],
    testParams: [
      {
        parameter: "Brake Balance",
        expectedValue: "Equal (< 10% diff)",
        expectedMin: 8,
        expectedMax: 10,
        unit: "score",
      },
    ],
    tools: ["Visual Inspection"],
    rootCause:
      "Severely unequal brake force causing vehicle to flip or spin during emergency stop.",
    repairSteps: [
      "Test braking at low speed on straight road",
      "Note which side grabs harder",
      "Adjust cable tension or caliper piston on strong side",
      "Replace worn pads and equalise both sides",
    ],
  },

  // ─── BRAKE SIGNAL DELAY ───────────────────────────────────────────────────────
  {
    keywords: [
      "brake signal delay",
      "motor runs after brake",
      "brake sensor slow",
      "delayed brake cutoff",
    ],
    category: "Brake Issue",
    checks: ["Brake Sensor Response Time"],
    expectedValues: [{ label: "Brake cutoff response", value: "< 100 ms" }],
    testParams: [
      {
        parameter: "Brake Sensor Signal",
        expectedValue: "0 V (released)",
        expectedMin: 0,
        expectedMax: 0.5,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Slow or sticky brake sensor causing motor to continue running after braking.",
    repairSteps: [
      "Measure brake sensor signal with lever pressed and released",
      "Delayed signal change = faulty sensor",
      "Replace brake sensor",
    ],
  },

  // ─── PARKING BRAKE SLIP ───────────────────────────────────────────────────────
  {
    keywords: [
      "parking brake slip",
      "vehicle rolls back slope",
      "parking brake failure slope",
      "park brake weak",
    ],
    category: "Brake Issue",
    checks: ["Parking Brake Holding Force on Slope"],
    expectedValues: [
      { label: "Vehicle movement (parked)", value: "Zero — no movement" },
    ],
    testParams: [
      {
        parameter: "Parking Brake Hold",
        expectedValue: "No movement",
        expectedMin: 0,
        expectedMax: 0,
        unit: "mm",
      },
    ],
    tools: ["Physical Test on Slope"],
    rootCause:
      "Worn or misadjusted parking brake failing to hold vehicle on incline.",
    repairSteps: [
      "Test on gentle slope with parking brake engaged",
      "Any movement = insufficient holding force",
      "Adjust cable tension or replace parking brake mechanism",
    ],
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
  rootCause:
    "Multiple systems may be affected. Perform a full vehicle inspection.",
  repairSteps: [
    "Check battery voltage",
    "Test throttle signal",
    "Inspect all connectors",
    "Scan for fault codes",
  ],
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

// ─── SUB-FAULT GROUPS ────────────────────────────────────────────────────────

export interface SubFaultDef {
  id: string;
  name: string;
  symptom: string;
  keywords: string[];
  checks: string[];
  expectedValues: { label: string; value: string }[];
  testParams: TestParam[];
  tools: string[];
  rootCause: string;
  repairSteps: string[];
}

export interface SubFaultGroup {
  groupName: string;
  triggerKeywords: string[];
  subFaults: SubFaultDef[];
}

export const SUB_FAULT_GROUPS: SubFaultGroup[] = [
  {
    groupName: "Motor Fault",
    triggerKeywords: [
      "motor",
      "hub motor",
      "wheel not spinning",
      "motor problem",
    ],
    subFaults: [
      {
        id: "motor_not_running",
        name: "Motor Not Running / Motor Dead",
        symptom: "Wheel does not spin at all, no movement",
        keywords: [
          "motor dead",
          "motor not running",
          "wheel not spinning",
          "no movement",
        ],
        checks: [
          "Phase wire connections (U/V/W)",
          "Controller output to motor",
          "Motor winding continuity",
          "Hall sensor power supply",
        ],
        expectedValues: [
          { label: "Phase Resistance U-V", value: "0.1–0.5 Ω" },
          { label: "Phase Resistance V-W", value: "0.1–0.5 Ω" },
          { label: "Phase Resistance U-W", value: "0.1–0.5 Ω" },
          { label: "Controller Output Voltage", value: "Battery voltage" },
        ],
        testParams: [
          {
            parameter: "Phase Resistance U-V",
            expectedValue: "0.1–0.5 Ω",
            expectedMin: 0.1,
            expectedMax: 0.5,
            unit: "Ω",
          },
          {
            parameter: "Phase Resistance V-W",
            expectedValue: "0.1–0.5 Ω",
            expectedMin: 0.1,
            expectedMax: 0.5,
            unit: "Ω",
          },
          {
            parameter: "Phase Resistance U-W",
            expectedValue: "0.1–0.5 Ω",
            expectedMin: 0.1,
            expectedMax: 0.5,
            unit: "Ω",
          },
          {
            parameter: "Hall Sensor Supply",
            expectedValue: "4.8–5.2 V",
            expectedMin: 4.8,
            expectedMax: 5.2,
            unit: "V",
          },
        ],
        tools: ["Multimeter", "Insulation Tester"],
        rootCause:
          "Open motor winding, broken phase wire, or controller not outputting to motor phases.",
        repairSteps: [
          "Measure phase-to-phase resistance (U-V, V-W, U-W) — must be equal",
          "Check phase wire connector for burnt/broken pins",
          "Verify controller is outputting voltage to motor",
          "If winding open (infinite resistance), replace motor",
        ],
      },
      {
        id: "motor_noise_vibration",
        name: "Motor Noise / Vibration",
        symptom: "Grinding, clicking, or rattling from motor/wheel area",
        keywords: [
          "motor noise",
          "grinding",
          "motor vibration",
          "clicking sound",
          "bearing noise",
        ],
        checks: [
          "Motor bearing play",
          "Wheel hub bolt torque",
          "Phase wire chafing",
          "Motor mounting bolts",
        ],
        expectedValues: [
          { label: "Bearing Lateral Play", value: "0 mm (no play)" },
          { label: "Hub Bolt Torque", value: "Per spec (40–80 Nm)" },
          { label: "Motor Mounting Torque", value: "Fully tight" },
        ],
        testParams: [
          {
            parameter: "Motor Voltage at Terminals",
            expectedValue: "48–72 V",
            expectedMin: 48,
            expectedMax: 72,
            unit: "V",
          },
          {
            parameter: "Phase Resistance U-V",
            expectedValue: "0.1–0.5 Ω",
            expectedMin: 0.1,
            expectedMax: 0.5,
            unit: "Ω",
          },
        ],
        tools: ["Torque Wrench", "Multimeter", "Feeler Gauge"],
        rootCause:
          "Worn motor bearings, loose hub bolts, or damaged internal magnets.",
        repairSteps: [
          "Spin wheel by hand — grinding = bearing fault",
          "Check hub bolt tightness with torque wrench",
          "Check motor mounting bolts for looseness",
          "Replace bearings or motor assembly if bearing play detected",
        ],
      },
      {
        id: "motor_overheating",
        name: "Motor Overheating",
        symptom:
          "Motor body very hot, thermal cutoff, reduced power after riding",
        keywords: [
          "motor overheating",
          "motor hot",
          "thermal cutoff",
          "motor heat",
        ],
        checks: [
          "Motor temperature",
          "Phase current draw",
          "Brake drag check",
          "Cooling ventilation",
        ],
        expectedValues: [
          { label: "Motor Operating Temp", value: "< 100°C" },
          { label: "Phase Current (normal)", value: "< 30A continuous" },
        ],
        testParams: [
          {
            parameter: "Motor Temperature",
            expectedValue: "< 100 °C",
            expectedMin: 0,
            expectedMax: 100,
            unit: "°C",
          },
          {
            parameter: "Phase Current",
            expectedValue: "< 30 A",
            expectedMin: 0,
            expectedMax: 30,
            unit: "A",
          },
        ],
        tools: ["Infrared Thermometer", "Clamp Meter"],
        rootCause:
          "Excessive load, brake drag, high ambient temperature, or poor ventilation.",
        repairSteps: [
          "Measure motor surface temp with IR thermometer",
          "Check if brake is dragging (spin wheel freely by hand)",
          "Reduce load / avoid prolonged hill climbs",
          "Allow 10 min cooldown before re-test",
        ],
      },
      {
        id: "motor_jerking_cogging",
        name: "Motor Jerking / Cogging at Startup",
        symptom: "Motor stutters, jerks, or coggs when starting from rest",
        keywords: [
          "motor jerking",
          "motor cogging",
          "stutter start",
          "jerky start",
          "motor jerk",
        ],
        checks: [
          "Hall sensor signals A/B/C",
          "Hall sensor supply voltage",
          "Phase sequence wiring",
          "Connector pin condition",
        ],
        expectedValues: [
          { label: "Hall Sensor Supply", value: "4.8–5.2 V" },
          { label: "Hall Signal (rotating)", value: "0V / 5V switching" },
        ],
        testParams: [
          {
            parameter: "Hall Sensor Supply",
            expectedValue: "4.8–5.2 V",
            expectedMin: 4.8,
            expectedMax: 5.2,
            unit: "V",
          },
          {
            parameter: "Phase Resistance U-V",
            expectedValue: "0.1–0.5 Ω",
            expectedMin: 0.1,
            expectedMax: 0.5,
            unit: "Ω",
          },
        ],
        tools: ["Multimeter", "Oscilloscope"],
        rootCause:
          "Hall sensor failure or wrong phase sequence causing incorrect commutation.",
        repairSteps: [
          "Slowly rotate wheel, check hall signals A/B/C switching 0V–5V",
          "Verify 5V supply to hall sensors",
          "Clean hall sensor connector",
          "Swap two phase wires if motor runs reverse",
          "Replace hall sensor if no switching signal",
        ],
      },
      {
        id: "motor_reverse",
        name: "Motor Running in Reverse",
        symptom: "Motor spins backward, vehicle moves in wrong direction",
        keywords: [
          "motor reverse",
          "motor runs reverse",
          "wrong direction",
          "spinning backward",
        ],
        checks: [
          "Phase wire sequence (U/V/W)",
          "Hall sensor wiring",
          "Controller direction setting",
        ],
        expectedValues: [
          { label: "Phase Sequence", value: "U-V-W per controller label" },
          { label: "Hall Wiring", value: "Per pinout diagram" },
        ],
        testParams: [
          {
            parameter: "Hall Sensor Supply",
            expectedValue: "4.8–5.2 V",
            expectedMin: 4.8,
            expectedMax: 5.2,
            unit: "V",
          },
          {
            parameter: "Phase Resistance U-V",
            expectedValue: "0.1–0.5 Ω",
            expectedMin: 0.1,
            expectedMax: 0.5,
            unit: "Ω",
          },
        ],
        tools: ["Multimeter"],
        rootCause:
          "Two phase wires swapped or hall sensor wiring incorrect after repair.",
        repairSteps: [
          "Swap any two of the three phase wires (e.g. swap U and V)",
          "If still reverse, also swap two hall sensor signal wires",
          "Re-test direction at low throttle",
          "Label wires after fixing to prevent recurrence",
        ],
      },
      {
        id: "motor_no_torque",
        name: "Motor No Torque / Weak Pulling",
        symptom: "Motor runs but cannot pull load, very weak acceleration",
        keywords: [
          "motor no torque",
          "no torque",
          "low torque",
          "weak motor",
          "motor weak",
          "poor pull",
        ],
        checks: [
          "Phase current under load",
          "Motor winding resistance balance",
          "Controller current limit setting",
          "Battery voltage under load",
        ],
        expectedValues: [
          { label: "Phase Current (full load)", value: "As per motor rating" },
          { label: "Battery Voltage (loaded)", value: "> 42V for 48V system" },
          {
            label: "Phase Resistance balance",
            value: "All phases equal ±0.05Ω",
          },
        ],
        testParams: [
          {
            parameter: "Phase Resistance U-V",
            expectedValue: "0.1–0.5 Ω",
            expectedMin: 0.1,
            expectedMax: 0.5,
            unit: "Ω",
          },
          {
            parameter: "Phase Resistance V-W",
            expectedValue: "0.1–0.5 Ω",
            expectedMin: 0.1,
            expectedMax: 0.5,
            unit: "Ω",
          },
          {
            parameter: "Battery Voltage Under Load",
            expectedValue: "> 42 V",
            expectedMin: 42,
            expectedMax: 80,
            unit: "V",
          },
          {
            parameter: "Phase Current",
            expectedValue: "Per motor rating",
            expectedMin: 5,
            expectedMax: 60,
            unit: "A",
          },
        ],
        tools: ["Clamp Meter", "Multimeter"],
        rootCause:
          "Partial winding short, battery sag under load, or controller current limit too low.",
        repairSteps: [
          "Measure battery voltage under load — if drops below 42V, battery is weak",
          "Check all phase resistances are equal",
          "Measure phase current under load with clamp meter",
          "Check controller max current setting",
          "If phase resistance unequal, motor has partial winding fault",
        ],
      },
      {
        id: "motor_winding_burnt",
        name: "Motor Winding Burnt / Phase Heating",
        symptom:
          "Burning smell from motor, one phase wire very hot, insulation damaged",
        keywords: [
          "winding burn",
          "coil short",
          "phase heating",
          "motor phase heating",
          "burning smell motor",
          "open winding",
          "phase imbalance",
        ],
        checks: [
          "Phase resistance balance",
          "Insulation resistance (phase to body)",
          "Phase wire insulation visual",
          "Motor temperature",
        ],
        expectedValues: [
          { label: "Phase Resistance", value: "0.1–0.5 Ω (all equal)" },
          { label: "Insulation Resistance", value: "> 1 MΩ (phase to GND)" },
        ],
        testParams: [
          {
            parameter: "Phase Resistance U-V",
            expectedValue: "0.1–0.5 Ω",
            expectedMin: 0.1,
            expectedMax: 0.5,
            unit: "Ω",
          },
          {
            parameter: "Phase Resistance V-W",
            expectedValue: "0.1–0.5 Ω",
            expectedMin: 0.1,
            expectedMax: 0.5,
            unit: "Ω",
          },
          {
            parameter: "Phase Resistance U-W",
            expectedValue: "0.1–0.5 Ω",
            expectedMin: 0.1,
            expectedMax: 0.5,
            unit: "Ω",
          },
          {
            parameter: "Insulation Resistance",
            expectedValue: "> 1 MΩ",
            expectedMin: 1000000,
            expectedMax: 999999999,
            unit: "Ω",
          },
        ],
        tools: ["Multimeter", "Insulation Tester (Megger)"],
        rootCause:
          "Prolonged overcurrent or short circuit damaged winding insulation.",
        repairSteps: [
          "Test insulation resistance (phase wire to motor body) — should be > 1MΩ",
          "Compare all three phase resistances — unequal means partial winding fault",
          "If insulation < 1MΩ or phase resistance unequal → replace motor",
          "Check controller for overcurrent fault after motor replacement",
        ],
      },
    ],
  },
  {
    groupName: "Battery / BMS Fault",
    triggerKeywords: ["battery", "bms", "battery problem", "battery issue"],
    subFaults: [
      {
        id: "battery_no_output",
        name: "Battery No Output / Vehicle Dead",
        symptom: "Battery shows charge but vehicle does not power on",
        keywords: [
          "battery no output",
          "battery dead output",
          "bms cutoff",
          "no power from battery",
        ],
        checks: [
          "BMS output terminals",
          "BMS protection status",
          "Main relay",
          "Battery pack voltage",
        ],
        expectedValues: [
          { label: "Battery Pack Voltage", value: "48–72V" },
          { label: "BMS Output Voltage", value: "Same as battery voltage" },
        ],
        testParams: [
          {
            parameter: "Battery Pack Voltage",
            expectedValue: "48–72 V",
            expectedMin: 48,
            expectedMax: 72,
            unit: "V",
          },
          {
            parameter: "BMS Output Voltage",
            expectedValue: "48–72 V",
            expectedMin: 48,
            expectedMax: 72,
            unit: "V",
          },
        ],
        tools: ["Multimeter"],
        rootCause:
          "BMS protection tripped (over/under voltage, overcurrent, or temperature fault).",
        repairSteps: [
          "Measure battery pack voltage (direct at battery terminals)",
          "Measure BMS output voltage — if 0V, BMS is in protection mode",
          "Disconnect battery for 10 minutes to reset BMS",
          "Reconnect and check output again",
          "If BMS output still 0V, check individual cell voltages",
        ],
      },
      {
        id: "battery_fast_drain",
        name: "Battery Fast Draining",
        symptom: "Battery percentage drops quickly, short range",
        keywords: [
          "battery drain",
          "fast draining",
          "short range",
          "battery dies fast",
          "quick discharge",
        ],
        checks: [
          "Cell voltages (all cells)",
          "Parasitic drain",
          "Battery age/capacity test",
          "Charging completeness",
        ],
        expectedValues: [
          { label: "Cell Voltage (full charge)", value: "4.15–4.20V per cell" },
          { label: "Cell Voltage Spread", value: "< 0.05V difference" },
        ],
        testParams: [
          {
            parameter: "Cell Group 1 Voltage",
            expectedValue: "3.5–4.2 V",
            expectedMin: 3.5,
            expectedMax: 4.2,
            unit: "V",
          },
          {
            parameter: "Cell Group 2 Voltage",
            expectedValue: "3.5–4.2 V",
            expectedMin: 3.5,
            expectedMax: 4.2,
            unit: "V",
          },
          {
            parameter: "Cell Group 3 Voltage",
            expectedValue: "3.5–4.2 V",
            expectedMin: 3.5,
            expectedMax: 4.2,
            unit: "V",
          },
        ],
        tools: ["Multimeter", "Cell Tester", "Clamp Meter"],
        rootCause:
          "Aged cells with reduced capacity, weak cell dragging down pack, or parasitic load.",
        repairSteps: [
          "Measure each cell group voltage after full charge",
          "Identify any cell below 4.0V at full charge (weak cell)",
          "Check for any parasitic drain with clamp meter (key off)",
          "Perform capacity test — replace battery if < 70% original capacity",
        ],
      },
      {
        id: "battery_cutoff_riding",
        name: "Battery Cutoff While Riding",
        symptom: "Vehicle suddenly cuts off during riding, restarts after rest",
        keywords: [
          "cutoff while riding",
          "sudden cutoff",
          "battery cutoff",
          "sudden stop riding",
        ],
        checks: [
          "Battery voltage under load",
          "BMS over-temperature sensor",
          "Main connector integrity",
          "Cell imbalance",
        ],
        expectedValues: [
          { label: "Battery Voltage Under Load", value: "> 42V (48V system)" },
          { label: "Battery Temperature", value: "< 45°C" },
        ],
        testParams: [
          {
            parameter: "Battery Voltage Under Load",
            expectedValue: "> 42 V",
            expectedMin: 42,
            expectedMax: 80,
            unit: "V",
          },
          {
            parameter: "Battery Temperature",
            expectedValue: "< 45 °C",
            expectedMin: 0,
            expectedMax: 45,
            unit: "°C",
          },
        ],
        tools: ["Multimeter", "Infrared Thermometer"],
        rootCause:
          "BMS cutting off due to voltage sag, temperature trip, or current spike through bad connector.",
        repairSteps: [
          "Measure battery voltage while applying load — if sags below 42V, battery is weak",
          "Check battery and BMS temperature during ride",
          "Inspect main battery connector for loose pins or heat marks",
          "Check for weak cells in pack",
        ],
      },
      {
        id: "battery_not_charging",
        name: "Battery Not Charging",
        symptom: "Charger connected but battery level does not increase",
        keywords: [
          "not charging",
          "battery not charging",
          "charger no effect",
          "charge not increasing",
        ],
        checks: [
          "Charger output voltage",
          "Charging port pins",
          "BMS charge FET",
          "Charging indicator",
        ],
        expectedValues: [
          { label: "Charger Output", value: "Rated voltage +5%" },
          {
            label: "Charge Current",
            value: "Per charger rating (1A–5A typical)",
          },
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
            parameter: "Charge Current",
            expectedValue: "1–5 A",
            expectedMin: 1,
            expectedMax: 5,
            unit: "A",
          },
        ],
        tools: ["Multimeter", "Clamp Meter"],
        rootCause:
          "Faulty charger, BMS charge FET failure, or damaged charging port.",
        repairSteps: [
          "Measure charger output voltage at plug",
          "Measure charge current entering battery with clamp meter",
          "Inspect charging port pins for damage",
          "Try another known-good charger",
          "Check BMS charge enable pin",
        ],
      },
    ],
  },
  {
    groupName: "Controller / ECU Fault",
    triggerKeywords: [
      "controller",
      "ecu",
      "controller problem",
      "controller fault",
    ],
    subFaults: [
      {
        id: "controller_no_output",
        name: "Controller No Output to Motor",
        symptom:
          "Motor receives no power, controller powered but motor does not run",
        keywords: [
          "controller no output",
          "controller dead output",
          "controller not working",
        ],
        checks: [
          "Controller power supply",
          "Controller enable signal",
          "Phase output voltages",
          "Fault LED codes",
        ],
        expectedValues: [
          { label: "Controller Input Voltage", value: "Battery voltage ±0.5V" },
          { label: "Enable Signal", value: "12V when key on" },
          { label: "Phase Output", value: "PWM 0–battery voltage" },
        ],
        testParams: [
          {
            parameter: "Controller Input Voltage",
            expectedValue: "48–72 V",
            expectedMin: 48,
            expectedMax: 72,
            unit: "V",
          },
          {
            parameter: "Enable Signal Voltage",
            expectedValue: "11–13 V",
            expectedMin: 11,
            expectedMax: 13,
            unit: "V",
          },
        ],
        tools: ["Multimeter", "Oscilloscope"],
        rootCause:
          "Controller damaged by overvoltage, water ingress, or MOSFET failure.",
        repairSteps: [
          "Check controller input voltage",
          "Verify enable signal present when key is ON",
          "Read fault LED blink code",
          "Inspect controller for water ingress or burnt components",
          "Replace controller if phase output absent with all inputs correct",
        ],
      },
      {
        id: "controller_overheating",
        name: "Controller Overheating",
        symptom: "Controller body very hot, power cuts under load or in heat",
        keywords: [
          "controller hot",
          "controller overheat",
          "controller temperature",
          "ecu overheat",
        ],
        checks: [
          "Controller temperature",
          "MOSFET heatsink contact",
          "Airflow around controller",
          "Load/current draw",
        ],
        expectedValues: [
          { label: "Controller Temp", value: "< 70°C" },
          { label: "Phase Current", value: "Within rated spec" },
        ],
        testParams: [
          {
            parameter: "Controller Temperature",
            expectedValue: "< 70 °C",
            expectedMin: 0,
            expectedMax: 70,
            unit: "°C",
          },
          {
            parameter: "Phase Current",
            expectedValue: "< 30 A",
            expectedMin: 0,
            expectedMax: 30,
            unit: "A",
          },
        ],
        tools: ["Infrared Thermometer", "Clamp Meter"],
        rootCause:
          "Poor heatsink contact, blocked airflow, or excessive current draw.",
        repairSteps: [
          "Measure controller surface temperature with IR thermometer",
          "Re-apply thermal paste between MOSFET and heatsink",
          "Ensure controller mounting allows airflow",
          "Check for overcurrent — reduce load or check motor for issues",
        ],
      },
      {
        id: "controller_mosfet",
        name: "Controller MOSFET Failure",
        symptom: "Controller blown, phase short, burning smell from controller",
        keywords: [
          "mosfet blown",
          "controller short",
          "controller burnt",
          "phase short",
        ],
        checks: [
          "MOSFET drain-source resistance",
          "Phase wire for short to GND",
          "Controller capacitors",
          "Blown component visual",
        ],
        expectedValues: [
          { label: "MOSFET Rds(on)", value: "< 0.1 Ω" },
          { label: "Phase to GND", value: "> 1 MΩ (insulation)" },
        ],
        testParams: [
          {
            parameter: "MOSFET Drain-Source",
            expectedValue: "0.05–0.1 Ω",
            expectedMin: 0.01,
            expectedMax: 0.1,
            unit: "Ω",
          },
          {
            parameter: "Phase Insulation to GND",
            expectedValue: "> 1 MΩ",
            expectedMin: 1000000,
            expectedMax: 999999999,
            unit: "Ω",
          },
        ],
        tools: ["Multimeter", "Insulation Tester"],
        rootCause:
          "Overvoltage, reverse connection, or motor short circuit destroyed MOSFETs.",
        repairSteps: [
          "Measure MOSFET drain-source in diode mode — short = blown MOSFET",
          "Inspect PCB visually for burnt marks",
          "Check if motor caused the short (test motor insulation first)",
          "Replace controller — MOSFET replacement requires PCB skills",
        ],
      },
    ],
  },
  {
    groupName: "Charging Fault",
    triggerKeywords: [
      "charging",
      "charger",
      "not charging",
      "charging problem",
    ],
    subFaults: [
      {
        id: "charger_no_output",
        name: "Charger Not Working / No Output",
        symptom: "Charger plugged in but no charging LED, charger dead",
        keywords: ["charger not working", "charger no output", "charger dead"],
        checks: [
          "Charger input (AC power)",
          "Charger output DC voltage",
          "Charger fan/LED",
          "Fuse inside charger",
        ],
        expectedValues: [
          { label: "AC Input", value: "220V ±10%" },
          { label: "DC Output", value: "Rated voltage ±5%" },
        ],
        testParams: [
          {
            parameter: "Charger DC Output Voltage",
            expectedValue: "54–84 V",
            expectedMin: 54,
            expectedMax: 84,
            unit: "V",
          },
          {
            parameter: "Charge Current",
            expectedValue: "1–5 A",
            expectedMin: 0.5,
            expectedMax: 5,
            unit: "A",
          },
        ],
        tools: ["Multimeter"],
        rootCause:
          "Charger internal fuse blown, AC supply issue, or charger circuit failure.",
        repairSteps: [
          "Verify AC socket has correct voltage",
          "Measure charger DC output at connector",
          "Listen for charger fan — silent = charger dead",
          "Replace charger if no output with correct AC supply",
        ],
      },
      {
        id: "charging_slow",
        name: "Slow Charging",
        symptom: "Charging takes much longer than normal",
        keywords: ["slow charging", "slow charge", "taking too long to charge"],
        checks: [
          "Charge current",
          "Charger rating vs battery capacity",
          "BMS charge current limit",
          "Charging port resistance",
        ],
        expectedValues: [
          { label: "Charge Current", value: "Per charger rating" },
          { label: "Port Resistance", value: "< 0.1 Ω" },
        ],
        testParams: [
          {
            parameter: "Charge Current",
            expectedValue: "1–5 A",
            expectedMin: 1,
            expectedMax: 5,
            unit: "A",
          },
          {
            parameter: "Charger Output Voltage",
            expectedValue: "54–84 V",
            expectedMin: 54,
            expectedMax: 84,
            unit: "V",
          },
        ],
        tools: ["Clamp Meter", "Multimeter"],
        rootCause:
          "Charger under-rated, high port resistance, or BMS limiting charge current.",
        repairSteps: [
          "Measure actual charge current with clamp meter",
          "Compare to charger rated current",
          "Check port pin resistance",
          "Check BMS charge current limit setting",
        ],
      },
      {
        id: "charging_stops_midway",
        name: "Charging Stops Midway",
        symptom:
          "Charging starts but stops before full charge, LED turns green too early",
        keywords: [
          "charging stops",
          "stops midway",
          "charging cuts off",
          "stops at 80%",
        ],
        checks: [
          "Cell voltage at cutoff point",
          "BMS over-voltage threshold",
          "Charger output voltage accuracy",
          "Cell imbalance",
        ],
        expectedValues: [
          { label: "Full Charge Cell Voltage", value: "4.15–4.20V per cell" },
          {
            label: "Charger Output",
            value: "Must match battery rated voltage",
          },
        ],
        testParams: [
          {
            parameter: "Battery Voltage at Cutoff",
            expectedValue: "54–84 V",
            expectedMin: 54,
            expectedMax: 84,
            unit: "V",
          },
          {
            parameter: "Highest Cell Voltage",
            expectedValue: "4.10–4.20 V",
            expectedMin: 4.0,
            expectedMax: 4.2,
            unit: "V",
          },
        ],
        tools: ["Multimeter", "Cell Tester"],
        rootCause:
          "One high cell triggering BMS over-voltage cutoff, or charger voltage too high.",
        repairSteps: [
          "Measure each cell group at point of cutoff",
          "Identify any cell above 4.20V (triggering BMS)",
          "Check charger output voltage — should not exceed rated pack voltage",
          "Balance cells or replace weak/high cell group",
        ],
      },
    ],
  },
  {
    groupName: "Brake Fault",
    triggerKeywords: ["brake", "brakes", "brake problem", "braking issue"],
    subFaults: [
      {
        id: "brake_not_stopping",
        name: "Brake Not Stopping Properly",
        symptom: "Vehicle requires long distance to stop, brakes feel weak",
        keywords: ["brake weak", "not stopping", "long braking", "brake fade"],
        checks: [
          "Brake pad thickness",
          "Disc/rotor condition",
          "Brake cable tension",
          "Hydraulic fluid level",
        ],
        expectedValues: [
          { label: "Brake Pad Thickness", value: "> 1.5 mm" },
          { label: "Disc Thickness", value: "> 3 mm" },
        ],
        testParams: [
          {
            parameter: "Brake Pad Thickness",
            expectedValue: "> 1.5 mm",
            expectedMin: 1.5,
            expectedMax: 20,
            unit: "mm",
          },
          {
            parameter: "Brake Sensor Signal (pressed)",
            expectedValue: "4.5–5 V",
            expectedMin: 4.5,
            expectedMax: 5.2,
            unit: "V",
          },
        ],
        tools: ["Vernier Caliper", "Multimeter"],
        rootCause: "Worn pads, glazed disc, or insufficient cable tension.",
        repairSteps: [
          "Measure pad thickness — replace if < 1.5mm",
          "Inspect disc for scoring or grooves",
          "Adjust cable tension or bleed hydraulic system",
          "Bed in new pads with 10 moderate stops",
        ],
      },
      {
        id: "brake_dragging",
        name: "Brake Dragging / Always Engaged",
        symptom:
          "Wheel does not spin freely, brake seems applied even when lever released",
        keywords: [
          "brake drag",
          "brake stuck",
          "wheel not free",
          "brake always on",
          "brake dragging",
        ],
        checks: [
          "Brake lever free play",
          "Caliper piston retraction",
          "Brake cable slack",
          "Brake sensor signal when released",
        ],
        expectedValues: [
          { label: "Brake Sensor (released)", value: "0V" },
          { label: "Lever Free Play", value: "2–5 mm" },
        ],
        testParams: [
          {
            parameter: "Brake Sensor Signal (released)",
            expectedValue: "0 V",
            expectedMin: 0,
            expectedMax: 0.5,
            unit: "V",
          },
          {
            parameter: "Wheel Spin Resistance",
            expectedValue: "Free spin (0 drag)",
            expectedMin: 0,
            expectedMax: 1,
            unit: "Nm",
          },
        ],
        tools: ["Multimeter"],
        rootCause:
          "Seized caliper, brake cable too tight, or brake sensor stuck ON causing regen always active.",
        repairSteps: [
          "Spin wheel by hand — resistance = brake drag",
          "Check brake lever free play (2–5mm)",
          "Measure brake sensor signal with lever released — should be 0V",
          "Bleed caliper or loosen cable if dragging",
          "Replace brake sensor if signal stuck at 5V when released",
        ],
      },
    ],
  },
];

export function detectSubFaultGroup(input: string): SubFaultGroup | null {
  const lower = input.toLowerCase();
  for (const group of SUB_FAULT_GROUPS) {
    if (group.triggerKeywords.some((kw) => lower.includes(kw))) {
      return group;
    }
  }
  return null;
}
