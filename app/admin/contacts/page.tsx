'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Mail,
  Phone,
  Calendar,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Loader2
} from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  project_type: string;
  message: string;
  status: string;
  created_at: string;
  updated_at?: string;
}

export default function AdminContactsPage() {
  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [newContacts, setNewContacts] = useState<Contact[]>([]);
  const [respondedContacts, setRespondedContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const [allRes, newRes, respondedRes] = await Promise.all([
          fetch('/api/contact-submissions'),
          fetch('/api/contact-submissions?status=new'),
          fetch('/api/contact-submissions?status=responded')
        ]);

        const [allData, newData, respondedData] = await Promise.all([
          allRes.json(),
          newRes.json(),
          respondedRes.json()
        ]);

        if (allData.success) setAllContacts(allData.submissions || []);
        if (newData.success) setNewContacts(newData.submissions || []);
        if (respondedData.success) setRespondedContacts(respondedData.submissions || []);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const updateContactStatus = async (contactId: string, status: string) => {
    setUpdatingStatus(contactId);

    try {
      const response = await fetch(`/api/contact-submissions/${contactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const result = await response.json();

      if (result.success) {
        // Update the contacts in state
        const updateContacts = (contacts: any[]) =>
          contacts.map(contact =>
            contact.id === contactId
              ? { ...contact, status }
              : contact
          );

        setAllContacts(prev => updateContacts(prev));
        setNewContacts(prev => updateContacts(prev));
        setRespondedContacts(prev => updateContacts(prev));
      } else {
        alert('Error updating contact status: ' + result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update contact status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="default">New</Badge>;
      case 'responded':
        return <Badge variant="secondary">Responded</Badge>;
      case 'archived':
        return <Badge variant="outline">Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const ContactTable = ({ contacts }: { contacts: any[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Project Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contacts.map((contact) => (
          <TableRow key={contact.id}>
            <TableCell className="font-medium">{contact.name}</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                <a href={`mailto:${contact.email}`} className="hover:underline">
                  {contact.email}
                </a>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="outline">{contact.project_type}</Badge>
            </TableCell>
            <TableCell>{getStatusBadge(contact.status)}</TableCell>
            <TableCell>
              {new Date(contact.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <a href={`tel:${contact.phone}`} title={`Call ${contact.name}`}>
                    <Phone className="w-4 h-4" />
                  </a>
                </Button>
                {contact.status === 'new' && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-green-600 hover:text-green-700"
                      onClick={() => updateContactStatus(contact.id, 'responded')}
                      disabled={updatingStatus === contact.id}
                    >
                      {updatingStatus === contact.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <CheckCircle className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-orange-600 hover:text-orange-700"
                      onClick={() => updateContactStatus(contact.id, 'archived')}
                      disabled={updatingStatus === contact.id}
                    >
                      {updatingStatus === contact.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Clock className="w-4 h-4" />
                      )}
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center min-h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="ml-2">Loading contact submissions...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <Mail className="w-8 h-8 mr-3" />
          Contact Submissions
        </h1>
        <p className="text-muted-foreground">
          Manage and respond to contact form submissions
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">
            All ({allContacts.length})
          </TabsTrigger>
          <TabsTrigger value="new">
            New ({newContacts.length})
          </TabsTrigger>
          <TabsTrigger value="responded">
            Responded ({respondedContacts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Contact Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              {allContacts.length === 0 ? (
                <div className="text-center py-8">
                  <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No submissions yet</h3>
                  <p className="text-muted-foreground">
                    Contact submissions will appear here when people fill out the contact form.
                  </p>
                </div>
              ) : (
                <ContactTable contacts={allContacts} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle>New Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              {newContacts.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">
                    No new submissions to review.
                  </p>
                </div>
              ) : (
                <ContactTable contacts={newContacts} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="responded">
          <Card>
            <CardHeader>
              <CardTitle>Responded Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              {respondedContacts.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No responded submissions</h3>
                  <p className="text-muted-foreground">
                    Submissions you've responded to will appear here.
                  </p>
                </div>
              ) : (
                <ContactTable contacts={respondedContacts} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
