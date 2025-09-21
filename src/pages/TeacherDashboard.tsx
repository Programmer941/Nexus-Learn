import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Users, Calendar, MessageSquare, PlusCircle, FileText, BarChart3, Settings, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const teacherClasses = [
  {
    id: "cs301",
    name: "AP Computer Science A",
    period: "1st Period",
    students: 28,
    avgGrade: "B+",
    upcomingDeadlines: 2,
    needsGrading: 15,
    color: "bg-primary"
  },
  {
    id: "cs302", 
    name: "AP Computer Science A",
    period: "3rd Period",
    students: 25,
    avgGrade: "A-",
    upcomingDeadlines: 1,
    needsGrading: 8,
    color: "bg-accent"
  },
  {
    id: "cs101",
    name: "Intro to Computer Science",
    period: "5th Period", 
    students: 32,
    avgGrade: "B",
    upcomingDeadlines: 3,
    needsGrading: 22,
    color: "bg-secondary"
  }
];

const recentActivity = [
  { type: "submission", student: "Alex Chen", class: "AP CS A - 1st", item: "Algorithm Project", time: "2 min ago" },
  { type: "question", student: "Sarah Martinez", class: "Intro CS", item: "Loop Structures", time: "15 min ago" },
  { type: "submission", student: "Mike Johnson", class: "AP CS A - 3rd", item: "Quiz 7", time: "1 hour ago" },
  { type: "late", student: "Emma Davis", class: "AP CS A - 1st", item: "Homework 12", time: "2 hours ago" }
];

export default function TeacherDashboard() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground font-serif">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Ms. Sarah Chen</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Assignment
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-academic">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Total Students</p>
                <p className="text-2xl font-bold">85</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-academic">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm font-medium">Needs Grading</p>
                <p className="text-2xl font-bold">45</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-academic">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-sm font-medium">Upcoming Deadlines</p>
                <p className="text-2xl font-bold">6</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-academic">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-chart-2" />
              <div>
                <p className="text-sm font-medium">New Messages</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Classes Overview */}
        <div className="lg:col-span-2">
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="font-serif">My Classes</CardTitle>
              <CardDescription>Manage your current classes and student progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {teacherClasses.map((cls) => (
                <Card key={cls.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${cls.color}`}></div>
                          <h3 className="font-medium">{cls.name}</h3>
                          <Badge variant="outline" className="text-xs">{cls.period}</Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Students</p>
                            <p className="font-medium">{cls.students}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Avg Grade</p>
                            <p className="font-medium">{cls.avgGrade}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm">
                          {cls.needsGrading > 0 && (
                            <div className="flex items-center space-x-1 text-destructive">
                              <AlertCircle className="h-4 w-4" />
                              <span>{cls.needsGrading} to grade</span>
                            </div>
                          )}
                          <div className="text-muted-foreground">
                            {cls.upcomingDeadlines} upcoming deadlines
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Link to={`/teacher/class/${cls.id}`}>
                          <Button size="sm" variant="outline">Manage</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="font-serif">Recent Activity</CardTitle>
              <CardDescription>Latest student submissions and questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-md">
                  <div className={`p-1.5 rounded-full ${
                    activity.type === 'submission' ? 'bg-primary/20' :
                    activity.type === 'question' ? 'bg-accent/20' :
                    'bg-destructive/20'
                  }`}>
                    {activity.type === 'submission' && <FileText className="h-3 w-3" />}
                    {activity.type === 'question' && <MessageSquare className="h-3 w-3" />}
                    {activity.type === 'late' && <AlertCircle className="h-3 w-3" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.student}</p>
                    <p className="text-xs text-muted-foreground">{activity.class}</p>
                    <p className="text-xs">{activity.item}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-academic">
        <CardHeader>
          <CardTitle className="font-serif">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col space-y-2">
              <Link to="/teacher/create" className="flex flex-col items-center space-y-2">
                <PlusCircle className="h-6 w-6" />
                <span>Create Content</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col space-y-2">
              <Link to="/teacher/marketplace" className="flex flex-col items-center space-y-2">
                <BarChart3 className="h-6 w-6" />
                <span>Browse Content</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col space-y-2">
              <FileText className="h-6 w-6" />
              <span>Grade Assignments</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col space-y-2">
              <MessageSquare className="h-6 w-6" />
              <span>Message Students</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}