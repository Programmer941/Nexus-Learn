import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { sampleQuizzes } from "@/data/sampleQuizzes";

export default function Quiz() {
  const { quizId } = useParams();
  
  // Try to find quiz in sampleQuizzes first, then fallback to the old structure
  const quiz = quizId && Object.values(sampleQuizzes).find(q => q.id === quizId) || 
               (quizId && Object.values(sampleQuizzes)[0]); // Default to first quiz if no exact match
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(quiz?.timeLimit ? quiz.timeLimit * 60 : 1800); // 30 minutes in seconds
  const [showResults, setShowResults] = useState(false);

  if (!quiz) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Quiz Not Found</h1>
          <Link to="/classes">
            <Button className="mt-4">Back to Classes</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setIsCompleted(true);
    setShowResults(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateScore = () => {
    if (answers.length === 0) return 0;
    const correct = answers.filter((answer, index) => answer === quiz.questions[index].correct).length;
    return Math.round((correct / quiz.questions.length) * 100);
  };

  const currentQ = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            {score >= 70 ? (
              <CheckCircle className="w-10 h-10 text-primary" />
            ) : (
              <XCircle className="w-10 h-10 text-destructive" />
            )}
          </div>
          <h1 className="text-3xl font-bold font-serif">Quiz Completed!</h1>
          <p className="text-muted-foreground">Here are your results for {quiz.title}</p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-elevated">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-primary">{score}%</CardTitle>
            <CardDescription>
              You answered {answers.filter((answer, index) => answer === quiz.questions[index].correct).length} 
              out of {quiz.questions.length} questions correctly
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {quiz.questions.map((question, index) => (
                <div key={question.id} className="p-4 rounded-lg bg-muted/20">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center mt-1">
                      {answers[index] === question.correct ? (
                        <CheckCircle className="w-5 h-5 text-primary" />
                      ) : (
                        <XCircle className="w-5 h-5 text-destructive" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-2">{question.question}</p>
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Your answer:</strong> {question.options[answers[index]] || "Not answered"}
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Correct answer:</strong> {question.options[question.correct]}
                      </p>
                      <p className="text-sm text-accent-foreground bg-accent/20 p-2 rounded">
                        <strong>Explanation:</strong> {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center space-x-4">
              <Link to="/classes">
                <Button variant="outline">Back to Classes</Button>
              </Link>
              <Button onClick={() => window.location.reload()}>Retake Quiz</Button>
            </div>
          </CardContent>
        </Card>
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
          <span>Quizzes</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-serif">{quiz.title}</h1>
            <p className="text-muted-foreground">Test your knowledge in {quiz.class}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-lg font-mono">
              <Clock className="w-5 h-5" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
            <Badge variant="outline">Question {currentQuestion + 1} of {quiz.questions.length}</Badge>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      </div>

      {/* Question Card */}
      <Card className="max-w-4xl mx-auto shadow-elevated">
        <CardHeader>
          <CardTitle className="text-xl font-serif">
            Question {currentQuestion + 1}
          </CardTitle>
          <CardDescription className="text-lg">
            {currentQ.question}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <RadioGroup
            value={answers[currentQuestion]?.toString()}
            onValueChange={(value) => handleAnswerSelect(currentQuestion, parseInt(value))}
          >
            {currentQ.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/20 transition-colors">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="text-sm text-muted-foreground">
              {answers.filter(a => a !== undefined).length} of {quiz.questions.length} answered
            </div>

            {currentQuestion === quiz.questions.length - 1 ? (
              <Button
                onClick={handleSubmit}
                disabled={answers[currentQuestion] === undefined}
                className="bg-primary"
              >
                Submit Quiz
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={answers[currentQuestion] === undefined}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Question Navigation */}
      <Card className="max-w-4xl mx-auto shadow-academic">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {quiz.questions.map((_, index) => (
              <Button
                key={index}
                variant={currentQuestion === index ? "default" : answers[index] !== undefined ? "secondary" : "outline"}
                size="sm"
                onClick={() => setCurrentQuestion(index)}
                className="w-10 h-10"
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}