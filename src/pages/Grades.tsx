import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, BookOpen, Award } from "lucide-react";

const classGrades = [
  {
    id: "cs301",
    name: "AP Computer Science A",
    currentGrade: "A-",
    percentage: 91.5,
    trend: "up",
    assignments: [
      { name: "Quiz 7 - Loops", grade: "A", points: "95/100" },
      { name: "Project 3 - Calculator", grade: "A-", points: "88/100" },
      { name: "Homework 12", grade: "A", points: "48/50" },
      { name: "Midterm Exam", grade: "B+", points: "85/100" }
    ]
  },
  {
    id: "math205",
    name: "AP Calculus BC",
    currentGrade: "B+",
    percentage: 87.2,
    trend: "up",
    assignments: [
      { name: "Integration Quiz", grade: "A-", points: "89/100" },
      { name: "Derivatives Test", grade: "B", points: "82/100" },
      { name: "Practice Set 8", grade: "A", points: "45/50" },
      { name: "Unit Test 3", grade: "B+", points: "87/100" }
    ]
  },
  {
    id: "eng102",
    name: "AP English Literature",
    currentGrade: "A",
    percentage: 94.8,
    trend: "stable",
    assignments: [
      { name: "Poetry Analysis", grade: "A", points: "95/100" },
      { name: "Literary Essay", grade: "A-", points: "92/100" },
      { name: "Discussion Posts", grade: "A", points: "98/100" },
      { name: "Vocabulary Quiz", grade: "A", points: "100/100" }
    ]
  },
  {
    id: "phys201",
    name: "AP Physics C",
    currentGrade: "B-",
    percentage: 80.3,
    trend: "down",
    assignments: [
      { name: "Lab Report 4", grade: "B-", points: "78/100" },
      { name: "Mechanics Test", grade: "C+", points: "77/100" },
      { name: "Problem Set 6", grade: "B", points: "40/50" },
      { name: "Lab Practical", grade: "B+", points: "85/100" }
    ]
  }
];

const overallStats = {
  gpa: 3.7,
  totalPoints: 1847,
  possiblePoints: 2000,
  percentile: 85
};

export default function Grades() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground font-serif">Grades</h1>
        <p className="text-muted-foreground">Track your academic progress across all classes</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-academic">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Current GPA</p>
                <p className="text-2xl font-bold">{overallStats.gpa}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-academic">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm font-medium">Overall %</p>
                <p className="text-2xl font-bold">{Math.round((overallStats.totalPoints / overallStats.possiblePoints) * 100)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-academic">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Class Rank</p>
                <p className="text-2xl font-bold">{overallStats.percentile}th</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-academic">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-sm font-medium">Total Points</p>
                <p className="text-2xl font-bold">{overallStats.totalPoints}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Class Grades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {classGrades.map((classGrade) => (
          <Card key={classGrade.id} className="shadow-elevated">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-serif">{classGrade.name}</CardTitle>
                  <CardDescription>Current progress and recent assignments</CardDescription>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-lg font-bold px-3 py-1">
                      {classGrade.currentGrade}
                    </Badge>
                    {classGrade.trend === 'up' && <TrendingUp className="h-4 w-4 text-primary" />}
                    {classGrade.trend === 'down' && <TrendingDown className="h-4 w-4 text-destructive" />}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{classGrade.percentage}%</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Course Progress</span>
                  <span>{classGrade.percentage}%</span>
                </div>
                <Progress value={classGrade.percentage} className="w-full" />
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-sm">Recent Assignments</h4>
                {classGrade.assignments.map((assignment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                    <div>
                      <p className="font-medium text-sm">{assignment.name}</p>
                      <p className="text-xs text-muted-foreground">{assignment.points}</p>
                    </div>
                    <Badge 
                      variant={
                        assignment.grade.startsWith('A') ? 'default' :
                        assignment.grade.startsWith('B') ? 'secondary' :
                        'outline'
                      }
                    >
                      {assignment.grade}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}