import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Download,
  Info,
  Search,
  Wrench,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { SUB_FAULT_GROUPS } from "../lib/faultLogic";

interface ExpectedValue {
  label: string;
  value: string;
}

interface HelpFault {
  name: string;
  keywords: string[];
  checks: string[];
  expectedValues: ExpectedValue[];
  tools: string[];
  rootCause: string;
  repairSteps: string[];
  severity: "critical" | "warning" | "info";
  group?: string;
  category?: string;
}

const HELP_FAULTS: HelpFault[] = [
  {
    name: "No Start",
    keywords: [
      "not starting",
      "won't start",
      "dead",
      "no power",
      "key on nothing",
    ],
    checks: [
      "Battery voltage",
      "Main fuse",
      "Kill switch",
      "BMS output",
      "Controller power input",
    ],
    expectedValues: [
      { label: "Battery Voltage", value: "48V–72V (±2V)" },
      { label: "Fuse", value: "Intact, no break" },
    ],
    tools: ["Multimeter", "Test lamp"],
    rootCause:
      "No power reaching controller or motor due to battery, fuse, or BMS cutoff",
    repairSteps: [
      "Check battery voltage with multimeter",
      "Inspect main fuse for continuity",
      "Test BMS output terminals",
      "Check kill switch continuity",
      "Verify controller power LED",
    ],
    severity: "critical",
    category: "Battery & BMS",
  },
  {
    name: "Poor Performance / Low Pickup",
    keywords: [
      "slow",
      "low pickup",
      "no power",
      "weak acceleration",
      "sluggish",
    ],
    checks: [
      "Battery SOC",
      "Throttle signal",
      "Motor phase current",
      "Controller temperature",
    ],
    expectedValues: [
      { label: "Throttle Signal", value: "0.8V–4.2V" },
      { label: "Phase Current", value: "Per spec" },
    ],
    tools: ["Multimeter", "Clamp meter"],
    rootCause: "Throttle fault, low battery, or controller thermal limiting",
    repairSteps: [
      "Check throttle output voltage range",
      "Verify battery SOC > 20%",
      "Test phase current under load",
      "Check controller heatsink temperature",
    ],
    severity: "warning",
    category: "Throttle",
  },
  {
    name: "Charging Issue",
    keywords: [
      "not charging",
      "charger not working",
      "slow charging",
      "charging stops",
    ],
    checks: [
      "Charger output voltage",
      "Charging port pins",
      "BMS charge FET",
      "Charging indicator light",
    ],
    expectedValues: [
      { label: "Charger Output", value: "Rated voltage +5%" },
      { label: "Charge Current", value: "Per charger rating" },
    ],
    tools: ["Multimeter", "Clamp meter"],
    rootCause: "Faulty charger, damaged port, or BMS blocking charge",
    repairSteps: [
      "Measure charger output voltage",
      "Inspect port for burnt/bent pins",
      "Test BMS charge FET continuity",
      "Try another known-good charger",
    ],
    severity: "warning",
    category: "Charging System",
  },
  {
    name: "ECU / Controller Fault",
    keywords: [
      "ecu",
      "controller error",
      "controller dead",
      "controller fault",
    ],
    checks: [
      "Controller power supply",
      "CAN bus signals",
      "MOSFET drain-source",
      "Fault LED codes",
    ],
    expectedValues: [
      { label: "Supply Voltage", value: "Battery voltage ±0.5V" },
      { label: "MOSFET Rds(on)", value: "<0.1 Ohm" },
    ],
    tools: ["Multimeter", "Oscilloscope"],
    rootCause:
      "Controller damage from overvoltage, overcurrent, or water ingress",
    repairSteps: [
      "Check controller input voltage",
      "Read fault LED blink codes",
      "Test MOSFET for short circuit",
      "Inspect for water damage inside controller",
    ],
    severity: "critical",
    category: "Controller & ECU",
  },
  {
    name: "Overheat",
    keywords: ["overheating", "hot", "burning smell", "temperature warning"],
    checks: [
      "Controller temperature",
      "Motor temperature",
      "Phase wire heat",
      "Brake drag",
    ],
    expectedValues: [
      { label: "Controller Temp", value: "<70°C" },
      { label: "Motor Temp", value: "<80°C" },
    ],
    tools: ["Infrared thermometer", "Multimeter"],
    rootCause:
      "Thermal overload from sustained high current, poor cooling, or mechanical friction",
    repairSteps: [
      "Allow to cool before re-test",
      "Check brake drag (wheel should spin freely)",
      "Inspect phase wire insulation",
      "Clean controller heatsink",
    ],
    severity: "critical",
    category: "Overheat & Temperature",
  },
  {
    name: "Throttle Fault",
    keywords: [
      "throttle",
      "jerky",
      "accelerator",
      "throttle stuck",
      "no response",
    ],
    checks: [
      "Throttle output voltage",
      "Throttle supply voltage",
      "Wiring continuity",
      "Hall sensor inside throttle",
    ],
    expectedValues: [
      { label: "Throttle Idle", value: "0.8V–1.0V" },
      { label: "Throttle Full", value: "3.8V–4.2V" },
    ],
    tools: ["Multimeter"],
    rootCause: "Throttle hall sensor failure or wiring fault",
    repairSteps: [
      "Measure throttle output at idle and full twist",
      "Check 5V supply to throttle",
      "Wiggle wire harness for intermittent drop",
      "Replace throttle if out of range",
    ],
    severity: "warning",
    category: "Throttle",
  },
  {
    name: "BMS Fault",
    keywords: [
      "bms",
      "battery drain",
      "low battery",
      "cell balancing",
      "bms sleep",
      "battery no output",
    ],
    checks: [
      "Cell voltages",
      "BMS output voltage",
      "BMS MOSFET",
      "Balance wires",
    ],
    expectedValues: [
      { label: "Cell Voltage", value: "3.2V–4.2V per cell" },
      { label: "BMS Output", value: "Battery pack voltage" },
    ],
    tools: ["Multimeter", "Cell tester"],
    rootCause:
      "BMS protection triggered due to over/under voltage, overcurrent, or temperature",
    repairSteps: [
      "Measure individual cell voltages",
      "Check BMS output terminal",
      "Reset BMS by disconnecting for 10 min",
      "Check balance connector wiring",
    ],
    severity: "critical",
    category: "Battery & BMS",
  },
  {
    name: "Cell Imbalance",
    keywords: [
      "cell weak",
      "one cell",
      "SOC mismatch",
      "30% cutoff",
      "40% cutoff",
      "battery swelling",
    ],
    checks: [
      "Individual cell voltages",
      "Cell capacity test",
      "Balance wire integrity",
      "Battery swelling visual check",
    ],
    expectedValues: [
      { label: "Cell Voltage Spread", value: "<0.05V difference" },
      { label: "Cell Voltage", value: "3.2V–4.2V" },
    ],
    tools: ["Cell tester", "Multimeter"],
    rootCause: "One or more weak cells causing premature low-voltage cutoff",
    repairSteps: [
      "Measure each cell group voltage",
      "Identify lowest cell",
      "Check balance wire to that cell",
      "Replace weak cell group",
    ],
    severity: "critical",
    category: "Battery & BMS",
  },
  {
    name: "Pre-Charge Fault",
    keywords: [
      "relay stuck",
      "relay click",
      "relay no output",
      "contactor",
      "precharge",
    ],
    checks: [
      "Main relay output",
      "Pre-charge resistor",
      "Relay coil voltage",
      "Capacitor charge time",
    ],
    expectedValues: [
      { label: "Relay Coil Voltage", value: "12V (when activated)" },
      { label: "Pre-charge Time", value: "0.5–2 seconds" },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Relay stuck open/closed or pre-charge circuit failure causing inrush current trip",
    repairSteps: [
      "Check relay click on power-on",
      "Measure relay output voltage",
      "Test pre-charge resistor value",
      "Replace relay if no output",
    ],
    severity: "critical",
    category: "Battery & BMS",
  },
  {
    name: "Hall Sensor Fault",
    keywords: [
      "hall sensor",
      "cogging",
      "motor reverse",
      "wrong direction",
      "stutter start",
    ],
    checks: [
      "Hall sensor signals A/B/C",
      "Hall sensor power supply",
      "Phase sequence",
      "Connector pins",
    ],
    expectedValues: [
      { label: "Hall Signal", value: "0V / 5V square wave" },
      { label: "Supply", value: "5V" },
    ],
    tools: ["Multimeter", "Oscilloscope"],
    rootCause: "Hall sensor failure causing wrong commutation sequence",
    repairSteps: [
      "Rotate wheel slowly, check A/B/C signals switching",
      "Verify 5V supply to sensors",
      "Clean connector",
      "Replace hall sensor if no signal",
    ],
    severity: "critical",
    category: "Hall Sensor / Regen",
  },
  {
    name: "Regen Braking Fault",
    keywords: [
      "regen",
      "regenerative braking",
      "engine braking",
      "braking too hard",
      "no regen",
    ],
    checks: [
      "Brake signal voltage",
      "Controller regen setting",
      "Battery charge level",
      "Brake sensor wire",
    ],
    expectedValues: [
      { label: "Brake Signal", value: "0V (released) / 5V (pressed)" },
      { label: "Battery for Regen", value: "<95% SOC" },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Brake sensor fault, full battery preventing regen, or controller regen disabled",
    repairSteps: [
      "Check brake lever signal",
      "Verify battery is not full (regen disabled at 100%)",
      "Check controller regen parameter",
      "Test brake sensor continuity",
    ],
    severity: "warning",
    category: "Hall Sensor / Regen",
  },
  {
    name: "Water Damage",
    keywords: [
      "water",
      "rain",
      "moisture",
      "corrosion",
      "green corrosion",
      "intermittent fault",
    ],
    checks: [
      "Connector pin corrosion",
      "PCB water marks",
      "Ground connection quality",
      "Fuse condition",
    ],
    expectedValues: [
      { label: "Connector Resistance", value: "<1 Ohm" },
      { label: "Ground", value: "Clean, tight connection" },
    ],
    tools: ["Multimeter", "Contact cleaner"],
    rootCause:
      "Water or moisture causing corrosion and intermittent short circuits",
    repairSteps: [
      "Dry unit in sun or with hairdryer",
      "Clean connectors with contact cleaner",
      "Re-crimp corroded terminals",
      "Apply dielectric grease",
      "Test after dry-out",
    ],
    severity: "critical",
    category: "Overheat & Temperature",
  },
  {
    name: "Wiring / Connector Fault",
    keywords: [
      "loose wiring",
      "random reset",
      "ground fault",
      "fuse blown",
      "crimp loose",
    ],
    checks: [
      "All connector joints",
      "Ground wire continuity",
      "Fuse rating and condition",
      "Wire insulation",
    ],
    expectedValues: [
      { label: "Wire Resistance", value: "<0.5 Ohm per joint" },
      { label: "Fuse", value: "Correct rating, intact" },
    ],
    tools: ["Multimeter", "Crimping tool"],
    rootCause:
      "Loose or corroded connector causing voltage drop or intermittent cut-off",
    repairSteps: [
      "Wiggle all connectors while powered",
      "Check each ground wire for continuity",
      "Replace blown fuse with correct rating",
      "Re-crimp any loose terminals",
    ],
    severity: "warning",
    category: "Electrical & Wiring",
  },
  {
    name: "Charging Port Fault",
    keywords: [
      "port burn",
      "pin burn",
      "melting",
      "loose port",
      "charging only when pressed",
    ],
    checks: [
      "Port pin condition",
      "Port connector tightness",
      "Wire at port",
      "Charger plug wear",
    ],
    expectedValues: [
      { label: "Port Resistance", value: "<0.2 Ohm" },
      { label: "Pin Condition", value: "Clean, no burn marks" },
    ],
    tools: ["Multimeter", "Visual inspection"],
    rootCause:
      "High resistance at port pins causing heat and melting from repeated high-current charging",
    repairSteps: [
      "Inspect pins visually for burn/melt",
      "Test resistance across port",
      "Replace port if damaged",
      "Check wire crimp at port",
    ],
    severity: "critical",
    category: "Charging System",
  },
  {
    name: "Horn / Accessories Fault",
    keywords: ["horn", "horn not working", "horn switch", "horn relay"],
    checks: [
      "Horn unit (direct 12V test)",
      "Horn relay",
      "Horn fuse",
      "Switch continuity",
      "Wiring from switch to horn",
      "Ground connection",
    ],
    expectedValues: [
      { label: "Horn Resistance", value: "3–8 Ohm" },
      { label: "Relay Coil", value: "70–120 Ohm" },
    ],
    tools: ["Multimeter"],
    rootCause: "Faulty horn unit, open relay, blown fuse, or bad switch/ground",
    repairSteps: [
      "Give horn direct 12V — if sounds, problem is in switch/relay circuit",
      "Check horn fuse",
      "Test relay by substitution",
      "Check switch continuity",
      "Verify ground wire",
    ],
    severity: "warning",
    category: "Accessories & Electricals",
  },
  {
    name: "Lights / Indicator Fault",
    keywords: [
      "headlight",
      "taillight",
      "blinker",
      "indicator",
      "light not working",
    ],
    checks: [
      "Bulb/LED condition",
      "Fuse for lights",
      "Switch continuity",
      "Flasher relay",
      "Wiring to light",
    ],
    expectedValues: [
      { label: "LED Supply", value: "12V when switched on" },
      { label: "Fuse", value: "Intact" },
    ],
    tools: ["Multimeter", "Test lamp"],
    rootCause: "Blown bulb, blown fuse, faulty flasher relay, or wiring break",
    repairSteps: [
      "Check bulb/LED visually",
      "Test fuse continuity",
      "Check switch",
      "Test flasher relay by substitution",
      "Trace wiring with multimeter",
    ],
    severity: "warning",
    category: "Accessories & Electricals",
  },
  {
    name: "Communication Fault",
    keywords: [
      "can bus",
      "communication error",
      "no communication",
      "display blank",
    ],
    checks: [
      "CAN bus wiring",
      "Termination resistors",
      "Node power supply",
      "Display connector",
    ],
    expectedValues: [
      { label: "CAN Bus Voltage", value: "2.5V ± 1V differential" },
      { label: "Termination", value: "120 Ohm each end" },
    ],
    tools: ["Multimeter", "Oscilloscope"],
    rootCause:
      "CAN bus break or missing termination causing loss of communication between nodes",
    repairSteps: [
      "Check CAN H/L voltage",
      "Measure termination resistors",
      "Inspect CAN wiring for breaks",
      "Check display connector",
    ],
    severity: "critical",
    category: "Electrical & Wiring",
  },
  {
    name: "Brake Issue",
    keywords: [
      "brake",
      "brakes",
      "brake not working",
      "brake stuck",
      "brake signal stuck",
    ],
    checks: [
      "Brake pads",
      "Brake cable tension",
      "Brake sensor signal",
      "Brake fluid (if hydraulic)",
    ],
    expectedValues: [
      { label: "Brake Sensor", value: "0V released, 5V pressed" },
      { label: "Pad Thickness", value: ">1mm" },
    ],
    tools: ["Multimeter", "Vernier caliper"],
    rootCause:
      "Worn pads, seized caliper, brake sensor fault, or cable stretch",
    repairSteps: [
      "Inspect brake pad thickness",
      "Check cable tension",
      "Test brake sensor signal",
      "Bleed hydraulic system if spongy",
    ],
    severity: "critical",
    category: "Brakes & Safety",
  },
  {
    name: "Mechanical Noise",
    keywords: ["noise", "grinding", "rattling", "vibration", "clicking sound"],
    checks: [
      "Wheel bearing play",
      "Motor bearing",
      "Chain/belt tension",
      "Loose fasteners",
    ],
    expectedValues: [
      { label: "Wheel Play", value: "0mm lateral play" },
      { label: "Chain Slack", value: "5–10mm" },
    ],
    tools: ["Torque wrench", "Feeler gauge"],
    rootCause: "Worn bearings, loose fasteners, or drivetrain misalignment",
    repairSteps: [
      "Spin wheel, check for grinding",
      "Check all fastener torque",
      "Inspect chain/belt tension",
      "Replace worn bearings",
    ],
    severity: "warning",
    category: "Accessories & Electricals",
  },
  {
    name: "Motor Phase Imbalance",
    keywords: [
      "phase imbalance",
      "uneven torque",
      "vibration at speed",
      "heating one side",
    ],
    checks: [
      "Phase resistance U-V",
      "Phase resistance V-W",
      "Phase resistance W-U",
    ],
    expectedValues: [
      { label: "Phase resistance (all phases)", value: "0.2–1 Ω (equal)" },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Unequal winding resistance across motor phases causing uneven torque.",
    repairSteps: [
      "Measure resistance across U-V, V-W, W-U",
      "Values must be equal",
      "Repair winding or replace motor",
    ],
    severity: "critical",
    category: "Motor & Drive" as const,
    group: "Motor",
  },
  {
    name: "Hall Sensor Timing Error",
    keywords: ["hall timing", "motor stutter", "low rpm cut-off", "misfiring"],
    checks: ["Hall sensor output sequence", "120° phase shift"],
    expectedValues: [
      { label: "Hall signal", value: "0V or 5V digital" },
      { label: "Phase shift", value: "120° between A, B, C" },
    ],
    tools: ["Multimeter", "Oscilloscope"],
    rootCause:
      "Hall sensors out of sequence causing motor stutter or misfiring.",
    repairSteps: [
      "Check hall signal output for each sensor",
      "Verify 120° phase shift sequence",
      "Replace faulty hall sensor or correct wiring",
    ],
    severity: "warning",
    category: "Hall Sensor / Regen" as const,
    group: "Motor",
  },
  {
    name: "Motor Seized / Locked",
    keywords: [
      "motor seized",
      "wheel stuck",
      "motor not rotating",
      "bearing jam",
    ],
    checks: ["Manual rotation", "Bearing condition"],
    expectedValues: [{ label: "Rotation", value: "Free spin by hand" }],
    tools: ["Manual Inspection", "Bearing Puller"],
    rootCause: "Seized bearings or mechanical jam preventing motor rotation.",
    repairSteps: [
      "Try rotating wheel by hand",
      "If stuck, inspect bearings",
      "Replace bearings or motor",
    ],
    severity: "critical",
    category: "Motor & Drive" as const,
    group: "Motor",
  },
  {
    name: "Back EMF Signal Missing",
    keywords: ["back emf", "emf missing", "motor not syncing"],
    checks: ["Back EMF voltage from motor phases"],
    expectedValues: [
      { label: "Back EMF (spinning)", value: "Small AC voltage present" },
    ],
    tools: ["Multimeter (AC mode)"],
    rootCause:
      "Motor winding failure — no back EMF means controller cannot sync.",
    repairSteps: [
      "Spin wheel and measure AC voltage on phase wires",
      "Zero voltage = open winding",
      "Replace motor or controller",
    ],
    severity: "critical",
    category: "Motor & Drive" as const,
    group: "Motor",
  },
  {
    name: "Hidden Wire Cut (Partial Break)",
    keywords: [
      "hidden wire",
      "works sometimes",
      "vibration fault",
      "intermittent wire",
    ],
    checks: ["Continuity while bending wire"],
    expectedValues: [
      { label: "Continuity (bending test)", value: "Stable 0 Ω" },
    ],
    tools: ["Multimeter"],
    rootCause: "Internal wire strand break invisible from outside.",
    repairSteps: [
      "Flex wire while testing continuity",
      "If continuity breaks during bending, wire is internally cut",
      "Replace that wire section",
    ],
    severity: "warning",
    category: "Electrical & Wiring" as const,
    group: "Wiring",
  },
  {
    name: "High Resistance Connection",
    keywords: ["high resistance joint", "voltage drop", "heating wire"],
    checks: ["Voltage drop across connector"],
    expectedValues: [{ label: "Voltage drop", value: "< 0.5 V" }],
    tools: ["Multimeter"],
    rootCause: "Corroded or loose connector with high resistance causing heat.",
    repairSteps: [
      "Measure voltage on both sides of connector under load",
      "Drop > 0.5V = bad connector",
      "Clean terminals or replace connector",
    ],
    severity: "warning",
    category: "Electrical & Wiring" as const,
    group: "Wiring",
  },
  {
    name: "Water Ingress in Harness",
    keywords: [
      "water ingress",
      "rainy season fault",
      "random shutdown rain",
      "moisture harness",
    ],
    checks: ["Moisture in connectors", "Insulation resistance"],
    expectedValues: [
      { label: "Insulation resistance", value: "> 1 MΩ to chassis" },
    ],
    tools: ["Visual", "Multimeter"],
    rootCause: "Water entered harness causing shorts or high resistance.",
    repairSteps: [
      "Inspect connectors for moisture",
      "Dry with compressed air or heat gun",
      "Apply insulation spray",
      "Replace damaged wires",
    ],
    severity: "critical",
    category: "Electrical & Wiring" as const,
    group: "Wiring",
  },
  {
    name: "Improper Ground (Floating Ground)",
    keywords: [
      "floating ground",
      "improper ground",
      "erratic behavior",
      "sensor fault ground",
    ],
    checks: ["Ground continuity to chassis"],
    expectedValues: [{ label: "Ground resistance", value: "0 Ω to chassis" }],
    tools: ["Multimeter"],
    rootCause:
      "Poor or missing ground causing erratic sensor and system behavior.",
    repairSteps: [
      "Measure resistance from ground wire to chassis",
      "Should be 0 Ω",
      "Tighten or add new ground wire",
    ],
    severity: "critical",
    category: "Electrical & Wiring" as const,
    group: "Wiring",
  },
  {
    name: "Controller-Motor Mismatch",
    keywords: [
      "controller mismatch",
      "incompatible controller",
      "wrong controller",
    ],
    checks: [
      "Motor voltage rating",
      "Controller voltage rating",
      "Current rating match",
    ],
    expectedValues: [
      { label: "Ratings", value: "Motor and controller must match" },
    ],
    tools: ["Spec Sheet"],
    rootCause:
      "Mismatched controller and motor specs causing overheating or low speed.",
    repairSteps: [
      "Check motor and controller spec sheets",
      "Ensure voltage and current ratings match",
      "Replace with correct rated controller",
    ],
    severity: "warning",
    category: "Controller & ECU" as const,
    group: "Controller",
  },
  {
    name: "High-Speed Cut-Off",
    keywords: [
      "high speed cut",
      "cuts at top speed",
      "sudden power cut high speed",
    ],
    checks: ["Battery voltage under load", "Overcurrent protection"],
    expectedValues: [
      { label: "Battery voltage (under load)", value: "Stable, < 5V drop" },
    ],
    tools: ["Clamp Meter", "Multimeter"],
    rootCause:
      "Battery voltage sag or overcurrent protection triggering at high speed.",
    repairSteps: [
      "Measure battery voltage at rest and under load",
      "If drop > 5V, battery is weak",
      "Replace battery or check controller",
    ],
    severity: "critical",
    category: "Controller & ECU" as const,
    group: "Battery",
  },
  {
    name: "Brake Always ON Signal",
    keywords: [
      "brake always on",
      "brake sensor always active",
      "no acceleration brake",
    ],
    checks: ["Brake switch continuity (released)", "Brake sensor signal"],
    expectedValues: [{ label: "Brake sensor (released)", value: "0 V" }],
    tools: ["Multimeter"],
    rootCause:
      "Brake switch stuck closed, blocking acceleration signal to controller.",
    repairSteps: [
      "Check brake sensor signal with lever released — should be 0V",
      "5V when released = switch stuck",
      "Replace brake switch",
    ],
    severity: "critical",
    category: "Brakes & Safety" as const,
    group: "Brake",
  },
  {
    name: "Uneven Brake Force",
    keywords: ["uneven braking", "pulling side", "unstable braking"],
    checks: ["Brake pad thickness (both sides)", "Cable tension balance"],
    expectedValues: [{ label: "Pad thickness", value: "> 1.5 mm both sides" }],
    tools: ["Vernier Caliper"],
    rootCause:
      "Unequal pad wear or cable tension causing vehicle to pull during braking.",
    repairSteps: [
      "Measure pad thickness on both sides",
      "Check cable tension equality",
      "Adjust cable or replace pads",
    ],
    severity: "warning",
    category: "Brakes & Safety" as const,
    group: "Brake",
  },
  {
    name: "Warped Brake Disc",
    keywords: ["warped disc", "brake disc warp", "vibration while braking"],
    checks: ["Disc runout / flatness"],
    expectedValues: [{ label: "Disc runout", value: "< 0.1 mm" }],
    tools: ["Dial Gauge"],
    rootCause:
      "Disc warped from overheating or impact causing vibration during braking.",
    repairSteps: [
      "Spin wheel and watch for disc wobble",
      "Measure runout with dial gauge",
      "Replace disc if runout > 0.1mm",
    ],
    severity: "warning",
    category: "Brakes & Safety" as const,
    group: "Brake",
  },
  {
    name: "Excessive Motor Cogging",
    keywords: [
      "cogging",
      "excessive cogging",
      "jerky rotation by hand",
      "magnetic lock",
    ],
    checks: ["Manual rotation feel", "Magnet alignment"],
    expectedValues: [
      { label: "Rotation", value: "Smooth (slight cogging is normal)" },
    ],
    tools: ["Manual Check"],
    rootCause:
      "Damaged or misaligned magnets causing excessive cogging torque.",
    repairSteps: [
      "Rotate wheel by hand — slight cogging is normal",
      "Excessive jerky resistance = magnet damage",
      "Replace motor",
    ],
    severity: "warning",
    category: "Motor & Drive" as const,
    group: "Motor",
  },
  {
    name: "EMI Noise in Wiring",
    keywords: [
      "emi noise",
      "signal interference",
      "random controller error emi",
      "sensor glitch emi",
    ],
    checks: ["Signal wire routing vs power wires"],
    expectedValues: [
      { label: "Signal line voltage (idle)", value: "Clean 0V or 5V" },
    ],
    tools: ["Multimeter", "Oscilloscope"],
    rootCause:
      "Signal wires routed near high-current lines causing electromagnetic interference.",
    repairSteps: [
      "Re-route signal wires away from phase/battery wires",
      "Add ferrite beads or shielding",
      "Verify solid ground connections",
    ],
    severity: "warning",
    category: "Electrical & Wiring" as const,
    group: "Wiring",
  },
  {
    name: "Phase Sequence Error (Motor Reverse)",
    keywords: [
      "phase sequence error",
      "motor runs reverse",
      "reverse running",
      "wrong direction",
    ],
    checks: ["Phase wire order U, V, W"],
    expectedValues: [{ label: "Motor direction", value: "Forward rotation" }],
    tools: ["Visual Inspection"],
    rootCause:
      "Phase wires connected in wrong sequence causing motor to run in reverse.",
    repairSteps: [
      "Test motor at low speed",
      "If reverse, swap any two phase wires",
      "Re-test after swap",
    ],
    severity: "info",
    category: "Motor & Drive" as const,
    group: "Motor",
  },
  {
    name: "Repeated Fuse Failure",
    keywords: ["fuse blowing", "repeated fuse failure", "fuse keeps blowing"],
    checks: ["Short circuit in load", "Controller MOSFET"],
    expectedValues: [
      { label: "Load circuit resistance", value: "> 1 kΩ (no short)" },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Short circuit or MOSFET failure causing excessive current and repeated fuse failure.",
    repairSteps: [
      "Measure resistance at fuse holder to ground",
      "Near 0Ω = short circuit present",
      "Disconnect components to isolate short",
      "Replace faulty component",
    ],
    severity: "critical",
    category: "Electrical & Wiring" as const,
    group: "Electrical",
  },
  {
    name: "Low Motor Efficiency",
    keywords: [
      "low efficiency motor",
      "high battery drain mileage",
      "low mileage motor",
    ],
    checks: ["Motor current draw", "Phase resistance"],
    expectedValues: [{ label: "Current draw", value: "Within rated amps" }],
    tools: ["Clamp Meter"],
    rootCause:
      "Degraded winding or mechanical friction causing excessive current draw.",
    repairSteps: [
      "Clamp meter on phase wires during riding",
      "Compare with rated motor current",
      "Check for brake drag or bearing friction",
      "Replace motor or controller",
    ],
    severity: "warning",
    category: "Motor & Drive" as const,
    group: "Motor",
  },
  {
    name: "Excess Brake Free Play",
    keywords: [
      "excess brake free play",
      "loose lever",
      "delayed braking",
      "brake lever loose",
    ],
    checks: ["Cable slack", "Lever free play distance"],
    expectedValues: [{ label: "Lever free play", value: "2–5 mm" }],
    tools: ["Ruler", "Spanner"],
    rootCause: "Excessive cable slack reducing brake effectiveness.",
    repairSteps: [
      "Measure lever free play — should be 2–5mm",
      "Adjust cable tension using adjuster",
      "Tighten lock nut after adjustment",
    ],
    severity: "info",
    category: "Brakes & Safety" as const,
    group: "Brake",
  },
  {
    name: "Burnt Connector Pin",
    keywords: [
      "burnt connector",
      "blackened pin",
      "melted socket",
      "melted connector",
    ],
    checks: ["Connector pin condition", "Contact resistance"],
    expectedValues: [
      { label: "Pin condition", value: "Clean — no blackening" },
      { label: "Contact resistance", value: "< 0.1 Ω" },
    ],
    tools: ["Visual Inspection", "Multimeter"],
    rootCause:
      "High current through corroded pin causing heat and resistance increase.",
    repairSteps: [
      "Inspect connectors for blackening",
      "Measure contact resistance",
      "Replace burnt connector with correct rated type",
    ],
    severity: "critical",
    category: "Electrical & Wiring" as const,
    group: "Wiring",
  },
  {
    name: "Motor Shaft Misalignment",
    keywords: [
      "shaft misalignment",
      "motor shaft bent",
      "uneven rotation noise",
    ],
    checks: ["Shaft straightness", "Hub wobble / runout"],
    expectedValues: [{ label: "Shaft runout", value: "< 0.05 mm" }],
    tools: ["Dial Gauge", "Visual Inspection"],
    rootCause: "Bent shaft causing vibration, noise, and bearing wear.",
    repairSteps: [
      "Spin shaft and observe wobble",
      "Measure runout with dial gauge",
      "Replace shaft or motor",
    ],
    severity: "warning",
    category: "Motor & Drive" as const,
    group: "Motor",
  },
  {
    name: "MOSFET Short Circuit",
    keywords: [
      "mosfet short",
      "wheel locked",
      "heavy jerk",
      "fuse blows instantly",
      "controller phase short",
    ],
    checks: [
      "Controller phase output short",
      "Continuity between output phases",
    ],
    expectedValues: [
      { label: "Phase-to-phase continuity", value: "No continuity (open)" },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Internal MOSFET short circuit causing phase-to-phase short, locking wheel and blowing fuse.",
    repairSteps: [
      "Disconnect motor and measure resistance between phase outputs on controller",
      "Any near-zero reading = MOSFET shorted",
      "Replace controller — not field-repairable",
    ],
    severity: "critical",
    category: "Motor & Drive" as const,
    group: "Controller",
  },
  {
    name: "Motor Leakage to Chassis (Shock Risk)",
    keywords: [
      "electric shock",
      "tingling body",
      "phase leakage",
      "chassis shock",
      "motor leakage",
    ],
    checks: ["Phase wire to chassis insulation resistance"],
    expectedValues: [
      { label: "Phase-to-chassis resistance", value: "> 1 MΩ (infinite)" },
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
    severity: "critical",
    category: "Motor & Drive" as const,
    group: "Motor",
  },
  {
    name: "Gate Driver Fault",
    keywords: [
      "gate driver fault",
      "random jerks controller",
      "uneven motor switching",
      "pwm fault",
    ],
    checks: ["PWM signal to MOSFET gate"],
    expectedValues: [
      { label: "PWM switching", value: "Stable pulses (0–12V)" },
    ],
    tools: ["Oscilloscope"],
    rootCause:
      "Gate driver IC failure causing erratic MOSFET switching and motor jerking.",
    repairSteps: [
      "Probe PWM signal at MOSFET gate with oscilloscope",
      "Unstable or missing pulses = gate driver failure",
      "Replace controller PCB",
    ],
    severity: "critical",
    category: "Controller & ECU" as const,
    group: "Controller",
  },
  {
    name: "Regen Overvoltage",
    keywords: [
      "regen overvoltage",
      "battery swelling regen",
      "cutoff during braking",
      "regenerative overvoltage",
    ],
    checks: ["Battery voltage spike during regenerative braking"],
    expectedValues: [
      { label: "Battery voltage (regen)", value: "< 60V for 48V system" },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Uncontrolled regen current pushing battery above safe voltage limit, risking swelling or damage.",
    repairSteps: [
      "Measure battery voltage with multimeter during braking",
      "If > rated max voltage, regen circuit is uncontrolled",
      "Disable regen in controller settings or replace controller",
    ],
    severity: "critical",
    category: "Battery & BMS" as const,
    group: "Battery",
  },
  {
    name: "Motor Thermal Runaway",
    keywords: [
      "thermal runaway motor",
      "extreme heat motor",
      "motor smoke",
      "motor overheating runaway",
    ],
    checks: ["Motor continuous current draw", "Motor temperature"],
    expectedValues: [{ label: "Current draw", value: "Within rated current" }],
    tools: ["Clamp Meter"],
    rootCause:
      "Sustained overcurrent causing motor to overheat beyond recovery — risk of fire.",
    repairSteps: [
      "STOP vehicle immediately if smoke or extreme heat detected",
      "Measure current with clamp meter on phase wires",
      "Current exceeding rated value = motor or controller fault",
      "Replace motor immediately — do not continue use",
    ],
    severity: "critical",
    category: "Motor & Drive" as const,
    group: "Motor",
  },
  {
    name: "Hall Signal Drop at RPM",
    keywords: [
      "hall signal drop rpm",
      "cuts at speed hall",
      "jerks only at high speed",
      "hall intermittent high speed",
    ],
    checks: ["Hall signal stability at rotation speed"],
    expectedValues: [{ label: "Hall signal", value: "Stable 0–5V switching" }],
    tools: ["Oscilloscope"],
    rootCause:
      "Hall sensor signal dropout at high RPM causing controller to lose commutation, cutting power.",
    repairSteps: [
      "Test hall sensors at low speed first — compare at high speed",
      "Look for signal dropouts on oscilloscope",
      "Replace hall sensors with matching type",
    ],
    severity: "critical",
    category: "Hall Sensor / Regen" as const,
    group: "Motor",
  },
  {
    name: "Phase Cable Overload",
    keywords: [
      "phase cable overload",
      "cable melting motor",
      "burning smell phase",
      "phase wire heating load",
    ],
    checks: ["Current through phase cable vs cable rating"],
    expectedValues: [
      { label: "Cable current", value: "Within rated amp capacity" },
    ],
    tools: ["Clamp Meter"],
    rootCause:
      "Undersized phase cable carrying excess current, causing insulation melt and fire risk.",
    repairSteps: [
      "Measure current on phase cables under load with clamp meter",
      "Compare with cable current rating",
      "Replace with correctly rated thicker cable",
    ],
    severity: "critical",
    category: "Motor & Drive" as const,
    group: "Wiring",
  },
  {
    name: "Reverse Current Damage",
    keywords: [
      "reverse current",
      "controller dead push start",
      "backflow current",
      "controller damaged push",
    ],
    checks: ["Reverse voltage at controller input"],
    expectedValues: [
      { label: "Controller input voltage", value: "No reverse polarity" },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Back-EMF from push-starting motor flows into controller without protection diode, destroying it.",
    repairSteps: [
      "Check controller input for reverse voltage during push",
      "Never push-start an EV with a dead controller",
      "Replace damaged controller",
    ],
    severity: "critical",
    category: "Motor & Drive" as const,
    group: "Controller",
  },
  {
    name: "Harness Burnout",
    keywords: [
      "harness burnout",
      "full wiring burnt",
      "smoke wiring",
      "main harness meltdown",
    ],
    checks: ["Entire harness condition visually"],
    expectedValues: [
      { label: "Harness condition", value: "No burnt or melted insulation" },
    ],
    tools: ["Visual Inspection"],
    rootCause:
      "Overcurrent or short circuit causing full wiring harness to overheat and burn.",
    repairSteps: [
      "Visually inspect entire harness for burn marks",
      "Check main fuse and battery connector for short",
      "Replace full harness — partial repair not safe",
    ],
    severity: "critical",
    category: "Electrical & Wiring" as const,
    group: "Wiring",
  },
  {
    name: "Battery Connector Arcing",
    keywords: [
      "connector arcing",
      "spark battery connection",
      "spark when connecting",
      "arc battery",
    ],
    checks: ["Connector pin and socket condition"],
    expectedValues: [
      { label: "Connector", value: "No pitting, smooth connection" },
    ],
    tools: ["Visual Inspection"],
    rootCause:
      "Worn or pitted connector causing arc on connection, damaging pins and creating fire risk.",
    repairSteps: [
      "Inspect battery connector for pitting or burn marks",
      "Replace connector with correct rated type",
      "Add pre-charge resistor if large capacitors are present",
    ],
    severity: "critical",
    category: "Battery & BMS" as const,
    group: "Battery",
  },
  {
    name: "Floating Ground Failure",
    keywords: [
      "floating ground failure",
      "intermittent ground loss",
      "random shutdown ground",
      "ground failure critical",
    ],
    checks: ["Ground line resistance under load"],
    expectedValues: [
      { label: "Ground line resistance", value: "0 Ω stable under load" },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Intermittent ground connection causing sensor errors, random shutdowns, and erratic behavior.",
    repairSteps: [
      "Measure ground to chassis under load (lights, motor running)",
      "Resistance > 0.5Ω under load = bad ground",
      "Trace and rebuild grounding points",
    ],
    severity: "critical",
    category: "Electrical & Wiring" as const,
    group: "Wiring",
  },
  {
    name: "Severe Voltage Drop Under Load",
    keywords: [
      "severe voltage drop",
      "vehicle dies acceleration",
      "voltage sag acceleration",
      "high voltage drop load",
    ],
    checks: ["Battery terminal voltage under acceleration load"],
    expectedValues: [
      { label: "Voltage drop under load", value: "< 3–5V from rest voltage" },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Severely degraded battery or high-resistance wiring causing large voltage drop on acceleration.",
    repairSteps: [
      "Measure battery voltage at rest and during full throttle",
      "Drop > 5V = weak battery or high resistance wiring",
      "Replace battery or inspect wiring joints",
    ],
    severity: "critical",
    category: "Battery & BMS" as const,
    group: "Battery",
  },
  {
    name: "Signal Interference Fault (Throttle-Brake Cross-Talk)",
    keywords: [
      "signal cross-talk",
      "throttle not responding brake",
      "brake signal interference",
      "throttle brake conflict",
    ],
    checks: ["Signal wire routing (throttle vs brake)", "Signal independence"],
    expectedValues: [
      { label: "Throttle and brake signals", value: "Independent, no overlap" },
    ],
    tools: ["Multimeter"],
    rootCause:
      "Throttle and brake signal wires routed together causing electromagnetic interference.",
    repairSteps: [
      "Check signal wires are separate from power wires",
      "Separate throttle and brake wiring runs",
      "Use shielded cable for signal wires if needed",
    ],
    severity: "warning",
    category: "Electrical & Wiring" as const,
    group: "Wiring",
  },
  {
    name: "Relay Stuck ON (Power Relay Welding)",
    keywords: [
      "relay stuck on",
      "vehicle won't turn off",
      "relay welded",
      "power relay stuck",
    ],
    checks: ["Relay contact state when key is off"],
    expectedValues: [
      { label: "Relay (key off)", value: "Open — no continuity" },
    ],
    tools: ["Multimeter"],
    rootCause:
      "High current surge welding relay contacts closed, preventing vehicle from shutting off.",
    repairSteps: [
      "Measure continuity across relay contacts with key off",
      "Continuity = relay welded shut",
      "Replace relay with correct current-rated type",
    ],
    severity: "critical",
    category: "Controller & ECU" as const,
    group: "Controller",
  },
  {
    name: "Brake Fade",
    keywords: [
      "brake fade",
      "brake works then fails",
      "brake fails at speed",
      "brake fade heat",
    ],
    checks: ["Brake pad heat buildup", "Braking consistency"],
    expectedValues: [{ label: "Braking", value: "Consistent at all speeds" }],
    tools: ["Visual Inspection"],
    rootCause:
      "Brake pads overheating under repeated use causing temporary loss of friction (fade).",
    repairSteps: [
      "Allow brakes to cool and test again",
      "If fade recurs, inspect pad compound and thickness",
      "Replace pads with higher performance compound",
      "Check for dragging caliper causing pre-heating",
    ],
    severity: "critical",
    category: "Brakes & Safety" as const,
    group: "Brake",
  },
  {
    name: "Hydraulic Brake Failure",
    keywords: [
      "hydraulic brake failure",
      "lever goes free",
      "no brake hydraulic",
      "brake lever spongy",
    ],
    checks: ["Brake fluid level", "Oil leakage at caliper and line"],
    expectedValues: [{ label: "Brake fluid", value: "Full — no leakage" }],
    tools: ["Visual Inspection"],
    rootCause:
      "Brake fluid leak or air in hydraulic line causing complete loss of braking pressure.",
    repairSteps: [
      "STOP riding immediately if brake lever goes free",
      "Inspect caliper, line, and master cylinder for leaks",
      "Fix leak point",
      "Bleed brake line and refill with correct fluid",
    ],
    severity: "critical",
    category: "Brakes & Safety" as const,
    group: "Brake",
  },
  {
    name: "Electronic Brake Lock",
    keywords: [
      "electronic brake lock",
      "sudden wheel lock regen",
      "regen brake lock",
      "controller brake lock",
    ],
    checks: ["Regenerative braking malfunction", "Controller regen output"],
    expectedValues: [{ label: "Regen braking", value: "Smooth, proportional" }],
    tools: ["Multimeter"],
    rootCause:
      "Controller regen malfunction applying full regenerative force and locking the wheel.",
    repairSteps: [
      "Test regen at slow speed first",
      "Sudden wheel lock = controller regen fault",
      "Disable regen if possible, replace controller",
    ],
    severity: "critical",
    category: "Brakes & Safety" as const,
    group: "Brake",
  },
  {
    name: "Critical Brake Imbalance (Flip Risk)",
    keywords: [
      "critical brake imbalance",
      "vehicle pulling dangerously",
      "flip risk braking",
      "brake pull dangerous",
    ],
    checks: ["Left and right brake force balance"],
    expectedValues: [
      { label: "Left-right braking force", value: "Equal within 10%" },
    ],
    tools: ["Visual Inspection"],
    rootCause:
      "Severely unequal brake force between front/rear or left/right causing vehicle to flip or spin.",
    repairSteps: [
      "Test braking at low speed on straight road",
      "Note which side grabs harder",
      "Adjust cable tension or caliper piston on strong side",
      "Replace worn pads and equalise both sides",
    ],
    severity: "critical",
    category: "Brakes & Safety" as const,
    group: "Brake",
  },
  {
    name: "Brake Signal Delay",
    keywords: [
      "brake signal delay",
      "motor runs after brake",
      "brake sensor slow",
      "delayed brake cutoff",
    ],
    checks: ["Brake sensor response time", "Signal voltage on brake input"],
    expectedValues: [{ label: "Brake cutoff", value: "Instant (< 100ms)" }],
    tools: ["Multimeter"],
    rootCause:
      "Slow or sticky brake sensor causing motor to continue running after braking — safety hazard.",
    repairSteps: [
      "Measure brake sensor signal with lever pressed and released",
      "Delayed signal change = faulty sensor",
      "Replace brake sensor",
    ],
    severity: "critical",
    category: "Brakes & Safety" as const,
    group: "Brake",
  },
  {
    name: "Parking Brake Slip",
    keywords: [
      "parking brake slip",
      "vehicle rolls back",
      "parking brake failure slope",
      "park brake weak",
    ],
    checks: ["Parking brake holding force on slope"],
    expectedValues: [
      { label: "Vehicle movement (park engaged)", value: "Zero — no movement" },
    ],
    tools: ["Physical Test on Slope"],
    rootCause:
      "Worn or misadjusted parking brake failing to hold vehicle on incline.",
    repairSteps: [
      "Test on gentle slope with parking brake engaged",
      "Any movement = insufficient holding force",
      "Adjust cable tension or replace parking brake mechanism",
    ],
    severity: "warning",
    category: "Brakes & Safety" as const,
    group: "Brake",
  },
];

// Build the sub-fault flat list from SUB_FAULT_GROUPS for the specific faults tab
const SUB_FAULT_CATEGORY_MAP: Record<string, string> = {
  Motor: "Motor & Drive",
  Battery: "Battery & BMS",
  Controller: "Controller & ECU",
  Charging: "Charging System",
  Brakes: "Brakes & Safety",
  Throttle: "Throttle",
  BMS: "Battery & BMS",
  Wiring: "Electrical & Wiring",
  Electrical: "Electrical & Wiring",
  Hall: "Hall Sensor / Regen",
  Regen: "Hall Sensor / Regen",
};

const ALL_SUB_FAULTS: HelpFault[] = SUB_FAULT_GROUPS.flatMap((group) =>
  group.subFaults.map((sf) => ({
    name: sf.name,
    keywords: sf.keywords,
    checks: sf.checks,
    expectedValues: sf.expectedValues,
    tools: sf.tools,
    rootCause: sf.rootCause,
    repairSteps: sf.repairSteps,
    severity: "critical" as const,
    group: group.groupName,
    category: SUB_FAULT_CATEGORY_MAP[group.groupName] ?? group.groupName,
  })),
);

const SEVERITY_CONFIG = {
  critical: {
    borderClass: "border-l-4 border-l-red-500",
    badgeClass: "bg-red-100 text-red-700 border-red-200",
    icon: AlertTriangle,
    iconClass: "text-red-500",
    label: "Critical",
  },
  warning: {
    borderClass: "border-l-4 border-l-yellow-500",
    badgeClass: "bg-yellow-100 text-yellow-700 border-yellow-200",
    icon: Zap,
    iconClass: "text-yellow-500",
    label: "Warning",
  },
  info: {
    borderClass: "border-l-4 border-l-blue-500",
    badgeClass: "bg-blue-100 text-blue-700 border-blue-200",
    icon: Info,
    iconClass: "text-blue-500",
    label: "Info",
  },
};

function FaultAccordion({
  faults,
  ocidPrefix,
}: {
  faults: HelpFault[];
  ocidPrefix: string;
}) {
  return (
    <Accordion type="multiple" className="space-y-3">
      {faults.map((fault, idx) => {
        const config = SEVERITY_CONFIG[fault.severity];
        const SeverityIcon = config.icon;
        return (
          <AccordionItem
            key={`${fault.name}-${idx}`}
            value={`${fault.name}-${idx}`}
            className={`rounded-xl border border-border bg-card shadow-sm overflow-hidden ${config.borderClass}`}
            data-ocid={`${ocidPrefix}.item.${idx + 1}`}
          >
            <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/30 [&[data-state=open]]:bg-muted/20">
              <div className="flex items-start gap-3 text-left w-full min-w-0">
                <SeverityIcon
                  size={18}
                  className={`${config.iconClass} mt-0.5 flex-shrink-0`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="font-bold text-foreground text-base">
                      {fault.name}
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-xs font-semibold px-2 py-0 ${config.badgeClass}`}
                    >
                      {config.label}
                    </Badge>
                    {fault.group && (
                      <Badge
                        variant="outline"
                        className="text-xs font-medium px-2 py-0 bg-primary/10 text-primary border-primary/20"
                      >
                        {fault.group}
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {fault.keywords.slice(0, 4).map((kw) => (
                      <span
                        key={kw}
                        className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border font-medium"
                      >
                        {kw}
                      </span>
                    ))}
                    {fault.keywords.length > 4 && (
                      <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                        +{fault.keywords.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="px-5 pb-5 pt-1">
              {/* Root cause */}
              <div className="mb-4 p-3 rounded-lg bg-muted/50 border border-border">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                  Root Cause
                </p>
                <p className="text-sm text-foreground">{fault.rootCause}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                {/* What to check */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 size={14} className="text-primary" />
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      What to Check
                    </p>
                  </div>
                  <ul className="space-y-1.5">
                    {fault.checks.map((check) => (
                      <li
                        key={check}
                        className="flex items-start gap-2 text-sm text-foreground"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {check}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expected values + tools */}
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                      Expected Values
                    </p>
                    <div className="space-y-1.5">
                      {fault.expectedValues.map((ev) => (
                        <div
                          key={ev.label}
                          className="flex items-center justify-between gap-2 text-sm"
                        >
                          <span className="text-muted-foreground">
                            {ev.label}
                          </span>
                          <span className="font-mono text-xs font-semibold text-foreground bg-muted px-2 py-0.5 rounded">
                            {ev.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Wrench size={14} className="text-primary" />
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Tools Required
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {fault.tools.map((tool) => (
                        <span
                          key={tool}
                          className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary font-medium border border-primary/20"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Repair steps */}
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  Repair Steps
                </p>
                <ol className="space-y-2">
                  {fault.repairSteps.map((step, stepIdx) => (
                    <li
                      key={step}
                      className="flex items-start gap-3 text-sm text-foreground"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mt-0.5">
                        {stepIdx + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

const CATEGORY_CONFIG: Record<
  string,
  { icon: string; color: string; bg: string; border: string }
> = {
  "Battery & BMS": {
    icon: "🔋",
    color: "text-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
  "Motor & Drive": {
    icon: "⚙️",
    color: "text-primary",
    bg: "bg-primary/5",
    border: "border-primary/20",
  },
  "Controller & ECU": {
    icon: "🖥️",
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  "Electrical & Wiring": {
    icon: "🔌",
    color: "text-yellow-700",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
  },
  "Charging System": {
    icon: "⚡",
    color: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  Throttle: {
    icon: "🎯",
    color: "text-purple-700",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
  "Brakes & Safety": {
    icon: "🛑",
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
  },
  "Overheat & Temperature": {
    icon: "🌡️",
    color: "text-rose-700",
    bg: "bg-rose-50",
    border: "border-rose-200",
  },
  "Accessories & Electricals": {
    icon: "💡",
    color: "text-indigo-700",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
  },
  "Hall Sensor / Regen": {
    icon: "🔄",
    color: "text-teal-700",
    bg: "bg-teal-50",
    border: "border-teal-200",
  },
  General: {
    icon: "🔧",
    color: "text-gray-700",
    bg: "bg-gray-50",
    border: "border-gray-200",
  },
};

function downloadFaultsAsCSV(allFaults: HelpFault[]) {
  const headers = [
    "Sr. No.",
    "Fault Name",
    "Category",
    "Severity",
    "Keywords",
    "What to Check",
    "Expected Values",
    "Tools Required",
    "Root Cause",
    "Repair Steps",
  ];
  const rows = allFaults.map((fault, idx) => [
    idx + 1,
    fault.name,
    fault.category ?? fault.group ?? "General",
    fault.severity,
    fault.keywords.join("; "),
    fault.checks.join("; "),
    fault.expectedValues.map((ev) => `${ev.label}: ${ev.value}`).join("; "),
    fault.tools.join("; "),
    fault.rootCause,
    fault.repairSteps.join("; "),
  ]);
  const csvContent = [headers, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "EV_Fault_Reference.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("general");

  const filteredGeneral = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return HELP_FAULTS;
    return HELP_FAULTS.filter(
      (fault) =>
        fault.name.toLowerCase().includes(q) ||
        fault.keywords.some((kw) => kw.toLowerCase().includes(q)) ||
        fault.rootCause.toLowerCase().includes(q) ||
        fault.checks.some((c) => c.toLowerCase().includes(q)) ||
        fault.repairSteps.some((s) => s.toLowerCase().includes(q)),
    );
  }, [searchQuery]);

  const filteredSpecific = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return ALL_SUB_FAULTS;
    return ALL_SUB_FAULTS.filter(
      (fault) =>
        fault.name.toLowerCase().includes(q) ||
        fault.group?.toLowerCase().includes(q) ||
        fault.keywords.some((kw) => kw.toLowerCase().includes(q)) ||
        fault.rootCause.toLowerCase().includes(q) ||
        fault.checks.some((c) => c.toLowerCase().includes(q)) ||
        fault.repairSteps.some((s) => s.toLowerCase().includes(q)),
    );
  }, [searchQuery]);

  const faultsByCategory = useMemo(() => {
    const allFaults = [...HELP_FAULTS, ...ALL_SUB_FAULTS];
    const q = searchQuery.toLowerCase().trim();
    const filtered = q
      ? allFaults.filter(
          (fault) =>
            fault.name.toLowerCase().includes(q) ||
            fault.keywords.some((kw) => kw.toLowerCase().includes(q)) ||
            fault.rootCause.toLowerCase().includes(q) ||
            fault.checks.some((c) => c.toLowerCase().includes(q)) ||
            (fault.category ?? "General").toLowerCase().includes(q),
        )
      : allFaults;
    return filtered.reduce<Record<string, HelpFault[]>>((acc, fault) => {
      const cat = fault.category ?? fault.group ?? "General";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(fault);
      return acc;
    }, {});
  }, [searchQuery]);

  const totalFaults = HELP_FAULTS.length + ALL_SUB_FAULTS.length;
  const displayedCount =
    activeTab === "general" ? filteredGeneral.length : filteredSpecific.length;
  const totalCount =
    activeTab === "general" ? HELP_FAULTS.length : ALL_SUB_FAULTS.length;

  return (
    <div className="space-y-6" data-ocid="help.page">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen size={20} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                Fault Help Guide
              </h1>
              <p className="text-sm text-muted-foreground">
                Complete reference of all EV faults — technician can search and
                select
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-primary text-primary hover:bg-primary hover:text-white flex-shrink-0"
            onClick={() =>
              downloadFaultsAsCSV([...HELP_FAULTS, ...ALL_SUB_FAULTS])
            }
            data-ocid="help.download_button"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Download Excel</span>
            <span className="sm:hidden">Export</span>
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-border bg-card px-4 py-3">
          <div className="text-2xl font-bold text-foreground">
            {totalFaults}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            Total Faults
          </div>
        </div>
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <div className="text-2xl font-bold text-red-600">
            {HELP_FAULTS.filter((f) => f.severity === "critical").length +
              ALL_SUB_FAULTS.filter((f) => f.severity === "critical").length}
          </div>
          <div className="text-xs text-red-500 mt-0.5">Critical</div>
        </div>
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3">
          <div className="text-2xl font-bold text-yellow-600">
            {HELP_FAULTS.filter((f) => f.severity === "warning").length}
          </div>
          <div className="text-xs text-yellow-500 mt-0.5">Warning</div>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative" data-ocid="help.search_input">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="text"
          placeholder="Search by fault name, symptom, keyword, or component..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 text-base"
          data-ocid="help.search.input"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} data-ocid="help.tab">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="general" data-ocid="help.general.tab">
            General Faults
            <span className="ml-2 text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full font-medium">
              {HELP_FAULTS.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="specific" data-ocid="help.specific.tab">
            Specific Sub-Faults
            <span className="ml-2 text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full font-medium">
              {ALL_SUB_FAULTS.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="bycategory" data-ocid="help.bycategory.tab">
            By Category
            <span className="ml-2 text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full font-medium">
              {Object.keys(faultsByCategory).length}
            </span>
          </TabsTrigger>
        </TabsList>

        {/* Results count */}
        <div className="flex items-center justify-between text-sm mt-4">
          <span className="text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {displayedCount}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">{totalCount}</span>{" "}
            faults
            {searchQuery && (
              <span className="ml-1 text-primary">
                for &ldquo;{searchQuery}&rdquo;
              </span>
            )}
          </span>
        </div>

        <TabsContent value="general" className="mt-4 space-y-3">
          {filteredGeneral.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-20 text-center"
              data-ocid="help.empty_state"
            >
              <Search size={40} className="text-muted-foreground/30 mb-4" />
              <p className="text-lg font-semibold text-foreground">
                No faults found
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Try searching with different keywords like
                &ldquo;battery&rdquo;, &ldquo;motor&rdquo;, or &ldquo;E1&rdquo;
              </p>
            </div>
          ) : (
            <FaultAccordion
              faults={filteredGeneral}
              ocidPrefix="help.general"
            />
          )}
        </TabsContent>

        <TabsContent value="specific" className="mt-4 space-y-3">
          <div className="mb-3 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm text-primary">
            <strong>Technician Tip:</strong> These are specific sub-faults for
            Motor, Battery, Controller, Charging, and Brake categories. Select
            the exact symptom to see targeted checks and test values.
          </div>
          {filteredSpecific.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-20 text-center"
              data-ocid="help.specific.empty_state"
            >
              <Search size={40} className="text-muted-foreground/30 mb-4" />
              <p className="text-lg font-semibold text-foreground">
                No specific faults found
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Try searching by symptom like &ldquo;motor dead&rdquo;,
                &ldquo;bearing noise&rdquo;, or &ldquo;battery cutoff&rdquo;
              </p>
            </div>
          ) : (
            <FaultAccordion
              faults={filteredSpecific}
              ocidPrefix="help.specific"
            />
          )}
        </TabsContent>

        <TabsContent value="bycategory" className="mt-4 space-y-4">
          {Object.keys(faultsByCategory).length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-20 text-center"
              data-ocid="help.bycategory.empty_state"
            >
              <Search size={40} className="text-muted-foreground/30 mb-4" />
              <p className="text-lg font-semibold text-foreground">
                No faults found
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Try a different search term
              </p>
            </div>
          ) : (
            Object.entries(faultsByCategory)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([category, faults]) => {
                const cfg =
                  CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG.General;
                return (
                  <div
                    key={category}
                    className={`rounded-xl border ${cfg.border} overflow-hidden`}
                    data-ocid="help.bycategory.panel"
                  >
                    <div
                      className={`flex items-center justify-between px-5 py-3 ${cfg.bg} border-b ${cfg.border}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{cfg.icon}</span>
                        <span className={`font-bold text-base ${cfg.color}`}>
                          {category}
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs font-semibold ${cfg.color} border-current`}
                      >
                        {faults.length}{" "}
                        {faults.length === 1 ? "fault" : "faults"}
                      </Badge>
                    </div>
                    <div className="p-3 bg-card">
                      <FaultAccordion
                        faults={faults}
                        ocidPrefix={`help.cat.${category.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
                      />
                    </div>
                  </div>
                );
              })
          )}
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <footer className="pt-6 pb-2 text-center text-xs text-muted-foreground border-t border-border">
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
