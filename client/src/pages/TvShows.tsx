import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import HorizontalSection from '@/components/HorizontalSection';
import Footer from '@/components/Footer';
import { useAllContent, useContentByFeature, useContentByGenre } from '@/hooks/useContentQueries';
import { Loader2 } from 'lucide-react';

const TvShows = () => {
  const navigate = useNavigate();

  // Fetch all content
  const { data: allContent, isLoading: isLoadingAll } = useAllContent();

  // Fetch content by features for shows
  const { data: heroContent } = useContentByFeature('Home Hero');
  const { data: newReleaseContent } = useContentByFeature('Home New Release');
  const { data: popularContent } = useContentByFeature('Home Popular');
  const { data: entertainmentContent } = useContentByFeature('Entertainment');
  const { data: fictionalContent } = useContentByFeature('Fictional');

  // Fetch content by genre
  const { data: dramaContent } = useContentByGenre('Drama');

  const isLoading = isLoadingAll;

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

  // Transform show content for display
  const transformShowContent = (content: any) => {
    return {
      id: content.id,
      content_id: content.content_id || content.show?.content_id || content.show?.id,
      title: content.title || content.show?.title,
      rating: content.show?.rating_type || 'TV-PG',
      score: content.show?.rating?.toString() || '8.0',
      image: content.show?.thumbnail_url || '',
      year: content.show?.release_year?.toString() || content.created_at?.split('-')[0],
      description: content.show?.description || content.description,
      type: 'show',
      videoUrl: content.show?.trailer_url,
      originalData: content,
      // Add essential fields for details page
      content_type: 'Show',
      show: content.show,
      genre: content.genre
    };
  };

  // Get shows from all content with specific feature
  const getShowsByFeature = (feature: string) => {
    if (!allContent?.shows) return [];

    return allContent.shows
      .filter(content => 
        content.content_type === 'Show' && 
        content.show?.feature_in?.includes(feature)
      )
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 15)
      .map(transformShowContent);
  };

  const transformToShows = (contentArray: any[] | undefined) => {
    if (!contentArray) return [];
    return contentArray
      .filter(content => content.content_type === 'Show')
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 15)
      .map(transformShowContent);
  };

  const getShowsFromContent = (contentArray: any[] | undefined) => {
    if (!contentArray) return [];

    return contentArray
      .filter(content => content.content_type === 'Show')
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 15)
      .map(transformShowContent);
  };


  // Get shows for hero - using Type Hero feature from all content, latest 5
  const heroShows = getShowsByFeature('Type Hero').slice(0, 5);

  // Get shows from specific content arrays (for drama section)


  const sections = [
    {
      title: "New Release",
      contents: getShowsByFeature("Home New Release"),
    },
    { 
      title: "Popular", 
      contents: getShowsByFeature("Type Popular") 
    },
    {
      title: "Entertainment", 
      contents: getShowsByFeature("Entertainment"),
    },
    { 
      title: "Fictional", 
      contents: getShowsByFeature("Fictional") 
    },
    { title: "Drama", contents: getShowsFromContent(dramaContent || []) },
  ].filter(section => section.contents && section.contents.length > 0);

  console.log('Show page data:', {
    allContent: allContent?.shows?.length || 0,
    heroShows: heroShows.length,
    sections: sections.map(s => ({ title: s.title, count: s.contents.length }))
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <div className="w-full">
        {heroShows.length > 0 && (
          <HeroSlider contents={heroShows} />
        )}
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-6 py-8 space-y-8 min-h-[80vh]">
        {sections.map((section, index) => (
          section.contents.length > 0 && (
            <HorizontalSection
              key={index}
              title={section.title}
              contents={section.contents}
              onSeeMore={() => {
                // Get the specific section's content
                const filteredContents = section.contents.map(content => content.originalData || content);
                navigate("/see-more", { 
                  state: { 
                    title: `${section.title} Shows`, 
                    contents: filteredContents.length > 0 ? filteredContents : allContent?.shows || []
                  } 
                });
              }}
              limitCards={true}
            />
          )
        ))}

        {sections.every(section => section.contents.length === 0) && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">No Shows Available</h2>
            <p className="text-muted-foreground">Check back later for new show content.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TvShows;