
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, PlusCircle, Bell, ListChecks, ClockIcon, Users, CheckIcon, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useAuth } from '@/components/AuthProvider';

// Mock data
const remindersData = [
  {
    id: 1,
    title: 'Google Application Deadline',
    description: 'Remember to complete your application for Google.',
    date: '2025-05-20',
    time: '23:59',
    completed: false,
    type: 'deadline',
    audience: 'all',
    sentAt: null
  },
  {
    id: 2,
    title: 'Amazon Application Deadline',
    description: 'Remember to complete your application for Amazon.',
    date: '2025-05-15',
    time: '23:59',
    completed: false,
    type: 'deadline',
    audience: 'cse-students',
    sentAt: null
  },
  {
    id: 3,
    title: 'Microsoft Application Deadline',
    description: 'Remember to complete your application for Microsoft.',
    date: '2025-05-18',
    time: '23:59',
    completed: false,
    type: 'deadline',
    audience: 'all',
    sentAt: null
  },
  {
    id: 4,
    title: 'Career Fair',
    description: 'Attend the annual career fair.',
    date: '2025-05-10',
    time: '10:00',
    completed: false,
    type: 'event',
    audience: 'all',
    sentAt: null
  },
  {
    id: 5,
    title: 'Resume Workshop',
    description: 'Attend the resume workshop.',
    date: '2025-05-05',
    time: '14:00',
    completed: true,
    type: 'event',
    audience: 'all',
    sentAt: '2025-04-30T09:00:00'
  }
];

// Mock student groups
const studentGroups = [
  { id: 'all', name: 'All Students' },
  { id: 'cse-students', name: 'Computer Science Students' },
  { id: 'ece-students', name: 'Electronics Students' },
  { id: 'mech-students', name: 'Mechanical Students' },
  { id: 'eligible-google', name: 'Google Eligible Students' }
];

const RemindersPage = () => {
  const [reminders, setReminders] = useState(remindersData);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '09:00',
    type: 'event',
    audience: 'all'
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  
  const getDateReminders = (dateStr: string) => {
    return reminders.filter(reminder => reminder.date === dateStr);
  };
  
  const sendReminder = (id: number) => {
    setReminders(
      reminders.map(reminder => 
        reminder.id === id ? { ...reminder, sentAt: new Date().toISOString() } : reminder
      )
    );
    toast.success('Reminder sent to students');
  };
  
  const toggleComplete = (id: number) => {
    setReminders(
      reminders.map(reminder => 
        reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
      )
    );
    toast.success('Reminder status updated');
  };
  
  const addNewReminder = () => {
    const newId = Math.max(...reminders.map(r => r.id)) + 1;
    const reminderToAdd = {
      ...newReminder,
      id: newId,
      completed: false,
      sentAt: null
    };
    
    setReminders([...reminders, reminderToAdd]);
    setDialogOpen(false);
    setNewReminder({
      title: '',
      description: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      time: '09:00',
      type: 'event',
      audience: 'all'
    });
    
    toast.success('New reminder created');
  };
  
  const getRemindersBadgeForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const remindersForDate = getDateReminders(dateStr);
    
    if (remindersForDate.length === 0) return null;
    
    return (
      <Badge
        className={cn(
          "absolute top-0 right-0 -mr-1 -mt-1 h-5 w-5 flex items-center justify-center p-0",
          remindersForDate.some(r => r.type === 'deadline' && !r.completed) 
            ? "bg-red-500" 
            : "bg-teal-500"
        )}
      >
        {remindersForDate.length}
      </Badge>
    );
  };
  
  const getDayClass = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const remindersForDate = getDateReminders(dateStr);
    
    if (remindersForDate.length === 0) return "";
    
    if (remindersForDate.some(r => r.type === 'deadline' && !r.completed)) {
      return "bg-red-50 text-red-600 border-red-100 font-semibold";
    }
    
    if (remindersForDate.some(r => r.type === 'event' && !r.completed)) {
      return "bg-blue-50 text-blue-600 border-blue-100 font-semibold";
    }
    
    return "bg-gray-50 text-gray-600 border-gray-100";
  };
  
  const sortedReminders = [...reminders].sort((a, b) => {
    // Sort by date, then by completion status
    const dateA = new Date(a.date + 'T' + a.time).getTime();
    const dateB = new Date(b.date + 'T' + b.time).getTime();
    
    if (dateA !== dateB) {
      return dateA - dateB;
    }
    
    // If dates are the same, place non-completed first
    return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
  });
  
  const selectedDateStr = date ? format(date, 'yyyy-MM-dd') : '';
  const remindersForSelectedDate = getDateReminders(selectedDateStr);
  
  // Find the appropriate student group name
  const getStudentGroupName = (groupId: string) => {
    const group = studentGroups.find(g => g.id === groupId);
    return group ? group.name : 'Unknown Group';
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Student Reminders</h1>
          <p className="text-muted-foreground">
            {isAdmin 
              ? "Create and send reminders to students about important deadlines and events" 
              : "Keep track of important deadlines and events"}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={view === 'calendar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('calendar')}
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            Calendar
          </Button>
          <Button
            variant={view === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('list')}
          >
            <ListChecks className="h-4 w-4 mr-2" />
            List
          </Button>
          
          {isAdmin && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Reminder
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Student Reminder</DialogTitle>
                  <DialogDescription>
                    Create a reminder for students about upcoming deadlines or events
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="title" className="text-right text-sm font-medium">
                      Title
                    </label>
                    <Input
                      id="title"
                      value={newReminder.title}
                      onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                      className="col-span-3"
                      placeholder="Enter reminder title"
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="description" className="text-right text-sm font-medium">
                      Description
                    </label>
                    <Textarea
                      id="description"
                      value={newReminder.description}
                      onChange={(e) => setNewReminder({...newReminder, description: e.target.value})}
                      className="col-span-3"
                      placeholder="Enter reminder details"
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="date" className="text-right text-sm font-medium">
                      Date
                    </label>
                    <Input
                      id="date"
                      type="date"
                      value={newReminder.date}
                      onChange={(e) => setNewReminder({...newReminder, date: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="time" className="text-right text-sm font-medium">
                      Time
                    </label>
                    <Input
                      id="time"
                      type="time"
                      value={newReminder.time}
                      onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="type" className="text-right text-sm font-medium">
                      Type
                    </label>
                    <select
                      id="type"
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={newReminder.type}
                      onChange={(e) => setNewReminder({...newReminder, type: e.target.value})}
                    >
                      <option value="event">Event</option>
                      <option value="deadline">Deadline</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="audience" className="text-right text-sm font-medium">
                      Audience
                    </label>
                    <select
                      id="audience"
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={newReminder.audience}
                      onChange={(e) => setNewReminder({...newReminder, audience: e.target.value})}
                    >
                      {studentGroups.map(group => (
                        <option key={group.id} value={group.id}>{group.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                  <Button onClick={addNewReminder}>Create Reminder</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      
      {view === 'calendar' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardContent className="pt-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                components={{
                  DayContent: (props) => {
                    return (
                      <div className="relative">
                        <div className={cn(
                          "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                          getDayClass(props.date)
                        )}>
                          {props.date.getDate()}
                        </div>
                        {getRemindersBadgeForDate(props.date)}
                      </div>
                    );
                  }
                }}
              />
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>
                {date ? format(date, 'MMMM d, yyyy') : 'No date selected'}
              </CardTitle>
              <CardDescription>
                {remindersForSelectedDate.length} {remindersForSelectedDate.length === 1 ? 'reminder' : 'reminders'} for this day
              </CardDescription>
            </CardHeader>
            <CardContent>
              {remindersForSelectedDate.length > 0 ? (
                <div className="space-y-4">
                  {remindersForSelectedDate.map((reminder) => (
                    <div 
                      key={reminder.id} 
                      className={`flex p-4 rounded-lg border ${reminder.completed ? 'bg-gray-50' : 
                        reminder.type === 'deadline' ? 'bg-red-50 border-red-100' : 'bg-blue-50 border-blue-100'}`}
                    >
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                        reminder.type === 'deadline' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {reminder.type === 'deadline' ? (
                          <ClockIcon className="h-5 w-5" />
                        ) : (
                          <Bell className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-medium ${reminder.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {reminder.title}
                          </h3>
                          <Badge variant="outline">
                            {reminder.time}
                          </Badge>
                        </div>
                        <p className={`text-sm mt-1 ${reminder.completed ? 'text-muted-foreground line-through' : 'text-gray-600'}`}>
                          {reminder.description}
                        </p>
                        <div className="flex items-center mt-2 gap-2">
                          {isAdmin ? (
                            <>
                              <Badge variant="outline" className="mr-2">
                                <Users className="h-3 w-3 mr-1" />
                                {getStudentGroupName(reminder.audience)}
                              </Badge>
                              {reminder.sentAt ? (
                                <Badge variant="outline" className="bg-green-50 text-green-700">
                                  <CheckIcon className="h-3 w-3 mr-1" />
                                  Sent on {format(new Date(reminder.sentAt), 'MMM d, h:mm a')}
                                </Badge>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => sendReminder(reminder.id)}
                                >
                                  <Send className="h-3 w-3 mr-1" />
                                  Send to Students
                                </Button>
                              )}
                            </>
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => toggleComplete(reminder.id)}
                            >
                              {reminder.completed ? 'Mark as incomplete' : 'Mark as complete'}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium">No reminders for this day</h3>
                  <p>Select a day with reminders or create a new reminder.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="all">All Reminders</TabsTrigger>
            <TabsTrigger value="sent">Sent Reminders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Reminders</CardTitle>
                <CardDescription>
                  {isAdmin 
                    ? "Reminders that need to be sent to students" 
                    : "Don't miss these important dates"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Date & Time</TableHead>
                      {isAdmin && <TableHead>Audience</TableHead>}
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedReminders
                      .filter(reminder => !reminder.completed && !reminder.sentAt)
                      .map((reminder) => (
                        <TableRow key={reminder.id}>
                          <TableCell>
                            <Badge variant={reminder.type === 'deadline' ? 'destructive' : 'default'}>
                              {reminder.type === 'deadline' ? 'Deadline' : 'Event'}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-medium">{reminder.title}</TableCell>
                          <TableCell>
                            {format(new Date(reminder.date), 'MMM d, yyyy')} at {reminder.time}
                          </TableCell>
                          {isAdmin && (
                            <TableCell>
                              {getStudentGroupName(reminder.audience)}
                            </TableCell>
                          )}
                          <TableCell>
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-100">
                              {isAdmin ? 'Not Sent' : 'Pending'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {isAdmin ? (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => sendReminder(reminder.id)}
                              >
                                <Send className="h-3 w-3 mr-1" />
                                Send
                              </Button>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => toggleComplete(reminder.id)}
                              >
                                Complete
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="all" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>All Reminders</CardTitle>
                <CardDescription>
                  Manage all student reminders in one place
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Date & Time</TableHead>
                      {isAdmin && <TableHead>Audience</TableHead>}
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedReminders.map((reminder) => (
                      <TableRow key={reminder.id} className={reminder.completed || reminder.sentAt ? 'bg-muted/50' : ''}>
                        <TableCell>
                          <Badge variant={
                            reminder.type === 'deadline' 
                              ? (reminder.completed || reminder.sentAt) ? 'outline' : 'destructive'
                              : (reminder.completed || reminder.sentAt) ? 'outline' : 'default'
                          }>
                            {reminder.type === 'deadline' ? 'Deadline' : 'Event'}
                          </Badge>
                        </TableCell>
                        <TableCell className={`font-medium ${(reminder.completed || reminder.sentAt) ? 'text-muted-foreground' : ''}`}>
                          {reminder.title}
                        </TableCell>
                        <TableCell>
                          {format(new Date(reminder.date), 'MMM d, yyyy')} at {reminder.time}
                        </TableCell>
                        {isAdmin && (
                          <TableCell>
                            {getStudentGroupName(reminder.audience)}
                          </TableCell>
                        )}
                        <TableCell>
                          <Badge variant="outline" className={
                            reminder.sentAt 
                              ? 'bg-green-50 text-green-700 border-green-100'
                              : reminder.completed
                              ? 'bg-green-50 text-green-700 border-green-100'
                              : 'bg-yellow-50 text-yellow-700 border-yellow-100'
                          }>
                            {reminder.sentAt 
                              ? 'Sent' 
                              : reminder.completed 
                              ? 'Completed' 
                              : isAdmin ? 'Not Sent' : 'Pending'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {isAdmin ? (
                            reminder.sentAt ? (
                              <Button 
                                variant="outline" 
                                size="sm"
                                disabled
                              >
                                <CheckIcon className="h-3 w-3 mr-1" />
                                Sent
                              </Button>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => sendReminder(reminder.id)}
                              >
                                <Send className="h-3 w-3 mr-1" />
                                Send
                              </Button>
                            )
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => toggleComplete(reminder.id)}
                            >
                              {reminder.completed ? 'Mark as incomplete' : 'Complete'}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sent" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Sent Reminders</CardTitle>
                <CardDescription>
                  Reminders already sent to students
                </CardDescription>
              </CardHeader>
              <CardContent>
                {sortedReminders.filter(r => r.sentAt).length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Date & Time</TableHead>
                        {isAdmin && <TableHead>Audience</TableHead>}
                        <TableHead>Sent At</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedReminders
                        .filter(reminder => reminder.sentAt)
                        .map((reminder) => (
                          <TableRow key={reminder.id} className="bg-muted/50">
                            <TableCell>
                              <Badge variant="outline">
                                {reminder.type === 'deadline' ? 'Deadline' : 'Event'}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium text-muted-foreground">
                              {reminder.title}
                            </TableCell>
                            <TableCell>
                              {format(new Date(reminder.date), 'MMM d, yyyy')} at {reminder.time}
                            </TableCell>
                            {isAdmin && (
                              <TableCell>
                                {getStudentGroupName(reminder.audience)}
                              </TableCell>
                            )}
                            <TableCell>
                              {reminder.sentAt && format(new Date(reminder.sentAt), 'MMM d, yyyy')} at {reminder.sentAt && format(new Date(reminder.sentAt), 'h:mm a')}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    <Send className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium">No sent reminders</h3>
                    <p>Reminders that have been sent to students will appear here.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default RemindersPage;
