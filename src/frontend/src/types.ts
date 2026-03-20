export type FaultCategoryName =
  | "No Start"
  | "Poor Performance"
  | "Power Loss"
  | "Charging Issue"
  | "Mechanical Noise"
  | "Brake Issue"
  | "Display Issue"
  | "General Fault";

export interface TestParam {
  parameter: string;
  expectedValue: string;
  expectedMin: number;
  expectedMax: number;
  unit: string;
}

export interface TestResult {
  parameter: string;
  expectedValue: string;
  actualValue: string;
  status: "ok" | "fault" | "pending";
  unit: string;
}

export interface ServiceRecord {
  id: string;
  date: string;
  vehicleNumber: string;
  ownerName: string;
  phoneNumber: string;
  vehicleModel: string;
  problemDescription: string;
  faultCategory: FaultCategoryName;
  checkItems: string[];
  testResults: TestResult[];
  rootCause: string;
  repairItems: string[];
  overallStatus: "ok" | "fault";
}

export type Page = "diagnosis" | "reports" | "history";
