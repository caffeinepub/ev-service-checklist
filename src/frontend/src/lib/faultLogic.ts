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

  // ─── E01–E50 FAULT CODES (from uploaded fault table) ─────────────────────
  {
    keywords: [
      "controller overcurrent",
      "e01",
      "cut on load",
      "overcurrent",
      "high current load",
    ],
    category: "ECU / Controller Fault",
    checks: [
      "Battery voltage under load",
      "Motor phase wires",
      "Controller heating",
      "Controller housing",
      "Wheel rotation",
    ],
    expectedValues: [{ label: "Phase current", value: "Within rated limit" }],
    testParams: [
      {
        parameter: "Phase Current",
        expectedValue: "Within rated limit",
        expectedMin: 0,
        expectedMax: 30,
        unit: "A",
      },
    ],
    tools: ["Clamp meter"],
    rootCause:
      "Excessive load causing controller overcurrent protection to trigger.",
    repairSteps: [
      "Check battery voltage under load",
      "Inspect motor phase wires for short",
      "Check controller for heat damage",
      "Verify wheel rotates freely",
      "Replace controller if fault persists",
    ],
  },
  {
    keywords: [
      "hall sensor failure",
      "e02",
      "hall jerking",
      "sensor failure e02",
      "jerking e02",
    ],
    category: "Hall Sensor Fault",
    checks: [
      "5V supply to hall sensor",
      "Ground connection",
      "Hall output while rotating",
      "Connector condition",
    ],
    expectedValues: [{ label: "Hall sensor output", value: "0–5V switching" }],
    testParams: [
      {
        parameter: "Hall Sensor Output",
        expectedValue: "0–5V switching",
        expectedMin: 0,
        expectedMax: 5,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Faulty hall sensor giving no signal — causes jerking or no start.",
    repairSteps: [
      "Check 5V supply to hall sensor",
      "Verify ground connection",
      "Rotate wheel and measure hall output",
      "Inspect connectors for damage",
      "Replace hall sensor if no switching signal",
    ],
  },
  {
    keywords: [
      "throttle error",
      "e03",
      "no acceleration e03",
      "throttle e03",
      "no accel e03",
    ],
    category: "Throttle Fault",
    checks: [
      "Throttle supply voltage",
      "Ground continuity",
      "Full throttle output",
      "Half throttle output",
      "Signal smoothness",
    ],
    expectedValues: [{ label: "Throttle output range", value: "1–4V" }],
    testParams: [
      {
        parameter: "Throttle Signal",
        expectedValue: "1–4V",
        expectedMin: 1,
        expectedMax: 4,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Throttle sensor fault — no variation in signal output.",
    repairSteps: [
      "Check 5V supply to throttle",
      "Verify ground",
      "Measure output at idle and full twist",
      "Replace throttle if no variation",
      "Check wiring to controller",
    ],
  },
  {
    keywords: [
      "low voltage e04",
      "e04",
      "cutoff low",
      "battery cutoff e04",
      "voltage cutoff e04",
    ],
    category: "BMS Fault",
    checks: [
      "Battery resting voltage",
      "BMS output",
      "Voltage drop under load",
      "Load voltage measurement",
      "Voltage sag",
    ],
    expectedValues: [
      { label: "Battery voltage", value: "Above cutoff threshold" },
    ],
    testParams: [
      {
        parameter: "Battery Voltage Under Load",
        expectedValue: "Above cutoff",
        expectedMin: 42,
        expectedMax: 84,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Weak or depleted battery causing voltage drop below cutoff.",
    repairSteps: [
      "Measure resting battery voltage",
      "Check BMS output",
      "Measure voltage under full load",
      "Compare with rated cutoff voltage",
      "Replace battery if voltage sags excessively",
    ],
  },
  {
    keywords: [
      "overvoltage e05",
      "e05",
      "shutdown overvoltage",
      "over voltage e05",
    ],
    category: "Charging Port Fault",
    checks: [
      "Battery voltage after full charge",
      "Charger output voltage",
      "BMS overvoltage protection",
      "Controller input voltage",
      "Voltage rating match",
    ],
    expectedValues: [
      {
        label: "Battery voltage (charged)",
        value: "Within limit (e.g. <60V for 48V)",
      },
    ],
    testParams: [
      {
        parameter: "Charger Output Voltage",
        expectedValue: "Within battery limit",
        expectedMin: 0,
        expectedMax: 60,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Charger fault or BMS failure allowing voltage above safe limit.",
    repairSteps: [
      "Check battery voltage after charging",
      "Measure charger output",
      "Inspect BMS overvoltage cut",
      "Check controller input rating",
      "Replace charger if output too high",
    ],
  },
  {
    keywords: [
      "phase missing",
      "e06",
      "vibration phase",
      "missing phase",
      "phase loss e06",
    ],
    category: "Motor Fault",
    checks: [
      "U phase output",
      "V phase output",
      "W phase output",
      "Phase current balance",
      "Controller output",
    ],
    expectedValues: [{ label: "All phases", value: "Equal and present" }],
    testParams: [
      {
        parameter: "Phase U Voltage",
        expectedValue: "AC present",
        expectedMin: 1,
        expectedMax: 200,
        unit: "V",
      },
      {
        parameter: "Phase V Voltage",
        expectedValue: "AC present",
        expectedMin: 1,
        expectedMax: 200,
        unit: "V",
      },
      {
        parameter: "Phase W Voltage",
        expectedValue: "AC present",
        expectedMin: 1,
        expectedMax: 200,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "One phase wire cut or broken — causes vibration and low torque.",
    repairSteps: [
      "Check each phase (U, V, W) output",
      "Compare phase current balance",
      "Inspect for cut or broken phase wire",
      "Test controller output on each phase",
      "Repair or replace damaged phase wire",
    ],
  },
  {
    keywords: [
      "controller overheat",
      "e07",
      "stops when hot",
      "controller heat e07",
    ],
    category: "Overheat",
    checks: [
      "Airflow around controller",
      "Heat sink mounting",
      "Dust accumulation",
      "Controller output",
      "Wheel rotation",
    ],
    expectedValues: [
      { label: "Controller temperature", value: "Normal (<70°C)" },
    ],
    testParams: [
      {
        parameter: "Controller Temperature",
        expectedValue: "< 70 °C",
        expectedMin: 0,
        expectedMax: 70,
        unit: "°C",
      },
    ],
    tools: ["Thermal meter"],
    rootCause: "Controller overheating due to poor ventilation or overload.",
    repairSteps: [
      "Check airflow around controller",
      "Clean dust from heat sink",
      "Verify heat sink is properly mounted",
      "Reduce load or check for motor stall",
      "Replace controller if thermal protection triggers repeatedly",
    ],
  },
  {
    keywords: [
      "motor stall",
      "e08",
      "motor stuck e08",
      "stall e08",
      "wheel stuck motor",
    ],
    category: "Motor Fault",
    checks: [
      "Mechanical jam in wheel",
      "Bearing condition",
      "Foreign debris",
      "Phase resistance",
      "Controller output",
    ],
    expectedValues: [{ label: "Wheel rotation", value: "Free spin by hand" }],
    testParams: [
      {
        parameter: "Phase Resistance (U-V, V-W, W-U)",
        expectedValue: "0.2–1 Ω",
        expectedMin: 0.2,
        expectedMax: 1,
        unit: "Ω",
      },
    ],
    tools: ["Manual inspection"],
    rootCause: "Mechanical jam or bearing failure preventing motor rotation.",
    repairSteps: [
      "Try to spin wheel by hand — check for resistance",
      "Remove any debris from wheel/motor",
      "Check bearing for damage",
      "Measure phase resistance",
      "Replace bearings or motor if seized",
    ],
  },
  {
    keywords: [
      "mosfet failure",
      "e09",
      "fuse blow mosfet",
      "mosfet e09",
      "fuse blows instantly",
    ],
    category: "ECU / Controller Fault",
    checks: [
      "Phase to ground continuity",
      "Burn marks on controller",
      "Individual MOSFET test",
      "Controller input voltage",
    ],
    expectedValues: [
      { label: "Phase-to-ground", value: "No continuity (infinite)" },
    ],
    testParams: [
      {
        parameter: "Phase to Ground Resistance",
        expectedValue: "No short (infinite)",
        expectedMin: 1000,
        expectedMax: 999999,
        unit: "Ω",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "MOSFET short circuit inside controller — causes fuse blow and wheel lock.",
    repairSteps: [
      "Disconnect motor",
      "Check phase to ground — no continuity expected",
      "Look for burn marks on PCB",
      "Test each MOSFET with multimeter",
      "Replace controller (not field-repairable)",
    ],
  },
  {
    keywords: [
      "hall angle error",
      "e10",
      "misfire hall",
      "hall sequence error",
      "wrong hall sequence",
    ],
    category: "Hall Sensor Fault",
    checks: [
      "Hall sensor sequence",
      "Phase wiring order",
      "Signal output comparison",
      "Wiring sequence verification",
    ],
    expectedValues: [
      { label: "Hall sequence", value: "Correct 120° phase shift" },
    ],
    testParams: [
      {
        parameter: "Hall Sequence",
        expectedValue: "120° phase shift",
        expectedMin: 0,
        expectedMax: 5,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Incorrect hall sensor wiring sequence causing misfire.",
    repairSteps: [
      "Read hall sensor sequence output",
      "Compare with correct sequence",
      "Rewire if sequence is wrong",
      "Check signal on each hall wire",
      "Verify sequence after correction",
    ],
  },
  {
    keywords: [
      "communication error e11",
      "e11",
      "no display e11",
      "can communication e11",
    ],
    category: "Communication Fault",
    checks: [
      "Display power supply",
      "Signal wire continuity",
      "Connector condition",
      "Data wire integrity",
      "Alternate display test",
    ],
    expectedValues: [{ label: "Communication signal", value: "Stable" }],
    testParams: [
      {
        parameter: "CAN/Signal Voltage",
        expectedValue: "Stable 2.5–3.5V",
        expectedMin: 2,
        expectedMax: 4,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Harness or connector issue interrupting communication to display.",
    repairSteps: [
      "Check display power supply",
      "Verify signal wire continuity",
      "Inspect connector pins",
      "Check data wire for damage",
      "Try alternate display to isolate fault",
    ],
  },
  {
    keywords: [
      "battery disconnect",
      "e12",
      "sudden off battery",
      "battery loose disconnect",
    ],
    category: "BMS Fault",
    checks: [
      "Battery voltage stability",
      "Fuse condition",
      "Battery connections (shake test)",
      "Fuse continuity",
    ],
    expectedValues: [{ label: "Battery voltage", value: "Stable (no drop)" }],
    testParams: [
      {
        parameter: "Battery Voltage (shake test)",
        expectedValue: "Stable",
        expectedMin: 40,
        expectedMax: 85,
        unit: "V",
      },
    ],
    tools: ["Inspection"],
    rootCause:
      "Loose battery connection or blown fuse causing sudden shutdown.",
    repairSteps: [
      "Measure battery voltage while shaking harness",
      "Check main fuse condition",
      "Inspect battery connector",
      "Replace fuse if blown",
      "Tighten battery terminals",
    ],
  },
  {
    keywords: ["fuse failure e13", "e13", "fuse dead e13", "blown fuse e13"],
    category: "Wiring / Connector Fault",
    checks: [
      "Fuse visual inspection",
      "Ground continuity",
      "Chassis ground",
      "Wiring condition",
    ],
    expectedValues: [{ label: "Fuse", value: "Intact (OK)" }],
    testParams: [
      {
        parameter: "Fuse Continuity",
        expectedValue: "Continuous (0 Ω)",
        expectedMin: 0,
        expectedMax: 0.5,
        unit: "Ω",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Blown fuse due to short circuit or overload.",
    repairSteps: [
      "Visually inspect fuse for open filament",
      "Check ground continuity",
      "Inspect chassis ground bolt",
      "Check wiring for short",
      "Replace fuse with correct rating",
    ],
  },
  {
    keywords: [
      "ground loss",
      "e14",
      "erratic ground e14",
      "floating ground e14",
      "bad ground e14",
    ],
    category: "Wiring / Connector Fault",
    checks: [
      "Chassis ground resistance",
      "Ground wiring",
      "Ground bolt tightness",
      "Wiring condition",
    ],
    expectedValues: [{ label: "Ground resistance", value: "0 Ω" }],
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
      "Poor ground connection causing erratic sensor and control behavior.",
    repairSteps: [
      "Check chassis ground resistance",
      "Inspect all ground wiring",
      "Tighten ground bolts",
      "Check for corroded ground points",
      "Add new ground wire if needed",
    ],
  },
  {
    keywords: ["short circuit e15", "e15", "wiring short e15", "short smell"],
    category: "Wiring / Connector Fault",
    checks: [
      "Wire insulation condition",
      "Connector inspection",
      "Section isolation test",
      "Short identification",
    ],
    expectedValues: [
      { label: "Insulation resistance", value: "No short (infinite)" },
    ],
    testParams: [
      {
        parameter: "Wire-to-Ground Resistance",
        expectedValue: "No short",
        expectedMin: 1000,
        expectedMax: 999999,
        unit: "Ω",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Damaged wire insulation or connector causing short circuit.",
    repairSteps: [
      "Isolate each section to find short",
      "Inspect wire insulation for damage",
      "Check all connectors",
      "Replace damaged wires",
      "Repair or replace affected section",
    ],
  },
  {
    keywords: [
      "connector overheat",
      "e16",
      "melted connector e16",
      "connector heat e16",
    ],
    category: "Wiring / Connector Fault",
    checks: [
      "Connector pin condition",
      "Wiring integrity",
      "Battery current load",
      "Connector contact resistance",
    ],
    expectedValues: [
      { label: "Connector condition", value: "Clean metal contact" },
    ],
    testParams: [
      {
        parameter: "Connector Resistance",
        expectedValue: "< 0.1 Ω",
        expectedMin: 0,
        expectedMax: 0.1,
        unit: "Ω",
      },
    ],
    tools: ["Visual inspection"],
    rootCause: "High resistance at connector causing heat buildup and melting.",
    repairSteps: [
      "Inspect connector pins for burn/melt",
      "Check current load vs connector rating",
      "Measure contact resistance",
      "Clean or replace connector",
      "Verify current does not exceed rating",
    ],
  },
  {
    keywords: [
      "ignition fault",
      "e17",
      "key no start e17",
      "ignition switch fault",
    ],
    category: "ECU / Controller Fault",
    checks: [
      "Key switch output voltage",
      "Wiring from key to controller",
      "Controller input voltage",
      "Connector condition",
    ],
    expectedValues: [{ label: "Key output", value: "Battery voltage when ON" }],
    testParams: [
      {
        parameter: "Key Switch Output",
        expectedValue: "Battery voltage (ON)",
        expectedMin: 40,
        expectedMax: 85,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Ignition switch or wiring fault — no power to controller.",
    repairSteps: [
      "Check key switch output voltage",
      "Inspect wiring from key to controller",
      "Measure controller input voltage",
      "Check connector",
      "Replace key switch if faulty",
    ],
  },
  {
    keywords: [
      "voltage drop under load e18",
      "e18",
      "voltage drop e18",
      "cut load e18",
    ],
    category: "BMS Fault",
    checks: [
      "Resting voltage",
      "Voltage under load",
      "Voltage drop calculation",
      "Battery condition",
      "Wiring resistance",
    ],
    expectedValues: [{ label: "Voltage drop under load", value: "< 5V" }],
    testParams: [
      {
        parameter: "Voltage Drop Under Load",
        expectedValue: "< 5V",
        expectedMin: 0,
        expectedMax: 5,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Weak battery or high-resistance wiring causing excessive voltage drop.",
    repairSteps: [
      "Measure resting voltage",
      "Measure voltage under full load",
      "Calculate drop",
      "Check wiring for high resistance",
      "Replace battery if drop > 5V",
    ],
  },
  {
    keywords: [
      "emi noise e19",
      "e19",
      "random signal noise e19",
      "emi interference e19",
    ],
    category: "Communication Fault",
    checks: [
      "Signal wire routing",
      "Wire separation (power vs signal)",
      "Shielding condition",
      "Grounding quality",
    ],
    expectedValues: [{ label: "Signal", value: "Clean and stable" }],
    testParams: [
      {
        parameter: "Signal Noise",
        expectedValue: "Stable (no interference)",
        expectedMin: 0,
        expectedMax: 0.2,
        unit: "V",
      },
    ],
    tools: ["Inspection"],
    rootCause:
      "Electromagnetic interference from power wires affecting signal lines.",
    repairSteps: [
      "Inspect signal wire routing",
      "Separate power and signal wires",
      "Add shielding to signal cables",
      "Verify proper grounding",
      "Re-route wires away from high-current lines",
    ],
  },
  {
    keywords: [
      "reverse fault",
      "e20",
      "no reverse e20",
      "reverse direction fault e20",
    ],
    category: "Motor Fault",
    checks: [
      "Reverse switch output",
      "Wiring to controller",
      "Controller reverse signal",
      "Reverse function test",
    ],
    expectedValues: [{ label: "Reverse signal", value: "ON/OFF switching" }],
    testParams: [
      {
        parameter: "Reverse Switch Signal",
        expectedValue: "ON when engaged",
        expectedMin: 0,
        expectedMax: 5,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Reverse switch or wiring fault — no reverse signal to controller.",
    repairSteps: [
      "Check reverse switch output",
      "Inspect wiring to controller",
      "Measure signal with switch engaged",
      "Test controller reverse function",
      "Replace switch or repair wiring",
    ],
  },
  {
    keywords: [
      "brake switch fault",
      "e21",
      "brake switch no run",
      "brake switch e21",
    ],
    category: "Brake Issue",
    checks: [
      "Brake switch continuity",
      "Signal wire",
      "Switch output when released",
      "Test with multimeter",
    ],
    expectedValues: [{ label: "Brake signal (released)", value: "OFF (0V)" }],
    testParams: [
      {
        parameter: "Brake Switch Signal (released)",
        expectedValue: "0 V",
        expectedMin: 0,
        expectedMax: 0.5,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Brake switch stuck ON — prevents vehicle from accelerating.",
    repairSteps: [
      "Check brake switch continuity",
      "Verify signal is OFF when lever released",
      "Inspect signal wire",
      "Disconnect and test switch directly",
      "Replace brake switch if stuck ON",
    ],
  },
  {
    keywords: [
      "brake always on e22",
      "e22",
      "brake stuck on e22",
      "no acceleration brake e22",
    ],
    category: "Brake Issue",
    checks: [
      "Brake switch condition",
      "Wheel rotation",
      "Wiring for short",
      "Disconnect and test",
    ],
    expectedValues: [
      { label: "Brake switch (released)", value: "Open circuit" },
    ],
    testParams: [
      {
        parameter: "Brake Switch (released)",
        expectedValue: "Open (no continuity)",
        expectedMin: 1000,
        expectedMax: 999999,
        unit: "Ω",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Brake switch short-circuit or wiring fault holding brake signal active.",
    repairSteps: [
      "Check brake switch for short",
      "Spin wheel — check for drag",
      "Inspect wiring for short to ground",
      "Disconnect switch and test",
      "Replace brake switch",
    ],
  },
  {
    keywords: ["brake failure e23", "e23", "no stopping e23", "brake weak e23"],
    category: "Brake Issue",
    checks: [
      "Brake pad wear",
      "Disc condition",
      "Cable tension",
      "Brake effectiveness test",
    ],
    expectedValues: [
      { label: "Brake performance", value: "Proper braking force" },
    ],
    testParams: [
      {
        parameter: "Brake Pad Thickness",
        expectedValue: "> 2mm",
        expectedMin: 2,
        expectedMax: 10,
        unit: "mm",
      },
    ],
    tools: ["Inspection tools"],
    rootCause: "Worn brake pads or disc causing inadequate braking.",
    repairSteps: [
      "Inspect brake pads for wear",
      "Check disc for scoring or warping",
      "Adjust cable tension",
      "Test both brakes individually",
      "Replace pads or disc as needed",
    ],
  },
  {
    keywords: [
      "regen fault e24",
      "e24",
      "no regen e24",
      "regenerative fault e24",
    ],
    category: "Regen Braking Fault",
    checks: [
      "Brake lever test",
      "Voltage rise during braking",
      "Controller regen settings",
      "Regen function check",
    ],
    expectedValues: [
      { label: "Voltage during regen", value: "Slight rise (regen active)" },
    ],
    testParams: [
      {
        parameter: "Battery Voltage During Regen",
        expectedValue: "Rise (+1–3V)",
        expectedMin: 1,
        expectedMax: 5,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Regen braking disabled or controller fault — no energy recovery.",
    repairSteps: [
      "Apply brake and measure voltage rise",
      "Check controller regen settings",
      "Inspect brake switch signal to controller",
      "Enable regen in controller settings",
      "Replace controller if regen circuit failed",
    ],
  },
  {
    keywords: [
      "brake delay",
      "e25",
      "brake response delay",
      "sensor delay brake e25",
    ],
    category: "Brake Issue",
    checks: ["Brake sensor response time", "Wiring condition", "Signal timing"],
    expectedValues: [{ label: "Brake response", value: "Instant cut-off" }],
    testParams: [
      {
        parameter: "Brake Signal Response",
        expectedValue: "< 100ms",
        expectedMin: 0,
        expectedMax: 0.1,
        unit: "s",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Delayed brake sensor signal — motor continues running after braking.",
    repairSteps: [
      "Check brake sensor timing",
      "Inspect wiring for high resistance",
      "Measure signal response",
      "Replace brake sensor",
      "Re-route wiring if interference suspected",
    ],
  },
  {
    keywords: [
      "controller memory error",
      "e26",
      "controller glitch e26",
      "internal fault e26",
      "controller reset loop",
    ],
    category: "ECU / Controller Fault",
    checks: ["Controller error log", "Wiring stability", "Error scan"],
    expectedValues: [{ label: "Error", value: "No repeat after reset" }],
    testParams: [
      {
        parameter: "Controller Error Code",
        expectedValue: "No repeat fault",
        expectedMin: 0,
        expectedMax: 0,
        unit: "",
      },
    ],
    tools: ["Diagnostic tool"],
    rootCause:
      "Controller internal memory fault causing repeated errors or glitches.",
    repairSteps: [
      "Reset controller",
      "Read error log",
      "Inspect wiring for instability",
      "Scan for fault codes",
      "Replace controller if fault repeats",
    ],
  },
  {
    keywords: ["motor sync loss", "e27", "motor sync e27", "jerking sync e27"],
    category: "Motor Fault",
    checks: [
      "Hall signal integrity",
      "Connector condition",
      "Signal comparison across halls",
      "Test run after repair",
    ],
    expectedValues: [{ label: "Motor sync", value: "Sync OK" }],
    testParams: [
      {
        parameter: "Hall Signal Timing",
        expectedValue: "Synchronized 120°",
        expectedMin: 0,
        expectedMax: 5,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Hall sensor signal mismatch causing motor sync loss and jerking.",
    repairSteps: [
      "Check hall signal on each wire",
      "Inspect connectors",
      "Compare signals across all three halls",
      "Replace faulty hall sensor",
      "Test run after repair",
    ],
  },
  {
    keywords: [
      "battery overheat",
      "e28",
      "battery hot e28",
      "battery thermal e28",
    ],
    category: "BMS Fault",
    checks: [
      "Battery voltage output",
      "Cell voltage",
      "BMS output",
      "Cooling/ventilation",
      "Cell health",
    ],
    expectedValues: [
      { label: "Battery temperature", value: "Normal (< 45°C)" },
    ],
    testParams: [
      {
        parameter: "Battery Temperature",
        expectedValue: "< 45 °C",
        expectedMin: 0,
        expectedMax: 45,
        unit: "°C",
      },
    ],
    tools: ["Thermal meter"],
    rootCause: "Bad cell or charging fault causing battery overheating.",
    repairSteps: [
      "Measure battery output voltage",
      "Check individual cell voltages",
      "Inspect BMS for thermal cutoff",
      "Check cooling/ventilation",
      "Replace bad cells or full pack",
    ],
  },
  {
    keywords: [
      "charger fault e29",
      "e29",
      "no charging e29",
      "charger no output e29",
    ],
    category: "Charging Port Fault",
    checks: [
      "Charger input power",
      "Charger output voltage",
      "Cable condition",
      "Battery acceptance",
      "Fuse",
    ],
    expectedValues: [
      { label: "Charger output", value: "Rated voltage (e.g. 54–84V)" },
    ],
    testParams: [
      {
        parameter: "Charger Output Voltage",
        expectedValue: "54–84V",
        expectedMin: 54,
        expectedMax: 84,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Faulty charger not producing correct output voltage.",
    repairSteps: [
      "Check charger input power",
      "Measure charger output voltage",
      "Inspect charging cable",
      "Check battery input fuse",
      "Replace charger if no output",
    ],
  },
  {
    keywords: ["can fault e30", "e30", "can bus e30", "no communication e30"],
    category: "Communication Fault",
    checks: [
      "CAN bus voltage",
      "Connector condition",
      "CAN termination resistor",
      "Device communication test",
    ],
    expectedValues: [{ label: "CAN bus voltage", value: "Stable 2–3V" }],
    testParams: [
      {
        parameter: "CAN Bus Voltage",
        expectedValue: "2–3V",
        expectedMin: 2,
        expectedMax: 3,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "CAN bus fault due to wiring or termination issue.",
    repairSteps: [
      "Measure CAN bus voltage",
      "Inspect connectors",
      "Check CAN termination resistor",
      "Isolate faulty device",
      "Replace wiring or device",
    ],
  },
  {
    keywords: [
      "speed sensor fault e31",
      "e31",
      "no speed reading e31",
      "speedometer fault e31",
    ],
    category: "Communication Fault",
    checks: [
      "Wheel rotation",
      "Speed sensor signal",
      "Sensor mounting",
      "Wiring to display",
    ],
    expectedValues: [
      { label: "Speed sensor signal", value: "Pulse present when rotating" },
    ],
    testParams: [
      {
        parameter: "Speed Sensor Signal",
        expectedValue: "Pulse when rotating",
        expectedMin: 0,
        expectedMax: 5,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Speed sensor fault — no signal to display or controller.",
    repairSteps: [
      "Rotate wheel slowly and measure signal",
      "Inspect sensor mounting position",
      "Check wiring to display",
      "Replace speed sensor",
      "Verify display reading after replacement",
    ],
  },
  {
    keywords: [
      "throttle calibration e32",
      "e32",
      "throttle uneven e32",
      "throttle calibration error",
    ],
    category: "Throttle Fault",
    checks: [
      "Idle voltage",
      "Full throttle voltage",
      "Voltage range comparison",
      "System reset",
    ],
    expectedValues: [
      { label: "Throttle response", value: "Smooth 1–4V range" },
    ],
    testParams: [
      {
        parameter: "Throttle Idle Voltage",
        expectedValue: "~1V",
        expectedMin: 0.8,
        expectedMax: 1.2,
        unit: "V",
      },
      {
        parameter: "Throttle Full Voltage",
        expectedValue: "~4V",
        expectedMin: 3.8,
        expectedMax: 4.2,
        unit: "V",
      },
    ],
    tools: ["Diagnostic tool"],
    rootCause:
      "Throttle out of calibration — causes uneven or erratic acceleration.",
    repairSteps: [
      "Check idle voltage (~1V)",
      "Check full throttle voltage (~4V)",
      "Compare with expected range",
      "Reset system and recalibrate",
      "Replace throttle if range incorrect",
    ],
  },
  {
    keywords: [
      "controller lock e33",
      "e33",
      "locked controller e33",
      "controller unlock e33",
    ],
    category: "ECU / Controller Fault",
    checks: [
      "Display status",
      "Key input signal",
      "Unlock procedure",
      "Controller reset",
    ],
    expectedValues: [{ label: "Controller status", value: "Unlocked" }],
    testParams: [
      {
        parameter: "Controller Lock Status",
        expectedValue: "Unlocked",
        expectedMin: 0,
        expectedMax: 1,
        unit: "",
      },
    ],
    tools: ["Diagnostic tool"],
    rootCause: "Controller security lock activated — vehicle immobilized.",
    repairSteps: [
      "Check display for lock indication",
      "Verify key input signal",
      "Follow unlock procedure",
      "Reset controller",
      "Contact manufacturer if lock persists",
    ],
  },
  {
    keywords: [
      "phase overvoltage e34",
      "e34",
      "surge phase e34",
      "phase surge e34",
    ],
    category: "ECU / Controller Fault",
    checks: [
      "Phase voltage measurement",
      "Phase voltage comparison",
      "Wiring condition",
      "Load test",
    ],
    expectedValues: [{ label: "Phase voltage", value: "Normal (balanced)" }],
    testParams: [
      {
        parameter: "Phase Voltage",
        expectedValue: "Normal rated",
        expectedMin: 0,
        expectedMax: 100,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Overvoltage on one phase causing controller fault.",
    repairSteps: [
      "Measure each phase voltage",
      "Compare phases for imbalance",
      "Check wiring for fault",
      "Test under load",
      "Replace controller if voltage not regulated",
    ],
  },
  {
    keywords: [
      "temp sensor fault e35",
      "e35",
      "wrong temperature e35",
      "temperature sensor e35",
    ],
    category: "Overheat",
    checks: [
      "Sensor output voltage",
      "Output comparison to actual temp",
      "Connector condition",
      "Sensor replacement test",
    ],
    expectedValues: [
      { label: "Temp sensor output", value: "Accurate reading" },
    ],
    testParams: [
      {
        parameter: "Temperature Sensor Output",
        expectedValue: "Matches actual temp",
        expectedMin: 0,
        expectedMax: 150,
        unit: "°C",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Faulty temperature sensor giving incorrect readings.",
    repairSteps: [
      "Measure sensor output voltage",
      "Compare with known temperature",
      "Inspect connector",
      "Test with known-good sensor",
      "Replace sensor if reading incorrect",
    ],
  },
  {
    keywords: [
      "dc dc fault",
      "e36",
      "no 12v e36",
      "dcdc converter fault",
      "12v supply fault",
    ],
    category: "ECU / Controller Fault",
    checks: [
      "DC-DC input voltage",
      "Fuse condition",
      "DC-DC output voltage",
      "Output wiring",
      "Load test",
    ],
    expectedValues: [{ label: "DC-DC output", value: "12V" }],
    testParams: [
      {
        parameter: "DC-DC Output Voltage",
        expectedValue: "12V",
        expectedMin: 11,
        expectedMax: 13,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "DC-DC converter fault — no 12V supply to accessories.",
    repairSteps: [
      "Check DC-DC input voltage",
      "Inspect fuse",
      "Measure output voltage",
      "Inspect wiring",
      "Replace DC-DC converter if no output",
    ],
  },
  {
    keywords: [
      "display lost e37",
      "e37",
      "blank display e37",
      "no display e37",
    ],
    category: "Communication Fault",
    checks: [
      "Display cable",
      "Signal wiring",
      "Supply voltage to display",
      "Display unit test",
    ],
    expectedValues: [{ label: "Display", value: "Powered and showing data" }],
    testParams: [
      {
        parameter: "Display Supply Voltage",
        expectedValue: "Battery voltage",
        expectedMin: 10,
        expectedMax: 85,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Display cable, power, or signal fault causing blank screen.",
    repairSteps: [
      "Check display cable connection",
      "Inspect signal wiring",
      "Measure supply voltage to display",
      "Try replacement display",
      "Replace display if no output",
    ],
  },
  {
    keywords: ["current sensor fault e38", "e38", "wrong current reading e38"],
    category: "ECU / Controller Fault",
    checks: [
      "Actual current measurement",
      "Sensor output comparison",
      "Wiring condition",
      "System reset",
    ],
    expectedValues: [{ label: "Current sensor reading", value: "Accurate" }],
    testParams: [
      {
        parameter: "Measured vs Sensor Current",
        expectedValue: "< 5% deviation",
        expectedMin: 0,
        expectedMax: 5,
        unit: "%",
      },
    ],
    tools: ["Clamp meter", "Diagnostic tool"],
    rootCause: "Faulty current sensor giving incorrect readings to controller.",
    repairSteps: [
      "Measure actual current with clamp meter",
      "Compare with controller reading",
      "Inspect sensor wiring",
      "Reset system",
      "Replace current sensor if inaccurate",
    ],
  },
  {
    keywords: [
      "relay failure e39",
      "e39",
      "stuck relay e39",
      "relay stuck e39",
    ],
    category: "Pre-Charge Fault",
    checks: [
      "Relay click sound",
      "Relay continuity",
      "Output when active",
      "Coil condition",
    ],
    expectedValues: [{ label: "Relay operation", value: "ON/OFF switching" }],
    testParams: [
      {
        parameter: "Relay Continuity (when ON)",
        expectedValue: "Continuous",
        expectedMin: 0,
        expectedMax: 0.5,
        unit: "Ω",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Stuck or failed relay causing loss of power switching.",
    repairSteps: [
      "Listen for relay click",
      "Check relay continuity",
      "Measure output when activated",
      "Inspect coil",
      "Replace relay if stuck or failed",
    ],
  },
  {
    keywords: [
      "precharge fault e40",
      "e40",
      "precharge spark e40",
      "spark precharge e40",
    ],
    category: "Pre-Charge Fault",
    checks: [
      "Precharge resistor condition",
      "Precharge circuit continuity",
      "Voltage rise during precharge",
      "Main relay timing",
    ],
    expectedValues: [
      { label: "Precharge", value: "Smooth voltage rise (no spark)" },
    ],
    testParams: [
      {
        parameter: "Voltage Rise During Precharge",
        expectedValue: "Smooth (0–battery V)",
        expectedMin: 0,
        expectedMax: 85,
        unit: "V",
      },
    ],
    tools: ["Inspection"],
    rootCause:
      "Failed precharge resistor or circuit causing spark at main relay.",
    repairSteps: [
      "Check precharge resistor",
      "Inspect precharge circuit",
      "Measure voltage rise on capacitor",
      "Check relay switching timing",
      "Replace precharge resistor if failed",
    ],
  },
  {
    keywords: ["bms cutoff e41", "e41", "bms off e41", "bms shutdown e41"],
    category: "BMS Fault",
    checks: [
      "Battery voltage",
      "BMS output",
      "Cell voltages",
      "Cell balancing",
      "BMS reset",
    ],
    expectedValues: [{ label: "BMS output", value: "Normal (not cut)" }],
    testParams: [
      {
        parameter: "BMS Output Voltage",
        expectedValue: "Full battery voltage",
        expectedMin: 40,
        expectedMax: 85,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "BMS protection triggered — cell fault or imbalance causing cutoff.",
    repairSteps: [
      "Measure battery voltage",
      "Check BMS output",
      "Measure individual cell voltages",
      "Balance cells",
      "Reset BMS and retest",
    ],
  },
  {
    keywords: [
      "insulation failure",
      "e42",
      "electric shock e42",
      "insulation fault e42",
      "leakage shock",
    ],
    category: "Wiring / Connector Fault",
    checks: [
      "Insulation resistance (phase to body)",
      "Phase wire condition",
      "Body leakage current",
    ],
    expectedValues: [
      { label: "Insulation resistance", value: "Infinite (> 1MΩ)" },
    ],
    testParams: [
      {
        parameter: "Insulation Resistance",
        expectedValue: "> 1 MΩ",
        expectedMin: 1000000,
        expectedMax: 9999999,
        unit: "Ω",
      },
    ],
    tools: ["Megger"],
    rootCause:
      "Insulation breakdown causing electric shock risk — safety critical.",
    repairSteps: [
      "Measure insulation resistance with Megger",
      "Identify leaking phase wire",
      "Inspect motor insulation",
      "Replace damaged wiring",
      "Do NOT operate until insulation is repaired",
    ],
  },
  {
    keywords: [
      "motor overspeed e43",
      "e43",
      "high speed fault e43",
      "overspeed e43",
    ],
    category: "Motor Fault",
    checks: [
      "Speed sensor reading",
      "Controller speed limit setting",
      "Speed limit parameter",
    ],
    expectedValues: [{ label: "Motor speed", value: "Within rated limit" }],
    testParams: [
      {
        parameter: "Motor Speed",
        expectedValue: "Within rated RPM",
        expectedMin: 0,
        expectedMax: 1500,
        unit: "RPM",
      },
    ],
    tools: ["Diagnostic tool"],
    rootCause:
      "Controller speed limit fault or sensor error allowing overspeed.",
    repairSteps: [
      "Check speed sensor reading",
      "Compare with rated RPM",
      "Check controller speed limit parameter",
      "Adjust speed limit setting",
      "Replace controller if speed not regulated",
    ],
  },
  {
    keywords: [
      "emergency stop e44",
      "e44",
      "no power emergency e44",
      "e-stop fault",
    ],
    category: "ECU / Controller Fault",
    checks: ["Emergency stop switch", "Switch wiring", "Reset procedure"],
    expectedValues: [
      {
        label: "Emergency stop",
        value: "ON (normal) — active only when engaged",
      },
    ],
    testParams: [
      {
        parameter: "Emergency Stop Switch",
        expectedValue: "Closed normally",
        expectedMin: 0,
        expectedMax: 0.5,
        unit: "Ω",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Emergency stop switch activated or stuck — cuts all power.",
    repairSteps: [
      "Check emergency stop switch position",
      "Inspect switch wiring",
      "Perform reset procedure",
      "Test vehicle after reset",
      "Replace switch if stuck",
    ],
  },
  {
    keywords: [
      "anti theft lock",
      "e45",
      "anti-theft e45",
      "vehicle locked e45",
      "security lock e45",
    ],
    category: "ECU / Controller Fault",
    checks: [
      "Anti-theft option status",
      "Unlock code verification",
      "Unlock test",
      "Lock reset",
    ],
    expectedValues: [{ label: "Vehicle status", value: "Unlocked" }],
    testParams: [
      {
        parameter: "Anti-theft Status",
        expectedValue: "Unlocked",
        expectedMin: 0,
        expectedMax: 1,
        unit: "",
      },
    ],
    tools: ["Diagnostic tool"],
    rootCause: "Anti-theft security lock active — vehicle immobilized.",
    repairSteps: [
      "Check anti-theft option",
      "Verify unlock code",
      "Perform unlock procedure",
      "Reset lock system",
      "Contact manufacturer if unable to unlock",
    ],
  },
  {
    keywords: [
      "phase current imbalance e46",
      "e46",
      "uneven phase current e46",
    ],
    category: "Motor Fault",
    checks: [
      "Phase U current",
      "Phase V current",
      "Phase W current",
      "Current balance comparison",
    ],
    expectedValues: [{ label: "Phase currents (U, V, W)", value: "Equal" }],
    testParams: [
      {
        parameter: "Phase U Current",
        expectedValue: "Equal to V and W",
        expectedMin: 0,
        expectedMax: 30,
        unit: "A",
      },
      {
        parameter: "Phase V Current",
        expectedValue: "Equal to U and W",
        expectedMin: 0,
        expectedMax: 30,
        unit: "A",
      },
      {
        parameter: "Phase W Current",
        expectedValue: "Equal to U and V",
        expectedMin: 0,
        expectedMax: 30,
        unit: "A",
      },
    ],
    tools: ["Clamp meter"],
    rootCause:
      "Phase current imbalance indicating winding fault or controller issue.",
    repairSteps: [
      "Measure current on each phase (U, V, W)",
      "Compare values",
      "Inspect motor winding",
      "Check controller phase output",
      "Replace motor or controller if imbalance confirmed",
    ],
  },
  {
    keywords: [
      "internal controller fault e47",
      "e47",
      "random controller e47",
      "controller internal fault e47",
    ],
    category: "ECU / Controller Fault",
    checks: [
      "Error code scan",
      "Controller wiring",
      "Internal diagnostics",
      "Reset and test",
    ],
    expectedValues: [
      { label: "Controller", value: "Stable (no repeat fault)" },
    ],
    testParams: [
      {
        parameter: "Controller Fault Code",
        expectedValue: "No repeat",
        expectedMin: 0,
        expectedMax: 0,
        unit: "",
      },
    ],
    tools: ["Diagnostic tool"],
    rootCause: "Internal controller fault — random errors or glitches.",
    repairSteps: [
      "Scan error codes",
      "Inspect controller wiring",
      "Check for loose connectors",
      "Reset and monitor",
      "Replace controller if fault repeats",
    ],
  },
  {
    keywords: [
      "harness damage e48",
      "e48",
      "harness fault e48",
      "wiring damage e48",
    ],
    category: "Wiring / Connector Fault",
    checks: [
      "Harness visual inspection",
      "Continuity test",
      "Load test",
      "Damaged section identification",
    ],
    expectedValues: [{ label: "Harness", value: "Intact — full continuity" }],
    testParams: [
      {
        parameter: "Harness Continuity",
        expectedValue: "Continuous",
        expectedMin: 0,
        expectedMax: 0.5,
        unit: "Ω",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Harness damage causing multiple faults across systems.",
    repairSteps: [
      "Visually inspect full harness",
      "Test continuity on each wire",
      "Perform load test",
      "Identify and repair damaged section",
      "Replace full harness if damage is extensive",
    ],
  },
  {
    keywords: [
      "brake lock fault e49",
      "e49",
      "wheel lock e49",
      "brake lock e49",
    ],
    category: "Brake Issue",
    checks: [
      "Brake signal output",
      "Battery voltage",
      "Controller wiring",
      "Controller scan",
    ],
    expectedValues: [
      { label: "Brake signal", value: "Normal — releases when lever released" },
    ],
    testParams: [
      {
        parameter: "Brake Signal (lever released)",
        expectedValue: "0 V",
        expectedMin: 0,
        expectedMax: 0.5,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Brake signal or controller fault causing wheel lock.",
    repairSteps: [
      "Check brake signal with lever released",
      "Verify battery voltage",
      "Inspect controller wiring",
      "Scan full system for fault codes",
      "Replace controller if brake lock persists",
    ],
  },
  {
    keywords: [
      "unknown critical fault e50",
      "e50",
      "unknown fault e50",
      "deep issue e50",
      "unidentified fault e50",
    ],
    category: "ECU / Controller Fault",
    checks: [
      "Full system scan",
      "All major systems",
      "Fault code identification",
      "Service manual check",
    ],
    expectedValues: [{ label: "Fault code", value: "Identified and resolved" }],
    testParams: [
      {
        parameter: "System Fault Code",
        expectedValue: "Known code resolved",
        expectedMin: 0,
        expectedMax: 999,
        unit: "",
      },
    ],
    tools: ["All diagnostic tools"],
    rootCause:
      "Unknown critical fault — requires full system scan and deep diagnosis.",
    repairSteps: [
      "Scan full system for error codes",
      "Check all major systems one by one",
      "Identify specific fault code",
      "Follow manufacturer service manual",
      "Escalate to specialist if unresolved",
    ],
  },
  // ─── BATTERY SPECIFIC FAULTS (1–50) ───────────────────────────────────────
  {
    keywords: ["not charging", "no charging", "charger no output"],
    category: "Charging Issue",
    checks: ["Charger output DC voltage", "Battery surface temperature scan"],
    expectedValues: [
      { label: "Charger Output", value: "DC 20V+" },
      { label: "Battery Surface Temp", value: "< 45°C" },
    ],
    testParams: [
      {
        parameter: "Charger Output Voltage",
        expectedValue: "DC 20V+",
        expectedMin: 18,
        expectedMax: 30,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Faulty charger or battery not accepting charge.",
    repairSteps: [
      "Measure charger output DC voltage",
      "Scan battery surface with IR thermometer",
      "Replace charger if no output",
      "Replace battery if not accepting charge",
    ],
  },
  {
    keywords: ["battery hot", "battery temperature high", "battery overheat"],
    category: "General Fault",
    checks: [
      "IR scan of battery surface",
      "Emissivity setting 0.95",
      "Temperature rise",
    ],
    expectedValues: [{ label: "Battery Surface Temp", value: "< 45°C" }],
    testParams: [
      {
        parameter: "Battery Surface Temperature",
        expectedValue: "< 45°C",
        expectedMin: 0,
        expectedMax: 45,
        unit: "°C",
      },
    ],
    tools: ["IR Thermometer"],
    rootCause: "Overloaded cells, poor cooling, or thermal runaway onset.",
    repairSteps: [
      "IR scan battery at emissivity 0.95",
      "Remove load immediately",
      "Allow to cool in open air",
      "Dispose if temperature exceeds 60°C",
    ],
  },
  {
    keywords: ["battery swelling", "swollen battery", "bulging battery"],
    category: "General Fault",
    checks: ["Visual casing inspection for bulge or deformation"],
    expectedValues: [{ label: "Casing Shape", value: "Flat / No bulge" }],
    testParams: [
      {
        parameter: "Visual Casing Condition",
        expectedValue: "No bulge",
        expectedMin: 0,
        expectedMax: 0,
        unit: "",
      },
    ],
    tools: ["Visual inspection"],
    rootCause:
      "Gas buildup from overcharge, over-discharge, or cell degradation.",
    repairSteps: [
      "Visually inspect all sides",
      "Do NOT puncture",
      "Isolate and dispose immediately at battery recycling center",
    ],
  },
  {
    keywords: ["rapid discharge", "battery draining fast", "fast drain"],
    category: "General Fault",
    checks: ["Full charge then monitor DC voltage across terminals over time"],
    expectedValues: [
      { label: "Voltage (full charge)", value: "48V–60V (system dependent)" },
    ],
    testParams: [
      {
        parameter: "Battery Voltage (full)",
        expectedValue: "48–60V",
        expectedMin: 44,
        expectedMax: 67,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Degraded or shorted cells causing excessive self-discharge.",
    repairSteps: [
      "Fully charge battery",
      "Monitor voltage drop over 1 hour",
      "If drop > 2V at rest, replace cells",
    ],
  },
  {
    keywords: ["overcharge", "battery overcharging"],
    category: "Charging Issue",
    checks: ["Measure charging voltage DC across terminals"],
    expectedValues: [
      { label: "Max Charging Voltage (48V)", value: "≤ 54.6V" },
      { label: "Max Charging Voltage (60V)", value: "≤ 67.2V" },
    ],
    testParams: [
      {
        parameter: "Charging Voltage",
        expectedValue: "≤ 54.6V (48V system)",
        expectedMin: 0,
        expectedMax: 55,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "BMS overcharge protection failure or incorrect charger.",
    repairSteps: [
      "Measure voltage during charging",
      "If above limit, stop charging",
      "Replace charger",
      "Replace BMS if protection not triggering",
    ],
  },
  {
    keywords: ["under voltage", "undervoltage", "battery low voltage"],
    category: "General Fault",
    checks: ["Measure battery voltage at rest"],
    expectedValues: [
      { label: "Minimum Battery Voltage (48V)", value: "≥ 40V" },
    ],
    testParams: [
      {
        parameter: "Battery Resting Voltage",
        expectedValue: "≥ 40V (48V system)",
        expectedMin: 40,
        expectedMax: 60,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Deep discharge or cell failure.",
    repairSteps: [
      "Measure voltage",
      "If below cutoff, attempt slow recovery charge",
      "Replace battery pack if not recovering",
    ],
  },
  {
    keywords: ["cell imbalance", "SOC mismatch", "unbalanced cells"],
    category: "BMS Fault",
    checks: [
      "Check individual cell voltages in Li-ion mode",
      "Pack terminal voltage",
    ],
    expectedValues: [{ label: "Cell Voltage Difference", value: "< 50mV" }],
    testParams: [
      {
        parameter: "Cell Voltage Spread",
        expectedValue: "< 50mV",
        expectedMin: 0,
        expectedMax: 0.05,
        unit: "V",
      },
    ],
    tools: ["Battery Analyzer"],
    rootCause: "Aged or failed cells pulling down SOC of entire pack.",
    repairSteps: [
      "Use analyzer in Li-ion mode",
      "Identify weak cells",
      "Balance or replace cell modules",
    ],
  },
  {
    keywords: ["internal short", "battery internal short circuit"],
    category: "General Fault",
    checks: ["IR scan surface at emissivity 0.95"],
    expectedValues: [{ label: "Hotspot Temperature", value: "< 45°C" }],
    testParams: [
      {
        parameter: "Battery Hotspot Temp",
        expectedValue: "< 45°C",
        expectedMin: 0,
        expectedMax: 45,
        unit: "°C",
      },
    ],
    tools: ["IR Thermometer"],
    rootCause: "Internal electrode short causing heat buildup.",
    repairSteps: [
      "IR scan at emissivity 0.95",
      "Isolate battery immediately if hotspot > 60°C",
      "Dispose — not field repairable",
    ],
  },
  {
    keywords: ["external short", "battery external short"],
    category: "Wiring / Connector Fault",
    checks: [
      "Continuity check on external wiring",
      "Check for short path between terminals",
    ],
    expectedValues: [
      {
        label: "Terminal-to-Terminal Resistance",
        value: "High (open circuit)",
      },
    ],
    testParams: [
      {
        parameter: "External Short Resistance",
        expectedValue: "Open circuit (> 10kΩ)",
        expectedMin: 10000,
        expectedMax: 999999,
        unit: "Ω",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Wiring fault or pinched cable creating short circuit path.",
    repairSteps: [
      "Check all wiring from battery terminals",
      "Identify short path with continuity test",
      "Repair or replace damaged wiring",
    ],
  },
  {
    keywords: ["charger failure", "charger not working", "charger dead"],
    category: "Charging Issue",
    checks: ["Measure voltage across charger output terminals"],
    expectedValues: [
      { label: "Charger Output", value: "DC 54–67V (system dependent)" },
    ],
    testParams: [
      {
        parameter: "Charger Output Voltage",
        expectedValue: "DC 54–67V",
        expectedMin: 50,
        expectedMax: 70,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Internal charger PCB failure.",
    repairSteps: [
      "Measure charger output with multimeter",
      "No output = replace charger",
      "Check fuse inside charger if accessible",
    ],
  },
  {
    keywords: ["BMS failure", "bms dead", "battery management system fault"],
    category: "BMS Fault",
    checks: ["Measure BMS input voltage", "Measure BMS output voltage"],
    expectedValues: [
      { label: "BMS Input", value: "Battery voltage" },
      { label: "BMS Output", value: "Battery voltage (within 0.5V)" },
    ],
    testParams: [
      {
        parameter: "BMS Output Voltage",
        expectedValue: "≈ battery voltage",
        expectedMin: 40,
        expectedMax: 67,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "BMS PCB failure, MOSFET failure, or communication error.",
    repairSteps: [
      "Measure input and output of BMS",
      "If input present but no output, BMS is faulty",
      "Replace BMS module",
    ],
  },
  {
    keywords: [
      "loose connection battery",
      "battery loose wire",
      "battery connector loose",
    ],
    category: "Wiring / Connector Fault",
    checks: ["Measure voltage across battery connectors under load"],
    expectedValues: [
      { label: "Voltage Drop Across Connector", value: "< 0.2V" },
    ],
    testParams: [
      {
        parameter: "Connector Voltage Drop",
        expectedValue: "< 0.2V",
        expectedMin: 0,
        expectedMax: 0.2,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Loose or corroded connector causing intermittent contact.",
    repairSteps: [
      "Check all battery connectors",
      "Measure drop under load",
      "Tighten or replace connector",
    ],
  },
  {
    keywords: [
      "corrosion battery",
      "corroded terminals",
      "battery terminal rust",
    ],
    category: "General Fault",
    checks: [
      "Visual inspection of terminals",
      "Resistance check across terminal joint",
    ],
    expectedValues: [
      {
        label: "Terminal Condition",
        value: "Clean metal — no green/white buildup",
      },
    ],
    testParams: [
      {
        parameter: "Terminal Visual Condition",
        expectedValue: "No corrosion",
        expectedMin: 0,
        expectedMax: 0,
        unit: "",
      },
    ],
    tools: ["Visual inspection", "Multimeter"],
    rootCause: "Moisture exposure causing oxidation on battery terminals.",
    repairSteps: [
      "Clean terminals with wire brush or baking soda solution",
      "Apply terminal grease",
      "Retest continuity",
    ],
  },
  {
    keywords: ["overcurrent battery", "battery high current"],
    category: "General Fault",
    checks: ["Measure DC current on one battery wire under load"],
    expectedValues: [
      { label: "Battery Current (normal)", value: "≤ rated amperage" },
    ],
    testParams: [
      {
        parameter: "Battery Current Draw",
        expectedValue: "Within rated amps",
        expectedMin: 0,
        expectedMax: 40,
        unit: "A",
      },
    ],
    tools: ["Clamp Meter"],
    rootCause:
      "Overloaded motor, shorted controller, or missing current limit in BMS.",
    repairSteps: [
      "Clamp meter on battery wire",
      "If current exceeds spec, reduce load",
      "Check BMS current limit settings",
    ],
  },
  {
    keywords: ["thermal runaway battery", "battery smoke"],
    category: "General Fault",
    checks: [
      "IR scan on battery at emissivity 0.95",
      "Temperature rise monitoring",
    ],
    expectedValues: [{ label: "Max Safe Temp", value: "< 60°C" }],
    testParams: [
      {
        parameter: "Battery Temperature",
        expectedValue: "< 60°C",
        expectedMin: 0,
        expectedMax: 60,
        unit: "°C",
      },
    ],
    tools: ["IR Thermometer"],
    rootCause: "Uncontrolled exothermic reaction in cells.",
    repairSteps: [
      "Emergency: remove from vehicle",
      "Do NOT use water",
      "Use dry sand or CO2 extinguisher",
      "Evacuate area — toxic fumes risk",
    ],
  },
  {
    keywords: ["voltage drop battery", "battery voltage sag"],
    category: "General Fault",
    checks: [
      "Load test — measure DC voltage at terminals under load",
      "Compare individual cells",
    ],
    expectedValues: [{ label: "Voltage Sag Under Load", value: "< 5V drop" }],
    testParams: [
      {
        parameter: "Voltage Sag Under Load",
        expectedValue: "< 5V",
        expectedMin: 0,
        expectedMax: 5,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Degraded cells with high internal resistance.",
    repairSteps: [
      "Load test battery",
      "If sag > 5V, cells are degraded",
      "Replace cell modules or full pack",
    ],
  },
  {
    keywords: ["deep discharge", "battery fully drained", "zero volt battery"],
    category: "General Fault",
    checks: ["Measure DC voltage", "Attempt slow charge recovery"],
    expectedValues: [
      { label: "Recovery Voltage After Slow Charge", value: "≥ 30V in 30 min" },
    ],
    testParams: [
      {
        parameter: "Battery Voltage",
        expectedValue: "≥ 30V after slow charge",
        expectedMin: 30,
        expectedMax: 67,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Battery left discharged for extended period.",
    repairSteps: [
      "Apply slow charge at 0.1C",
      "Monitor voltage recovery",
      "If no recovery after 30 min, replace pack",
    ],
  },
  {
    keywords: [
      "water damage battery",
      "battery water ingress",
      "flooded battery",
    ],
    category: "General Fault",
    checks: [
      "Visual for moisture in connectors",
      "Continuity and resistance check",
    ],
    expectedValues: [{ label: "Connector Moisture", value: "Dry" }],
    testParams: [
      {
        parameter: "Connector Moisture Level",
        expectedValue: "Dry",
        expectedMin: 0,
        expectedMax: 0,
        unit: "",
      },
    ],
    tools: ["Visual inspection", "Multimeter"],
    rootCause: "Water ingress causing short circuits or corrosion.",
    repairSteps: [
      "Disconnect battery",
      "Dry all connectors",
      "Use moisture displacing spray",
      "Replace if severe damage",
    ],
  },
  {
    keywords: [
      "connector burn battery",
      "battery connector burnt",
      "melted battery connector",
    ],
    category: "Wiring / Connector Fault",
    checks: ["Visual inspection of connector condition"],
    expectedValues: [
      { label: "Connector Condition", value: "Clean metal — no burn marks" },
    ],
    testParams: [
      {
        parameter: "Connector Visual Condition",
        expectedValue: "No burn",
        expectedMin: 0,
        expectedMax: 0,
        unit: "",
      },
    ],
    tools: ["Visual inspection"],
    rootCause: "Loose contact or overcurrent causing arcing at connector.",
    repairSteps: [
      "Inspect connector for burn or melt",
      "Replace connector immediately",
      "Check current ratings match",
    ],
  },
  {
    keywords: ["parasitic drain", "battery drains when off", "standby drain"],
    category: "General Fault",
    checks: ["Measure idle current in series (amp mode)"],
    expectedValues: [{ label: "Idle Current", value: "< 5mA" }],
    testParams: [
      {
        parameter: "Idle Current Draw",
        expectedValue: "< 5mA",
        expectedMin: 0,
        expectedMax: 0.005,
        unit: "A",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Component drawing current when vehicle is off.",
    repairSteps: [
      "Set multimeter to mA series mode",
      "Check idle current with vehicle off",
      "Identify and fix the draining circuit",
    ],
  },
  {
    keywords: ["slow charging", "charging slowly", "battery charges slow"],
    category: "Charging Issue",
    checks: ["Measure charge current", "Verify correct charger specification"],
    expectedValues: [{ label: "Charge Current", value: "≥ 2A" }],
    testParams: [
      {
        parameter: "Charge Current",
        expectedValue: "≥ 2A",
        expectedMin: 2,
        expectedMax: 20,
        unit: "A",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Wrong charger, damaged cable, or BMS limiting current.",
    repairSteps: [
      "Verify charger output current rating",
      "Use correct charger",
      "Check for damaged charge cable",
    ],
  },
  {
    keywords: [
      "fast charging fault",
      "DC fast charge fail",
      "quick charge not working",
    ],
    category: "Charging Issue",
    checks: [
      "Measure charge current and voltage",
      "Verify fast charge compatibility",
    ],
    expectedValues: [
      { label: "Fast Charge Current", value: "As specified (10–20A)" },
    ],
    testParams: [
      {
        parameter: "Fast Charge Current",
        expectedValue: "10–20A",
        expectedMin: 10,
        expectedMax: 20,
        unit: "A",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Charger mismatch or BMS blocking fast charge.",
    repairSteps: [
      "Check charger current/voltage specs",
      "Ensure BMS supports fast charge",
      "Use OEM fast charger",
    ],
  },
  {
    keywords: [
      "battery not holding charge",
      "poor battery life",
      "charge not holding",
    ],
    category: "General Fault",
    checks: ["Battery cycle test with analyzer"],
    expectedValues: [
      { label: "Capacity Retention", value: "≥ 80% of rated capacity" },
    ],
    testParams: [
      {
        parameter: "Capacity Retention",
        expectedValue: "≥ 80%",
        expectedMin: 80,
        expectedMax: 100,
        unit: "%",
      },
    ],
    tools: ["Battery Analyzer"],
    rootCause: "Cell aging or degradation reducing capacity.",
    repairSteps: ["Run full cycle test", "If capacity < 80%, replace battery"],
  },
  {
    keywords: ["physical damage battery", "battery crack", "cracked battery"],
    category: "General Fault",
    checks: [
      "Visual inspection for cracks, deformation, or electrolyte leakage",
    ],
    expectedValues: [
      { label: "Physical Condition", value: "No cracks, no leakage" },
    ],
    testParams: [
      {
        parameter: "Visual Inspection",
        expectedValue: "No damage",
        expectedMin: 0,
        expectedMax: 0,
        unit: "",
      },
    ],
    tools: ["Visual inspection"],
    rootCause: "Physical impact or improper handling.",
    repairSteps: [
      "Inspect all surfaces",
      "If cracked or leaking — dispose immediately",
      "Replace with OEM battery",
    ],
  },
  {
    keywords: ["insulation failure battery", "cell insulation breakdown"],
    category: "General Fault",
    checks: ["Measure body resistance from terminal to battery casing"],
    expectedValues: [{ label: "Body Insulation Resistance", value: "≥ 1MΩ" }],
    testParams: [
      {
        parameter: "Insulation Resistance",
        expectedValue: "≥ 1MΩ",
        expectedMin: 1000000,
        expectedMax: 999999999,
        unit: "Ω",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Degraded cell insulation causing leakage to chassis.",
    repairSteps: [
      "Measure resistance from terminal to casing",
      "If < 1MΩ, insulation has failed",
      "Replace insulation or battery",
    ],
  },
  {
    keywords: ["gas buildup battery", "battery gas", "battery off-gas"],
    category: "General Fault",
    checks: ["Visual inspection for body leakage or deformation"],
    expectedValues: [
      { label: "Battery Body", value: "No swelling or leakage" },
    ],
    testParams: [
      {
        parameter: "Body Condition",
        expectedValue: "No gas buildup",
        expectedMin: 0,
        expectedMax: 0,
        unit: "",
      },
    ],
    tools: ["Visual inspection"],
    rootCause: "Overcharge or thermal degradation producing gas inside cells.",
    repairSteps: [
      "Inspect for swelling",
      "Do NOT puncture",
      "Dispose at certified battery recycler",
    ],
  },
  {
    keywords: ["battery SOC wrong", "SOC error", "battery gauge wrong"],
    category: "BMS Fault",
    checks: ["Compare BMS SOC reading with actual measured voltage"],
    expectedValues: [{ label: "SOC vs Voltage Accuracy", value: "Within ±5%" }],
    testParams: [
      {
        parameter: "SOC Accuracy",
        expectedValue: "±5%",
        expectedMin: -5,
        expectedMax: 5,
        unit: "%",
      },
    ],
    tools: ["Battery Analyzer"],
    rootCause: "BMS calibration drift or cell voltage measurement error.",
    repairSteps: [
      "Use analyzer to compare actual SOC with BMS reading",
      "Recalibrate BMS",
      "Replace BMS if calibration fails",
    ],
  },
  {
    keywords: ["storage issue battery", "battery self discharge storage"],
    category: "General Fault",
    checks: [
      "Measure voltage after storage period",
      "Check storage charge level",
    ],
    expectedValues: [
      { label: "Storage Charge Level", value: "~50% SOC" },
      { label: "Voltage After Storage", value: "≥ 90% of initial" },
    ],
    testParams: [
      {
        parameter: "Voltage After Storage",
        expectedValue: "≥ 90% of initial",
        expectedMin: 0,
        expectedMax: 0,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Battery stored fully charged or empty causing degradation.",
    repairSteps: [
      "Store battery at 50% SOC",
      "Check voltage after storage",
      "Recondition if discharged below safe level",
    ],
  },
  {
    keywords: [
      "overcharge cycles",
      "battery cycle count high",
      "battery worn out",
    ],
    category: "General Fault",
    checks: ["Cycle count test via analyzer"],
    expectedValues: [
      { label: "Cycle Life", value: "500–1000 cycles (manufacturer spec)" },
    ],
    testParams: [
      {
        parameter: "Cycle Count",
        expectedValue: "< 1000",
        expectedMin: 0,
        expectedMax: 1000,
        unit: "cycles",
      },
    ],
    tools: ["Battery Analyzer"],
    rootCause: "Battery exceeded rated cycle life.",
    repairSteps: ["Run cycle count test", "If exceeded spec, replace battery"],
  },
  {
    keywords: [
      "battery physical deformation",
      "battery expansion",
      "pouch deform",
    ],
    category: "General Fault",
    checks: ["Visual inspection for expansion or deformation"],
    expectedValues: [
      { label: "Physical Shape", value: "Original — no expansion" },
    ],
    testParams: [
      {
        parameter: "Visual Deformation",
        expectedValue: "None",
        expectedMin: 0,
        expectedMax: 0,
        unit: "",
      },
    ],
    tools: ["Visual inspection"],
    rootCause: "Internal gas pressure from overcharge or degradation.",
    repairSteps: ["Inspect all surfaces", "Replace immediately if deformed"],
  },
  {
    keywords: [
      "insulation resistance failure",
      "megger test battery fail",
      "IR test battery",
    ],
    category: "General Fault",
    checks: ["IR test on battery pack in IR mode"],
    expectedValues: [{ label: "Insulation Resistance (pack)", value: "≥ 1MΩ" }],
    testParams: [
      {
        parameter: "Pack Insulation Resistance",
        expectedValue: "≥ 1MΩ",
        expectedMin: 1000000,
        expectedMax: 999999999,
        unit: "Ω",
      },
    ],
    tools: ["Battery Analyzer"],
    rootCause: "Degraded pack insulation causing safety risk.",
    repairSteps: [
      "Use analyzer in IR mode",
      "Measure insulation resistance",
      "Replace battery if below limit",
    ],
  },
  {
    keywords: ["not hold charge battery", "charge drops fast overnight"],
    category: "General Fault",
    checks: ["Charge battery fully, leave overnight, measure morning voltage"],
    expectedValues: [{ label: "Overnight Voltage Drop", value: "< 1V" }],
    testParams: [
      {
        parameter: "Overnight Voltage Drop",
        expectedValue: "< 1V",
        expectedMin: 0,
        expectedMax: 1,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "High self-discharge rate due to cell degradation.",
    repairSteps: [
      "Fully charge and measure voltage",
      "Check voltage next morning",
      "If drop > 1V, replace battery",
    ],
  },
  {
    keywords: ["EMI battery", "battery electromagnetic interference"],
    category: "General Fault",
    checks: ["Measure noise signal in AC mode on battery output"],
    expectedValues: [
      { label: "AC Noise on Battery Output", value: "< 50mV AC" },
    ],
    testParams: [
      {
        parameter: "AC Noise (Battery Output)",
        expectedValue: "< 50mV",
        expectedMin: 0,
        expectedMax: 0.05,
        unit: "V",
      },
    ],
    tools: ["Oscilloscope", "Multimeter"],
    rootCause: "External EMI or switching noise affecting battery monitoring.",
    repairSteps: [
      "Set multimeter to AC mode",
      "Measure noise on battery output",
      "Add shielding or ferrite cores if needed",
    ],
  },
  {
    keywords: ["solder joint battery", "cold solder battery"],
    category: "General Fault",
    checks: ["Continuity test on solder joints"],
    expectedValues: [{ label: "Joint Continuity", value: "Solid — 0 ohm" }],
    testParams: [
      {
        parameter: "Solder Joint Resistance",
        expectedValue: "≈ 0Ω",
        expectedMin: 0,
        expectedMax: 0.5,
        unit: "Ω",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Cold solder joint causing intermittent connection.",
    repairSteps: [
      "Check continuity at all solder joints",
      "Re-solder any suspect joints",
      "Retest continuity",
    ],
  },
  {
    keywords: ["calibration error battery", "BMS calibration wrong"],
    category: "BMS Fault",
    checks: ["Compare actual SOC with BMS reading using analyzer"],
    expectedValues: [{ label: "Calibration Accuracy", value: "±5%" }],
    testParams: [
      {
        parameter: "BMS Calibration Error",
        expectedValue: "±5%",
        expectedMin: -5,
        expectedMax: 5,
        unit: "%",
      },
    ],
    tools: ["Battery Analyzer"],
    rootCause: "BMS firmware calibration drift.",
    repairSteps: [
      "Compare analyzer SOC vs BMS SOC",
      "Recalibrate BMS",
      "Update firmware if available",
    ],
  },
  {
    keywords: [
      "firmware bug battery",
      "BMS firmware",
      "software fault battery",
    ],
    category: "BMS Fault",
    checks: ["Check BMS software version via BMS port"],
    expectedValues: [
      { label: "Firmware Version", value: "Latest OEM version" },
    ],
    testParams: [
      {
        parameter: "BMS Firmware Status",
        expectedValue: "Latest version",
        expectedMin: 0,
        expectedMax: 0,
        unit: "",
      },
    ],
    tools: ["Software diagnostic tool"],
    rootCause: "Outdated or corrupt BMS firmware causing incorrect behavior.",
    repairSteps: [
      "Connect to BMS port",
      "Check firmware version",
      "Update to latest OEM firmware",
    ],
  },
  {
    keywords: ["load mismatch battery", "battery overloaded"],
    category: "General Fault",
    checks: ["Measure current draw under load"],
    expectedValues: [
      { label: "Load Current", value: "≤ rated battery current" },
    ],
    testParams: [
      {
        parameter: "Load Current",
        expectedValue: "≤ rated",
        expectedMin: 0,
        expectedMax: 40,
        unit: "A",
      },
    ],
    tools: ["Clamp Meter"],
    rootCause:
      "Motor or controller drawing more current than battery is rated for.",
    repairSteps: [
      "Clamp meter on battery wire",
      "Compare to battery current rating",
      "Reduce load or upgrade battery",
    ],
  },
  {
    keywords: ["cell aging", "old cells", "aged battery cells"],
    category: "General Fault",
    checks: ["Capacity test with analyzer"],
    expectedValues: [{ label: "Cell Capacity", value: "≥ 80% of rated" }],
    testParams: [
      {
        parameter: "Cell Capacity Retention",
        expectedValue: "≥ 80%",
        expectedMin: 80,
        expectedMax: 100,
        unit: "%",
      },
    ],
    tools: ["Battery Analyzer"],
    rootCause: "End-of-life cells with reduced capacity.",
    repairSteps: ["Run capacity test", "If below 80%, replace cell modules"],
  },
  {
    keywords: ["port damage battery", "battery port burnt"],
    category: "Wiring / Connector Fault",
    checks: [
      "Inspect charge port for burn, deformation",
      "Measure port contact resistance",
    ],
    expectedValues: [{ label: "Port Condition", value: "Clean, no burn" }],
    testParams: [
      {
        parameter: "Port Visual Condition",
        expectedValue: "No damage",
        expectedMin: 0,
        expectedMax: 0,
        unit: "",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Overcurrent or loose port connection causing arcing.",
    repairSteps: [
      "Inspect charge port visually",
      "Replace port if burnt",
      "Check connector alignment",
    ],
  },
  {
    keywords: [
      "protection trip battery",
      "BMS trip",
      "battery protection activated",
    ],
    category: "BMS Fault",
    checks: ["Check if BMS has tripped", "Measure battery voltage"],
    expectedValues: [
      { label: "BMS Output", value: "Voltage present after reset" },
    ],
    testParams: [
      {
        parameter: "BMS Output After Reset",
        expectedValue: "Battery voltage",
        expectedMin: 40,
        expectedMax: 67,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "BMS protection triggered by overcurrent, overvoltage, or over-temperature.",
    repairSteps: [
      "Try resetting BMS as per manual",
      "Check for cause of trip (voltage, current, temp)",
      "Replace BMS if trip is not resettable",
    ],
  },
  {
    keywords: ["EMI issue battery", "battery EMI problem"],
    category: "General Fault",
    checks: ["Measure noise on battery output in AC mode"],
    expectedValues: [{ label: "AC Noise Level", value: "< 50mV" }],
    testParams: [
      {
        parameter: "AC Noise (Battery Output)",
        expectedValue: "< 50mV",
        expectedMin: 0,
        expectedMax: 0.05,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "EMI from nearby components affecting battery signal lines.",
    repairSteps: [
      "Measure AC noise signal",
      "Add shielding around battery wiring",
      "Use ferrite beads on cables",
    ],
  },
  {
    keywords: ["cell aging issue", "battery aged cells degraded"],
    category: "General Fault",
    checks: ["IR test on cells", "Capacity check"],
    expectedValues: [
      {
        label: "Cell IR (Internal Resistance)",
        value: "Within manufacturer spec",
      },
    ],
    testParams: [
      {
        parameter: "Cell Internal Resistance",
        expectedValue: "Within spec",
        expectedMin: 0,
        expectedMax: 200,
        unit: "mΩ",
      },
    ],
    tools: ["Battery Analyzer"],
    rootCause: "Aged cells generate heat due to increased internal resistance.",
    repairSteps: [
      "IR test cells",
      "Replace cells exceeding resistance limit",
      "Improve battery ventilation and cooling",
    ],
  },
  {
    keywords: [
      "high temperature cell",
      "battery cell hot",
      "specific cell overheating",
    ],
    category: "General Fault",
    checks: ["IR scan of individual cells at emissivity 0.95"],
    expectedValues: [{ label: "Cell Temperature", value: "< 45°C" }],
    testParams: [
      {
        parameter: "Individual Cell Temp",
        expectedValue: "< 45°C",
        expectedMin: 0,
        expectedMax: 45,
        unit: "°C",
      },
    ],
    tools: ["IR Thermometer"],
    rootCause:
      "One or more cells with elevated internal resistance generating heat.",
    repairSteps: [
      "IR scan all cells",
      "Identify hottest cell",
      "Replace that cell or module",
    ],
  },
  {
    keywords: ["high resistance cell", "battery high spec"],
    category: "General Fault",
    checks: ["Spec check in IR mode with analyzer"],
    expectedValues: [
      { label: "Cell Resistance", value: "Within spec (mΩ range)" },
    ],
    testParams: [
      {
        parameter: "Cell Internal Resistance",
        expectedValue: "< spec limit",
        expectedMin: 0,
        expectedMax: 200,
        unit: "mΩ",
      },
    ],
    tools: ["Battery Analyzer"],
    rootCause: "High resistance cell reducing overall pack performance.",
    repairSteps: [
      "Use analyzer IR mode",
      "Identify high resistance cells",
      "Replace out-of-spec cells",
    ],
  },
  {
    keywords: ["high resistance battery", "45 resistance"],
    category: "General Fault",
    checks: ["IR mode measurement with analyzer"],
    expectedValues: [{ label: "Pack Resistance", value: "Within rated spec" }],
    testParams: [
      {
        parameter: "Pack Internal Resistance",
        expectedValue: "Within spec",
        expectedMin: 0,
        expectedMax: 500,
        unit: "mΩ",
      },
    ],
    tools: ["Battery Analyzer"],
    rootCause: "Aging or damaged pack with high overall internal resistance.",
    repairSteps: [
      "Measure in IR mode",
      "Compare to spec",
      "Replace pack if above limit",
    ],
  },
  {
    keywords: ["not holding charge DC", "charge holds not"],
    category: "General Fault",
    checks: ["Charge and monitor DC voltage over time"],
    expectedValues: [
      { label: "Charge Retention", value: "> 95% after 1 hour at rest" },
    ],
    testParams: [
      {
        parameter: "Voltage Retention (1 hr)",
        expectedValue: "> 95%",
        expectedMin: 95,
        expectedMax: 100,
        unit: "%",
      },
    ],
    tools: ["Multimeter"],
    rootCause: "Faulty wiring drawing load or degraded cells.",
    repairSteps: [
      "Charge fully",
      "Monitor voltage drop over 1 hour",
      "Fix wiring leakage or replace battery",
    ],
  },
  {
    keywords: [
      "intermittent battery output",
      "battery cuts in out",
      "random battery disconnect",
    ],
    category: "Wiring / Connector Fault",
    checks: ["Wiggle test — monitor voltage while flexing connectors"],
    expectedValues: [
      { label: "Voltage During Wiggle", value: "Stable — no drops" },
    ],
    testParams: [
      {
        parameter: "Voltage Stability (wiggle test)",
        expectedValue: "Stable",
        expectedMin: 40,
        expectedMax: 67,
        unit: "V",
      },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Loose connector or fractured wire causing intermittent contact.",
    repairSteps: [
      "Wiggle all connectors while monitoring voltage",
      "Identify intermittent connection",
      "Fix or replace wiring",
    ],
  },
  {
    keywords: [
      "protection trip reset battery",
      "battery wont power on after trip",
    ],
    category: "BMS Fault",
    checks: [
      "Check BMS output after reset attempt",
      "IR scan for overheating trigger",
    ],
    expectedValues: [
      { label: "BMS Output After Reset", value: "Normal battery voltage" },
    ],
    testParams: [
      {
        parameter: "BMS Output",
        expectedValue: "Battery voltage present",
        expectedMin: 40,
        expectedMax: 67,
        unit: "V",
      },
    ],
    tools: ["IR Thermometer"],
    rootCause:
      "BMS protection latched due to critical fault (over-temp, over-current).",
    repairSteps: [
      "Let battery cool down",
      "Attempt BMS reset per manual",
      "If reset fails, replace BMS",
    ],
  },
  {
    keywords: ["fire smoke battery", "battery smoke fire", "heat rise battery"],
    category: "General Fault",
    checks: ["IR scan at emissivity 0.95", "Monitor heat rise"],
    expectedValues: [{ label: "Temperature", value: "Danger — > 80°C" }],
    testParams: [
      {
        parameter: "Battery Temperature (emergency)",
        expectedValue: "< 60°C safe",
        expectedMin: 0,
        expectedMax: 60,
        unit: "°C",
      },
    ],
    tools: ["IR Thermometer"],
    rootCause: "Thermal runaway or severe internal short causing fire.",
    repairSteps: [
      "EMERGENCY: Disconnect power",
      "Use CO2 or dry powder extinguisher — NOT water",
      "Evacuate area immediately",
      "Call emergency services",
    ],
  },
  {
    keywords: [
      "explosion risk battery",
      "battery explosive",
      "battery catch fire",
    ],
    category: "General Fault",
    checks: ["IR scan for extreme heat at emissivity 0.95"],
    expectedValues: [{ label: "Temperature", value: "Danger — > 100°C" }],
    testParams: [
      {
        parameter: "Battery Temperature (critical)",
        expectedValue: "< 60°C safe",
        expectedMin: 0,
        expectedMax: 60,
        unit: "°C",
      },
    ],
    tools: ["IR Thermometer"],
    rootCause: "Extreme thermal runaway — explosion and toxic gas risk.",
    repairSteps: [
      "CRITICAL EMERGENCY: Evacuate all personnel immediately",
      "Do NOT approach with water",
      "Alert fire brigade",
      "Contain in sand if possible from safe distance",
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
