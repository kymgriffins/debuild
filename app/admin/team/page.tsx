'use client';

import { useState, useEffect } from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email?: string;
  phone?: string;
  bio?: string;
  skills?: string[];
  experience_years?: number;
  image_url?: string;
  linkedin_url?: string;
  created_at: string;
}
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
  Loader2,
  Mail,
  Phone
} from 'lucide-react';
import Link from 'next/link';

export default function AdminTeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch('/api/team-members');
        const result = await response.json();

        if (result.success) {
          setTeamMembers(result.teamMembers);
        } else {
          console.error('Error fetching team members:', result.error);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const handleDelete = async (memberId: string) => {
    if (!confirm('Are you sure you want to delete this team member? This action cannot be undone.')) {
      return;
    }

    setDeleteLoading(memberId);

    try {
      const response = await fetch(`/api/team-members/${memberId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        setTeamMembers(prev => prev.filter(member => member.id !== memberId));
      } else {
        alert('Error deleting team member: ' + result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete team member');
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center min-h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="ml-2">Loading team members...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Users className="w-8 h-8 mr-3" />
            Team Management
          </h1>
          <p className="text-muted-foreground">
            Manage your team members and their profiles
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/team/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Team Member
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Team Members ({teamMembers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {teamMembers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No team members yet</h3>
              <p className="text-muted-foreground mb-4">
                Get started by adding your first team member.
              </p>
              <Button asChild>
                <Link href="/admin/team/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Team Member
                </Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member: any) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-8 h-8 rounded-full mr-3 object-cover"
                        />
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.credentials}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{member.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{member.experience_years} years</div>
                        <div className="text-muted-foreground">{member.projects_completed} projects</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="w-3 h-3 mr-1" />
                          <a href={`mailto:${member.email}`} className="hover:underline">
                            {member.email}
                          </a>
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="w-3 h-3 mr-1" />
                          <a href={`tel:${member.phone}`} className="hover:underline">
                            {member.phone}
                          </a>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/team/${member.slug}`}>
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/team/${member.id}/edit`}>
                            <Edit className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(member.id)}
                          disabled={deleteLoading === member.id}
                        >
                          {deleteLoading === member.id ? (
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
