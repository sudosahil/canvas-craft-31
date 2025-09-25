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
      // Navigation
      {
        id: "nav-home",
        type: "button",
        position: { x: 50, y: 20 },
        size: { width: 80, height: 40 },
        content: { text: "Home", href: "#home" },
        styles: {
          backgroundColor: "transparent",
          color: "hsl(var(--foreground))",
          fontSize: "16px",
          fontWeight: "500",
          border: "none",
          textDecoration: "underline",
        }
      },
      {
        id: "nav-about",
        type: "button",
        position: { x: 150, y: 20 },
        size: { width: 80, height: 40 },
        content: { text: "About", href: "#about" },
        styles: {
          backgroundColor: "transparent",
          color: "hsl(var(--muted-foreground))",
          fontSize: "16px",
          fontWeight: "500",
          border: "none",
        }
      },
      {
        id: "nav-portfolio",
        type: "button",
        position: { x: 250, y: 20 },
        size: { width: 80, height: 40 },
        content: { text: "Portfolio", href: "#portfolio" },
        styles: {
          backgroundColor: "transparent",
          color: "hsl(var(--muted-foreground))",
          fontSize: "16px",
          fontWeight: "500",
          border: "none",
        }
      },
      {
        id: "nav-contact",
        type: "button",
        position: { x: 350, y: 20 },
        size: { width: 80, height: 40 },
        content: { text: "Contact", href: "#contact" },
        styles: {
          backgroundColor: "transparent",
          color: "hsl(var(--muted-foreground))",
          fontSize: "16px",
          fontWeight: "500",
          border: "none",
        }
      },
      
      // Hero Section
      {
        id: "hero-title",
        type: "text",
        position: { x: 50, y: 100 },
        size: { width: 700, height: 80 },
        content: { text: "Sarah Johnson", tag: "h1" },
        styles: {
          fontSize: "56px",
          color: "hsl(var(--foreground))",
          fontWeight: "800",
          textAlign: "center",
          lineHeight: "1.1",
        }
      },
      {
        id: "hero-subtitle",
        type: "text",
        position: { x: 50, y: 190 },
        size: { width: 700, height: 50 },
        content: { text: "Creative Director & UX/UI Designer", tag: "h2" },
        styles: {
          fontSize: "28px",
          color: "hsl(var(--primary))",
          fontWeight: "600",
          textAlign: "center",
        }
      },
      {
        id: "hero-description",
        type: "text",
        position: { x: 100, y: 260 },
        size: { width: 600, height: 80 },
        content: { text: "I craft beautiful digital experiences that delight users and drive business results. With 8+ years of experience in design and strategy, I help brands tell their story through thoughtful design.", tag: "p" },
        styles: {
          fontSize: "18px",
          color: "hsl(var(--muted-foreground))",
          fontWeight: "400",
          textAlign: "center",
          lineHeight: "1.6",
        }
      },
      
      // CTA Buttons
      {
        id: "cta-portfolio",
        type: "button",
        position: { x: 250, y: 360 },
        size: { width: 160, height: 50 },
        content: { text: "View My Work", href: "#portfolio" },
        styles: {
          backgroundColor: "hsl(var(--primary))",
          color: "hsl(var(--primary-foreground))",
          padding: "14px 28px",
          borderRadius: "12px",
          fontSize: "16px",
          fontWeight: "600",
          border: "none",
        }
      },
      {
        id: "cta-contact",
        type: "button",
        position: { x: 430, y: 360 },
        size: { width: 120, height: 50 },
        content: { text: "Get in Touch", href: "#contact" },
        styles: {
          backgroundColor: "transparent",
          color: "hsl(var(--foreground))",
          border: "2px solid hsl(var(--border))",
          padding: "14px 28px",
          borderRadius: "12px",
          fontSize: "16px",
          fontWeight: "600",
        }
      },
      
      // Portfolio Section
      {
        id: "portfolio-heading",
        type: "text",
        position: { x: 50, y: 460 },
        size: { width: 700, height: 60 },
        content: { text: "Featured Projects", tag: "h2" },
        styles: {
          fontSize: "36px",
          color: "hsl(var(--foreground))",
          fontWeight: "700",
          textAlign: "center",
        }
      },
      {
        id: "project-1",
        type: "text",
        position: { x: 50, y: 540 },
        size: { width: 220, height: 200 },
        content: { text: "E-Commerce Platform\n\nA modern shopping experience with intuitive navigation and seamless checkout process. Increased conversion by 40%.", tag: "div" },
        styles: {
          fontSize: "16px",
          color: "hsl(var(--foreground))",
          fontWeight: "400",
          textAlign: "left",
          backgroundColor: "hsl(var(--card))",
          padding: "24px",
          borderRadius: "16px",
          border: "1px solid hsl(var(--border))",
          lineHeight: "1.5",
        }
      },
      {
        id: "project-2",
        type: "text",
        position: { x: 290, y: 540 },
        size: { width: 220, height: 200 },
        content: { text: "SaaS Dashboard\n\nClean and powerful analytics dashboard that helps businesses track their KPIs with beautiful data visualization.", tag: "div" },
        styles: {
          fontSize: "16px",
          color: "hsl(var(--foreground))",
          fontWeight: "400",
          textAlign: "left",
          backgroundColor: "hsl(var(--card))",
          padding: "24px",
          borderRadius: "16px",
          border: "1px solid hsl(var(--border))",
          lineHeight: "1.5",
        }
      },
      {
        id: "project-3",
        type: "text",
        position: { x: 530, y: 540 },
        size: { width: 220, height: 200 },
        content: { text: "Mobile App Design\n\nUser-centered mobile app design for a fitness startup. Achieved 4.8 app store rating with over 50k downloads.", tag: "div" },
        styles: {
          fontSize: "16px",
          color: "hsl(var(--foreground))",
          fontWeight: "400",
          textAlign: "left",
          backgroundColor: "hsl(var(--card))",
          padding: "24px",
          borderRadius: "16px",
          border: "1px solid hsl(var(--border))",
          lineHeight: "1.5",
        }
      }
    ]
  },
  {
    id: "business",
    name: "Professional Business",
    preview: "/api/placeholder/200/150",
    elements: [
      // Navigation
      {
        id: "nav-home",
        type: "button",
        position: { x: 50, y: 20 },
        size: { width: 80, height: 40 },
        content: { text: "Home", href: "#home" },
        styles: {
          backgroundColor: "transparent",
          color: "hsl(var(--foreground))",
          fontSize: "16px",
          fontWeight: "600",
          border: "none",
          textDecoration: "underline",
        }
      },
      {
        id: "nav-services",
        type: "button",
        position: { x: 150, y: 20 },
        size: { width: 80, height: 40 },
        content: { text: "Services", href: "#services" },
        styles: {
          backgroundColor: "transparent",
          color: "hsl(var(--muted-foreground))",
          fontSize: "16px",
          fontWeight: "500",
          border: "none",
        }
      },
      {
        id: "nav-about",
        type: "button",
        position: { x: 250, y: 20 },
        size: { width: 80, height: 40 },
        content: { text: "About", href: "#about" },
        styles: {
          backgroundColor: "transparent",
          color: "hsl(var(--muted-foreground))",
          fontSize: "16px",
          fontWeight: "500",
          border: "none",
        }
      },
      {
        id: "nav-contact",
        type: "button",
        position: { x: 350, y: 20 },
        size: { width: 80, height: 40 },
        content: { text: "Contact", href: "#contact" },
        styles: {
          backgroundColor: "transparent",
          color: "hsl(var(--muted-foreground))",
          fontSize: "16px",
          fontWeight: "500",
          border: "none",
        }
      },
      
      // Hero Section
      {
        id: "hero-title",
        type: "text",
        position: { x: 50, y: 100 },
        size: { width: 700, height: 100 },
        content: { text: "Transform Your Business with Digital Excellence", tag: "h1" },
        styles: {
          fontSize: "48px",
          color: "hsl(var(--foreground))",
          fontWeight: "800",
          textAlign: "center",
          lineHeight: "1.1",
        }
      },
      {
        id: "hero-subtitle",
        type: "text",
        position: { x: 50, y: 220 },
        size: { width: 700, height: 80 },
        content: { text: "We help businesses grow through strategic consulting, innovative solutions, and proven methodologies that deliver measurable results.", tag: "p" },
        styles: {
          fontSize: "20px",
          color: "hsl(var(--muted-foreground))",
          fontWeight: "400",
          textAlign: "center",
          lineHeight: "1.5",
        }
      },
      
      // CTA Section
      {
        id: "cta-primary",
        type: "button",
        position: { x: 275, y: 320 },
        size: { width: 150, height: 55 },
        content: { text: "Get Started", href: "#contact" },
        styles: {
          backgroundColor: "hsl(var(--primary))",
          color: "hsl(var(--primary-foreground))",
          padding: "16px 32px",
          borderRadius: "12px",
          fontSize: "18px",
          fontWeight: "600",
          border: "none",
        }
      },
      {
        id: "cta-secondary",
        type: "button",
        position: { x: 445, y: 320 },
        size: { width: 130, height: 55 },
        content: { text: "Learn More", href: "#services" },
        styles: {
          backgroundColor: "transparent",
          color: "hsl(var(--foreground))",
          border: "2px solid hsl(var(--border))",
          padding: "16px 32px",
          borderRadius: "12px",
          fontSize: "18px",
          fontWeight: "600",
        }
      },
      
      // Services Section
      {
        id: "services-heading",
        type: "text",
        position: { x: 50, y: 420 },
        size: { width: 700, height: 60 },
        content: { text: "Our Services", tag: "h2" },
        styles: {
          fontSize: "36px",
          color: "hsl(var(--foreground))",
          fontWeight: "700",
          textAlign: "center",
        }
      },
      {
        id: "service-1",
        type: "text",
        position: { x: 50, y: 500 },
        size: { width: 220, height: 180 },
        content: { text: "Digital Strategy\n\nComprehensive digital transformation roadmaps that align with your business goals and market opportunities.", tag: "div" },
        styles: {
          fontSize: "16px",
          color: "hsl(var(--foreground))",
          fontWeight: "400",
          textAlign: "center",
          backgroundColor: "hsl(var(--card))",
          padding: "24px",
          borderRadius: "16px",
          border: "1px solid hsl(var(--border))",
          lineHeight: "1.5",
        }
      },
      {
        id: "service-2",
        type: "text",
        position: { x: 290, y: 500 },
        size: { width: 220, height: 180 },
        content: { text: "Technology Solutions\n\nCustom software development and system integration to streamline your operations and boost efficiency.", tag: "div" },
        styles: {
          fontSize: "16px",
          color: "hsl(var(--foreground))",
          fontWeight: "400",
          textAlign: "center",
          backgroundColor: "hsl(var(--card))",
          padding: "24px",
          borderRadius: "16px",
          border: "1px solid hsl(var(--border))",
          lineHeight: "1.5",
        }
      },
      {
        id: "service-3",
        type: "text",
        position: { x: 530, y: 500 },
        size: { width: 220, height: 180 },
        content: { text: "Growth Marketing\n\nData-driven marketing strategies that attract qualified leads and convert them into loyal customers.", tag: "div" },
        styles: {
          fontSize: "16px",
          color: "hsl(var(--foreground))",
          fontWeight: "400",
          textAlign: "center",
          backgroundColor: "hsl(var(--card))",
          padding: "24px",
          borderRadius: "16px",
          border: "1px solid hsl(var(--border))",
          lineHeight: "1.5",
        }
      }
    ]
  },
  {
    id: "restaurant",
    name: "Restaurant & Food",
    preview: "/api/placeholder/200/150",
    elements: [
      // Navigation
      {
        id: "nav-home",
        type: "button",
        position: { x: 50, y: 20 },
        size: { width: 80, height: 40 },
        content: { text: "Home", href: "#home" },
        styles: {
          backgroundColor: "transparent",
          color: "hsl(var(--foreground))",
          fontSize: "16px",
          fontWeight: "600",
          border: "none",
          textDecoration: "underline",
        }
      },
      {
        id: "nav-menu",
        type: "button",
        position: { x: 150, y: 20 },
        size: { width: 80, height: 40 },
        content: { text: "Menu", href: "#menu" },
        styles: {
          backgroundColor: "transparent",
          color: "hsl(var(--muted-foreground))",
          fontSize: "16px",
          fontWeight: "500",
          border: "none",
        }
      },
      {
        id: "nav-about",
        type: "button",
        position: { x: 250, y: 20 },
        size: { width: 80, height: 40 },
        content: { text: "About", href: "#about" },
        styles: {
          backgroundColor: "transparent",
          color: "hsl(var(--muted-foreground))",
          fontSize: "16px",
          fontWeight: "500",
          border: "none",
        }
      },
      {
        id: "nav-contact",
        type: "button",
        position: { x: 350, y: 20 },
        size: { width: 80, height: 40 },
        content: { text: "Contact", href: "#contact" },
        styles: {
          backgroundColor: "transparent",
          color: "hsl(var(--muted-foreground))",
          fontSize: "16px",
          fontWeight: "500",
          border: "none",
        }
      },
      
      // Hero Section
      {
        id: "hero-title",
        type: "text",
        position: { x: 50, y: 100 },
        size: { width: 700, height: 80 },
        content: { text: "Bella Vista Restaurant", tag: "h1" },
        styles: {
          fontSize: "52px",
          color: "hsl(var(--foreground))",
          fontWeight: "800",
          textAlign: "center",
          lineHeight: "1.1",
        }
      },
      {
        id: "hero-subtitle",
        type: "text",
        position: { x: 50, y: 190 },
        size: { width: 700, height: 50 },
        content: { text: "Authentic Italian Cuisine in the Heart of the City", tag: "h2" },
        styles: {
          fontSize: "24px",
          color: "hsl(var(--primary))",
          fontWeight: "500",
          textAlign: "center",
          fontStyle: "italic",
        }
      },
      {
        id: "hero-description",
        type: "text",
        position: { x: 100, y: 260 },
        size: { width: 600, height: 80 },
        content: { text: "Experience the finest Italian flavors with our chef's signature dishes, made from fresh, locally-sourced ingredients. Join us for an unforgettable dining experience.", tag: "p" },
        styles: {
          fontSize: "18px",
          color: "hsl(var(--muted-foreground))",
          fontWeight: "400",
          textAlign: "center",
          lineHeight: "1.6",
        }
      },
      
      // CTA Buttons
      {
        id: "cta-reservation",
        type: "button",
        position: { x: 250, y: 360 },
        size: { width: 160, height: 50 },
        content: { text: "Make Reservation", href: "#contact" },
        styles: {
          backgroundColor: "hsl(var(--primary))",
          color: "hsl(var(--primary-foreground))",
          padding: "14px 28px",
          borderRadius: "12px",
          fontSize: "16px",
          fontWeight: "600",
          border: "none",
        }
      },
      {
        id: "cta-menu",
        type: "button",
        position: { x: 430, y: 360 },
        size: { width: 120, height: 50 },
        content: { text: "View Menu", href: "#menu" },
        styles: {
          backgroundColor: "transparent",
          color: "hsl(var(--foreground))",
          border: "2px solid hsl(var(--border))",
          padding: "14px 28px",
          borderRadius: "12px",
          fontSize: "16px",
          fontWeight: "600",
        }
      },
      
      // Featured Dishes
      {
        id: "menu-heading",
        type: "text",
        position: { x: 50, y: 460 },
        size: { width: 700, height: 60 },
        content: { text: "Signature Dishes", tag: "h2" },
        styles: {
          fontSize: "36px",
          color: "hsl(var(--foreground))",
          fontWeight: "700",
          textAlign: "center",
        }
      },
      {
        id: "dish-1",
        type: "text",
        position: { x: 50, y: 540 },
        size: { width: 220, height: 200 },
        content: { text: "Truffle Risotto\n$28\n\nCreamy Arborio rice with black truffle, parmesan, and fresh herbs. A true taste of Italian luxury.", tag: "div" },
        styles: {
          fontSize: "16px",
          color: "hsl(var(--foreground))",
          fontWeight: "400",
          textAlign: "center",
          backgroundColor: "hsl(var(--card))",
          padding: "24px",
          borderRadius: "16px",
          border: "1px solid hsl(var(--border))",
          lineHeight: "1.5",
        }
      },
      {
        id: "dish-2",
        type: "text",
        position: { x: 290, y: 540 },
        size: { width: 220, height: 200 },
        content: { text: "Osso Buco\n$32\n\nBraised veal shanks with gremolata, served with creamy polenta and seasonal vegetables.", tag: "div" },
        styles: {
          fontSize: "16px",
          color: "hsl(var(--foreground))",
          fontWeight: "400",
          textAlign: "center",
          backgroundColor: "hsl(var(--card))",
          padding: "24px",
          borderRadius: "16px",
          border: "1px solid hsl(var(--border))",
          lineHeight: "1.5",
        }
      },
      {
        id: "dish-3",
        type: "text",
        position: { x: 530, y: 540 },
        size: { width: 220, height: 200 },
        content: { text: "Tiramisu\n$12\n\nClassic Italian dessert with espresso-soaked ladyfingers, mascarpone, and cocoa powder.", tag: "div" },
        styles: {
          fontSize: "16px",
          color: "hsl(var(--foreground))",
          fontWeight: "400",
          textAlign: "center",
          backgroundColor: "hsl(var(--card))",
          padding: "24px",
          borderRadius: "16px",
          border: "1px solid hsl(var(--border))",
          lineHeight: "1.5",
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