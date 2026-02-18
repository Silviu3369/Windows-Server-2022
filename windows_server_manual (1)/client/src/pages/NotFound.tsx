import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

export default function NotFound() {
  const [, setLocation] = useLocation();
  
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-96 text-center space-y-6">
        <div>
          <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
          <h2 className="text-2xl font-bold text-foreground mb-2">Pagina nu a fost găsită</h2>
          <p className="text-muted-foreground mb-6">
            Secțiunea pe care o cauți nu există sau a fost mutată.
          </p>
        </div>
        <Button 
          size="lg"
          onClick={() => setLocation('/')}
        >
          Înapoi la acasă
        </Button>
      </div>
    </Layout>
  );
}
