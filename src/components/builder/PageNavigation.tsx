import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Home, Info, Phone, Briefcase, Menu as MenuIcon } from "lucide-react";

interface Page {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  anchor: string;
}

interface PageNavigationProps {
  currentPage: string;
  onPageChange: (pageId: string) => void;
  onAddPage: () => void;
}

const defaultPages: Page[] = [
  { id: "home", name: "Home", icon: Home, anchor: "#home" },
  { id: "about", name: "About", icon: Info, anchor: "#about" },
  { id: "services", name: "Services", icon: Briefcase, anchor: "#services" },
  { id: "contact", name: "Contact", icon: Phone, anchor: "#contact" },
];

export const PageNavigation = ({ currentPage, onPageChange, onAddPage }: PageNavigationProps) => {
  const [pages] = useState<Page[]>(defaultPages);

  const scrollToSection = (anchor: string) => {
    // Simulate smooth scrolling to section
    const element = document.querySelector(`[data-anchor="${anchor}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex items-center space-x-2 p-2 bg-card border border-border rounded-lg">
      {pages.map((page) => (
        <Button
          key={page.id}
          variant={currentPage === page.id ? "default" : "ghost"}
          size="sm"
          className="flex items-center space-x-2"
          onClick={() => {
            onPageChange(page.id);
            scrollToSection(page.anchor);
          }}
        >
          <page.icon className="w-4 h-4" />
          <span>{page.name}</span>
          {currentPage === page.id && <Badge variant="secondary" className="ml-1 px-1 py-0 text-xs">Active</Badge>}
        </Button>
      ))}
      
      <Button
        variant="outline"
        size="sm"
        onClick={onAddPage}
        className="flex items-center space-x-1"
      >
        <Plus className="w-4 h-4" />
        <span>Add Page</span>
      </Button>
    </div>
  );
};