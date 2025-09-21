import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Video, FileText, Save, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export default function TeacherContentCreate() {
  const { toast } = useToast();
  const [contentType, setContentType] = useState<"video" | "notes" | "quiz">("video");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [unit, setUnit] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [notesContent, setNotesContent] = useState("");

  const addQuestion = () => {
    const newQuestion: Question = {
      id: `q_${Date.now()}`,
      question: "",
      options: ["", "", "", ""],
      correct: 0,
      explanation: ""
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleSave = () => {
    if (!title || !subject || !unit) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Content Saved",
      description: `Your ${contentType} content has been created successfully!`,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setUnit("");
    setQuestions([]);
    setVideoFile(null);
    setNotesContent("");
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground font-serif">Create Learning Content</h1>
          <p className="text-muted-foreground">Create videos, notes, and quizzes for your students</p>
        </div>
        <Button onClick={handleSave} className="shadow-academic">
          <Save className="mr-2 h-4 w-4" />
          Save Content
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="font-serif">Content Details</CardTitle>
              <CardDescription>Fill in the basic information about your content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Introduction to Loops"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="english">English Literature</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit *</Label>
                  <Input
                    id="unit"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="Unit 3: Control Structures"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what students will learn from this content..."
                  rows={3}
                />
              </div>

              {/* Content Type Tabs */}
              <Tabs value={contentType} onValueChange={(v) => setContentType(v as any)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="video" className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Video
                  </TabsTrigger>
                  <TabsTrigger value="notes" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Notes
                  </TabsTrigger>
                  <TabsTrigger value="quiz" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Quiz
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="video" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Video File</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      {videoFile ? (
                        <div className="space-y-2">
                          <Video className="h-8 w-8 mx-auto text-primary" />
                          <p className="text-sm font-medium">{videoFile.name}</p>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setVideoFile(null)}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload video or drag and drop
                          </p>
                          <input
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                            id="video-upload"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => document.getElementById('video-upload')?.click()}
                          >
                            Choose File
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="notes-content">Notes Content</Label>
                    <Textarea
                      id="notes-content"
                      value={notesContent}
                      onChange={(e) => setNotesContent(e.target.value)}
                      placeholder="Write your lesson notes here. You can include explanations, examples, and key concepts..."
                      rows={12}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="quiz" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Quiz Questions</h3>
                    <Button size="sm" onClick={addQuestion}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Question
                    </Button>
                  </div>

                  {questions.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No questions yet. Add your first question to get started.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {questions.map((question, index) => (
                        <Card key={question.id} className="border">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-4">
                              <h4 className="font-medium">Question {index + 1}</h4>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeQuestion(question.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <Label>Question</Label>
                                <Textarea
                                  value={question.question}
                                  onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                                  placeholder="Enter your question here..."
                                  rows={2}
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>Answer Options</Label>
                                {question.options.map((option, optIndex) => (
                                  <div key={optIndex} className="flex items-center space-x-2">
                                    <input
                                      type="radio"
                                      name={`correct-${question.id}`}
                                      checked={question.correct === optIndex}
                                      onChange={() => updateQuestion(question.id, 'correct', optIndex)}
                                    />
                                    <Input
                                      value={option}
                                      onChange={(e) => {
                                        const newOptions = [...question.options];
                                        newOptions[optIndex] = e.target.value;
                                        updateQuestion(question.id, 'options', newOptions);
                                      }}
                                      placeholder={`Option ${optIndex + 1}`}
                                    />
                                  </div>
                                ))}
                              </div>

                              <div>
                                <Label>Explanation</Label>
                                <Textarea
                                  value={question.explanation}
                                  onChange={(e) => updateQuestion(question.id, 'explanation', e.target.value)}
                                  placeholder="Explain why this is the correct answer..."
                                  rows={2}
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Preview/Info Panel */}
        <div>
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="font-serif">Content Preview</CardTitle>
              <CardDescription>How your content will appear to students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {title && (
                <div>
                  <h3 className="font-medium text-lg">{title}</h3>
                  {subject && <Badge variant="secondary" className="mt-1">{subject}</Badge>}
                </div>
              )}

              {unit && (
                <div>
                  <p className="text-sm text-muted-foreground">Unit</p>
                  <p className="font-medium">{unit}</p>
                </div>
              )}

              {difficulty && (
                <div>
                  <p className="text-sm text-muted-foreground">Difficulty</p>
                  <Badge variant="outline">{difficulty}</Badge>
                </div>
              )}

              {description && (
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="text-sm">{description}</p>
                </div>
              )}

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">Content Type</p>
                <div className="flex items-center space-x-2 mt-1">
                  {contentType === "video" && <Video className="h-4 w-4" />}
                  {contentType === "notes" && <FileText className="h-4 w-4" />}
                  {contentType === "quiz" && <FileText className="h-4 w-4" />}
                  <span className="capitalize font-medium">{contentType}</span>
                </div>
              </div>

              {contentType === "quiz" && (
                <div>
                  <p className="text-sm text-muted-foreground">Questions</p>
                  <p className="font-medium">{questions.length} questions</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}