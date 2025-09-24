import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, X } from "lucide-react";
import type { BuilderElement } from "../WebsiteBuilder";

interface PropertyPanelProps {
  element: BuilderElement;
  onUpdateElement: (elementId: string, updates: Partial<BuilderElement>) => void;
  onDeleteElement: (elementId: string) => void;
}

export const PropertyPanel = ({
  element,
  onUpdateElement,
  onDeleteElement,
}: PropertyPanelProps) => {
  const [activeTab, setActiveTab] = useState<"content" | "style" | "position">("content");

  const updateContent = (key: string, value: any) => {
    onUpdateElement(element.id, {
      content: { ...element.content, [key]: value },
    });
  };

  const updateStyle = (key: string, value: any) => {
    onUpdateElement(element.id, {
      styles: { ...element.styles, [key]: value },
    });
  };

  const updatePosition = (key: string, value: number) => {
    if (key === "width" || key === "height") {
      onUpdateElement(element.id, {
        size: { ...element.size, [key]: value },
      });
    } else {
      onUpdateElement(element.id, {
        position: { ...element.position, [key]: value },
      });
    }
  };

  const renderContentTab = () => {
    switch (element.type) {
      case "text":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text-content">Text Content</Label>
              <Input
                id="text-content"
                value={element.content.text || ""}
                onChange={(e) => updateContent("text", e.target.value)}
                placeholder="Enter text..."
              />
            </div>
            
            <div>
              <Label htmlFor="text-tag">HTML Tag</Label>
              <Select value={element.content.tag || "p"} onValueChange={(value) => updateContent("tag", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="h1">Heading 1</SelectItem>
                  <SelectItem value="h2">Heading 2</SelectItem>
                  <SelectItem value="h3">Heading 3</SelectItem>
                  <SelectItem value="p">Paragraph</SelectItem>
                  <SelectItem value="span">Span</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
        
      case "image":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="image-src">Image URL</Label>
              <Input
                id="image-src"
                value={element.content.src || ""}
                onChange={(e) => updateContent("src", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div>
              <Label htmlFor="image-alt">Alt Text</Label>
              <Input
                id="image-alt"
                value={element.content.alt || ""}
                onChange={(e) => updateContent("alt", e.target.value)}
                placeholder="Describe the image..."
              />
            </div>
          </div>
        );
        
      case "button":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="button-text">Button Text</Label>
              <Input
                id="button-text"
                value={element.content.text || ""}
                onChange={(e) => updateContent("text", e.target.value)}
                placeholder="Button text..."
              />
            </div>
            
            <div>
              <Label htmlFor="button-href">Link URL</Label>
              <Input
                id="button-href"
                value={element.content.href || ""}
                onChange={(e) => updateContent("href", e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          </div>
        );
        
      case "video":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="video-src">Video URL</Label>
              <Input
                id="video-src"
                value={element.content.src || ""}
                onChange={(e) => updateContent("src", e.target.value)}
                placeholder="https://example.com/video.mp4"
              />
            </div>
            
            <div>
              <Label htmlFor="video-title">Video Title</Label>
              <Input
                id="video-title"
                value={element.content.title || ""}
                onChange={(e) => updateContent("title", e.target.value)}
                placeholder="Video title..."
              />
            </div>
          </div>
        );
        
      default:
        return <div>No content options available</div>;
    }
  };

  const renderStyleTab = () => {
    return (
      <div className="space-y-4">
        {element.type === "text" && (
          <>
            <div>
              <Label htmlFor="font-size">Font Size</Label>
              <Input
                id="font-size"
                value={element.styles.fontSize || "16px"}
                onChange={(e) => updateStyle("fontSize", e.target.value)}
                placeholder="16px"
              />
            </div>
            
            <div>
              <Label htmlFor="font-weight">Font Weight</Label>
              <Select value={element.styles.fontWeight || "400"} onValueChange={(value) => updateStyle("fontWeight", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="300">Light</SelectItem>
                  <SelectItem value="400">Normal</SelectItem>
                  <SelectItem value="500">Medium</SelectItem>
                  <SelectItem value="600">Semi Bold</SelectItem>
                  <SelectItem value="700">Bold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="text-align">Text Align</Label>
              <Select value={element.styles.textAlign || "left"} onValueChange={(value) => updateStyle("textAlign", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
        
        <div>
          <Label htmlFor="border-radius">Border Radius</Label>
          <Input
            id="border-radius"
            value={element.styles.borderRadius || "0px"}
            onChange={(e) => updateStyle("borderRadius", e.target.value)}
            placeholder="8px"
          />
        </div>
        
        {element.type === "button" && (
          <>
            <div>
              <Label htmlFor="bg-color">Background Color</Label>
              <Input
                id="bg-color"
                value={element.styles.backgroundColor || ""}
                onChange={(e) => updateStyle("backgroundColor", e.target.value)}
                placeholder="hsl(var(--primary))"
              />
            </div>
            
            <div>
              <Label htmlFor="text-color">Text Color</Label>
              <Input
                id="text-color"
                value={element.styles.color || ""}
                onChange={(e) => updateStyle("color", e.target.value)}
                placeholder="hsl(var(--primary-foreground))"
              />
            </div>
          </>
        )}
      </div>
    );
  };

  const renderPositionTab = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="pos-x">X Position</Label>
            <Input
              id="pos-x"
              type="number"
              value={element.position.x}
              onChange={(e) => updatePosition("x", parseInt(e.target.value) || 0)}
            />
          </div>
          
          <div>
            <Label htmlFor="pos-y">Y Position</Label>
            <Input
              id="pos-y"
              type="number"
              value={element.position.y}
              onChange={(e) => updatePosition("y", parseInt(e.target.value) || 0)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="width">Width</Label>
            <Input
              id="width"
              type="number"
              value={element.size.width}
              onChange={(e) => updatePosition("width", parseInt(e.target.value) || 100)}
            />
          </div>
          
          <div>
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              type="number"
              value={element.size.height}
              onChange={(e) => updatePosition("height", parseInt(e.target.value) || 50)}
            />
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: "content", label: "Content" },
    { id: "style", label: "Style" },
    { id: "position", label: "Position" },
  ];

  return (
    <div className="w-80 bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="h-14 border-b border-border flex items-center justify-between px-4">
        <h3 className="font-semibold capitalize">{element.type} Properties</h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive"
          onClick={() => onDeleteElement(element.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`
                flex-1 px-4 py-2 text-sm font-medium transition-colors
                ${activeTab === tab.id 
                  ? 'text-primary border-b-2 border-primary bg-primary/5' 
                  : 'text-muted-foreground hover:text-foreground'
                }
              `}
              onClick={() => setActiveTab(tab.id as any)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        {activeTab === "content" && renderContentTab()}
        {activeTab === "style" && renderStyleTab()}
        {activeTab === "position" && renderPositionTab()}
      </div>
    </div>
  );
};