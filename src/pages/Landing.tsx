import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Edit, Trash2, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Website {
  id: string;
  name: string;
  template: string;
  lastModified: string;
  isPublished: boolean;
  previewUrl: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: string;
}

const Landing = () => {
  const navigate = useNavigate();
  
  // Mock data for existing websites
  const [websites] = useState<Website[]>([
    {
      id: "1",
      name: "My Portfolio",
      template: "Portfolio",
      lastModified: "2 hours ago",
      isPublished: true,
      previewUrl: "/preview/my-portfolio"
    },
    {
      id: "2", 
      name: "Tech Blog",
      template: "Blog",
      lastModified: "1 day ago",
      isPublished: false,
      previewUrl: "/preview/tech-blog"
    }
  ]);

  const templates: Template[] = [
    {
      id: "portfolio",
      name: "Creative Portfolio",
      description: "Multi-page portfolio with Home, About, Portfolio, and Contact sections. Perfect for designers and creative professionals.",
      preview: "/api/placeholder/400/300",
      category: "Portfolio"
    },
    {
      id: "business",
      name: "Professional Business",
      description: "Complete business website with Services, About, and Contact pages. Ideal for consultants and service providers.",
      preview: "/api/placeholder/400/300", 
      category: "Business"
    },
    {
      id: "restaurant",
      name: "Restaurant & Food", 
      description: "Full restaurant website with Menu, About, and Reservation pages. Ready-to-use for food businesses.",
      preview: "/api/placeholder/400/300",
      category: "Restaurant"
    }
  ];

  const handleCreateBlank = () => {
    const newId = `website-${Date.now()}`;
    navigate(`/builder/${newId}`);
  };

  const handleUseTemplate = (templateId: string) => {
    const newId = `website-${Date.now()}`;
    navigate(`/builder/${newId}?template=${templateId}`);
  };

  const handleEditWebsite = (websiteId: string) => {
    navigate(`/builder/${websiteId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Globe className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold text-foreground">WebBuilder</h1>
            </div>
            <Button size="sm" onClick={handleCreateBlank}>
              <Plus className="w-4 h-4 mr-2" />
              New Website
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Get Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 border-dashed border-2 hover:border-primary/50"
              onClick={handleCreateBlank}
            >
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                  <Plus className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Start from Scratch</h3>
                <p className="text-sm text-muted-foreground">Create a blank website and build from the ground up</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all duration-200">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Browse Templates</h3>
                <p className="text-sm text-muted-foreground">Choose from our collection of professionally designed templates</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all duration-200">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Import Website</h3>
                <p className="text-sm text-muted-foreground">Import an existing website or design</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* My Websites */}
        {websites.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground">My Websites</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {websites.map((website) => (
                <Card key={website.id} className="hover:shadow-lg transition-all duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{website.name}</CardTitle>
                      {website.isPublished && (
                        <Badge variant="secondary" className="text-xs">
                          Live
                        </Badge>
                      )}
                    </div>
                    <CardDescription>
                      {website.template} • Updated {website.lastModified}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditWebsite(website.id)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Templates */}
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-6">Choose a Template</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-all duration-200 overflow-hidden">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img 
                    src={template.preview} 
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <Button
                      onClick={() => handleUseTemplate(template.id)}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                    >
                      Use Template
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;