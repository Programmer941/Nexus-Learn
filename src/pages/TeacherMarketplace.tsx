import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star, Search, Filter, Play, BookOpen, FileQuestion, Download, Heart, TrendingUp, Award, Info, Check } from "lucide-react";
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
  price: number;
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
    title: "AP Computer Science A",
    description: "Comprehensive course covering all AP CS A topics including object-oriented programming, data structures, algorithms, and problem-solving techniques. Includes video lectures, practice problems, and exam preparation materials.",
    subject: "Computer Science",
    type: "video",
    creator: {
      name: "Prof. Maria Rodriguez",
      institution: "EduTech Publishers",
      avatar: "/api/placeholder/32/32"
    },
    effectiveness: 94,
    rating: 4.8,
    reviewCount: 347,
    duration: "45h 30m",
    difficulty: "intermediate",
    tags: ["complete-course", "ap-exam-prep", "java", "oop", "data-structures"],
    isFavorite: false,
    isSelected: false,
    price: 299
  },
  {
    id: "2", 
    title: "AP Computer Science A",
    description: "Interactive AP Computer Science A course with hands-on coding exercises, real-world projects, and comprehensive assessments. Perfect for students preparing for the AP exam with step-by-step guidance.",
    subject: "Computer Science",
    type: "notes",
    creator: {
      name: "Dr. James Wilson",
      institution: "CodeCraft Education"
    },
    effectiveness: 89,
    rating: 4.6,
    reviewCount: 256,
    difficulty: "intermediate",
    tags: ["interactive", "projects", "assessments", "java", "ap-prep"],
    isFavorite: false,
    isSelected: false,
    price: 249
  },
  {
    id: "3",
    title: "AP Computer Science A",
    description: "Gamified learning experience for AP Computer Science A with achievement badges, progress tracking, and adaptive learning paths. Makes coding fun while ensuring thorough exam preparation.",
    subject: "Computer Science", 
    type: "quiz",
    creator: {
      name: "Ms. Sarah Chen",
      institution: "GameLearn Studios"
    },
    effectiveness: 87,
    rating: 4.5,
    reviewCount: 198,
    difficulty: "beginner",
    tags: ["gamified", "adaptive-learning", "badges", "fun", "beginner-friendly"],
    isFavorite: false,
    isSelected: false,
    price: 199
  },
  {
    id: "4",
    title: "AP Computer Science A",
    description: "Premium AP Computer Science A course from top university professors. Features advanced problem-solving techniques, algorithm optimization, and college-level programming concepts.",
    subject: "Computer Science",
    type: "video", 
    creator: {
      name: "Prof. David Kim",
      institution: "Academic Elite"
    },
    effectiveness: 96,
    rating: 4.9,
    reviewCount: 403,
    duration: "52h 15m",
    difficulty: "advanced",
    tags: ["premium", "university-level", "advanced", "optimization", "elite"],
    isFavorite: false,
    isSelected: false,
    price: 399
  },
  {
    id: "5",
    title: "AP Computer Science A",
    description: "Budget-friendly AP Computer Science A course with all essential topics covered. No-frills approach focusing on core concepts and exam success without breaking the bank.",
    subject: "Computer Science",
    type: "notes",
    creator: {
      name: "Dr. Lisa Park",
      institution: "BudgetLearn"
    },
    effectiveness: 85,
    rating: 4.4,
    reviewCount: 334,
    difficulty: "intermediate",
    tags: ["budget-friendly", "essential", "core-concepts", "affordable", "exam-focused"],
    isFavorite: false,
    isSelected: false,
    price: 99
  },
  {
    id: "6",
    title: "AP Computer Science A",
    description: "Visual learning AP Computer Science A course with animations, diagrams, and interactive visualizations. Perfect for visual learners who need to see concepts in action.",
    subject: "Computer Science",
    type: "video",
    creator: {
      name: "Dr. Jennifer Walsh",
      institution: "Visual Learning Co."
    },
    effectiveness: 91,
    rating: 4.7,
    reviewCount: 289,
    duration: "38h 45m",
    difficulty: "beginner",
    tags: ["visual-learning", "animations", "diagrams", "interactive", "visual-learners"],
    isFavorite: false,
    isSelected: false,
    price: 229
  },
  {
    id: "7",
    title: "AP Computer Science A",
    description: "Fast-track AP Computer Science A course designed for accelerated learning. Intensive curriculum that covers all topics in half the time while maintaining quality and depth.",
    subject: "Computer Science",
    type: "quiz",
    creator: {
      name: "Mr. Robert Kim",
      institution: "FastTrack Education"
    },
    effectiveness: 88,
    rating: 4.5,
    reviewCount: 156,
    difficulty: "advanced",
    tags: ["fast-track", "accelerated", "intensive", "time-efficient", "quick-learning"],
    isFavorite: false,
    isSelected: false,
    price: 349
  },
  {
    id: "8",
    title: "AP Computer Science A",
    description: "Self-paced AP Computer Science A course with flexible scheduling and personalized learning paths. Study at your own speed with comprehensive support materials.",
    subject: "Computer Science",
    type: "notes",
    creator: {
      name: "Prof. Amanda Chen",
      institution: "FlexiLearn"
    },
    effectiveness: 86,
    rating: 4.4,
    reviewCount: 201,
    difficulty: "intermediate",
    tags: ["self-paced", "flexible", "personalized", "comprehensive", "support"],
    isFavorite: false,
    isSelected: false,
    price: 179
  },
  {
    id: "9",
    title: "AP Computer Science A",
    description: "Project-based AP Computer Science A course where students build real applications while learning. Combines theory with practical experience through hands-on development.",
    subject: "Computer Science",
    type: "video",
    creator: {
      name: "Dr. Michael Santos",
      institution: "ProjectBased Learning"
    },
    effectiveness: 93,
    rating: 4.8,
    reviewCount: 273,
    duration: "48h 20m",
    difficulty: "intermediate",
    tags: ["project-based", "real-applications", "hands-on", "practical", "development"],
    isFavorite: false,
    isSelected: false,
    price: 279
  },
  {
    id: "10",
    title: "AP Computer Science A",
    description: "Official AP Computer Science A course with College Board alignment and guaranteed exam preparation. Includes official practice tests and certified instructor support.",
    subject: "Computer Science",
    type: "quiz",
    creator: {
      name: "Ms. Rachel Park",
      institution: "Official AP Prep"
    },
    effectiveness: 95,
    rating: 4.9,
    reviewCount: 512,
    difficulty: "intermediate",
    tags: ["official", "college-board", "certified", "guaranteed", "practice-tests"],
    isFavorite: false,
    isSelected: false,
    price: 329
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
  const [selectedCourseDetail, setSelectedCourseDetail] = useState<Content | null>(null);

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
                  {item.price === 0 ? (
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
                  {item.isSelected ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Selected
                    </>
                  ) : (
                    "Select Course"
                  )}
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setSelectedCourseDetail(item)}
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center space-x-2">
                        {getTypeIcon(item.type)}
                        <span>{item.title}</span>
                        <Badge variant="outline" className={getDifficultyColor(item.difficulty)}>
                          {item.difficulty}
                        </Badge>
                      </DialogTitle>
                      <DialogDescription>
                        by {item.creator.name} at {item.creator.institution}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6">
                      {/* Detailed Description */}
                      <div>
                        <h4 className="font-semibold mb-2">Course Description</h4>
                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>

                      {/* Course Metrics */}
                      <div className="grid grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1 mb-1">
                            <TrendingUp className="h-5 w-5 text-primary" />
                            <span className="text-2xl font-bold text-primary">{item.effectiveness}%</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Student Success Rate</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1 mb-1">
                            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                            <span className="text-2xl font-bold">{item.rating}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.reviewCount} reviews</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold mb-1">
                            {item.price === 0 ? "Free" : `$${item.price}`}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {item.duration || "Self-paced"}
                          </p>
                        </div>
                      </div>

                      {/* Tags */}
                      <div>
                        <h4 className="font-semibold mb-2">Course Features</h4>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map(tag => (
                            <Badge key={tag} variant="outline">
                              {tag.replace('-', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3 pt-4">
                        <Button
                          variant={item.isSelected ? "default" : "outline"}
                          className="flex-1"
                          onClick={() => {
                            toggleSelected(item.id);
                          }}
                        >
                          {item.isSelected ? (
                            <>
                              <Check className="h-4 w-4 mr-2" />
                              Selected for Course
                            </>
                          ) : (
                            "Select This Course"
                          )}
                        </Button>
                        <Button variant="outline" onClick={() => toggleFavorite(item.id)}>
                          <Heart className={`h-4 w-4 ${item.isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
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