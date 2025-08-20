import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import UpcomingCard from '@/components/UpcomingCard';
import Footer from '@/components/Footer';
import { useUpcomingContent } from '@/hooks/useUpcomingContent';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CONTENT_LIMITS, calculatePagination, getLatestContent } from '@/utils/paginationUtils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Send, X, Loader2, Clock } from 'lucide-react';
import { useCreateContentDemand } from '@/hooks/useContentDemands';
import { useToast } from '@/hooks/use-toast';

const Upcoming = () => {
  const navigate = useNavigate();
  const { data: upcomingContent, isLoading, error } = useUpcomingContent();
  const [showSuggestionForm, setShowSuggestionForm] = useState(false);
  const [suggestionData, setSuggestionData] = useState({
    title: '',
    type: '',
    description: ''
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Sort content by newest first and calculate pagination
  const sortedContents = useMemo(() => 
    getLatestContent(upcomingContent || []), 
    [upcomingContent]
  );

  const pagination = useMemo(() => 
    calculatePagination(sortedContents.length, currentPage, CONTENT_LIMITS.SEE_MORE_PAGE),
    [sortedContents.length, currentPage]
  );

  const paginatedContents = useMemo(() => 
    sortedContents.slice(pagination.startIndex, pagination.endIndex),
    [sortedContents, pagination.startIndex, pagination.endIndex]
  );

  const createDemandMutation = useCreateContentDemand();
  const { toast } = useToast();

  const handleSuggestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting content suggestion:', suggestionData);

    try {
      await createDemandMutation.mutateAsync({
        title: suggestionData.title,
        content_type: suggestionData.type as 'Movie' | 'Web Series' | 'Show',
        description: suggestionData.description || undefined,
      });

      toast({
        title: "Request Submitted!",
        description: "Your content request has been submitted successfully.",
      });

      setSuggestionData({ title: '', type: '', description: '' });
      setShowSuggestionForm(false);
    } catch (error: any) {
      console.error('Error submitting suggestion:', error);

      // Check if it's the 30-minute restriction error
      if (error.message && error.message.includes('30 minutes')) {
        toast({
          title: "Too Many Requests",
          description: "You can only make one request every 30 minutes. Please try again later.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to submit your request. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleCancel = () => {
    setSuggestionData({ title: '', type: '', description: '' });
    setShowSuggestionForm(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-20">
          <div className="container mx-auto px-6 py-8">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <div className="text-lg text-primary">
                  Loading...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Error loading upcoming content:', error);
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-[50vh]">
          <p className="text-foreground">Error loading upcoming content. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="pt-20">
        <div className="container mx-auto px-6 py-8 min-h-[80vh]">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-lg font-thin text-foreground text-left uppercase tracking-[0.2em]" style={{ fontFamily: 'serif' }}>
              Upcoming Releases
            </h1>

            <Button
              onClick={() => setShowSuggestionForm(true)}
              variant="outline"
              size="sm"
              className="bg-transparent border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Suggest Content
            </Button>
          </div>

          {showSuggestionForm && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
              <div 
                className="absolute inset-0"
                onClick={handleCancel}
              />
              <Card className="relative bg-gradient-to-br from-card/95 via-card/90 to-card/95 backdrop-blur-lg border border-primary/30 shadow-2xl shadow-primary/10 max-w-2xl w-[95vw] mx-4 max-h-[90vh] overflow-y-auto z-[10000]">
                <CardHeader className="border-b border-primary/20 bg-gradient-to-r from-primary/5 to-transparent p-3 sm:p-6">
                  <CardTitle className="text-foreground flex items-center justify-between">
                    <span className="text-primary text-sm sm:text-base">Request Content</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCancel}
                      className="h-6 w-6 sm:h-8 sm:w-8 p-0 hover:bg-primary/20 hover:text-primary transition-all duration-200"
                    >
                      <X className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </CardTitle>
                  <div className="text-xs sm:text-sm text-muted-foreground flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                      <span>Can't find what you're looking for? Let us know what content you'd like to see added to our platform.</span>
                    </div>
                    <span className="text-amber-400 text-xs sm:text-sm">Note: Only one request per 30 minutes is allowed.</span>
                  </div>
                </CardHeader>
                <CardContent className="p-3 sm:p-6 bg-gradient-to-br from-black/60 via-[#0A7D4B]/15 to-black/60 backdrop-blur-sm relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0A7D4B]/8 to-transparent opacity-70"></div>
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0A7D4B]/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0A7D4B]/30 to-transparent"></div>
                  <div className="relative z-10">
                    <form onSubmit={handleSuggestionSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="space-y-1 sm:space-y-2">
                        <Label htmlFor="suggestion-title" className="text-foreground text-xs sm:text-sm">Content Title *</Label>
                        <Input
                          id="suggestion-title"
                          value={suggestionData.title}
                          onChange={(e) => setSuggestionData(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Enter the title of content you want"
                          className="bg-background/50 border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200 h-8 sm:h-10 text-xs sm:text-sm"
                          required
                          disabled={createDemandMutation.isPending}
                        />
                      </div>

                      <div className="space-y-1 sm:space-y-2 relative z-[10001]">
                        <Label htmlFor="suggestion-type" className="text-foreground text-xs sm:text-sm">Content Type *</Label>
                        <Select 
                          value={suggestionData.type} 
                          onValueChange={(value) => setSuggestionData(prev => ({ ...prev, type: value }))}
                          disabled={createDemandMutation.isPending}
                        >
                          <SelectTrigger className="bg-background/50 border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200 h-8 sm:h-10 text-xs sm:text-sm relative z-[10001]">
                            <SelectValue placeholder="Select content type" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border border-primary/30 shadow-2xl z-[10002]">
                            <SelectItem value="Movie" className="focus:bg-primary/20 focus:text-primary">Movie</SelectItem>
                            <SelectItem value="Web Series" className="focus:bg-primary/20 focus:text-primary">Web Series</SelectItem>
                            <SelectItem value="Show" className="focus:bg-primary/20 focus:text-primary">Show</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="suggestion-description" className="text-foreground text-xs sm:text-sm">Additional Details (Max 1000 characters) *</Label>
                      <Textarea
                        id="suggestion-description"
                        value={suggestionData.description}
                        onChange={(e) => {
                          if (e.target.value.length <= 1000) {
                            setSuggestionData(prev => ({ ...prev, description: e.target.value }));
                          }
                        }}
                        placeholder="Tell us more about why you want this content..."
                        className="bg-background/50 border-primary/30 focus:border-primary focus:ring-1 focus:ring-primary/20 min-h-[100px] sm:min-h-[120px] transition-all duration-200 text-xs sm:text-sm"
                        disabled={createDemandMutation.isPending}
                        required
                      />
                      <div className="text-xs sm:text-sm text-muted-foreground flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <span>Characters: <span className="text-primary">{suggestionData.description.length}</span>/1000</span>
                        {suggestionData.description.length > 900 && (
                          <span className="text-amber-400 text-xs">Approaching limit</span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-3 sm:pt-4 border-t border-border/30">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleCancel}
                        className="w-full sm:w-auto bg-background/50 border-border/50 hover:bg-background/70 hover:scale-105 transition-all duration-200 h-8 sm:h-10 text-xs sm:text-sm"
                        disabled={createDemandMutation.isPending}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit"
                        className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 h-8 sm:h-10 text-xs sm:text-sm"
                        disabled={createDemandMutation.isPending}
                      >
                        {createDemandMutation.isPending ? (
                          <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                        ) : (
                          <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                        )}
                        Submit Request
                      </Button>
                    </div>
                  </form>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="flex flex-col items-center space-y-4">
            {paginatedContents.map((content, index) => (
                <UpcomingCard
                  key={`${content.id}-${content.content_order}`}
                  id={content.id}
                  title={content.title}
                  description={content.description || ''}
                  image={content.image || '/placeholder.svg'}
                  thumbnail_url={content.thumbnail_url}
                  releaseDate={new Date(content.release_date)}
                  contentOrder={content.content_order}
                  priorityPosition={index + 1}
                  content_type={content.content_type}
                  trailer_url={content.trailer_url}
                  genre={content.genre}
                  cast_members={content.cast_members}
                  directors={content.directors}
                  writers={content.writers}
                  rating_type={content.rating_type}
                  created_at={content.created_at}
                />
              ))
            }
          </div>

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-end space-x-4 mt-8">
              <div className="text-sm text-muted-foreground">
                Showing {pagination.startIndex + 1} to {pagination.endIndex} of {sortedContents.length} items
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => {
                    try {
                      if (window.history.length > 1) {
                        navigate(-1);
                      } else {
                        navigate('/');
                      }
                    } catch (error) {
                      console.warn('Navigation fallback to home:', error);
                      navigate('/');
                    }
                  }}
                  variant="outline"
                  size="sm"
                  className="bg-transparent border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <span className="text-sm text-foreground font-medium px-3 py-1 bg-primary/10 border border-primary/30 rounded">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <Button
                  onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                  disabled={!pagination.hasNextPage}
                  variant="outline"
                  size="sm"
                  className="bg-transparent border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Upcoming;