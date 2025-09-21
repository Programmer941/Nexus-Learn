import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2,
  Maximize,
  Download,
  BookOpen,
  Clock,
  CheckCircle,
  ArrowLeft
} from "lucide-react";

const lectureData = {
  "1": {
    title: "Introduction to Advanced Algorithms",
    course: "Computer Science 301",
    instructor: "Dr. Sarah Chen",
    duration: "45:32",
    description: "This lecture introduces the fundamental concepts of advanced algorithms, covering computational complexity, algorithm design paradigms, and performance analysis.",
    videoUrl: "/placeholder-video.mp4",
    transcript: [
      { time: "0:00", text: "Welcome to Computer Science 301. Today we'll begin our journey into advanced algorithms." },
      { time: "0:30", text: "First, let's establish what we mean by 'algorithm efficiency' and why it matters in computer science." },
      { time: "1:15", text: "We'll start with a review of Big O notation, which is fundamental to analyzing algorithm performance." },
      { time: "2:00", text: "Consider a simple example: searching for an element in an array. How many different ways can we approach this?" },
    ],
    notes: [
      "Algorithm: A finite sequence of instructions for solving a computational problem",
      "Efficiency: Measured in terms of time complexity and space complexity",
      "Big O Notation: Mathematical notation describing the limiting behavior of a function",
      "Common complexities: O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ)"
    ],
    resources: [
      { name: "Lecture Slides", type: "PDF", size: "2.4 MB" },
      { name: "Code Examples", type: "ZIP", size: "856 KB" },
      { name: "Additional Reading", type: "PDF", size: "1.8 MB" }
    ]
  }
};

export default function Lecture() {
  const { lectureId } = useParams();
  const lecture = lectureData[lectureId as keyof typeof lectureData];
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!lecture) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Lecture Not Found</h1>
          <Link to="/classes">
            <Button className="mt-4">Back to Classes</Button>
          </Link>
        </div>
      </div>
    );
  }

  const progress = (currentTime / (45 * 60 + 32)) * 100; // Convert duration to seconds

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (seconds: number) => {
    setCurrentTime(Math.max(0, currentTime + seconds));
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link to="/classes" className="hover:text-foreground">My Classes</Link>
          <span>/</span>
          <Link to="/class/cs301" className="hover:text-foreground">{lecture.course}</Link>
          <span>/</span>
          <span>Lectures</span>
        </div>
        
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground font-serif">{lecture.title}</h1>
            <div className="flex items-center space-x-4 text-muted-foreground">
              <span className="font-medium">{lecture.instructor}</span>
              <Badge variant="outline">{lecture.course}</Badge>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{lecture.duration}</span>
              </div>
            </div>
            <p className="text-muted-foreground max-w-3xl">{lecture.description}</p>
          </div>
          
          <Link to="/class/cs301">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Button>
          </Link>
        </div>
      </div>

      {/* Video Player */}
      <Card className="shadow-elevated">
        <CardContent className="p-0">
          <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
            {/* Placeholder Video Player */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  {isPlaying ? (
                    <Pause className="w-12 h-12" />
                  ) : (
                    <Play className="w-12 h-12 ml-1" />
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2">{lecture.title}</h3>
                <p className="text-white/80">Click to {isPlaying ? 'pause' : 'play'}</p>
              </div>
            </div>
            
            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/75 p-4">
              <div className="space-y-3">
                {/* Progress Bar */}
                <div className="space-y-1">
                  <Progress value={progress} className="w-full h-2" />
                  <div className="flex justify-between text-xs text-white/80">
                    <span>{formatTime(currentTime)}</span>
                    <span>{lecture.duration}</span>
                  </div>
                </div>
                
                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSeek(-10)}
                      className="text-white hover:bg-white/20"
                    >
                      <SkipBack className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={togglePlay}
                      className="text-white hover:bg-white/20"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSeek(10)}
                      className="text-white hover:bg-white/20"
                    >
                      <SkipForward className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                    >
                      <Maximize className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="transcript" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="transcript" className="space-y-4 mt-6">
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="font-serif">Lecture Transcript</CardTitle>
              <CardDescription>Follow along with the lecture content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {lecture.transcript.map((entry, index) => (
                <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/20 transition-colors">
                  <Badge variant="outline" className="font-mono text-xs min-w-fit">
                    {entry.time}
                  </Badge>
                  <p className="text-sm leading-relaxed">{entry.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4 mt-6">
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="font-serif">Key Concepts</CardTitle>
              <CardDescription>Important points from this lecture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {lecture.notes.map((note, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/20">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <BookOpen className="w-3 h-3 text-primary" />
                  </div>
                  <p className="text-sm leading-relaxed">{note}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4 mt-6">
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="font-serif">Course Materials</CardTitle>
              <CardDescription>Download supplementary materials for this lecture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {lecture.resources.map((resource, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Download className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{resource.name}</p>
                      <p className="text-sm text-muted-foreground">{resource.type} • {resource.size}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Completion Status */}
      {!isCompleted && (
        <Card className="shadow-academic">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">Mark as completed when you finish watching</span>
              </div>
              <Button
                onClick={() => setIsCompleted(true)}
                disabled={progress < 80}
              >
                Mark Complete
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}