import { useState, useRef, useEffect } from "react";
import { Trash2, Move, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BuilderElement } from "../WebsiteBuilder";
import { useDraggable } from "@dnd-kit/core";

interface DraggableElementProps {
  element: BuilderElement;
  isSelected: boolean;
  isPreviewMode: boolean;
  isDragging: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<BuilderElement>) => void;
  onDelete: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}

export const DraggableElement = ({
  element,
  isSelected,
  isPreviewMode,
  isDragging,
  onSelect,
  onUpdate,
  onDelete,
  onDragStart,
  onDragEnd,
}: DraggableElementProps) => {
  const [isResizing, setIsResizing] = useState(false);
  const [isDraggingElement, setIsDraggingElement] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: 0, height: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isPreviewMode) return;
    
    e.stopPropagation();
    onSelect();
    
    // Ensure drag functionality works for all element types
    if (e.target === elementRef.current || 
        (e.target as HTMLElement).classList.contains('drag-handle') ||
        (e.target as HTMLElement).classList.contains('element-content')) {
      setIsDraggingElement(true);
      onDragStart();
      startPos.current = {
        x: e.clientX - element.position.x,
        y: e.clientY - element.position.y,
      };
    }
  };
  const [isEditing, setIsEditing] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const startSize = useRef({ width: 0, height: 0 });
  
  // Use dnd-kit's useDraggable hook
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
    disabled: isPreviewMode || isResizing || isEditing,
  });

  // Handle element selection
  const handleClick = (e: React.MouseEvent) => {
    if (isPreviewMode) return;
    e.stopPropagation();
    onSelect();
  };

  // Handle text editing
  const handleDoubleClick = (e: React.MouseEvent) => {
    if (isPreviewMode || element.type !== "text") return;
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({
      content: { ...element.content, text: e.target.value },
    });
  };

  const handleTextBlur = () => {
    setIsEditing(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing && !isPreviewMode) {
      const newWidth = Math.max(50, e.clientX - element.position.x);
      const newHeight = Math.max(30, e.clientY - element.position.y);
      
      onUpdate({
        size: {
          width: newWidth,
          height: newHeight,
        },
      });
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    onDragEnd();
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    if (isPreviewMode) return;
    
    e.stopPropagation();
    setIsResizing(true);
    startSize.current = { ...element.size };
  };

  // Add global mouse event listeners for resizing
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();

    if (isResizing) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isResizing]);

  const renderContent = () => {
    switch (element.type) {
      case "text":
        const Tag = element.content.tag || "p";
        if (isEditing) {
          return (
            <textarea
              value={element.content.text}
              onChange={handleTextChange}
              onBlur={handleTextBlur}
              style={{
                ...element.styles,
                resize: "none",
                border: "none",
                background: "transparent",
              }}
              className="w-full h-full outline-none"
              autoFocus
            />
          );
        }
        return (
          <Tag
            style={element.styles}
            className="w-full h-full outline-none"
            onDoubleClick={handleDoubleClick}
          >
            {element.content.text}
          </Tag>
        );
        
      case "image":
        return (
          <div className="w-full h-full flex items-center justify-center bg-muted rounded-md">
            {element.content.src ? (
              <img
                src={element.content.src}
                alt={element.content.alt}
                style={element.styles}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center text-muted-foreground">
                <div className="text-2xl mb-2">🖼️</div>
                <div className="text-sm">Click to add image</div>
              </div>
            )}
          </div>
        );
        
      case "button":
        return (
          <button
            style={element.styles}
            className="flex items-center justify-center transition-all hover:opacity-90"
            onClick={(e) => {
              if (isPreviewMode && element.content.href) {
                window.open(element.content.href, '_blank');
              } else {
                e.preventDefault();
              }
            }}
          >
            {element.content.text}
          </button>
        );
        
      case "video":
        return (
          <div className="w-full h-full flex items-center justify-center bg-muted rounded-md">
            {element.content.src ? (
              <video
                src={element.content.src}
                controls
                style={element.styles}
                className="w-full h-full"
              />
            ) : (
              <div className="text-center text-muted-foreground">
                <div className="text-2xl mb-2">🎥</div>
                <div className="text-sm">Click to add video</div>
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div
      ref={elementRef}
      className={`
        absolute cursor-move group
        ${isSelected && !isPreviewMode ? 'ring-2 ring-selection ring-offset-2' : ''}
        ${isDragging ? 'opacity-75' : ''}
        ${isPreviewMode ? 'cursor-default' : ''}
      `}
      style={{
        left: element.position.x,
        top: element.position.y,
        width: element.size.width,
        height: element.size.height,
        zIndex: isSelected ? 10 : 1,
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Element Content */}
      <div className="w-full h-full element-content">
        {renderContent()}
      </div>

      {/* Selection Controls */}
      {isSelected && !isPreviewMode && (
        <>
          {/* Resize Handle */}
          <div
            className="absolute bottom-0 right-0 w-4 h-4 bg-selection border border-white rounded-sm cursor-se-resize"
            onMouseDown={handleResizeStart}
          />
          
          {/* Action Buttons - Fix placement to -top-10 */}
          <div className="absolute -top-10 left-0 flex items-center space-x-1 bg-card border border-border rounded-md shadow-medium px-2 py-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 drag-handle cursor-move"
            >
              <Move className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 text-destructive hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};