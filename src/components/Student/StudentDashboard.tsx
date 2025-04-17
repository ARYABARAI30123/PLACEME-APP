
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useAuth } from '@/components/AuthProvider';
import { Briefcase, Users, Calendar } from 'lucide-react';

// Mock Data
const opportunities = [
  { id: 1, company: 'Google', role: 'Software Engineer', deadline: '2025-05-20', logo: 'G' },
  { id: 2, company: 'Amazon', role: 'Backend Developer', deadline: '2025-05-15', logo: 'A' },
  { id: 3, company: 'Microsoft', role: 'Frontend Developer', deadline: '2025-05-18', logo: 'M' },
  { id: 4, company: 'Apple', role: 'iOS Developer', deadline: '2025-05-25', logo: 'A' },
  { id: 5, company: 'Meta', role: 'Data Scientist', deadline: '2025-05-30', logo: 'M' },
];

const skills = [
  { name: 'JavaScript', progress: 85 },
  { name: 'React', progress: 75 },
  { name: 'Node.js', progress: 65 },
  { name: 'Python', progress: 60 },
  { name: 'Communication', progress: 90 },
];

const applications = [
  { company: 'Google', status: 'Applied', date: '2025-04-05' },
  { company: 'Amazon', status: 'Interviewed', date: '2025-04-02' },
  { company: 'Microsoft', status: 'Rejected', date: '2025-03-28' },
];

const deadlines = [
  { company: 'Google', date: '2025-05-20' },
  { company: 'Amazon', date: '2025-05-15' },
  { company: 'Microsoft', date: '2025-05-18' },
];

const StudentDashboard = () => {
  const { user } = useAuth();
  const resumeScore = 78; // Mock resume score
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome back, {user?.name}</h1>
      
      {/* Opportunities Carousel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Briefcase className="h-5 w-5 mr-2" />
            Active Opportunities
          </CardTitle>
          <CardDescription>
            Latest job opportunities available for application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-4 p-1">
              {opportunities.map((opportunity) => (
                <Card key={opportunity.id} className="w-[220px] flex-shrink-0">
                  <CardContent className="p-4">
                    <div className="aspect-square w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-xl mb-3">
                      {opportunity.logo}
                    </div>
                    <h3 className="font-semibold">{opportunity.company}</h3>
                    <p className="text-sm text-muted-foreground">{opportunity.role}</p>
                    <div className="mt-2 text-xs">
                      <span className="text-red-500 font-medium">Deadline:</span> {new Date(opportunity.deadline).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Resume Match Score */}
        <Card>
          <CardHeader>
            <CardTitle>Resume Match Score</CardTitle>
            <CardDescription>
              How well your resume matches open positions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative pt-5">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Overall Score</span>
                <span className="text-sm font-medium">{resumeScore}%</span>
              </div>
              <Progress value={resumeScore} className="h-2" />
              
              <div className="mt-8 space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Technical Skills</span>
                    <span className="text-sm">82%</span>
                  </div>
                  <Progress value={82} className="h-1.5" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Experience</span>
                    <span className="text-sm">65%</span>
                  </div>
                  <Progress value={65} className="h-1.5" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Education</span>
                    <span className="text-sm">90%</span>
                  </div>
                  <Progress value={90} className="h-1.5" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Skill Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Skill Progress</CardTitle>
            <CardDescription>
              Track your skills development
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm font-medium">{skill.progress}%</span>
                  </div>
                  <Progress value={skill.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Placement Tracker */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Application Status
            </CardTitle>
            <CardDescription>
              Track your application progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications.map((app, index) => (
                <div key={index} className="flex items-center p-3 rounded-lg bg-gray-50">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3 text-teal-700 font-semibold">
                    {app.company.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium">{app.company}</h4>
                    <div className="flex items-center mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        app.status === 'Applied' ? 'bg-blue-100 text-blue-700' :
                        app.status === 'Interviewed' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {app.status}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {new Date(app.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Deadlines Tracker */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Upcoming Deadlines
            </CardTitle>
            <CardDescription>
              Don't miss application deadlines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deadlines.map((deadline, index) => {
                const deadlineDate = new Date(deadline.date);
                const today = new Date();
                const daysLeft = Math.floor((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3 text-teal-700 font-semibold">
                        {deadline.company.charAt(0)}
                      </div>
                      <span className="font-medium">{deadline.company}</span>
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

export default StudentDashboard;
