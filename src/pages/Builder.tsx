import { useParams } from "react-router-dom";
import WebsiteBuilder from "@/components/WebsiteBuilder";

const Builder = () => {
  const { projectId } = useParams();
  
  // Here you could load the specific project data based on projectId
  // For now, we'll just render the WebsiteBuilder component
  
  return <WebsiteBuilder projectId={projectId} />;
};

export default Builder;