import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NexusSidebar } from "./NexusSidebar";

interface NexusLayoutProps {
  children: ReactNode;
}

export function NexusLayout({ children }: NexusLayoutProps) {
  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-background">
        <NexusSidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}