import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  Users,
  FileText,
  Mail,
  Calendar,
  TrendingUp,
  Eye,
  MessageSquare
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

// Stats cards for the dashboard
async function getDashboardStats() {
  const supabase = await createClient();

  // Get counts from various tables
  const [
    projectsResult,
    teamResult,
    servicesResult,
    contactsResult,
    appointmentsResult,
    blogPostsResult
  ] = await Promise.all([
    supabase.from('projects').select('id', { count: 'exact', head: true }),
    supabase.from('team_members').select('id', { count: 'exact', head: true }),
    supabase.from('services').select('id', { count: 'exact', head: true }),
    supabase.from('contact_submissions').select('id', { count: 'exact', head: true }),
    supabase.from('appointments').select('id', { count: 'exact', head: true }),
    supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
  ]);

  // Get recent contact submissions (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data: recentContacts } = await supabase
    .from('contact_submissions')
    .select('*')
    .gte('created_at', sevenDaysAgo.toISOString())
    .order('created_at', { ascending: false })
    .limit(5);

  const { data: recentAppointments } = await supabase
    .from('appointments')
    .select('*')
    .gte('created_at', sevenDaysAgo.toISOString())
    .order('created_at', { ascending: false })
    .limit(5);

  return {
    projects: projectsResult.count || 0,
    team: teamResult.count || 0,
    services: servicesResult.count || 0,
    contacts: contactsResult.count || 0,
    appointments: appointmentsResult.count || 0,
    blogPosts: blogPostsResult.count || 0,
    recentContacts: recentContacts || [],
    recentAppointments: recentAppointments || [],
  };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      title: "Projects",
      value: stats.projects,
      icon: Building,
      description: "Total projects",
      color: "text-blue-600"
    },
    {
      title: "Team Members",
      value: stats.team,
      icon: Users,
      description: "Active team members",
      color: "text-green-600"
    },
    {
      title: "Services",
      value: stats.services,
      icon: FileText,
      description: "Available services",
      color: "text-purple-600"
    },
    {
      title: "Contact Forms",
      value: stats.contacts,
      icon: Mail,
      description: "Total submissions",
      color: "text-orange-600"
    },
    {
      title: "Appointments",
      value: stats.appointments,
      icon: Calendar,
      description: "Scheduled appointments",
      color: "text-pink-600"
    },
    {
      title: "Blog Posts",
      value: stats.blogPosts,
      icon: MessageSquare,
      description: "Published articles",
      color: "text-indigo-600"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your content management system.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contact Submissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Recent Contact Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentContacts.length === 0 ? (
              <p className="text-muted-foreground">No recent submissions</p>
            ) : (
              <div className="space-y-4">
                {stats.recentContacts.map((contact: any) => (
                  <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.email}</p>
                      <p className="text-sm text-muted-foreground">{contact.project_type}</p>
                    </div>
                    <Badge variant={contact.status === 'new' ? 'default' : 'secondary'}>
                      {contact.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Recent Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentAppointments.length === 0 ? (
              <p className="text-muted-foreground">No recent appointments</p>
            ) : (
              <div className="space-y-4">
                {stats.recentAppointments.map((appointment: any) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{appointment.client_name}</p>
                      <p className="text-sm text-muted-foreground">{appointment.service_type}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(appointment.appointment_date).toLocaleDateString()} at {appointment.appointment_time}
                      </p>
                    </div>
                    <Badge variant={appointment.status === 'scheduled' ? 'default' : 'secondary'}>
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
