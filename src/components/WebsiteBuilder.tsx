import { useState } from "react";
import { BuilderSidebar } from "./builder/BuilderSidebar";
import { BuilderCanvas } from "./builder/BuilderCanvas";
import { PropertyPanel } from "./builder/PropertyPanel";
import { BuilderToolbar } from "./builder/BuilderToolbar";
import { PageNavigation } from "./builder/PageNavigation";

export type ElementType = "text" | "image" | "button" | "video";

export interface BuilderElement {
  id: string;
  type: ElementType;
  position: { x: number; y: number };
  size: { width: number; height: number };
  content: any;
  styles: Record<string, any>;
}

export interface Template {
  id: string;
  name: string;
  preview: string;
  elements: BuilderElement[];
}

interface WebsiteBuilderProps {
  projectId?: string;
}

const WebsiteBuilder = ({ projectId }: WebsiteBuilderProps) => {
  const [elements, setElements] = useState<BuilderElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  const addElement = (type: ElementType, position: { x: number; y: number }) => {
    const newElement: BuilderElement = {
      id: `element-${Date.now()}`,
      type,
      position,
      size: { width: 200, height: 100 },
      content: getDefaultContent(type),
      styles: getDefaultStyles(type),
    };
    
    setElements([...elements, newElement]);
    setSelectedElement(newElement.id);
  };

  const updateElement = (elementId: string, updates: Partial<BuilderElement>) => {
    setElements(elements.map(el => 
      el.id === elementId ? { ...el, ...updates } : el
    ));
  };

  const deleteElement = (elementId: string) => {
    setElements(elements.filter(el => el.id !== elementId));
    if (selectedElement === elementId) {
      setSelectedElement(null);
    }
  };

  const loadTemplate = (template: Template) => {
    setCurrentTemplate(template);
    setElements(template.elements);
    setSelectedElement(null);
  };

  const handlePageChange = (pageId: string) => {
    setCurrentPage(pageId);
    setSelectedElement(null);
  };

  const handleAddPage = () => {
    console.log('Add new page functionality');
  };

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Sidebar */}
      <BuilderSidebar 
        onAddElement={addElement}
        onLoadTemplate={loadTemplate}
        currentTemplate={currentTemplate}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <BuilderToolbar 
          isPreviewMode={isPreviewMode}
          onTogglePreview={() => setIsPreviewMode(!isPreviewMode)}
          onSave={() => console.log('Save project')}
          onPublish={() => console.log('Publish site')}
        />
        
        {/* Page Navigation */}
        {!isPreviewMode && elements.length > 0 && (
          <div className="px-4 py-2 border-b border-border bg-card/50">
            <PageNavigation 
              currentPage={currentPage}
              onPageChange={handlePageChange}
              onAddPage={handleAddPage}
            />
          </div>
        )}
        
        {/* Canvas */}
        <div className="flex-1 flex">
          <BuilderCanvas
            elements={elements}
            selectedElement={selectedElement}
            onSelectElement={setSelectedElement}
            onUpdateElement={updateElement}
            onDeleteElement={deleteElement}
            onAddElement={addElement}
            isPreviewMode={isPreviewMode}
          />
          
          {/* Property Panel */}
          {selectedElement && !isPreviewMode && (
            <PropertyPanel
              element={elements.find(el => el.id === selectedElement)!}
              onUpdateElement={updateElement}
              onDeleteElement={deleteElement}
            />
          )}
        </div>
      </div>
    </div>
  );
};

function getDefaultContent(type: ElementType) {
  switch (type) {
    case "text":
      return { text: "Click to edit text", tag: "p" };
    case "image":
      return { src: "", alt: "Image" };
    case "button":
      return { text: "Button", href: "#" };
    case "video":
      return { src: "", title: "Video" };
    default:
      return {};
  }
}

function getDefaultStyles(type: ElementType) {
  switch (type) {
    case "text":
      return {
        fontSize: "16px",
        color: "hsl(var(--foreground))",
        fontWeight: "400",
        textAlign: "left",
      };
    case "image":
      return {
        objectFit: "cover",
        borderRadius: "8px",
      };
    case "button":
      return {
        backgroundColor: "hsl(var(--primary))",
        color: "hsl(var(--primary-foreground))",
        padding: "12px 24px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "500",
      };
    case "video":
      return {
        borderRadius: "8px",
      };
    default:
      return {};
  }
}

export default WebsiteBuilder;