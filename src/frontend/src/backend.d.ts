import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ChecklistInput {
    customerName: string;
    technicianName: string;
    vehicleModel: string;
    vehicleStatus: string;
    batteryStatus: string;
}
export interface Checklist {
    customerName: string;
    technicianName: string;
    date: bigint;
    vehicleModel: string;
    vehicleStatus: string;
    batteryStatus: string;
}
export interface backendInterface {
    getChecklist(id: bigint): Promise<Checklist>;
    getRecentChecklists(limit: bigint): Promise<Array<Checklist>>;
    saveChecklist(input: ChecklistInput): Promise<bigint>;
}
