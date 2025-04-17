
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Trash2, Edit, Mail, Bell, Clock } from 'lucide-react';
import { toast } from 'sonner';

// Mock Data
const opportunities = [
  { id: 1, company: 'Google', role: 'Software Engineer', deadline: '2025-05-20', status: 'Active' },
  { id: 2, company: 'Amazon', role: 'Backend Developer', deadline: '2025-05-15', status: 'Active' },
  { id: 3, company: 'Microsoft', role: 'Frontend Developer', deadline: '2025-05-18', status: 'Closed' },
  { id: 4, company: 'Apple', role: 'iOS Developer', deadline: '2025-05-25', status: 'Draft' },
  { id: 5, company: 'Meta', role: 'Data Scientist', deadline: '2025-05-30', status: 'Active' },
];

const students = [
  { id: 1, name: 'John Doe', applications: 3, resumeScore: 82 },
  { id: 2, name: 'Jane Smith', applications: 5, resumeScore: 75 },
  { id: 3, name: 'Mike Johnson', applications: 2, resumeScore: 90 },
  { id: 4, name: 'Sarah Williams', applications: 4, resumeScore: 65 },
  { id: 5, name: 'Robert Brown', applications: 1, resumeScore: 78 },
];

const AdminDashboard = () => {
  const [sendEmails, setSendEmails] = useState(true);
  const [newOpportunity, setNewOpportunity] = useState({
    company: '',
    role: '',
    deadline: '',
    description: '',
  });
  
  const handleAddOpportunity = () => {
    // In a real app, this would call an API
    toast.success('New opportunity added successfully!');
    
    // Reset form
    setNewOpportunity({
      company: '',
      role: '',
      deadline: '',
      description: '',
    });
  };
  
  const handleSendNotification = () => {
    toast.success('Notification sent to all students');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        
        <div className="flex space-x-3">
          {/* Add Opportunity Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Opportunity
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Opportunity</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new job opportunity for students.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input 
                      id="company" 
                      value={newOpportunity.company}
                      onChange={(e) => setNewOpportunity({...newOpportunity, company: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Job Role</Label>
                    <Input 
                      id="role" 
                      value={newOpportunity.role}
                      onChange={(e) => setNewOpportunity({...newOpportunity, role: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Application Deadline</Label>
                  <Input 
                    id="deadline" 
                    type="date"
                    value={newOpportunity.deadline}
                    onChange={(e) => setNewOpportunity({...newOpportunity, deadline: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea 
                    id="description" 
                    rows={5}
                    value={newOpportunity.description}
                    onChange={(e) => setNewOpportunity({...newOpportunity, description: e.target.value})}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="send-emails" 
                    checked={sendEmails}
                    onCheckedChange={setSendEmails}
                  />
                  <Label htmlFor="send-emails">Send email notification to students</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddOpportunity}>
                  Add Opportunity
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Send Notification Button */}
          <Button variant="outline" onClick={handleSendNotification}>
            <Bell className="h-4 w-4 mr-2" />
            Send Notification
          </Button>
        </div>
      </div>
      
      {/* Opportunities Management */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Opportunities</CardTitle>
          <CardDescription>
            View, edit, and manage all job opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active">
            <TabsList className="mb-4">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {opportunities
                    .filter(opp => opp.status === 'Active')
                    .map((opportunity) => (
                      <TableRow key={opportunity.id}>
                        <TableCell className="font-medium">{opportunity.company}</TableCell>
                        <TableCell>{opportunity.role}</TableCell>
                        <TableCell>{new Date(opportunity.deadline).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge variant={opportunity.status === 'Active' ? 'default' : 'secondary'}>
                            {opportunity.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="all">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {opportunities.map((opportunity) => (
                    <TableRow key={opportunity.id}>
                      <TableCell className="font-medium">{opportunity.company}</TableCell>
                      <TableCell>{opportunity.role}</TableCell>
                      <TableCell>{new Date(opportunity.deadline).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={
                          opportunity.status === 'Active' ? 'default' : 
                          opportunity.status === 'Draft' ? 'outline' : 'secondary'
                        }>
                          {opportunity.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="drafts">
              {/* Draft opportunities would go here */}
              <div className="p-8 text-center text-muted-foreground">
                You have no draft opportunities.
              </div>
            </TabsContent>
            
            <TabsContent value="closed">
              {/* Closed opportunities would go here */}
              <div className="p-8 text-center text-muted-foreground">
                You have no closed opportunities.
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Applications Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Student Applications</CardTitle>
            <CardDescription>
              Summary of student activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead className="text-center">Applications</TableHead>
                  <TableHead className="text-center">Resume Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell className="text-center">{student.applications}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={
                        student.resumeScore >= 80 ? 'default' : 
                        student.resumeScore >= 70 ? 'secondary' : 'outline'
                      }>
                        {student.resumeScore}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Deadline Tracker */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Upcoming Deadlines
            </CardTitle>
            <CardDescription>
              Applications closing soon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {opportunities
                .filter(opp => opp.status === 'Active')
                .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
                .slice(0, 3)
                .map((opp) => {
                  const deadlineDate = new Date(opp.deadline);
                  const today = new Date();
                  const daysLeft = Math.floor((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div key={opp.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div>
                        <h4 className="font-medium">{opp.company} - {opp.role}</h4>
                        <p className="text-sm text-muted-foreground">
                          Deadline: {new Date(opp.deadline).toLocaleDateString()}
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        daysLeft < 3 ? 'bg-red-100 text-red-700' :
                        daysLeft < 7 ? 'bg-amber-100 text-amber-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {daysLeft} days left
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
