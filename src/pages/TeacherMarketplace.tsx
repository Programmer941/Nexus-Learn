import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Search, Filter, Play, BookOpen, FileQuestion, Download, Heart, TrendingUp, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Course {
  id: string;
  name: string;
  subject: string;
}

interface Content {
  id: string;
  title: string;
  description: string;
  subject: string;
  type: "video" | "notes" | "quiz";
  creator: {
    name: string;
    institution: string;
    avatar?: string;
  };
  effectiveness: number;
  rating: number;
  reviewCount: number;
  duration?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  isFavorite: boolean;
  isSelected: boolean;
  price: "free" | number;
}

const sampleCourses: Course[] = [
  { id: "cs301", name: "AP Computer Science A - 1st Period", subject: "Computer Science" },
  { id: "cs302", name: "AP Computer Science A - 3rd Period", subject: "Computer Science" },
  { id: "cs303", name: "AP Computer Science A - 5th Period", subject: "Computer Science" },
  { id: "cs304", name: "AP Computer Science A - 7th Period", subject: "Computer Science" },
  { id: "cs305", name: "AP Computer Science A - Advanced", subject: "Computer Science" },
  { id: "cs306", name: "AP Computer Science A - Honors", subject: "Computer Science" },
  { id: "cs307", name: "AP Computer Science A - Accelerated", subject: "Computer Science" },
  { id: "cs308", name: "AP Computer Science A - Evening", subject: "Computer Science" },
  { id: "cs309", name: "AP Computer Science A - Summer", subject: "Computer Science" },
  { id: "cs310", name: "AP Computer Science A - Weekend", subject: "Computer Science" },
];

const sampleContent: Content[] = [
  {
    id: "1",
    title: "AP Computer Science A - Data Structures",
    description: "Comprehensive video series covering arrays, ArrayLists, and 2D arrays with practical Java implementations.",
    subject: "Computer Science",
    type: "video",
    creator: {
      name: "Prof. Maria Rodriguez",
      institution: "MIT",
      avatar: "/api/placeholder/32/32"
    },
    effectiveness: 94,
    rating: 4.8,
    reviewCount: 247,
    duration: "3h 45m",
    difficulty: "intermediate",
    tags: ["arrays", "data-structures", "java", "ap-cs"],
    isFavorite: false,
    isSelected: true,
    price: "free"
  },
  {
    id: "2", 
    title: "AP Computer Science A - Object-Oriented Programming",
    description: "Complete guide to classes, objects, inheritance, and polymorphism with real-world examples and practice problems.",
    subject: "Computer Science",
    type: "notes",
    creator: {
      name: "Dr. James Wilson",
      institution: "Stanford University"
    },
    effectiveness: 89,
    rating: 4.6,
    reviewCount: 156,
    difficulty: "intermediate",
    tags: ["oop", "classes", "inheritance", "java"],
    isFavorite: true,
    isSelected: false,
    price: "free"
  },
  {
    id: "3",
    title: "AP Computer Science A - Algorithm Analysis",
    description: "Interactive quiz series testing understanding of searching, sorting, and algorithm efficiency concepts.",
    subject: "Computer Science", 
    type: "quiz",
    creator: {
      name: "Ms. Sarah Chen",
      institution: "Princeton Academy"
    },
    effectiveness: 87,
    rating: 4.5,
    reviewCount: 98,
    difficulty: "advanced",
    tags: ["algorithms", "sorting", "searching", "big-o"],
    isFavorite: false,
    isSelected: true,
    price: "free"
  },
  {
    id: "4",
    title: "AP Computer Science A - Recursion Mastery",
    description: "Video lectures explaining recursive thinking with step-by-step problem solving and visualization.",
    subject: "Computer Science",
    type: "video", 
    creator: {
      name: "Prof. David Kim",
      institution: "Harvard University"
    },
    effectiveness: 92,
    rating: 4.7,
    reviewCount: 203,
    duration: "2h 30m",
    difficulty: "advanced",
    tags: ["recursion", "problem-solving", "java"],
    isFavorite: false,
    isSelected: false,
    price: 15
  },
  {
    id: "5",
    title: "AP Computer Science A - Unit Testing & Debugging",
    description: "Comprehensive notes on writing test cases, debugging strategies, and code optimization techniques.",
    subject: "Computer Science",
    type: "notes",
    creator: {
      name: "Dr. Lisa Park",
      institution: "University of Chicago"
    },
    effectiveness: 85,
    rating: 4.4,
    reviewCount: 134,
    difficulty: "intermediate",
    tags: ["testing", "debugging", "best-practices"],
    isFavorite: true,
    isSelected: false,
    price: "free"
  },
  {
    id: "6",
    title: "AP Computer Science A - ArrayList Methods",
    description: "Detailed video guide covering all ArrayList methods with practical coding examples and common use cases.",
    subject: "Computer Science",
    type: "video",
    creator: {
      name: "Dr. Jennifer Walsh",
      institution: "Columbia University"
    },
    effectiveness: 91,
    rating: 4.7,
    reviewCount: 189,
    duration: "1h 50m",
    difficulty: "beginner",
    tags: ["arraylist", "methods", "java", "collections"],
    isFavorite: false,
    isSelected: false,
    price: "free"
  },
  {
    id: "7",
    title: "AP Computer Science A - Conditional Logic Practice",
    description: "Interactive problem set focusing on if-statements, boolean logic, and decision-making in programming.",
    subject: "Computer Science",
    type: "quiz",
    creator: {
      name: "Mr. Robert Kim",
      institution: "Cal Tech"
    },
    effectiveness: 88,
    rating: 4.5,
    reviewCount: 156,
    difficulty: "beginner",
    tags: ["conditionals", "boolean", "logic", "java"],
    isFavorite: false,
    isSelected: false,
    price: "free"
  },
  {
    id: "8",
    title: "AP Computer Science A - Loop Structures",
    description: "Complete study notes covering for loops, while loops, and nested iterations with performance analysis.",
    subject: "Computer Science",
    type: "notes",
    creator: {
      name: "Prof. Amanda Chen",
      institution: "Berkeley"
    },
    effectiveness: 86,
    rating: 4.4,
    reviewCount: 201,
    difficulty: "intermediate",
    tags: ["loops", "iteration", "for-loops", "while-loops"],
    isFavorite: true,
    isSelected: false,
    price: "free"
  },
  {
    id: "9",
    title: "AP Computer Science A - String Manipulation",
    description: "Video series on String methods, substring operations, and character processing with real applications.",
    subject: "Computer Science",
    type: "video",
    creator: {
      name: "Dr. Michael Santos",
      institution: "Yale University"
    },
    effectiveness: 90,
    rating: 4.6,
    reviewCount: 173,
    duration: "2h 15m",
    difficulty: "intermediate",
    tags: ["strings", "methods", "substring", "java"],
    isFavorite: false,
    isSelected: false,
    price: 12
  },
  {
    id: "10",
    title: "AP Computer Science A - Final Exam Prep",
    description: "Comprehensive quiz pack covering all AP CS A topics with exam-style questions and detailed explanations.",
    subject: "Computer Science",
    type: "quiz",
    creator: {
      name: "Ms. Rachel Park",
      institution: "Nexus Academy"
    },
    effectiveness: 95,
    rating: 4.9,
    reviewCount: 312,
    difficulty: "advanced",
    tags: ["exam-prep", "comprehensive", "ap-cs", "review"],
    isFavorite: false,
    isSelected: false,
    price: 25
  }
];

export default function TeacherMarketplace() {
  const { toast } = useToast();
  const [content, setContent] = useState<Content[]>(sampleContent);
  const [courses] = useState<Course[]>(sampleCourses);
  const [selectedCourse, setSelectedCourse] = useState<string>("all-courses");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all-subjects");
  const [selectedType, setSelectedType] = useState<string>("all-types");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all-levels");
  const [sortBy, setSortBy] = useState<"effectiveness" | "rating" | "newest">("effectiveness");

  const subjects = [...new Set(content.map(c => c.subject))];
  
  const filteredContent = content
    .filter(c => {
      const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           c.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSubject = !selectedSubject || selectedSubject === "all-subjects" || c.subject === selectedSubject;
      const matchesType = !selectedType || selectedType === "all-types" || c.type === selectedType;
      const matchesDifficulty = !selectedDifficulty || selectedDifficulty === "all-levels" || c.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesSubject && matchesType && matchesDifficulty;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "effectiveness":
          return b.effectiveness - a.effectiveness;
        case "rating":
          return b.rating - a.rating;
        default:
          return b.effectiveness - a.effectiveness;
      }
    });

  const toggleFavorite = (id: string) => {
    setContent(prev => prev.map(c => 
      c.id === id ? { ...c, isFavorite: !c.isFavorite } : c
    ));
  };

  const toggleSelected = (id: string) => {
    if (!selectedCourse || selectedCourse === "all-courses") {
      toast({
        title: "No Course Selected",
        description: "Please select a course first before adding content.",
        variant: "destructive"
      });
      return;
    }

    const item = content.find(c => c.id === id);
    const courseName = courses.find(c => c.id === selectedCourse)?.name;
    
    setContent(prev => prev.map(c => 
      c.id === id ? { ...c, isSelected: !c.isSelected } : c
    ));
    
    if (item && courseName) {
      toast({
        title: item.isSelected ? "Content Removed" : "Content Added",
        description: item.isSelected 
          ? `Removed "${item.title}" from ${courseName}`
          : `Added "${item.title}" to ${courseName}`,
      });
    }
  };

  const getTypeIcon = (type: Content["type"]) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />;
      case "notes":
        return <BookOpen className="h-4 w-4" />;
      case "quiz":
        return <FileQuestion className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: Content["difficulty"]) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    }
  };

  const selectedCount = content.filter(c => c.isSelected).length;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground font-serif">Content Marketplace</h1>
          <p className="text-muted-foreground">
            Discover and select high-quality educational content from top institutions
          </p>
          {selectedCourse && selectedCourse !== "all-courses" && (
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="outline">
                Selected Course: {courses.find(c => c.id === selectedCourse)?.name}
              </Badge>
            </div>
          )}
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">
            {selectedCount} items selected for your course
          </div>
          <Button variant="outline" className="mt-2">
            Manage Selected Content
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <Card className="shadow-academic">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search content, topics, or creators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-courses">All Courses</SelectItem>
                {courses.map(course => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-subjects">All Subjects</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-types">All Types</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="notes">Notes</SelectItem>
                <SelectItem value="quiz">Quizzes</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-levels">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="effectiveness">Effectiveness</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredContent.map((item) => (
          <Card 
            key={item.id} 
            className={`shadow-elevated hover:shadow-lg transition-all duration-200 ${
              item.isSelected ? "ring-2 ring-primary" : ""
            }`}
          >
            <CardHeader className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(item.type)}
                  <Badge variant="outline" className={getDifficultyColor(item.difficulty)}>
                    {item.difficulty}
                  </Badge>
                  {item.price === "free" ? (
                    <Badge variant="secondary">Free</Badge>
                  ) : (
                    <Badge variant="outline">${item.price}</Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(item.id)}
                  className="p-1"
                >
                  <Heart className={`h-4 w-4 ${item.isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>

              <div>
                <CardTitle className="font-serif leading-tight">{item.title}</CardTitle>
                <CardDescription className="mt-2 line-clamp-2">{item.description}</CardDescription>
              </div>

              {/* Creator Info */}
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={item.creator.avatar} />
                  <AvatarFallback>{item.creator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">{item.creator.name}</p>
                  <p className="text-muted-foreground text-xs">{item.creator.institution}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0 space-y-4">
              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-lg font-bold text-primary">{item.effectiveness}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Effectiveness</p>
                </div>
                <div>
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-lg font-bold">{item.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.reviewCount} reviews</p>
                </div>
                {item.duration && (
                  <div>
                    <div className="text-lg font-bold">{item.duration}</div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {item.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {item.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{item.tags.length - 3} more
                  </Badge>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button
                  variant={item.isSelected ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => toggleSelected(item.id)}
                >
                  {item.isSelected ? "Selected" : "Select"}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => {
                    toast({
                      title: "Content Details",
                      description: `Viewing details for: ${item.title}`,
                    });
                  }}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContent.length === 0 && (
        <Card className="shadow-academic">
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <Search className="h-12 w-12 mx-auto text-muted-foreground" />
              <div>
                <h3 className="text-lg font-medium">No content found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSubject("all-subjects");
                  setSelectedType("all-types");
                  setSelectedDifficulty("all-levels");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}