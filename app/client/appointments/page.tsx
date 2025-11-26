"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Appointment {
  id: string;
  service_type: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  notes?: string;
  created_at: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
}

export default function ClientAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const supabase = createClient();

  // Available time slots
  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ];

  useEffect(() => {
    fetchAppointments();
    fetchServices();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('client_id', user.id)
        .order('appointment_date', { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast({
        title: "Error",
        description: "Failed to load appointments",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('id, title, description')
        .order('title');

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime || !selectedService) {
      toast({
        title: "Missing Information",
        description: "Please select a date, time, and service",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const selectedServiceData = services.find(s => s.id === selectedService);

      const { error } = await supabase
        .from('appointments')
        .insert({
          client_id: user.id,
          client_name: user.user_metadata?.full_name || user.email,
          service_type: selectedServiceData?.title || 'Consultation',
          appointment_date: selectedDate.toISOString().split('T')[0],
          appointment_time: selectedTime,
          status: 'pending',
          notes: notes,
        });

      if (error) throw error;

      toast({
        title: "Appointment Booked",
        description: "Your appointment has been scheduled successfully",
      });

      // Reset form
      setSelectedDate(new Date());
      setSelectedTime("");
      setSelectedService("");
      setNotes("");
      setIsBookingDialogOpen(false);

      // Refresh appointments
      fetchAppointments();
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast({
        title: "Booking Failed",
        description: "There was an error booking your appointment",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'default';
      case 'cancelled':
        return 'destructive';
      case 'pending':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  if (loading) {
    return <div className="container mx-auto px-6 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Appointments</h1>
          <p className="text-muted-foreground">
            Schedule and manage your consultations with our architecture team.
          </p>
        </div>
        <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Book Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Book New Appointment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="service">Service Type</Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Select Date</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                  className="rounded-md border"
                />
              </div>

              <div>
                <Label htmlFor="time">Preferred Time</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about your project requirements..."
                  rows={3}
                />
              </div>

              <Button
                onClick={handleBookAppointment}
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Booking..." : "Book Appointment"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {appointments.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Appointments Yet</h3>
              <p className="text-muted-foreground mb-4">
                Schedule your first consultation with our architecture team
              </p>
              <Button onClick={() => setIsBookingDialogOpen(true)}>
                Book Your First Appointment
              </Button>
            </CardContent>
          </Card>
        ) : (
          appointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(appointment.status)}
                      <div>
                        <h3 className="font-semibold">{appointment.service_type}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="w-4 h-4" />
                            {new Date(appointment.appointment_date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {appointment.appointment_time}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={getStatusBadgeVariant(appointment.status)}>
                      {appointment.status}
                    </Badge>
                    {appointment.status === 'pending' && (
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                    )}
                  </div>
                </div>
                {appointment.notes && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm">{appointment.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Quick Info */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Appointment Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>Appointments are available Monday-Friday, 9 AM - 5 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-500" />
              <span>Virtual consultations available via Zoom</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-purple-500" />
              <span>Typical consultation duration: 60 minutes</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
