import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, BookOpen, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { categories, getTermsByCategory, getAllTerms, searchTerms } from '@/data/medicalTerms';
import { saveProgress, getTermProgress } from '@/utils/storage';
import { toast } from 'sonner';

export const Study = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(categoryId || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [terms, setTerms] = useState([]);
  const [expandedTerm, setExpandedTerm] = useState(null);

  useEffect(() => {
    if (searchQuery) {
      setTerms(searchTerms(searchQuery));
    } else if (selectedCategory === 'all') {
      setTerms(getAllTerms());
    } else {
      setTerms(getTermsByCategory(selectedCategory));
    }
  }, [selectedCategory, searchQuery]);

  const handleMarkAsLearned = (termId) => {
    const progress = getTermProgress(termId);
    const newStatus = !progress.learned;
    saveProgress(termId, newStatus);
    toast.success(newStatus ? 'Terim öğrenildi olarak işaretlendi!' : 'Öğrenildi işareti kaldırıldı');
    setTerms([...terms]); // Force re-render
  };

  const getCategoryColor = (cat) => {
    const colors = {
      primary: 'bg-primary/10 text-primary border-primary/20',
      secondary: 'bg-secondary/10 text-secondary border-secondary/20',
      accent: 'bg-accent/10 text-accent border-accent/20',
      success: 'bg-success/10 text-success border-success/20'
    };
    return colors[cat] || colors.primary;
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ana Sayfaya Dön
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Tıbbi Terimler</h1>
          <p className="text-lg text-muted-foreground">Tüm terimleri incele, öğren ve öğrendiklerini işaretle</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Terim ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto">
            <TabsTrigger value="all" className="py-3">Tümü</TabsTrigger>
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id} className="py-3">
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Terms List */}
        <div className="grid gap-4">
          {terms.length === 0 ? (
            <Card className="p-12 text-center">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Terim bulunamadı</h3>
              <p className="text-muted-foreground">Arama kriterlerinizi değiştirmeyi deneyin</p>
            </Card>
          ) : (
            terms.map((term) => {
              const progress = getTermProgress(term.id);
              const category = categories.find(c => c.id === term.category);
              const isExpanded = expandedTerm === term.id;

              return (
                <Card 
                  key={term.id} 
                  className={`transition-all hover:shadow-lg ${
                    progress.learned ? 'border-success bg-success/5' : ''
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{term.term}</CardTitle>
                        <Badge variant="outline" className={getCategoryColor(category?.color)}>
                          {category?.name}
                        </Badge>
                      </div>
                      <Button
                        variant={progress.learned ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleMarkAsLearned(term.id)}
                        className={progress.learned ? 'bg-success hover:bg-success/90 !text-foreground' : '!text-foreground'}
                      >
                        {progress.learned ? '✓ Öğrenildi' : 'Öğrendim'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Türkçe:</div>
                      <div className="text-lg font-semibold text-secondary">{term.turkish}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Tanım:</div>
                      <div className="text-sm text-foreground/90 leading-relaxed">{term.definition}</div>
                    </div>
                    
                    {progress.reviewCount > 0 && (
                      <div className="text-xs text-muted-foreground pt-2 border-t">
                        📊 {progress.reviewCount} kez gözden geçirildi
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
