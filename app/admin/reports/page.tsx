"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Users,
  FileText,
  Mail,
  Calendar,
  Download,
  Eye,
  MessageSquare,
  DollarSign,
  Target,
  Activity
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

// Sample data for charts (in a real app, this would come from analytics service)
const monthlyData = [
  { month: 'Jan', leads: 45, conversions: 12, revenue: 24000 },
  { month: 'Feb', leads: 52, conversions: 18, revenue: 36000 },
  { month: 'Mar', leads: 48, conversions: 15, revenue: 30000 },
  { month: 'Apr', leads: 61, conversions: 22, revenue: 44000 },
  { month: 'May', leads: 55, conversions: 19, revenue: 38000 },
  { month: 'Jun', leads: 67, conversions: 25, revenue: 50000 },
];

const projectTypeData = [
  { name: 'Residential', value: 35, color: '#8884d8' },
  { name: 'Commercial', value: 28, color: '#82ca9d' },
  { name: 'Interior Design', value: 20, color: '#ffc658' },
  { name: 'Renovation', value: 17, color: '#ff7300' },
];

const trafficSourceData = [
  { source: 'Organic Search', visitors: 1250, conversions: 45 },
  { source: 'Direct', visitors: 890, conversions: 32 },
  { source: 'Social Media', visitors: 650, conversions: 18 },
  { source: 'Referrals', visitors: 420, conversions: 15 },
  { source: 'Email', visitors: 380, conversions: 12 },
];

// Analytics interface
interface AnalyticsData {
  totalProjects: number;
  totalTeam: number;
  totalContacts: number;
  totalAppointments: number;
  totalBlogPosts: number;
  totalSubscribers: number;
  conversionRate: number;
  growthRate: number;
  categoryBreakdown: Record<string, number>;
  recentContacts: number;
  convertedContacts: number;
}

// Analytics functions
async function getAdvancedAnalytics(): Promise<AnalyticsData> {
  const supabase = createClient();

  // Get comprehensive stats
  const [
    projectsResult,
    teamResult,
    contactsResult,
    appointmentsResult,
    blogPostsResult,
    newsletterResult
  ] = await Promise.all([
    supabase.from('projects').select('id, category, created_at', { count: 'exact' }),
    supabase.from('team_members').select('id', { count: 'exact', head: true }),
    supabase.from('contact_submissions').select('id, project_type, status, created_at', { count: 'exact' }),
    supabase.from('appointments').select('id, status, created_at', { count: 'exact' }),
    supabase.from('blog_posts').select('id, created_at', { count: 'exact' }),
    supabase.from('newsletter_subscribers').select('id, created_at', { count: 'exact' }),
  ]);

  // Calculate conversion rates and KPIs
  const totalContacts = contactsResult.count || 0;
  const convertedContacts = contactsResult.data?.filter(c => c.status === 'converted').length || 0;
  const conversionRate = totalContacts > 0 ? ((convertedContacts / totalContacts) * 100).toFixed(1) : '0';

  // Calculate monthly growth
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentContacts = contactsResult.data?.filter(c =>
    new Date(c.created_at) > thirtyDaysAgo
  ).length || 0;

  const growthRate = totalContacts > 0 ? ((recentContacts / totalContacts) * 100).toFixed(1) : '0';

  // Project categories breakdown
  const projects = projectsResult.data || [];
  const categoryBreakdown = projects.reduce((acc: Record<string, number>, project) => {
    acc[project.category] = (acc[project.category] || 0) + 1;
    return acc;
  }, {});

  return {
    totalProjects: projectsResult.count || 0,
    totalTeam: teamResult.count || 0,
    totalContacts: totalContacts,
    totalAppointments: appointmentsResult.count || 0,
    totalBlogPosts: blogPostsResult.count || 0,
    totalSubscribers: newsletterResult.count || 0,
    conversionRate: parseFloat(conversionRate),
    growthRate: parseFloat(growthRate),
    categoryBreakdown,
    recentContacts,
    convertedContacts,
  };
}

export default function ReportsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalProjects: 0,
    totalTeam: 0,
    totalContacts: 0,
    totalAppointments: 0,
    totalBlogPosts: 0,
    totalSubscribers: 0,
    conversionRate: 0,
    growthRate: 0,
    categoryBreakdown: {},
    recentContacts: 0,
    convertedContacts: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAdvancedAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const kpiCards = [
    {
      title: "Total Revenue",
      value: "$125,000",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600",
      description: "vs last month"
    },
    {
      title: "Conversion Rate",
      value: `${analytics.conversionRate}%`,
      change: "+2.1%",
      icon: Target,
      color: "text-blue-600",
      description: "lead to client"
    },
    {
      title: "Monthly Growth",
      value: `${analytics.growthRate}%`,
      change: "+8.3%",
      icon: TrendingUp,
      color: "text-purple-600",
      description: "new leads"
    },
    {
      title: "Active Projects",
      value: analytics.totalProjects.toString(),
      change: "+3",
      icon: Activity,
      color: "text-orange-600",
      description: "this month"
    }
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Loading comprehensive insights into your business performance...
          </p>
        </div>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into your business performance and user engagement.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          <Button className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Generate PDF
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiCards.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {kpi.title}
              </CardTitle>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span className="text-green-600 font-medium">{kpi.change}</span>
                <span className="ml-1">{kpi.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Monthly Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="leads"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="conversions"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Project Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Project Types Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={projectTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {projectTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Traffic Sources & Conversions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trafficSourceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visitors" fill="#8884d8" name="Visitors" />
                <Bar dataKey="conversions" fill="#82ca9d" name="Conversions" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  strokeWidth={3}
                  dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Content Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Modern Villa Design</p>
                  <p className="text-sm text-muted-foreground">Project Page</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">2,450 views</p>
                  <p className="text-sm text-green-600">+15%</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Sustainable Architecture</p>
                  <p className="text-sm text-muted-foreground">Blog Post</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">1,890 views</p>
                  <p className="text-sm text-green-600">+8%</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Commercial Office Complex</p>
                  <p className="text-sm text-muted-foreground">Project Page</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">1,650 views</p>
                  <p className="text-sm text-green-600">+12%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Recent Business Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">New Client Acquisition</p>
                  <p className="text-sm text-muted-foreground">Residential project - $45,000</p>
                </div>
                <Badge variant="secondary">2 hours ago</Badge>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">Appointment Scheduled</p>
                  <p className="text-sm text-muted-foreground">Consultation with John Smith</p>
                </div>
                <Badge variant="secondary">4 hours ago</Badge>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">Project Milestone</p>
                  <p className="text-sm text-muted-foreground">Villa Design - Design phase complete</p>
                </div>
                <Badge variant="secondary">1 day ago</Badge>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">Newsletter Subscriber</p>
                  <p className="text-sm text-muted-foreground">New subscriber: sarah@example.com</p>
                </div>
                <Badge variant="secondary">2 days ago</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Export & Scheduling</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center gap-2 justify-center">
              <Download className="w-4 h-4" />
              Export to CSV
            </Button>
            <Button variant="outline" className="flex items-center gap-2 justify-center">
              <Download className="w-4 h-4" />
              Export to PDF
            </Button>
            <Button variant="outline" className="flex items-center gap-2 justify-center">
              <Calendar className="w-4 h-4" />
              Schedule Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
