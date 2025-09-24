import { useState, useRef, useCallback } from "react";
import { DraggableElement } from "./DraggableElement";
import type { BuilderElement, ElementType } from "../WebsiteBuilder";

interface BuilderCanvasProps {
  elements: BuilderElement[];
  selectedElement: string | null;
  onSelectElement: (elementId: string | null) => void;
  onUpdateElement: (elementId: string, updates: Partial<BuilderElement>) => void;
  onDeleteElement: (elementId: string) => void;
  onAddElement: (type: ElementType, position: { x: number; y: number }) => void;
  isPreviewMode: boolean;
}

export const BuilderCanvas = ({
  elements,
  selectedElement,
  onSelectElement,
  onUpdateElement,
  onDeleteElement,
  onAddElement,
  isPreviewMode,
}: BuilderCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [draggedElement, setDraggedElement] = useState<string | null>(null);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onSelectElement(null);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    
    const elementType = e.dataTransfer.getData("elementType") as ElementType;
    if (elementType && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      onAddElement(elementType, { x, y });
    }
  }, [onAddElement]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleElementDragStart = (elementId: string) => {
    setDraggedElement(elementId);
  };

  const handleElementDragEnd = () => {
    setDraggedElement(null);
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-canvas">
      {/* Canvas Header */}
      <div className="h-12 bg-card border-b border-border flex items-center justify-center px-4">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            {isPreviewMode ? "Preview Mode" : "Design Mode"}
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="text-sm text-muted-foreground">
            {elements.length} element{elements.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Canvas */}
          <div
            ref={canvasRef}
            className={`
              relative min-h-[800px] bg-card rounded-lg shadow-large overflow-hidden
              ${!isPreviewMode ? 'border-2 border-dashed border-border' : 'border border-border'}
            `}
            onClick={handleCanvasClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
              backgroundImage: !isPreviewMode 
                ? `radial-gradient(circle, hsl(var(--canvas-grid)) 1px, transparent 1px)`
                : 'none',
              backgroundSize: !isPreviewMode ? '20px 20px' : 'auto',
            }}
          >
            {elements.map((element) => (
              <DraggableElement
                key={element.id}
                element={element}
                isSelected={selectedElement === element.id}
                isPreviewMode={isPreviewMode}
                isDragging={draggedElement === element.id}
                onSelect={() => onSelectElement(element.id)}
                onUpdate={(updates) => onUpdateElement(element.id, updates)}
                onDelete={() => onDeleteElement(element.id)}
                onDragStart={() => handleElementDragStart(element.id)}
                onDragEnd={handleElementDragEnd}
              />
            ))}

            {/* Empty State */}
            {elements.length === 0 && !isPreviewMode && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-4xl">🎨</div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Start Building</h3>
                    <p className="text-muted-foreground">
                      Choose a template or drag elements from the sidebar
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};