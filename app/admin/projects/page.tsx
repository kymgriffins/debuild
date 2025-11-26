'use client';

import { useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  status: string;
  year: string;
  location: string;
  images: string[];
  created_at: string;
}
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Building,
  Loader2
} from "lucide-react";
import Link from "next/link";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const result = await response.json();

        if (result.success) {
          setProjects(result.projects);
        } else {
          console.error('Error fetching projects:', result.error);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    setDeleteLoading(projectId);

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        setProjects(prev => prev.filter(project => project.id !== projectId));
      } else {
        alert('Error deleting project: ' + result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete project');
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center min-h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="ml-2">Loading projects...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Building className="w-8 h-8 mr-3" />
            Projects Management
          </h1>
          <p className="text-muted-foreground">
            Manage your portfolio projects
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Projects ({projects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <div className="text-center py-8">
              <Building className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No projects yet</h3>
              <p className="text-muted-foreground mb-4">
                Get started by adding your first project.
              </p>
              <Button asChild>
                <Link href="/admin/projects/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Project
                </Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">
                      {project.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{project.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          project.status === 'Completed' ? 'default' :
                          project.status === 'Under Construction' ? 'secondary' :
                          'outline'
                        }
                      >
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{project.location}</TableCell>
                    <TableCell>{project.year}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/project/${project.slug}`}>
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/projects/${project.id}/edit`}>
                            <Edit className="w-4 h-4" />
                          </Link>
                        </Button>
                                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(project.id)}
                          disabled={deleteLoading === project.id}
                        >
                          {deleteLoading === project.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
