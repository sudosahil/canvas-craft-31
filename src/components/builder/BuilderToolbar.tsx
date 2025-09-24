import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Save, 
  Eye, 
  EyeOff, 
  Share, 
  Undo, 
  Redo, 
  Settings,
  Globe
} from "lucide-react";

interface BuilderToolbarProps {
  isPreviewMode: boolean;
  onTogglePreview: () => void;
  onSave: () => void;
  onPublish: () => void;
}

export const BuilderToolbar = ({
  isPreviewMode,
  onTogglePreview,
  onSave,
  onPublish,
}: BuilderToolbarProps) => {
  return (
    <div className="h-14 bg-card border-b border-border flex items-center justify-between px-4">
      {/* Left Section */}
      <div className="flex items-center space-x-2">
        <div className="font-semibold text-foreground">Website Builder</div>
        <div className="text-sm text-muted-foreground">Untitled Project</div>
      </div>

      {/* Center Section */}
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" disabled>
          <Undo className="h-4 w-4 mr-2" />
          Undo
        </Button>
        <Button variant="outline" size="sm" disabled>
          <Redo className="h-4 w-4 mr-2" />
          Redo
        </Button>
        
        <Separator orientation="vertical" className="h-6" />
        
        <Button
          variant={isPreviewMode ? "default" : "outline"}
          size="sm"
          onClick={onTogglePreview}
        >
          {isPreviewMode ? (
            <>
              <EyeOff className="h-4 w-4 mr-2" />
              Exit Preview
            </>
          ) : (
            <>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </>
          )}
        </Button>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
        
        <Button variant="outline" size="sm" onClick={onSave}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        
        <Button size="sm" onClick={onPublish} className="bg-gradient-primary">
          <Globe className="h-4 w-4 mr-2" />
          Publish
        </Button>
      </div>
    </div>
  );
};