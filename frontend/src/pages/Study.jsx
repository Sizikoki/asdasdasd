import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Search, BookOpen, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { bodySystems, subcategoriesBySystem, getTermsBySystem, getTermsBySubcategory, searchTerms } from '@/data/medicalTerms';
import { saveProgress, getTermProgress } from '@/utils/storage';
import { toast } from 'sonner';

export const Study = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const systemParam = searchParams.get('system') || 'movement';

  const [selectedSystem, setSelectedSystem] = useState(systemParam);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTerms, setFilteredTerms] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      setFilteredTerms(searchTerms(searchQuery));
    } else {
      setFilteredTerms(getTermsBySystem(selectedSystem));
    }
  }, [selectedSystem, searchQuery]);

  const handleMarkAsLearned = (termId) => {
    const progress = getTermProgress(termId);
    const newStatus = !progress.learned;
    saveProgress(termId, newStatus);
    toast.success(newStatus ? 'Terim öğrenildi olarak işaretlendi!' : 'Öğrenildi işareti kaldırıldı');
    setFilteredTerms([...filteredTerms]); // Force re-render
  };

  const handleSystemChange = (systemId) => {
    setSelectedSystem(systemId);
    setSearchQuery('');
  };

  // Group terms by subcategory
  const groupedTerms = {};
  const subcategories = subcategoriesBySystem[selectedSystem] || [];

  subcategories.forEach(subcat => {
    const terms = searchQuery
      ? filteredTerms.filter(t => t.system === selectedSystem && t.subcategory === subcat.id)
      : getTermsBySubcategory(selectedSystem, subcat.id);
    if (terms.length > 0) {
      groupedTerms[subcat.id] = {
        name: subcat.name,
        terms: terms
      };
    }
  });

  const currentSystem = bodySystems.find(s => s.id === selectedSystem);

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-background border-r border-border flex-shrink-0">
        <div className="p-4 border-b border-border">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Ana Sayfaya Dön
          </Link>
          <h2 className="text-lg font-semibold mt-2">Sistemler</h2>
        </div>
        <div className="p-2">
          {bodySystems.map((system) => (
            <button
              key={system.id}
              onClick={() => handleSystemChange(system.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${selectedSystem === system.id
                ? 'bg-primary text-primary-foreground font-medium'
                : 'text-foreground hover:bg-muted'
                }`}
            >
              {system.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold">Tıbbi Terimler</h1>
                <p className="text-muted-foreground mt-1">
                  Sistemlere göre terimleri incele, öğren ve öğrendiklerini işaretle
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigate('/roots')}
                  className="flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Kökler
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/prefixes')}
                  className="flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Ön Ekler
                </Button>
              </div>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Terim, anlam veya kategori ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Terms by Subcategory */}
          {Object.keys(groupedTerms).length === 0 ? (
            <Card className="p-12 text-center">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Terim bulunamadı</h3>
              <p className="text-muted-foreground">
                {searchQuery ? 'Arama kriterlerinizi değiştirmeyi deneyin' : 'Bu sistemde henüz terim bulunmuyor'}
              </p>
            </Card>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedTerms).map(([subcatId, subcatData]) => (
                <div key={subcatId}>
                  {/* Subcategory Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-2xl font-bold">{subcatData.name}</h2>
                    <Badge variant="secondary" className="text-sm">
                      {subcatData.terms.length} terim
                    </Badge>
                  </div>

                  {/* Terms Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subcatData.terms.map((term) => {
                      const progress = getTermProgress(term.id);
                      return (
                        <Card
                          key={term.id}
                          className={`transition-all hover:shadow-md ${progress.learned ? 'border-success bg-success/5' : ''
                            }`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h3 className="font-bold text-lg mb-1">{term.term}</h3>
                                <p className="text-sm text-muted-foreground">{term.turkish}</p>
                              </div>
                            </div>
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleMarkAsLearned(term.id)}
                              className={`w-full mt-3 font-semibold ${progress.learned
                                  ? 'bg-green-600 hover:bg-green-700 text-white'
                                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                            >
                              {progress.learned ? '✓ Öğrenildi' : 'Öğrendim'}
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
