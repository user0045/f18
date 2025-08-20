import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import HorizontalSection from "@/components/HorizontalSection";
import Footer from "@/components/Footer";
import {
  useAllContent,
  useContentByFeature,
  useContentByGenre,
} from "@/hooks/useContentQueries";

const WebSeries = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { data: allContent, isLoading: allContentLoading } = useAllContent();
  const { data: heroContent } = useContentByFeature("Home Hero");
  const { data: newReleases } = useContentByFeature("Home New Release");
  const { data: popular } = useContentByFeature("Home Popular");
  const { data: actionContent } = useContentByGenre("Action & Adventure");
  const { data: comedyContent } = useContentByGenre("Comedy");
  const { data: crimeContent } = useContentByGenre("Crime");
  const { data: dramaContent } = useContentByGenre("Drama");
  const { data: horrorContent } = useContentByGenre("Horror");
  const { data: familyContent } = useContentByGenre("Family");
  const { data: thrillerContent } = useContentByGenre("Thriller");
  const { data: sciFiContent } = useContentByGenre("Sci-Fi");

  // Transform feature content to web series format (Web Series only)
  const transformToWebSeries = (featureContent: any[]) => {
    return (
      featureContent
        ?.filter((content) => content.content_type === "Web Series")
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
        .slice(0, 15)
        .map((content) => {
          const seasonData = content.web_series?.seasons?.[0];
          return {
            id: content.id, // Already includes season info
            content_id: content.content_id || content.web_series?.content_id,
            title: content.title,
            rating: seasonData?.rating_type || "TV-MA",
            score: seasonData?.rating?.toString() || "8.0",
            image: seasonData?.thumbnail_url || "",
            year:
              seasonData?.release_year?.toString() ||
              content.created_at?.split("-")[0],
            description:
              seasonData?.season_description ||
              content.description,
            type: "series",
            seasonNumber: content.seasonNumber || 1,
            videoUrl: seasonData?.episodes?.[0]?.video_url || "",
            originalData: content, // Include the full original data
            // Add essential fields for details page
            content_type: "Web Series",
            web_series: content.web_series,
            genre: content.genre
          };
        }) || []
    );
  };

  if (allContentLoading) {
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

  const webSeries = allContent?.webSeries || [];

  // Filter web series for hero content (web series with Type Hero feature, latest 5) 
  const heroWebSeries =
    webSeries
      ?.filter((content) => 
        content.content_type === "Web Series" &&
        content.web_series?.seasons?.some((season) =>
          season.feature_in?.includes("Type Hero")
        )
      )
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
      .slice(0, 5)
      .map((content) => {
        // Find the season with "Type Hero" feature or use first season as fallback
        const heroSeason = content.web_series?.seasons?.find((season) =>
          season.feature_in?.includes("Type Hero")
        ) || content.web_series?.seasons?.[0];

        // Get the season number - check if the content already has a seasonNumber property
        // This property is set when the content is transformed from individual season entries
        let actualSeasonNumber = content.seasonNumber || 1;

        // If no seasonNumber property exists, calculate it from the seasons array
        if (!content.seasonNumber && heroSeason && content.web_series?.seasons) {
          const seasonIndex = content.web_series.seasons.findIndex((season) =>
            season.season_id === heroSeason.season_id
          );
          actualSeasonNumber = seasonIndex >= 0 ? seasonIndex + 1 : 1;
        }

        return {
          id: content.id,
          title: content.title,
          description: heroSeason?.season_description || content.description,
          rating: heroSeason?.rating_type || "TV-14",
          year:
            heroSeason?.release_year?.toString() ||
            content.created_at?.split("-")[0],
          score: heroSeason?.rating?.toString() || "8.0",
          image: heroSeason?.thumbnail_url || "",
          videoUrl: heroSeason?.video_url,
          type: "series",
          seasonNumber: actualSeasonNumber,
          // Include all original data for MoreInfo page
          originalData: content,
          content_type: content.content_type,
          genre: content.genre,
          content_id: content.content_id,
          web_series: content.web_series,
          created_at: content.created_at,
          updated_at: content.updated_at
        };
      }) || [];

  // Filter web series from content (now each entry is already a separate season)
  const getWebSeriesFromContent = (genreContent: any[]) => {
    return (
      (genreContent || [])
        .filter((content) => content.content_type === "Web Series")
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
        .slice(0, 15)
        .map((content) => {
          const seasonData = content.web_series?.seasons?.[0];
          return {
            id: content.id, // Already includes season info
            content_id: content.content_id || content.web_series?.content_id,
            title: content.title,
            rating: seasonData?.rating_type || "TV-MA",
            score: seasonData?.rating?.toString() || "8.0",
            image: seasonData?.thumbnail_url || "",
            year:
              seasonData?.release_year?.toString() ||
              content.created_at?.split("-")[0],
            description:
              seasonData?.season_description ||
              content.description,
            type: "series",
            seasonNumber: content.seasonNumber || 1,
            originalData: content, // Include the full original data
          };
        }) || []
    );
  };

  const sections = [
    {
      title: "New Release",
      contents: transformToWebSeries(newReleases || []),
    },
    { title: "Popular", contents: transformToWebSeries(popular || []) },
    {
      title: "Action & Adventure",
      contents: getWebSeriesFromContent(actionContent || []),
    },
    { title: "Comedy", contents: getWebSeriesFromContent(comedyContent || []) },
    { title: "Crime", contents: getWebSeriesFromContent(crimeContent || []) },
    { title: "Drama", contents: getWebSeriesFromContent(dramaContent || []) },
    { title: "Horror", contents: getWebSeriesFromContent(horrorContent || []) },
    { title: "Family", contents: getWebSeriesFromContent(familyContent || []) },
    { title: "Thriller", contents: getWebSeriesFromContent(thrillerContent || []) },
    { title: "Sci-Fi", contents: getWebSeriesFromContent(sciFiContent || []) },
  ].filter(section => section.contents && section.contents.length > 0);

  const handleSeeMore = (title: string, contentType: string) => {
    let filteredContents = [];

    // Get the specific section's content based on title
    const section = sections.find(s => s.title === title);
    if (section) {
      filteredContents = section.contents.map(content => content.originalData || content);
    } else {
      // Fallback to all web series if section not found
      filteredContents = allContent?.webSeries || [];
    }

    navigate("/see-more", { 
      state: { 
        title: `${title} Web Series`, 
        contents: filteredContents 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSlider contents={heroWebSeries} />

      <div className="container mx-auto px-6 py-8 space-y-8 min-h-[80vh]">
        {sections.map((section) => (
          <HorizontalSection
            key={section.title}
            title={section.title}
            contents={section.contents}
            onSeeMore={() => handleSeeMore(section.title, "webSeries")}
            limitCards={true}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default WebSeries;