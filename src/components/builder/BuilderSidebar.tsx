import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Type, 
  Image, 
  Square, 
  Video,
  Layout,
  Palette,
  Settings,
  FileText,
  Plus
} from "lucide-react";
import type { ElementType, Template as TemplateType } from "../WebsiteBuilder";

interface BuilderSidebarProps {
  onAddElement: (type: ElementType, position: { x: number; y: number }) => void;
  onLoadTemplate: (template: TemplateType) => void;
  currentTemplate: TemplateType | null;
}

const templates: TemplateType[] = [
  {
    id: "portfolio",
    name: "Portfolio",
    preview: "/api/placeholder/200/150",
    elements: [
      {
        id: "hero-text",
        type: "text",
        position: { x: 100, y: 50 },
        size: { width: 600, height: 120 },
        content: { text: "John Doe", tag: "h1" },
        styles: {
          fontSize: "48px",
          fontWeight: "700",
          color: "hsl(var(--foreground))",
          textAlign: "center",
        },
      },
      {
        id: "subtitle",
        type: "text",
        position: { x: 100, y: 180 },
        size: { width: 600, height: 60 },
        content: { text: "Creative Designer & Developer", tag: "p" },
        styles: {
          fontSize: "24px",
          fontWeight: "400",
          color: "hsl(var(--muted-foreground))",
          textAlign: "center",
        },
      },
    ],
  },
  {
    id: "landing-page",
    name: "Landing Page",
    preview: "/api/placeholder/200/150",
    elements: [
      {
        id: "headline",
        type: "text",
        position: { x: 50, y: 50 },
        size: { width: 700, height: 80 },
        content: { text: "Build Amazing Websites", tag: "h1" },
        styles: {
          fontSize: "42px",
          fontWeight: "700",
          color: "hsl(var(--foreground))",
          textAlign: "center",
        },
      },
      {
        id: "cta-button",
        type: "button",
        position: { x: 350, y: 200 },
        size: { width: 180, height: 50 },
        content: { text: "Get Started", href: "#" },
        styles: {
          backgroundColor: "hsl(var(--primary))",
          color: "hsl(var(--primary-foreground))",
          padding: "16px 32px",
          borderRadius: "12px",
          fontSize: "16px",
          fontWeight: "600",
        },
      },
    ],
  },
];

export const BuilderSidebar = ({ onAddElement, onLoadTemplate, currentTemplate }: BuilderSidebarProps) => {
  const [activeTab, setActiveTab] = useState<"templates" | "elements" | "design">("templates");

  const handleDragStart = (e: React.DragEvent, elementType: ElementType) => {
    e.dataTransfer.setData("elementType", elementType);
  };

  const elements = [
    { type: "text" as ElementType, icon: Type, label: "Text" },
    { type: "image" as ElementType, icon: Image, label: "Image" },
    { type: "button" as ElementType, icon: Square, label: "Button" },
    { type: "video" as ElementType, icon: Video, label: "Video" },
  ];

  const tabs = [
    { id: "templates", icon: FileText, label: "Templates" },
    { id: "elements", icon: Plus, label: "Elements" },
    { id: "design", icon: Palette, label: "Design" },
  ];

  return (
    <div className="w-80 flex bg-sidebar border-r border-border">
      {/* Tab Navigation */}
      <div className="w-16 bg-sidebar border-r border-border/50 flex flex-col items-center py-4 space-y-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            size="sm"
            className="w-12 h-12 p-0"
            onClick={() => setActiveTab(tab.id as any)}
          >
            <tab.icon className="h-5 w-5" />
          </Button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col p-4">
        {activeTab === "templates" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-sidebar-foreground">Templates</h3>
            </div>
            
            <div className="space-y-3">
              {templates.map((template) => (
                <Card 
                  key={template.id}
                  className={`p-3 cursor-pointer transition-all hover:shadow-medium ${
                    currentTemplate?.id === template.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => onLoadTemplate(template)}
                >
                  <div className="aspect-[4/3] bg-canvas rounded-md mb-2"></div>
                  <h4 className="font-medium text-sm">{template.name}</h4>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "elements" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-sidebar-foreground">Elements</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {elements.map((element) => (
                <Card
                  key={element.type}
                  className="p-4 cursor-move transition-all hover:shadow-medium active:scale-95"
                  draggable
                  onDragStart={(e) => handleDragStart(e, element.type)}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <element.icon className="h-6 w-6 text-muted-foreground" />
                    <span className="text-xs font-medium">{element.label}</span>
                  </div>
                </Card>
              ))}
            </div>
            
            <Separator />
            
            <div className="text-xs text-muted-foreground">
              Drag elements to the canvas to add them to your page
            </div>
          </div>
        )}

        {activeTab === "design" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-sidebar-foreground">Design</h3>
            </div>
            
            <div className="space-y-3">
              <Card className="p-3">
                <h4 className="font-medium text-sm mb-2">Page Settings</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Page Properties
                  </Button>
                </div>
              </Card>
              
              <Card className="p-3">
                <h4 className="font-medium text-sm mb-2">Quick Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Layout className="h-4 w-4 mr-2" />
                    Grid Settings
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};