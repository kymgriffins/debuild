import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Building,
  Calendar,
  FileText,
  MessageSquare,
  Eye,
  Download
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";

async function getClientProjects() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from('client_projects')
    .select(`
      *,
      projects (*)
    `)
    .eq('client_id', user.id);

  if (error) {
    console.error('Error fetching client projects:', error);
    return [];
  }

  return data || [];
}

export default async function ClientProjects() {
  const projects = await getClientProjects();

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <p className="text-muted-foreground">
          Track progress on your architectural projects and access project documents.
        </p>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Building className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Projects Yet</h3>
            <p className="text-muted-foreground">
              Your projects will appear here once they're assigned to you.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((clientProject: any) => {
            const project = clientProject.projects;
            if (!project) return null;

            // Mock progress based on status
            const progress = clientProject.status === 'completed' ? 100 :
                           clientProject.status === 'in_progress' ? 65 :
                           clientProject.status === 'planning' ? 25 : 10;

            return (
              <Card key={clientProject.id} className="overflow-hidden">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={project.images?.[0] || '/placeholder-project.jpg'}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant={
                      clientProject.status === 'completed' ? 'default' :
                      clientProject.status === 'in_progress' ? 'secondary' : 'outline'
                    }>
                      {clientProject.status}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <p className="text-muted-foreground text-sm">{project.category}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Started {new Date(clientProject.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {project.location}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <FileText className="w-4 h-4 mr-2" />
                        Documents
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Contact Team
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Project Milestones */}
      {projects.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Project Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <h4 className="font-medium">Design Phase Completed</h4>
                  <p className="text-sm text-muted-foreground">Modern Villa Design - All initial designs have been approved</p>
                  <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <h4 className="font-medium">Site Survey Scheduled</h4>
                  <p className="text-sm text-muted-foreground">Commercial Office Complex - Survey appointment confirmed for next week</p>
                  <p className="text-xs text-muted-foreground mt-1">1 week ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <h4 className="font-medium">Permit Application Submitted</h4>
                  <p className="text-sm text-muted-foreground">Residential Renovation - Waiting for local authority approval</p>
                  <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
