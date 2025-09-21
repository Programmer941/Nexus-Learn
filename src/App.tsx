import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NexusLayout } from "@/components/NexusLayout";
import Dashboard from "./pages/Dashboard";
import Classes from "./pages/Classes";
import ClassDetail from "./pages/ClassDetail";
import Quiz from "./pages/Quiz";
import Lecture from "./pages/Lecture";
import Assignments from "./pages/Assignments";
import Grades from "./pages/Grades";
import Schedule from "./pages/Schedule";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherContentCreate from "./pages/TeacherContentCreate";
import TeacherMarketplace from "./pages/TeacherMarketplace";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <NexusLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/class/:classId" element={<ClassDetail />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/grades" element={<Grades />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/quiz/:quizId" element={<Quiz />} />
            <Route path="/lecture/:lectureId" element={<Lecture />} />
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="/teacher/create" element={<TeacherContentCreate />} />
            <Route path="/teacher/marketplace" element={<TeacherMarketplace />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </NexusLayout>
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
