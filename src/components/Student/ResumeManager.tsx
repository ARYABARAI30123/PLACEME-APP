
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FilePlus, FileText, Save, Upload } from 'lucide-react';
import { toast } from 'sonner';

const ResumeManager = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumePreviewUrl, setResumePreviewUrl] = useState<string | null>(null);
  const [personalInfo, setPersonalInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    address: '123 Main St, Anytown, USA',
    linkedIn: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
  });
  
  const [education, setEducation] = useState([
    {
      school: 'University of Example',
      degree: 'Bachelor of Science in Computer Science',
      dates: '2020 - 2024',
      gpa: '3.8',
    }
  ]);
  
  const [skills, setSkills] = useState([
    'JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git'
  ]);
  
  const [projects, setProjects] = useState([
    {
      name: 'Personal Portfolio',
      description: 'A responsive portfolio website built with React and Tailwind CSS',
      technologies: 'React, Tailwind CSS, Vite',
      link: 'github.com/johndoe/portfolio',
    }
  ]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to server/cloud storage
      // For now, we'll just create a local object URL
      setResumeFile(file);
      setResumePreviewUrl(URL.createObjectURL(file));
      toast.success('Resume uploaded successfully');
    }
  };
  
  const handleRemoveFile = () => {
    if (resumePreviewUrl) {
      URL.revokeObjectURL(resumePreviewUrl);
    }
    setResumeFile(null);
    setResumePreviewUrl(null);
  };
  
  const handleSaveResume = () => {
    // In a real app, this would call an API to save the resume data
    toast.success('Resume information saved successfully');
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Resume Manager</h1>
      
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="upload">Upload Resume</TabsTrigger>
          <TabsTrigger value="edit">Edit Resume</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Your Resume</CardTitle>
              <CardDescription>
                Upload your resume in PDF or DOC format
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!resumeFile ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Drag and drop your resume here, or click to browse files
                  </p>
                  <Button asChild>
                    <label>
                      <Upload className="h-4 w-4 mr-2" />
                      Browse Files
                      <Input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                      />
                    </label>
                  </Button>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-10 w-10 text-teal-600 mr-3" />
                      <div>
                        <p className="font-medium">{resumeFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(resumeFile.size / 1024).toFixed(2)} KB • Uploaded just now
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={resumePreviewUrl || '#'} target="_blank" rel="noopener noreferrer">
                          View
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleRemoveFile}>
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="edit">
          <Card>
            <CardHeader>
              <CardTitle>Edit Resume Information</CardTitle>
              <CardDescription>
                Update your resume details to improve your match score
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={personalInfo.name}
                        onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={personalInfo.address}
                        onChange={(e) => setPersonalInfo({...personalInfo, address: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={personalInfo.linkedIn}
                        onChange={(e) => setPersonalInfo({...personalInfo, linkedIn: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        id="github"
                        value={personalInfo.github}
                        onChange={(e) => setPersonalInfo({...personalInfo, github: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Education */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Education</h3>
                    <Button variant="outline" size="sm">
                      <FilePlus className="h-4 w-4 mr-2" />
                      Add Education
                    </Button>
                  </div>
                  
                  {education.map((edu, index) => (
                    <div key={index} className="border rounded-lg p-4 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`school-${index}`}>School/University</Label>
                          <Input
                            id={`school-${index}`}
                            value={edu.school}
                            onChange={(e) => {
                              const newEdu = [...education];
                              newEdu[index].school = e.target.value;
                              setEducation(newEdu);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`degree-${index}`}>Degree</Label>
                          <Input
                            id={`degree-${index}`}
                            value={edu.degree}
                            onChange={(e) => {
                              const newEdu = [...education];
                              newEdu[index].degree = e.target.value;
                              setEducation(newEdu);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`dates-${index}`}>Dates</Label>
                          <Input
                            id={`dates-${index}`}
                            value={edu.dates}
                            onChange={(e) => {
                              const newEdu = [...education];
                              newEdu[index].dates = e.target.value;
                              setEducation(newEdu);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`gpa-${index}`}>GPA</Label>
                          <Input
                            id={`gpa-${index}`}
                            value={edu.gpa}
                            onChange={(e) => {
                              const newEdu = [...education];
                              newEdu[index].gpa = e.target.value;
                              setEducation(newEdu);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Skills */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Skills</h3>
                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills (comma separated)</Label>
                    <Textarea
                      id="skills"
                      value={skills.join(', ')}
                      onChange={(e) => setSkills(e.target.value.split(',').map(skill => skill.trim()))}
                      rows={3}
                    />
                  </div>
                </div>
                
                {/* Projects */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Projects</h3>
                    <Button variant="outline" size="sm">
                      <FilePlus className="h-4 w-4 mr-2" />
                      Add Project
                    </Button>
                  </div>
                  
                  {projects.map((project, index) => (
                    <div key={index} className="border rounded-lg p-4 mb-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`project-name-${index}`}>Project Name</Label>
                          <Input
                            id={`project-name-${index}`}
                            value={project.name}
                            onChange={(e) => {
                              const newProjects = [...projects];
                              newProjects[index].name = e.target.value;
                              setProjects(newProjects);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`project-desc-${index}`}>Description</Label>
                          <Textarea
                            id={`project-desc-${index}`}
                            value={project.description}
                            onChange={(e) => {
                              const newProjects = [...projects];
                              newProjects[index].description = e.target.value;
                              setProjects(newProjects);
                            }}
                            rows={3}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`project-tech-${index}`}>Technologies Used</Label>
                          <Input
                            id={`project-tech-${index}`}
                            value={project.technologies}
                            onChange={(e) => {
                              const newProjects = [...projects];
                              newProjects[index].technologies = e.target.value;
                              setProjects(newProjects);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`project-link-${index}`}>Project Link</Label>
                          <Input
                            id={`project-link-${index}`}
                            value={project.link}
                            onChange={(e) => {
                              const newProjects = [...projects];
                              newProjects[index].link = e.target.value;
                              setProjects(newProjects);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button onClick={handleSaveResume} className="mt-6">
                  <Save className="h-4 w-4 mr-2" />
                  Save Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Resume Preview</CardTitle>
              <CardDescription>
                See how your resume appears to employers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-lg border p-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold">{personalInfo.name}</h2>
                  <div className="text-muted-foreground mt-2">
                    <p>{personalInfo.email} | {personalInfo.phone}</p>
                    <p>{personalInfo.address}</p>
                    <p>LinkedIn: {personalInfo.linkedIn} | GitHub: {personalInfo.github}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold border-b pb-2 mb-3">Education</h3>
                  {education.map((edu, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between">
                        <p className="font-semibold">{edu.school}</p>
                        <p>{edu.dates}</p>
                      </div>
                      <p>{edu.degree}</p>
                      <p className="text-muted-foreground">GPA: {edu.gpa}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold border-b pb-2 mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold border-b pb-2 mb-3">Projects</h3>
                  {projects.map((project, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between">
                        <p className="font-semibold">{project.name}</p>
                        <p className="text-sm text-blue-600">{project.link}</p>
                      </div>
                      <p className="text-sm text-muted-foreground italic">
                        Technologies: {project.technologies}
                      </p>
                      <p className="mt-1">{project.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeManager;
