import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { HelpPage } from "./pages/HelpPage";
import { HistoryPage } from "./pages/HistoryPage";
import { NewDiagnosis } from "./pages/NewDiagnosis";
import { ReportPage } from "./pages/ReportPage";
import type { Page, ServiceRecord } from "./types";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("diagnosis");
  const [currentReport, setCurrentReport] = useState<ServiceRecord | null>(
    null,
  );

  function handleReportSaved(record: ServiceRecord) {
    setCurrentReport(record);
    setCurrentPage("reports");
  }

  function handleViewRecord(record: ServiceRecord) {
    setCurrentReport(record);
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pt-16 md:pt-8">
          {currentPage === "diagnosis" && (
            <NewDiagnosis onReportSaved={handleReportSaved} />
          )}
          {currentPage === "reports" && (
            <ReportPage
              record={currentReport}
              onBack={() => setCurrentPage("diagnosis")}
            />
          )}
          {currentPage === "history" && (
            <HistoryPage
              onNavigate={setCurrentPage}
              onViewRecord={handleViewRecord}
            />
          )}
          {currentPage === "help" && <HelpPage />}
        </div>
      </main>

      <Toaster />
    </div>
  );
}
