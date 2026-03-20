# EV Technician System

## Current State
Project has a basic EV 2-Wheeler Service Checklist with inspection sections, pass/fail toggles, and print-to-PDF. No diagnosis, fault detection, or history features exist.

## Requested Changes (Diff)

### Add
- New Diagnosis workflow (Steps 1-6):
  - Input form: Vehicle Number, Owner Name, Phone Number, Vehicle Model (dropdown), Problem/Fault description
  - Keyword-based fault detection engine mapping problem text to fault categories
  - Diagnosis section: What to Check, Expected Values, Required Tools
  - Live test input table: Parameter / Expected / Actual / Auto Status (OK/Fault)
  - Auto result: root cause + what to repair
  - Report generation (printable/downloadable)
- History section: list all saved service records, search by phone or vehicle number
- Backend: store service records (vehicle info, customer info, problem, test results, diagnosis, solution)

### Modify
- App navigation to include: New Diagnosis, Reports, History
- Replace existing checklist-only UI with full dashboard layout with sidebar

### Remove
- Old standalone checklist page (superseded by new multi-step diagnosis flow)

## Implementation Plan
1. Backend: ServiceRecord type with all fields; CRUD operations (create, getAll, searchByPhone, searchByVehicle)
2. Frontend keyword fault map (not starting → Battery/BMS/Controller; low pickup → Motor/Throttle; no power → Battery/Controller; etc.)
3. New Diagnosis multi-step form component
4. Diagnosis result + test table component with auto OK/Fault status
5. Report view (printable)
6. History page with search
7. Sidebar navigation
