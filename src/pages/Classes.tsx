import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Users, Calendar, ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const courses = [
  {
    id: "cs301",
    name: "AP Computer Science A",
    title: "Programming & Problem Solving",
    instructor: "Ms. Sarah Chen",
    email: "s.chen@nexuslearn.edu",
    semester: "Fall 2024",
    progress: 78,
    currentGrade: "A-",
    nextDeadline: "Algorithm Project - Due Friday",
    students: 28,
    lectures: { completed: 12, total: 16 },
    color: "bg-primary",
    description: "Learn Java programming and computer science fundamentals"
  },
  {
    id: "math205",
    name: "AP Calculus BC",
    title: "Advanced Calculus",
    instructor: "Mr. Michael Rodriguez",
    email: "m.rodriguez@nexuslearn.edu",
    semester: "Fall 2024",
    progress: 65,
    currentGrade: "B+",
    nextDeadline: "Integration Quiz - Due Tomorrow",
    students: 24,
    lectures: { completed: 8, total: 12 },
    color: "bg-accent",
    description: "Advanced calculus concepts and applications"
  },
  {
    id: "eng102",
    name: "AP English Literature",
    title: "Advanced Literary Analysis",
    instructor: "Ms. Jennifer Walsh",
    email: "j.walsh@nexuslearn.edu",
    semester: "Fall 2024",
    progress: 90,
    currentGrade: "A",
    nextDeadline: "Poetry Analysis - Due Next Week",
    students: 22,
    lectures: { completed: 14, total: 15 },
    color: "bg-secondary",
    description: "Advanced study of literature and writing"
  },
  {
    id: "phys201",
    name: "AP Physics C",
    title: "Mechanics & Electricity",
    instructor: "Mr. Robert Kim",
    email: "r.kim@nexuslearn.edu",
    semester: "Fall 2024",
    progress: 42,
    currentGrade: "B-",
    nextDeadline: "Lab Report 4 - Due Monday",
    students: 26,
    lectures: { completed: 6, total: 14 },
    color: "bg-muted",
    description: "Advanced physics with calculus applications"
  },
  {
    id: "hist301",
    name: "AP World History",
    title: "Global Perspectives",
    instructor: "Ms. Lisa Anderson",
    email: "l.anderson@nexuslearn.edu",
    semester: "Fall 2024",
    progress: 55,
    currentGrade: "B",
    nextDeadline: "DBQ Essay - Due in 2 weeks",
    students: 30,
    lectures: { completed: 7, total: 13 },
    color: "bg-sidebar-primary",
    description: "Global historical patterns and connections"
  },
  {
    id: "bio201",
    name: "AP Biology",
    title: "Advanced Life Sciences",
    instructor: "Dr. Maria Santos",
    email: "m.santos@nexuslearn.edu",
    semester: "Fall 2024",
    progress: 73,
    currentGrade: "A-",
    nextDeadline: "Cell Structure Quiz - Due Friday",
    students: 25,
    lectures: { completed: 10, total: 14 },
    color: "bg-chart-2",
    description: "Advanced study of biological systems and processes"
  },
  {
    id: "chem201",
    name: "AP Chemistry",
    title: "Advanced Chemical Principles",
    instructor: "Mr. David Park",
    email: "d.park@nexuslearn.edu",
    semester: "Fall 2024",
    progress: 68,
    currentGrade: "B+",
    nextDeadline: "Stoichiometry Test - Tomorrow",
    students: 23,
    lectures: { completed: 9, total: 13 },
    color: "bg-chart-3",
    description: "Advanced chemistry concepts and laboratory work"
  },
  {
    id: "span301",
    name: "AP Spanish Language",
    title: "Advanced Spanish Communication",
    instructor: "Sra. Carmen Ruiz",
    email: "c.ruiz@nexuslearn.edu",
    semester: "Fall 2024",
    progress: 82,
    currentGrade: "A",
    nextDeadline: "Oral Presentation - Next Monday",
    students: 20,
    lectures: { completed: 11, total: 13 },
    color: "bg-chart-4",
    description: "Advanced Spanish language and cultural studies"
  }
];

export default function Classes() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground font-serif">My Classes</h1>
        <p className="text-muted-foreground">Manage your courses and track your academic progress</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-academic">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Total Classes</p>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-academic">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Current GPA</p>
                <p className="text-2xl font-bold">3.7</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-academic">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Class Size Avg</p>
                <p className="text-2xl font-bold">33</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-academic">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Upcoming Deadlines</p>
                <p className="text-2xl font-bold">7</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {courses.map((course) => (
          <Card key={course.id} className="shadow-elevated hover:shadow-floating transition-all duration-300 border">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${course.color}`}></div>
                    <Badge variant="outline" className="text-xs">{course.semester}</Badge>
                  </div>
                  <CardTitle className="text-base font-serif leading-tight">{course.title}</CardTitle>
                  <CardDescription className="font-medium text-primary/80 text-sm">{course.name}</CardDescription>
                  <p className="text-xs text-muted-foreground">{course.description}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Progress Section */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="w-full" />
                <p className="text-xs text-muted-foreground">
                  {course.lectures.completed} of {course.lectures.total} lectures
                </p>
              </div>

              {/* Course Info */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Current Grade</p>
                  <p className="font-bold text-lg">{course.currentGrade}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Students</p>
                  <p className="font-medium">{course.students}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Instructor</p>
                  <p className="font-medium">{course.instructor}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Contact</p>
                  <p className="font-medium text-xs">{course.email}</p>
                </div>
              </div>

              {/* Next Deadline */}
              <div className="p-2 bg-muted/30 rounded-md">
                <p className="text-xs text-muted-foreground mb-1">Next Deadline</p>
                <p className="text-xs font-medium">{course.nextDeadline}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Link to={`/class/${course.id}`}>
                  <Button className="flex-1 group">
                    Enter Classroom
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button variant="outline" size="sm" asChild>
                  <a href={`mailto:${course.email}`}>
                    <Mail className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Course Section */}
      <Card className="shadow-academic border-dashed border-2">
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-medium">Add New Course</h3>
              <p className="text-muted-foreground">Enroll in additional courses for this semester</p>
            </div>
            <Button variant="outline">Browse Course Catalog</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}