
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, ClockIcon, Search, Briefcase, BookmarkPlus, BookmarkCheck, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useAuth } from '@/components/AuthProvider';

// Mock Data
const opportunitiesData = [
  {
    id: 1,
    company: 'Google',
    logo: 'G',
    role: 'Software Engineer',
    location: 'Mountain View, CA',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    deadline: '2025-05-20',
    description: 'Google is seeking a talented Software Engineer to join our team. You will be responsible for developing and maintaining software applications...',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '3+ years of experience in software development',
      'Proficiency in at least one modern programming language (e.g., Java, Python)',
      'Experience with web application development'
    ],
    benefits: [
      'Competitive salary and equity package',
      'Health, dental, and vision insurance',
      'Generous vacation policy',
      'Flexible work arrangements'
    ]
  },
  {
    id: 2,
    company: 'Amazon',
    logo: 'A',
    role: 'Backend Developer',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$110,000 - $140,000',
    deadline: '2025-05-15',
    description: 'Amazon is looking for a Backend Developer to design, develop, and maintain efficient, reusable, and reliable server-side code...',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '2+ years of experience in backend development',
      'Experience with modern web frameworks and API design',
      'Knowledge of database systems'
    ],
    benefits: [
      'Competitive compensation package',
      'Health benefits from day one',
      '401(k) plan with company match',
      'Relocation assistance'
    ]
  },
  {
    id: 3,
    company: 'Microsoft',
    logo: 'M',
    role: 'Frontend Developer',
    location: 'Redmond, WA',
    type: 'Full-time',
    salary: '$105,000 - $135,000',
    deadline: '2025-05-18',
    description: 'Microsoft is seeking a Frontend Developer to build user interfaces for our web applications and digital products...',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '2+ years of experience in frontend development',
      'Proficiency in HTML, CSS, JavaScript, and modern frontend frameworks',
      'Experience with responsive design and cross-browser compatibility'
    ],
    benefits: [
      'Comprehensive health benefits',
      'Retirement and savings plans',
      'Discounts on Microsoft products',
      'Employee resource groups'
    ]
  },
  {
    id: 4,
    company: 'Apple',
    logo: 'A',
    role: 'iOS Developer',
    location: 'Cupertino, CA',
    type: 'Full-time',
    salary: '$115,000 - $145,000',
    deadline: '2025-05-25',
    description: 'Apple is looking for an iOS Developer to design and build applications for the iOS platform...',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '3+ years of experience in iOS development',
      'Proficiency in Swift and Objective-C',
      'Experience with iOS frameworks and APIs'
    ],
    benefits: [
      'Medical, dental, and vision insurance',
      'Employee stock purchase program',
      'Wellness programs',
      'Onsite fitness centers (at some locations)'
    ]
  },
  {
    id: 5,
    company: 'Meta',
    logo: 'M',
    role: 'Data Scientist',
    location: 'Menlo Park, CA',
    type: 'Full-time',
    salary: '$125,000 - $155,000',
    deadline: '2025-05-30',
    description: 'Meta is seeking a Data Scientist to analyze data and extract actionable insights to inform product and business decisions...',
    requirements: [
      'Master\'s or PhD degree in Computer Science, Statistics, or related field',
      '2+ years of experience in data science or related field',
      'Proficiency in Python, R, or other programming languages for data analysis',
      'Experience with machine learning and statistical modeling'
    ],
    benefits: [
      'Competitive salary and equity package',
      'Comprehensive health benefits',
      'Generous paid time off',
      'Employee development programs'
    ]
  },
];

const OpportunitiesPage = () => {
  const { user } = useAuth();
  const [opportunities] = useState(opportunitiesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewType, setViewType] = useState<'card' | 'list'>('card');
  const [selectedOpportunity, setSelectedOpportunity] = useState<typeof opportunitiesData[0] | null>(null);
  const [bookmarkedOpportunities, setBookmarkedOpportunities] = useState<number[]>([]);
  
  const filteredOpportunities = opportunities.filter(opportunity => 
    opportunity.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opportunity.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opportunity.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const toggleBookmark = (opportunityId: number) => {
    if (bookmarkedOpportunities.includes(opportunityId)) {
      setBookmarkedOpportunities(
        bookmarkedOpportunities.filter(id => id !== opportunityId)
      );
      toast.success('Removed from bookmarks');
    } else {
      setBookmarkedOpportunities([...bookmarkedOpportunities, opportunityId]);
      toast.success('Added to bookmarks');
    }
  };
  
  const handleApply = (opportunityId: number) => {
    // In a real app, this would call an API
    toast.success('Application submitted successfully');
  };
  
  const isBookmarked = (opportunityId: number) => {
    return bookmarkedOpportunities.includes(opportunityId);
  };
  
  const getDaysUntilDeadline = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    return Math.floor((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Opportunities</h1>
        
        <div className="flex w-full sm:w-auto space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search opportunities..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button
            variant="outline"
            className="px-2"
            onClick={() => setViewType(viewType === 'card' ? 'list' : 'card')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={viewType === 'card' ? 'text-primary' : ''}>
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Opportunities</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
          {user?.role === 'student' && (
            <TabsTrigger value="applied">Applied</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          {viewType === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpportunities.map((opportunity) => (
                <Card key={opportunity.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-xl mr-3">
                          {opportunity.logo}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{opportunity.company}</CardTitle>
                          <p className="text-sm text-muted-foreground">{opportunity.location}</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => toggleBookmark(opportunity.id)}
                        className="text-muted-foreground hover:text-primary"
                      >
                        {isBookmarked(opportunity.id) ? (
                          <BookmarkCheck className="h-5 w-5 text-primary" />
                        ) : (
                          <BookmarkPlus className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <h3 className="font-semibold">{opportunity.role}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline">{opportunity.type}</Badge>
                      <Badge variant="outline">{opportunity.salary}</Badge>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                      {opportunity.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      <span>
                        {getDaysUntilDeadline(opportunity.deadline)} days left
                      </span>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedOpportunity(opportunity)}>
                          View Details
                        </Button>
                      </DialogTrigger>
                      {selectedOpportunity && (
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-lg mr-3">
                                {selectedOpportunity.logo}
                              </div>
                              {selectedOpportunity.company} - {selectedOpportunity.role}
                            </DialogTitle>
                            <DialogDescription>
                              {selectedOpportunity.location} • {selectedOpportunity.type}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <h4 className="font-semibold mb-2">Job Description</h4>
                              <p className="text-sm">{selectedOpportunity.description}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Requirements</h4>
                              <ul className="list-disc list-inside text-sm space-y-1">
                                {selectedOpportunity.requirements.map((req, index) => (
                                  <li key={index}>{req}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Benefits</h4>
                              <ul className="list-disc list-inside text-sm space-y-1">
                                {selectedOpportunity.benefits.map((benefit, index) => (
                                  <li key={index}>{benefit}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                              <div className="flex items-center text-sm">
                                <ClockIcon className="h-4 w-4 mr-2 text-amber-600" />
                                <span>
                                  Application Deadline: {new Date(selectedOpportunity.deadline).toLocaleDateString()} 
                                  ({getDaysUntilDeadline(selectedOpportunity.deadline)} days left)
                                </span>
                              </div>
                            </div>
                          </div>
                          <DialogFooter className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              onClick={() => toggleBookmark(selectedOpportunity.id)}
                            >
                              {isBookmarked(selectedOpportunity.id) ? (
                                <>
                                  <BookmarkCheck className="h-4 w-4 mr-2" />
                                  Bookmarked
                                </>
                              ) : (
                                <>
                                  <BookmarkPlus className="h-4 w-4 mr-2" />
                                  Bookmark
                                </>
                              )}
                            </Button>
                            {user?.role === 'student' && (
                              <Button 
                                onClick={() => handleApply(selectedOpportunity.id)}
                              >
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Apply Now
                              </Button>
                            )}
                          </DialogFooter>
                        </DialogContent>
                      )}
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOpportunities.map((opportunity) => (
                <Card key={opportunity.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row p-4">
                    <div className="flex items-center mb-4 md:mb-0 md:mr-6">
                      <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-xl">
                        {opportunity.logo}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{opportunity.company}</h3>
                          <h4 className="text-base">{opportunity.role}</h4>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                          <Badge variant="outline">{opportunity.type}</Badge>
                          <Badge variant="outline">{opportunity.salary}</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {opportunity.location}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {opportunity.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <ClockIcon className="h-3 w-3 mr-1" />
                          <span>
                            {getDaysUntilDeadline(opportunity.deadline)} days left
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => toggleBookmark(opportunity.id)}
                            className="text-muted-foreground hover:text-primary"
                          >
                            {isBookmarked(opportunity.id) ? (
                              <BookmarkCheck className="h-5 w-5 text-primary" />
                            ) : (
                              <BookmarkPlus className="h-5 w-5" />
                            )}
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedOpportunity(opportunity)}>
                                View Details
                              </Button>
                            </DialogTrigger>
                          </Dialog>
                          {user?.role === 'student' && (
                            <Button 
                              size="sm"
                              onClick={() => handleApply(opportunity.id)}
                            >
                              Apply
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recommended" className="mt-6">
          <div className="p-8 text-center text-muted-foreground">
            <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium">Recommended opportunities</h3>
            <p>Opportunities matching your skills and interests will appear here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="bookmarked" className="mt-6">
          {bookmarkedOpportunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpportunities
                .filter(opportunity => bookmarkedOpportunities.includes(opportunity.id))
                .map((opportunity) => (
                  <Card key={opportunity.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-xl mr-3">
                            {opportunity.logo}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{opportunity.company}</CardTitle>
                            <p className="text-sm text-muted-foreground">{opportunity.location}</p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => toggleBookmark(opportunity.id)}
                          className="text-primary"
                        >
                          <BookmarkCheck className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <h3 className="font-semibold">{opportunity.role}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline">{opportunity.type}</Badge>
                        <Badge variant="outline">{opportunity.salary}</Badge>
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                        {opportunity.description}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <ClockIcon className="h-3 w-3 mr-1" />
                        <span>
                          {getDaysUntilDeadline(opportunity.deadline)} days left
                        </span>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setSelectedOpportunity(opportunity)}>
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <BookmarkPlus className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">No bookmarked opportunities</h3>
              <p>Opportunities you bookmark will appear here.</p>
            </div>
          )}
        </TabsContent>
        
        {user?.role === 'student' && (
          <TabsContent value="applied" className="mt-6">
            <div className="p-8 text-center text-muted-foreground">
              <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">No applications yet</h3>
              <p>Opportunities you've applied to will appear here.</p>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default OpportunitiesPage;
