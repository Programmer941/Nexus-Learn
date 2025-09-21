import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Play, Clock, TrendingUp, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const recentActivity = [
  { type: "lecture", title: "Object-Oriented Programming", course: "AP CS A", time: "2 hours ago" },
  { type: "quiz", title: "Integration Techniques Quiz", course: "AP Calc BC", time: "1 day ago", score: 89 },
  { type: "homework", title: "Poetry Analysis Essay", course: "AP Lit", time: "2 days ago", status: "submitted" },
];

const upcomingDeadlines = [
  { title: "Integration Quiz", course: "AP Calc BC", due: "Tomorrow", type: "quiz" },
  { title: "Algorithm Project", course: "AP CS A", due: "Friday", type: "project" },
  { title: "Poetry Analysis", course: "AP Literature", due: "Next Week", type: "essay" },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground font-serif">Welcome back, Alex</h1>
        <p className="text-muted-foreground">Ready to continue your learning journey?</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-academic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+1 from last semester</p>
          </CardContent>
        </Card>

        <Card className="shadow-academic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Lectures</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card className="shadow-academic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.7</div>
            <p className="text-xs text-muted-foreground">+0.2 from last semester</p>
          </CardContent>
        </Card>

        <Card className="shadow-academic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28h</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 shadow-elevated">
          <CardHeader>
            <CardTitle className="font-serif">Recent Activity</CardTitle>
            <CardDescription>Your latest learning progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-md bg-muted/30">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {activity.type === 'lecture' && <Play className="w-5 h-5 text-primary" />}
                  {activity.type === 'quiz' && <CheckCircle className="w-5 h-5 text-primary" />}
                  {activity.type === 'homework' && <BookOpen className="w-5 h-5 text-primary" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.course} • {activity.time}</p>
                </div>
                {activity.score && (
                  <Badge variant="secondary">{activity.score}%</Badge>
                )}
                {activity.status && (
                  <Badge variant="outline" className="capitalize">{activity.status}</Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle className="font-serif">Upcoming Deadlines</CardTitle>
            <CardDescription>Stay on track with your coursework</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="space-y-2 p-3 rounded-md bg-muted/20">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{deadline.title}</p>
                    <p className="text-xs text-muted-foreground">{deadline.course}</p>
                  </div>
                  <Badge variant={deadline.due === 'Tomorrow' ? 'destructive' : 'secondary'} className="text-xs">
                    {deadline.due}
                  </Badge>
                </div>
              </div>
            ))}
            <Link to="/assignments">
              <Button variant="outline" className="w-full">View All Assignments</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Course Progress */}
      <Card className="shadow-elevated">
        <CardHeader>
          <CardTitle className="font-serif">Course Progress</CardTitle>
          <CardDescription>Track your advancement in each subject</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "AP Computer Science A", progress: 78, lectures: 12, total: 16, grade: "A-" },
              { name: "AP Calculus BC", progress: 65, lectures: 8, total: 12, grade: "B+" },
              { name: "AP English Literature", progress: 90, lectures: 14, total: 15, grade: "A" },
            ].map((course, index) => (
              <div key={index} className="space-y-3 p-4 rounded-lg bg-card border">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{course.name}</h4>
                    <Badge variant="outline" className="font-bold">{course.grade}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {course.lectures} of {course.total} lectures completed
                  </p>
                </div>
                <Progress value={course.progress} className="w-full" />
                <p className="text-sm font-medium text-right">{course.progress}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}