import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  BookOpen, 
  PenTool, 
  ClipboardCheck, 
  Clock, 
  Calendar,
  Download,
  ExternalLink,
  CheckCircle,
  Circle,
  Users
} from "lucide-react";

const courseData = {
  "cs301": {
    name: "Computer Science 301",
    title: "Advanced Algorithms & Data Structures",
    instructor: "Dr. Sarah Chen",
    semester: "Fall 2024",
    progress: 78,
    students: 45,
    description: "Explore advanced algorithmic techniques, analyze computational complexity, and implement sophisticated data structures for real-world applications."
  }
};

const lectureContent = [
  { id: 1, title: "Introduction to Advanced Algorithms", duration: "45:32", completed: true, type: "lecture" },
  { id: 2, title: "Big O Notation & Complexity Analysis", duration: "38:15", completed: true, type: "lecture" },
  { id: 3, title: "Advanced Sorting Algorithms", duration: "52:08", completed: true, type: "lecture" },
  { id: 4, title: "Binary Search Trees Deep Dive", duration: "41:22", completed: true, type: "lecture" },
  { id: 5, title: "Red-Black Trees & Balancing", duration: "47:18", completed: false, type: "lecture" },
  { id: 6, title: "Hash Tables & Collision Resolution", duration: "39:45", completed: false, type: "lecture" },
];

const assignments = [
  { id: 1, title: "Algorithm Analysis Report", type: "homework", due: "Friday, Nov 15", status: "pending", points: 100 },
  { id: 2, title: "BST Implementation", type: "practice", due: "Monday, Nov 18", status: "submitted", points: 75 },
  { id: 3, title: "Complexity Theory Quiz", type: "quiz", due: "Wednesday, Nov 20", status: "upcoming", points: 50 },
];

const notes = [
  { id: 1, title: "Algorithm Complexity Cheat Sheet", pages: 4, lastUpdated: "2 days ago" },
  { id: 2, title: "Tree Traversal Methods", pages: 6, lastUpdated: "1 week ago" },
  { id: 3, title: "Hash Function Examples", pages: 3, lastUpdated: "3 days ago" },
];

export default function ClassDetail() {
  const { classId } = useParams();
  const course = courseData[classId as keyof typeof courseData];

  if (!course) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Course Not Found</h1>
          <Link to="/classes">
            <Button className="mt-4">Back to Classes</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link to="/classes" className="hover:text-foreground">My Classes</Link>
          <span>/</span>
          <span>{course.name}</span>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground font-serif">{course.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <span className="font-medium">{course.instructor}</span>
            <Badge variant="outline">{course.semester}</Badge>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{course.students} students</span>
            </div>
          </div>
          <p className="text-muted-foreground max-w-3xl">{course.description}</p>
        </div>

        {/* Progress Overview */}
        <Card className="shadow-academic">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Course Progress</span>
              <span className="text-sm font-bold">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="w-full" />
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="lectures" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="lectures" className="flex items-center space-x-2">
            <Play className="w-4 h-4" />
            <span>Lectures</span>
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>Notes</span>
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex items-center space-x-2">
            <PenTool className="w-4 h-4" />
            <span>Practice</span>
          </TabsTrigger>
          <TabsTrigger value="homework" className="flex items-center space-x-2">
            <ClipboardCheck className="w-4 h-4" />
            <span>Homework</span>
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="flex items-center space-x-2">
            <ClipboardCheck className="w-4 h-4" />
            <span>Quizzes</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lectures" className="space-y-4 mt-6">
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="font-serif">Flipped Lectures</CardTitle>
              <CardDescription>Watch pre-recorded lectures at your own pace</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {lectureContent.map((lecture) => (
                <div key={lecture.id} className="flex items-center space-x-4 p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {lecture.completed ? (
                      <CheckCircle className="w-5 h-5 text-primary" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{lecture.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{lecture.duration}</span>
                      </div>
                      {lecture.completed && <Badge variant="secondary">Completed</Badge>}
                    </div>
                  </div>
                  <Link to={`/lecture/${lecture.id}`}>
                    <Button variant={lecture.completed ? "outline" : "default"} size="sm">
                      {lecture.completed ? "Review" : "Watch"}
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4 mt-6">
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="font-serif">Course Notes</CardTitle>
              <CardDescription>Comprehensive study materials and resources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {notes.map((note) => (
                <div key={note.id} className="flex items-center space-x-4 p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{note.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {note.pages} pages • Updated {note.lastUpdated}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice" className="space-y-4 mt-6">
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="font-serif">Practice Exercises</CardTitle>
              <CardDescription>Hands-on practice to reinforce your learning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {assignments.filter(a => a.type === 'practice').map((assignment) => (
                <div key={assignment.id} className="flex items-center space-x-4 p-4 rounded-lg bg-muted/20">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <PenTool className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{assignment.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Due: {assignment.due}</span>
                      </div>
                      <span>{assignment.points} points</span>
                    </div>
                  </div>
                  <Badge variant={assignment.status === 'submitted' ? 'secondary' : 'outline'}>
                    {assignment.status}
                  </Badge>
                  <Button size="sm" disabled={assignment.status === 'submitted'}>
                    {assignment.status === 'submitted' ? 'Submitted' : 'Start'}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="homework" className="space-y-4 mt-6">
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="font-serif">Homework Assignments</CardTitle>
              <CardDescription>Required assignments for course completion</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {assignments.filter(a => a.type === 'homework').map((assignment) => (
                <div key={assignment.id} className="flex items-center space-x-4 p-4 rounded-lg bg-muted/20">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <ClipboardCheck className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{assignment.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Due: {assignment.due}</span>
                      </div>
                      <span>{assignment.points} points</span>
                    </div>
                  </div>
                  <Badge variant={assignment.status === 'submitted' ? 'secondary' : 'destructive'}>
                    {assignment.status}
                  </Badge>
                  <Button size="sm" variant={assignment.status === 'pending' ? 'default' : 'outline'}>
                    {assignment.status === 'submitted' ? 'Review' : 'Submit'}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-4 mt-6">
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="font-serif">Quizzes & Assessments</CardTitle>
              <CardDescription>Test your knowledge with interactive quizzes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {assignments.filter(a => a.type === 'quiz').map((assignment) => (
                <div key={assignment.id} className="flex items-center space-x-4 p-4 rounded-lg bg-muted/20">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <ClipboardCheck className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{assignment.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Available: {assignment.due}</span>
                      </div>
                      <span>{assignment.points} points</span>
                    </div>
                  </div>
                  <Badge variant="outline">{assignment.status}</Badge>
                  <Link to={`/quiz/cs-loops-quiz`}>
                    <Button size="sm">Take Quiz</Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}