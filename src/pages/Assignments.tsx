import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const assignments = [
  {
    id: "cs-alg-proj",
    title: "Algorithm Analysis Project",
    class: "AP Computer Science A",
    type: "Project",
    dueDate: "2024-12-15",
    status: "pending",
    points: 100,
    description: "Analyze time complexity of sorting algorithms"
  },
  {
    id: "calc-integration",
    title: "Integration Practice Set",
    class: "AP Calculus BC", 
    type: "Homework",
    dueDate: "2024-12-13",
    status: "submitted",
    points: 50,
    description: "Practice problems on integration techniques"
  },
  {
    id: "lit-poetry",
    title: "Poetry Analysis Essay",
    class: "AP English Literature",
    type: "Essay",
    dueDate: "2024-12-20",
    status: "pending",
    points: 75,
    description: "Analyze themes in modern American poetry"
  },
  {
    id: "phys-lab4",
    title: "Mechanics Lab Report",
    class: "AP Physics C",
    type: "Lab Report",
    dueDate: "2024-12-16",
    status: "late",
    points: 60,
    description: "Analysis of projectile motion experiment"
  }
];

export default function Assignments() {
  const pendingAssignments = assignments.filter(a => a.status === 'pending');
  const submittedAssignments = assignments.filter(a => a.status === 'submitted');
  const lateAssignments = assignments.filter(a => a.status === 'late');

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground font-serif">Assignments</h1>
        <p className="text-muted-foreground">View and manage all your assignments</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-academic">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold">{pendingAssignments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-academic">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Submitted</p>
                <p className="text-2xl font-bold">{submittedAssignments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-academic">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-sm font-medium">Late</p>
                <p className="text-2xl font-bold">{lateAssignments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="shadow-elevated hover:shadow-floating transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-serif font-medium">{assignment.title}</h3>
                    <Badge 
                      variant={
                        assignment.status === 'submitted' ? 'default' :
                        assignment.status === 'late' ? 'destructive' : 'secondary'
                      }
                    >
                      {assignment.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{assignment.class}</span>
                    <span>•</span>
                    <span>{assignment.type}</span>
                    <span>•</span>
                    <span>{assignment.points} points</span>
                  </div>
                  
                  <p className="text-sm">{assignment.description}</p>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {assignment.status === 'pending' && (
                    <Button>Submit Assignment</Button>
                  )}
                  {assignment.status === 'submitted' && (
                    <Button variant="outline">View Submission</Button>
                  )}
                  {assignment.status === 'late' && (
                    <Button variant="destructive">Submit Late</Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}