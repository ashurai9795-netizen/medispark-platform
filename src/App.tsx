import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MentalHealthLayout from "@/components/layout/MentalHealthLayout";
import MentalHealthHome from "@/pages/MentalHealthHome";
import ChatPage from "@/pages/ChatPage";
import MoodTrackerPage from "@/pages/MoodTrackerPage";
import JournalPage from "@/pages/JournalPage";
import BreathingPage from "@/pages/BreathingPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MentalHealthLayout />}>
            <Route path="/" element={<MentalHealthHome />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/mood" element={<MoodTrackerPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/breathing" element={<BreathingPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
