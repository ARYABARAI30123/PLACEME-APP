
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle, Search, MegaphoneIcon, BriefcaseIcon, CalendarIcon, InfoIcon, MailIcon } from 'lucide-react';

// Mock data
const notificationsData = [
  {
    id: 1,
    type: 'announcement',
    title: 'Career Fair Next Week',
    message: 'Don\'t miss our annual career fair on May 15th, 2025. Over 50 companies will be attending!',
    date: '2025-04-05',
    read: false
  },
  {
    id: 2,
    type: 'opportunity',
    title: 'Google Posted a New Opportunity',
    message: 'Google is hiring Software Engineers. Apply before May 20th, 2025.',
    date: '2025-04-07',
    read: true
  },
  {
    id: 3,
    type: 'reminder',
    title: 'Amazon Application Deadline',
    message: 'The application deadline for Amazon Backend Developer position is in 3 days.',
    date: '2025-04-12',
    read: false
  },
  {
    id: 4,
    type: 'info',
    title: 'Resume Workshop',
    message: 'Join our resume workshop on April 20th, 2025 to improve your resume and increase your chances of getting hired.',
    date: '2025-04-14',
    read: true
  },
  {
    id: 5,
    type: 'email',
    title: 'Microsoft Interview Invitation',
    message: 'You have been invited for an interview with Microsoft for the Frontend Developer position. Please check your email for details.',
    date: '2025-04-18',
    read: false
  }
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'unread') return matchesSearch && !notification.read;
    return matchesSearch && notification.type === filter;
  });
  
  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'announcement':
        return <MegaphoneIcon className="h-5 w-5 text-blue-500" />;
      case 'opportunity':
        return <BriefcaseIcon className="h-5 w-5 text-teal-500" />;
      case 'reminder':
        return <CalendarIcon className="h-5 w-5 text-amber-500" />;
      case 'info':
        return <InfoIcon className="h-5 w-5 text-purple-500" />;
      case 'email':
        return <MailIcon className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with the latest announcements and opportunities</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-xs">
            {unreadCount} unread
          </Badge>
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setFilter('all')}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  All Notifications
                </Button>
                <Button
                  variant={filter === 'unread' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setFilter('unread')}
                >
                  <Badge className="h-2 w-2 rounded-full mr-2 bg-primary" />
                  Unread
                </Button>
                <Button
                  variant={filter === 'announcement' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setFilter('announcement')}
                >
                  <MegaphoneIcon className="h-4 w-4 mr-2" />
                  Announcements
                </Button>
                <Button
                  variant={filter === 'opportunity' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setFilter('opportunity')}
                >
                  <BriefcaseIcon className="h-4 w-4 mr-2" />
                  Opportunities
                </Button>
                <Button
                  variant={filter === 'reminder' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setFilter('reminder')}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Reminders
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-3 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search notifications" 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>
                {filter === 'all' ? 'All Notifications' : 
                 filter === 'unread' ? 'Unread Notifications' : 
                 `${filter.charAt(0).toUpperCase() + filter.slice(1)} Notifications`}
              </CardTitle>
              <CardDescription>
                {filteredNotifications.length} {filteredNotifications.length === 1 ? 'notification' : 'notifications'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`flex p-4 rounded-lg border ${!notification.read ? 'bg-muted/40' : ''}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-medium ${!notification.read ? 'text-black' : 'text-gray-700'}`}>
                            {notification.title}
                          </h3>
                          <div className="flex items-center">
                            {!notification.read && (
                              <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {new Date(notification.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium">No notifications</h3>
                    <p>There are no notifications matching your criteria.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
