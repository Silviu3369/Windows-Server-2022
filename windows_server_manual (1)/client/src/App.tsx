import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import SectionPage from "./pages/SectionPage";
import LearningPath from './pages/LearningPath';
import CompetencyChecklist from './pages/CompetencyChecklist';
import LabCapstone from './pages/LabCapstone';
import ModuleContent from "./pages/ModuleContent";
import Resources from '@/pages/Resources';
import Glossary from '@/pages/Glossary';


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path="/learning-path" component={LearningPath} />
      <Route path="/section/:id" component={SectionPage} />
      <Route path="/competency" component={CompetencyChecklist} />
      <Route path="/capstone" component={LabCapstone} />
      <Route path="/module/:id" component={ModuleContent} />
      <Route path="/resources" component={Resources} />
      <Route path="/glossary" component={Glossary} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
