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
    name: "Creative Portfolio",
    preview: "/api/placeholder/200/150",
    elements: [
      {
        id: "header-1",
        type: "text",
        position: { x: 50, y: 50 },
        size: { width: 600, height: 80 },
        content: { text: "Sarah Johnson", tag: "h1" },
        styles: {
          fontSize: "48px",
          color: "hsl(var(--foreground))",
          fontWeight: "700",
          textAlign: "center",
        }
      },
      {
        id: "subtitle-1",
        type: "text", 
        position: { x: 50, y: 140 },
        size: { width: 600, height: 40 },
        content: { text: "UX/UI Designer & Creative Director", tag: "h2" },
        styles: {
          fontSize: "24px",
          color: "hsl(var(--primary))",
          fontWeight: "500",
          textAlign: "center",
        }
      },
      {
        id: "description-1", 
        type: "text",
        position: { x: 50, y: 200 },
        size: { width: 600, height: 80 },
        content: { text: "I craft beautiful digital experiences that delight users and drive business results. With 8+ years of experience in design and strategy.", tag: "p" },
        styles: {
          fontSize: "18px",
          color: "hsl(var(--muted-foreground))",
          fontWeight: "400", 
          textAlign: "center",
          lineHeight: "1.6",
        }
      },
      {
        id: "cta-button-1",
        type: "button",
        position: { x: 225, y: 300 },
        size: { width: 150, height: 50 },
        content: { text: "View Portfolio", href: "#work" },
        styles: {
          backgroundColor: "hsl(var(--primary))",
          color: "hsl(var(--primary-foreground))",
          padding: "12px 24px",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "500",
        }
      },
      {
        id: "contact-button-1",
        type: "button",
        position: { x: 395, y: 300 },
        size: { width: 130, height: 50 },
        content: { text: "Contact Me", href: "#contact" },
        styles: {
          backgroundColor: "transparent",
          color: "hsl(var(--foreground))",
          border: "2px solid hsl(var(--border))",
          padding: "12px 24px", 
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "500",
        }
      }
    ]
  },
  {
    id: "blog",
    name: "Personal Blog", 
    preview: "/api/placeholder/200/150",
    elements: [
      {
        id: "blog-header-1",
        type: "text",
        position: { x: 50, y: 50 },
        size: { width: 600, height: 60 },
        content: { text: "TechInsights Blog", tag: "h1" },
        styles: {
          fontSize: "40px",
          color: "hsl(var(--foreground))",
          fontWeight: "800",
          textAlign: "center",
        }
      },
      {
        id: "blog-tagline-1",
        type: "text",
        position: { x: 50, y: 120 },
        size: { width: 600, height: 40 },
        content: { text: "Exploring the latest in technology and innovation", tag: "p" },
        styles: {
          fontSize: "18px",
          color: "hsl(var(--muted-foreground))",
          fontWeight: "400",
          textAlign: "center", 
          fontStyle: "italic",
        }
      },
      {
        id: "blog-post-1",
        type: "text",
        position: { x: 50, y: 200 },
        size: { width: 280, height: 120 },
        content: { text: "The Future of AI in Web Development\n\nDiscover how artificial intelligence is revolutionizing the way we build websites and applications.", tag: "div" },
        styles: {
          fontSize: "16px",
          color: "hsl(var(--foreground))",
          fontWeight: "400",
          textAlign: "left",
          backgroundColor: "hsl(var(--card))",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid hsl(var(--border))",
        }
      },
      {
        id: "blog-post-2",
        type: "text",
        position: { x: 370, y: 200 },
        size: { width: 280, height: 120 },
        content: { text: "Design Systems That Scale\n\nLearn how to create design systems that grow with your product and team.", tag: "div" },
        styles: {
          fontSize: "16px",
          color: "hsl(var(--foreground))",
          fontWeight: "400",
          textAlign: "left",
          backgroundColor: "hsl(var(--card))",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid hsl(var(--border))",
        }
      }
    ]
  },
  {
    id: "landing",
    name: "Business Landing",
    preview: "/api/placeholder/200/150", 
    elements: [
      {
        id: "hero-1",
        type: "text", 
        position: { x: 50, y: 80 },
        size: { width: 700, height: 120 },
        content: { text: "Scale Your Business with CloudFlow", tag: "h1" },
        styles: {
          fontSize: "48px",
          color: "hsl(var(--foreground))",
          fontWeight: "800",
          textAlign: "center",
        }
      },
      {
        id: "subtitle-1",
        type: "text",
        position: { x: 50, y: 220 },
        size: { width: 700, height: 60 },
        content: { text: "The all-in-one platform that helps businesses automate workflows, boost productivity, and drive growth.", tag: "p" },
        styles: {
          fontSize: "20px",
          color: "hsl(var(--muted-foreground))",
          fontWeight: "400",
          textAlign: "center",
          lineHeight: "1.5",
        }
      },
      {
        id: "cta-main",
        type: "button",
        position: { x: 275, y: 300 },
        size: { width: 150, height: 50 },
        content: { text: "Start Free Trial", href: "#signup" },
        styles: {
          backgroundColor: "hsl(var(--primary))",
          color: "hsl(var(--primary-foreground))",
          padding: "14px 28px",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "600",
        }
      },
      {
        id: "demo-button",
        type: "button",
        position: { x: 445, y: 300 },
        size: { width: 130, height: 50 },
        content: { text: "Watch Demo", href: "#demo" },
        styles: {
          backgroundColor: "transparent",
          color: "hsl(var(--foreground))",
          border: "2px solid hsl(var(--border))",
          padding: "14px 28px",
          borderRadius: "8px", 
          fontSize: "16px",
          fontWeight: "600",
        }
      },
      {
        id: "features-text",
        type: "text",
        position: { x: 50, y: 400 },
        size: { width: 700, height: 80 },
        content: { text: "✓ 99.9% Uptime Guarantee  ✓ Advanced Analytics  ✓ 24/7 Support  ✓ Enterprise Security", tag: "p" },
        styles: {
          fontSize: "16px",
          color: "hsl(var(--muted-foreground))",
          fontWeight: "500",
          textAlign: "center",
          lineHeight: "1.8",
        }
      }
    ]
  }
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