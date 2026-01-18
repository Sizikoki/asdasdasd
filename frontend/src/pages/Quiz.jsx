import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, Trophy, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { getRandomTerms } from '@/data/medicalTerms';
import { saveQuizScore, updateStreak } from '@/utils/storage';
import { toast } from 'sonner';

export const Quiz = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryId = searchParams.get('category');
  
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    initializeQuiz();
    updateStreak();
  }, [categoryId]);

  const initializeQuiz = () => {
    const terms = getRandomTerms(10, categoryId);
    const quizQuestions = terms.map((term, index) => {
      const allTerms = getRandomTerms(100, categoryId);
      const wrongAnswers = allTerms
        .filter(t => t.id !== term.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(t => t.turkish);
      
      const options = [term.turkish, ...wrongAnswers].sort(() => Math.random() - 0.5);
      
      return {
        id: index,
        term: term.term,
        correctAnswer: term.turkish,
        options: options,
        roots: term.roots,
        definition: term.definition
      };
    });
    
    setQuestions(quizQuestions);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setQuizComplete(false);
  };

  const handleAnswerSelect = (answer) => {
    if (!showResult) {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmit = () => {
    if (!selectedAnswer) {
      toast.error('Lütfen bir cevap seçin');
      return;
    }
    
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    setShowResult(true);
    
    const newAnswers = [...answers, {
      questionId: currentQuestion,
      selectedAnswer,
      isCorrect
    }];
    setAnswers(newAnswers);
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz complete
      setQuizComplete(true);
      saveQuizScore(categoryId || 'all', score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0), questions.length);
    }
  };

  if (questions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const percentage = Math.round((score / questions.length) * 100);

  if (quizComplete) {
    return (
      <div className="min-h-screen bg-muted/30 py-8 flex items-center justify-center">
        <Card className="max-w-2xl w-full mx-4 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
              percentage >= 80 ? 'bg-gradient-to-br from-success to-secondary' :
              percentage >= 60 ? 'bg-gradient-to-br from-primary to-accent' :
              'bg-gradient-to-br from-accent to-destructive'
            }`}>
              <Trophy className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold mb-2">Quiz Tamamlandı!</h2>
            <p className="text-lg text-muted-foreground mb-6">
              {percentage >= 80 ? 'Mükemmel!' : percentage >= 60 ? 'İyi çalıştın!' : 'Pratik yapmaya devam et!'}
            </p>
            
            <div className="mb-8">
              <div className="text-6xl font-bold text-primary mb-2">{score}/{questions.length}</div>
              <div className="text-xl text-muted-foreground">Doğru Cevap (%{percentage})</div>
            </div>
            
            {/* Answer Review */}
            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {questions.map((q, index) => {
                const answer = answers.find(a => a.questionId === index);
                return (
                  <div key={index} className={`p-3 rounded-lg border text-left ${
                    answer?.isCorrect ? 'bg-success/10 border-success' : 'bg-destructive/10 border-destructive'
                  }`}>
                    <div className="flex items-start gap-2">
                      {answer?.isCorrect ? 
                        <Check className="w-5 h-5 text-success mt-0.5" /> : 
                        <X className="w-5 h-5 text-destructive mt-0.5" />
                      }
                      <div className="flex-1">
                        <div className="font-semibold">{q.term}</div>
                        <div className="text-sm text-muted-foreground">Doğru: {q.correctAnswer}</div>
                        {!answer?.isCorrect && (
                          <div className="text-sm text-destructive">Senin cevabın: {answer?.selectedAnswer}</div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" onClick={initializeQuiz} className="flex-1">
                <RotateCw className="w-4 h-4 mr-2" />
                Tekrar Oyna
              </Button>
              <Button onClick={() => navigate('/games')} className="flex-1 gradient-primary">
                Oyunları Gör
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/games')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Oyunlara Dön
          </Button>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Quiz</h1>
              <p className="text-muted-foreground">Soru {currentQuestion + 1} / {questions.length}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{score}</div>
              <div className="text-sm text-muted-foreground">Puan</div>
            </div>
          </div>
          
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-6 shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <div className="mb-6">
              <div className="text-sm font-medium text-muted-foreground mb-2">Bu terimin Türkçe karşılığı nedir?</div>
              <h2 className="text-3xl sm:text-4xl font-bold">{question.term}</h2>
              {question.roots && (
                <div className="mt-3 text-sm bg-accent/10 px-3 py-2 rounded-lg border border-accent/20 inline-block">
                  {question.roots}
                </div>
              )}
            </div>
            
            <RadioGroup value={selectedAnswer || ''} onValueChange={handleAnswerSelect}>
              <div className="space-y-3">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === question.correctAnswer;
                  const showCorrect = showResult && isCorrect;
                  const showWrong = showResult && isSelected && !isCorrect;
                  
                  return (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        showCorrect ? 'bg-success/10 border-success' :
                        showWrong ? 'bg-destructive/10 border-destructive' :
                        isSelected ? 'bg-primary/10 border-primary' :
                        'border-border hover:border-primary/50 hover:bg-muted'
                      }`}
                      onClick={() => !showResult && handleAnswerSelect(option)}
                    >
                      <RadioGroupItem value={option} id={`option-${index}`} disabled={showResult} />
                      <Label 
                        htmlFor={`option-${index}`} 
                        className="flex-1 cursor-pointer font-medium"
                      >
                        {option}
                      </Label>
                      {showCorrect && <Check className="w-5 h-5 text-success" />}
                      {showWrong && <X className="w-5 h-5 text-destructive" />}
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
            
            {showResult && (
              <div className={`mt-6 p-4 rounded-lg ${
                selectedAnswer === question.correctAnswer ? 'bg-success/10 border border-success' : 'bg-destructive/10 border border-destructive'
              }`}>
                <div className="flex items-start gap-3">
                  {selectedAnswer === question.correctAnswer ? 
                    <Check className="w-6 h-6 text-success mt-0.5" /> : 
                    <X className="w-6 h-6 text-destructive mt-0.5" />
                  }
                  <div>
                    <div className="font-semibold mb-1">
                      {selectedAnswer === question.correctAnswer ? 'Doğru!' : 'Yanlış!'}
                    </div>
                    <div className="text-sm text-muted-foreground">{question.definition}</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          {!showResult ? (
            <Button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="w-full h-14 text-lg gradient-primary"
            >
              Cevabı Kontrol Et
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="w-full h-14 text-lg gradient-primary"
            >
              {currentQuestion < questions.length - 1 ? 'Sonraki Soru' : 'Sonuçları Gör'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};