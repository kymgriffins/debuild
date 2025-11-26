import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building,
  Calendar,
  FileText,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

async function getClientDashboardData() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Get client's projects
  const { data: clientProjects } = await supabase
    .from('client_projects')
    .select(`
      *,
      projects (*)
    `)
    .eq('client_id', user.id);

  // Get client's appointments
  const { data: appointments } = await supabase
    .from('appointments')
    .select('*')
    .eq('client_id', user.id)
    .order('appointment_date', { ascending: true })
    .limit(5);

  // Get recent messages/communications
  const { data: messages } = await supabase
    .from('contact_submissions')
    .select('*')
    .eq('email', user.email)
    .order('created_at', { ascending: false })
    .limit(3);

  return {
    projects: clientProjects || [],
    appointments: appointments || [],
    messages: messages || [],
  };
}

export default async function ClientDashboard() {
  const data = await getClientDashboardData();

  if (!data) {
    return <div>Loading...</div>;
  }

  const { projects, appointments, messages } = data;

  // Calculate project stats
  const activeProjects = projects.filter(p => p.status === 'in_progress').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const upcomingAppointments = appointments.filter(a =>
    new Date(a.appointment_date) > new Date()
  ).length;

  const statCards = [
    {
      title: "Active Projects",
      value: activeProjects.toString(),
      icon: Building,
      color: "text-blue-600",
      description: "Currently in progress"
    },
    {
      title: "Completed Projects",
      value: completedProjects.toString(),
      icon: CheckCircle,
      color: "text-green-600",
      description: "Successfully finished"
    },
    {
      title: "Upcoming Appointments",
      value: upcomingAppointments.toString(),
      icon: Calendar,
      color: "text-purple-600",
      description: "Scheduled meetings"
    },
    {
      title: "Unread Messages",
      value: messages.filter(m => m.status === 'new').length.toString(),
      icon: MessageSquare,
      color: "text-orange-600",
      description: "From your team"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
        <p className="text-muted-foreground">
          Track your projects, manage appointments, and communicate with your architecture team.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="w-5 h-5 mr-2" />
              Your Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            {projects.length === 0 ? (
              <p className="text-muted-foreground">No projects assigned yet.</p>
            ) : (
              <div className="space-y-4">
                {projects.slice(0, 3).map((clientProject: any) => (
                  <div key={clientProject.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{clientProject.projects?.title}</h3>
                      <p className="text-sm text-muted-foreground">{clientProject.projects?.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        clientProject.status === 'completed' ? 'default' :
                        clientProject.status === 'in_progress' ? 'secondary' : 'outline'
                      }>
                        {clientProject.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
                {projects.length > 3 && (
                  <Button variant="ghost" className="w-full">
                    View All Projects
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Upcoming Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {appointments.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No upcoming appointments</p>
                <Button>Schedule Appointment</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment: any) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{appointment.service_type}</h3>
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

        {/* Recent Communications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Recent Communications
            </CardTitle>
          </CardHeader>
          <CardContent>
            {messages.length === 0 ? (
              <p className="text-muted-foreground">No recent communications.</p>
            ) : (
              <div className="space-y-4">
                {messages.map((message: any) => (
                  <div key={message.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <h3 className="font-medium">{message.subject || 'Project Update'}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{message.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(message.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={message.status === 'new' ? 'default' : 'secondary'}>
                      {message.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
                <Calendar className="w-6 h-6" />
                <span className="text-sm">Book Appointment</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
                <MessageSquare className="w-6 h-6" />
                <span className="text-sm">Contact Team</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
                <FileText className="w-6 h-6" />
                <span className="text-sm">View Documents</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
                <Building className="w-6 h-6" />
                <span className="text-sm">Project Updates</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
