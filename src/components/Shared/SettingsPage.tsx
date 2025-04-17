
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/components/AuthProvider';
import { toast } from 'sonner';
import { User, Save, Bell, Shield, Mail, Phone } from 'lucide-react';

const SettingsPage = () => {
  const { user } = useAuth();
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '(123) 456-7890',
    bio: 'Computer Science student passionate about software development and machine learning.'
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    newOpportunities: true,
    deadlineReminders: true,
    applicationUpdates: true,
    marketingEmails: false
  });
  
  const handleProfileUpdate = () => {
    // In a real app, this would call an API
    toast.success('Profile updated successfully');
  };
  
  const handleNotificationUpdate = () => {
    // In a real app, this would call an API
    toast.success('Notification preferences updated');
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value
    });
  };
  
  const handleToggleChange = (field: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [field]: !notificationSettings[field as keyof typeof notificationSettings]
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col items-center space-y-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="text-3xl">
                      {user?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name"
                        value={profileForm.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email"
                        value={profileForm.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        name="phone"
                        value={profileForm.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input 
                        id="role" 
                        value={user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                        disabled
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={profileForm.bio}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button onClick={handleProfileUpdate}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch 
                    id="email-notifications" 
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={() => handleToggleChange('emailNotifications')}
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications" className="text-base">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications on your device
                    </p>
                  </div>
                  <Switch 
                    id="push-notifications"
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={() => handleToggleChange('pushNotifications')}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Notification Types</h3>
                  
                  <div className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="new-opportunities" className="text-base">New Opportunities</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify when new job opportunities are posted
                      </p>
                    </div>
                    <Switch 
                      id="new-opportunities"
                      checked={notificationSettings.newOpportunities}
                      onCheckedChange={() => handleToggleChange('newOpportunities')}
                    />
                  </div>
                  
                  <div className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="deadline-reminders" className="text-base">Deadline Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Remind about upcoming application deadlines
                      </p>
                    </div>
                    <Switch 
                      id="deadline-reminders"
                      checked={notificationSettings.deadlineReminders}
                      onCheckedChange={() => handleToggleChange('deadlineReminders')}
                    />
                  </div>
                  
                  <div className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="application-updates" className="text-base">Application Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify about changes to your application status
                      </p>
                    </div>
                    <Switch 
                      id="application-updates"
                      checked={notificationSettings.applicationUpdates}
                      onCheckedChange={() => handleToggleChange('applicationUpdates')}
                    />
                  </div>
                  
                  <div className="flex flex-row items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing-emails" className="text-base">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive promotional and marketing emails
                      </p>
                    </div>
                    <Switch 
                      id="marketing-emails"
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={() => handleToggleChange('marketingEmails')}
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button onClick={handleNotificationUpdate}>
                  <Bell className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>
                Manage your account security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" placeholder="••••••••" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" placeholder="••••••••" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" placeholder="••••••••" />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Two-Factor Authentication</h3>
                
                <div className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor" className="text-base">Enable Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch id="two-factor" />
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button onClick={() => toast.success('Security settings updated')}>
                  <Shield className="h-4 w-4 mr-2" />
                  Update Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
