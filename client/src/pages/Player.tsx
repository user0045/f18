import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import AutoClickAd from '@/components/AutoClickAd';
import SpecialAdContainer from '@/components/SpecialAdContainer';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Star, Play, Calendar, Clock, AlertTriangle } from 'lucide-react';
import { useIncrementMovieViews, useIncrementEpisodeViews, useIncrementShowEpisodeViews } from '@/hooks/useViewTracking';
import ContentIssueForm from '@/components/ContentIssueForm';

// Individual Ad Components with proper isolation and error handling
const PlayerAd2: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = React.useState(false);
  const [adError, setAdError] = React.useState(false);
  const [retryCount, setRetryCount] = React.useState(0);

  const loadAd = React.useCallback(() => {
    try {
      const container = containerRef.current;
      if (!container) return;

      // Clear any existing content safely
      container.innerHTML = '';
      setAdLoaded(false);
      setAdError(false);

      // Create unique options object with timestamp
      const timestamp = Date.now();
      const uniqueOptions = {
        'key': '9b4e8b40e2674e797095c9825bbf58f0',
        'format': 'iframe',
        'height': 90,
        'width': 728,
        'params': {}
      };

      // Set to global scope with unique identifier
      const optionsKey = `atOptions_player2_${timestamp}`;
      (window as any)[optionsKey] = uniqueOptions;
      (window as any).atOptions = uniqueOptions;

      // Create and load the script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//www.highperformanceformat.com/9b4e8b40e2674e797095c9825bbf58f0/invoke.js';
      script.async = true;
      script.id = `player-ad-2-script-${timestamp}`;

      script.onload = () => {
        console.log('Player Ad 2 loaded successfully');
        setAdLoaded(true);
        setRetryCount(0);
      };

      script.onerror = () => {
        console.warn('Player Ad 2 failed to load');
        setAdError(true);
      };

      container.appendChild(script);

      // Check if ad content loaded after timeout
      setTimeout(() => {
        if (container && container.innerHTML && !container.querySelector('iframe') && !adLoaded && retryCount < 3) {
          console.log('Player Ad 2 content not found, retrying...', `(${retryCount + 1}/3)`);
          setRetryCount(prev => prev + 1);
          loadAd();
        }
      }, 3000);

    } catch (error) {
      console.warn('Error loading Player Ad 2:', error);
      setAdError(true);
    }
  }, [adLoaded, adError, retryCount]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      loadAd();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Retry mechanism
  React.useEffect(() => {
    if (retryCount > 0 && retryCount < 3 && !adLoaded && !adError) {
      const retryTimer = setTimeout(() => {
        loadAd();
      }, 2000 * retryCount);

      return () => clearTimeout(retryTimer);
    }
  }, [retryCount, adLoaded, adError, loadAd]);

  if (adError && retryCount >= 3) {
    return (
      <div className="w-full text-center ad-container" style={{ minHeight: '50px' }}>
        <div className="text-xs text-gray-500">Advertisement space</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full text-center ad-container"
      style={{
        width: 'auto',
        height: 'auto',
        overflow: 'visible',
        display: 'block',
        visibility: 'visible',
        opacity: 1,
        position: 'static',
        zIndex: 1,
        minHeight: '50px'
      }}
    />
  );
};

const PlayerAd3: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = React.useState(false);
  const [adError, setAdError] = React.useState(false);
  const [retryCount, setRetryCount] = React.useState(0);

  const loadAd = React.useCallback(() => {
    try {
      const container = containerRef.current;
      if (!container) return;

      // Clear any existing content safely
      container.innerHTML = '';
      setAdLoaded(false);
      setAdError(false);

      // Create unique options object with timestamp
      const timestamp = Date.now();
      const uniqueOptions = {
        'key': 'bae2d0d07c2b8e24730cc20afdd2faa5',
        'format': 'iframe',
        'height': 250,
        'width': 300,
        'params': {}
      };

      // Set to global scope with unique identifier
      const optionsKey = `atOptions_player3_${timestamp}`;
      (window as any)[optionsKey] = uniqueOptions;
      (window as any).atOptions = uniqueOptions;

      // Create and load the script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//www.highperformanceformat.com/bae2d0d07c2b8e24730cc20afdd2faa5/invoke.js';
      script.async = true;
      script.id = `player-ad-3-script-${timestamp}`;

      script.onload = () => {
        console.log('Player Ad 3 loaded successfully');
        setAdLoaded(true);
        setRetryCount(0);
      };

      script.onerror = () => {
        console.warn('Player Ad 3 failed to load');
        setAdError(true);
      };

      container.appendChild(script);

      // Check if ad content loaded after timeout
      setTimeout(() => {
        if (container && container.innerHTML && !container.querySelector('iframe') && !adLoaded && retryCount < 3) {
          console.log('Player Ad 3 content not found, retrying...', `(${retryCount + 1}/3)`);
          setRetryCount(prev => prev + 1);
          loadAd();
        }
      }, 3000);

    } catch (error) {
      console.warn('Error loading Player Ad 3:', error);
      setAdError(true);
    }
  }, [adLoaded, adError, retryCount]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      loadAd();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Retry mechanism
  React.useEffect(() => {
    if (retryCount > 0 && retryCount < 3 && !adLoaded && !adError) {
      const retryTimer = setTimeout(() => {
        loadAd();
      }, 2000 * retryCount);

      return () => clearTimeout(retryTimer);
    }
  }, [retryCount, adLoaded, adError, loadAd]);

  if (adError && retryCount >= 3) {
    return (
      <div className="w-full text-center ad-container" style={{ minHeight: '50px' }}>
        <div className="text-xs text-gray-500">Advertisement space</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full text-center ad-container"
      style={{
        width: 'auto',
        height: 'auto',
        overflow: 'visible',
        display: 'block',
        visibility: 'visible',
        opacity: 1,
        position: 'static',
        zIndex: 1,
        minHeight: '50px'
      }}
    />
  );
};

const PlayerAd4: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = React.useState(false);
  const [adError, setAdError] = React.useState(false);
  const [retryCount, setRetryCount] = React.useState(0);

  const loadAd = React.useCallback(() => {
    try {
      const container = containerRef.current;
      if (!container) return;

      // Clear any existing content safely
      container.innerHTML = '';
      setAdLoaded(false);
      setAdError(false);

      // Create unique options object with timestamp
      const timestamp = Date.now();
      const uniqueOptions = {
        'key': '78e88b204108820f7e99c412c9223d3f',
        'format': 'iframe',
        'height': 300,
        'width': 160,
        'params': {}
      };

      // Set to global scope with unique identifier
      const optionsKey = `atOptions_player4_${timestamp}`;
      (window as any)[optionsKey] = uniqueOptions;
      (window as any).atOptions = uniqueOptions;

      // Create and load the script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//www.highperformanceformat.com/78e88b204108820f7e99c412c9223d3f/invoke.js';
      script.async = true;
      script.id = `player-ad-4-script-${timestamp}`;

      script.onload = () => {
        console.log('Player Ad 4 loaded successfully');
        setAdLoaded(true);
        setRetryCount(0);
      };

      script.onerror = () => {
        console.warn('Player Ad 4 failed to load');
        setAdError(true);
      };

      container.appendChild(script);

      // Check if ad content loaded after timeout
      setTimeout(() => {
        if (container && container.innerHTML && !container.querySelector('iframe') && !adLoaded && retryCount < 3) {
          console.log('Player Ad 4 content not found, retrying...', `(${retryCount + 1}/3)`);
          setRetryCount(prev => prev + 1);
          loadAd();
        }
      }, 3000);

    } catch (error) {
      console.warn('Error loading Player Ad 4:', error);
      setAdError(true);
    }
  }, [adLoaded, adError, retryCount]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      loadAd();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Retry mechanism
  React.useEffect(() => {
    if (retryCount > 0 && retryCount < 3 && !adLoaded && !adError) {
      const retryTimer = setTimeout(() => {
        loadAd();
      }, 2000 * retryCount);

      return () => clearTimeout(retryTimer);
    }
  }, [retryCount, adLoaded, adError, loadAd]);

  if (adError && retryCount >= 3) {
    return (
      <div className="w-full text-center ad-container" style={{ minHeight: '50px' }}>
        <div className="text-xs text-gray-500">Advertisement space</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full text-center ad-container"
      style={{
        width: 'auto',
        height: 'auto',
        overflow: 'visible',
        display: 'block',
        visibility: 'visible',
        opacity: 1,
        position: 'static',
        zIndex: 1,
        minHeight: '50px'
      }}
    />
  );
};

const Player = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const episodeId = searchParams.get('episode');
  const content = location.state || {};
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [currentSeasonDetails, setCurrentSeasonDetails] = useState(null);
  const [videoError, setVideoError] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [adsLoaded, setAdsLoaded] = useState(true); // Remove loading delay
  const [isIssueFormOpen, setIsIssueFormOpen] = useState(false);

  const incrementMovieViews = useIncrementMovieViews();
  const incrementEpisodeViews = useIncrementEpisodeViews();
  const incrementShowEpisodeViews = useIncrementShowEpisodeViews();

  // Initialize ads immediately without delay
  useEffect(() => {
    try {
      console.log('Initializing ads for Player page');
      console.log('Ads marked as ready to load');
    } catch (error) {
      console.warn('Error initializing ads:', error);
    }
  }, []);

  // Fetch episode details if episodeId is provided
  useEffect(() => {
    const fetchEpisodeDetails = async () => {
      if (episodeId) {
        setIsVideoLoading(true);
        try {
          const { supabase } = await import('@/integrations/supabase/client');
          const { data: episodeData, error } = await supabase
            .from('episode')
            .select('*')
            .eq('episode_id', episodeId)
            .single();

          if (!error && episodeData) {
            setCurrentEpisode(episodeData);
          }
        } catch (err) {
          console.error('Error fetching episode details:', err);
        } finally {
          setIsVideoLoading(false);
        }
      } else {
        setIsVideoLoading(false);
      }
    };

    fetchEpisodeDetails();
    setVideoError(false);
  }, [episodeId]);

  // Get season details for web series based on current episode
  useEffect(() => {
    const fetchSeasonDetails = async () => {
      if (content.content_type === 'Web Series' && content.web_series?.season_id_list && currentEpisode) {
        try {
          const { supabase } = await import('@/integrations/supabase/client');
          
          // Find which season contains the current episode
          let foundSeasonData = null;
          
          for (const seasonId of content.web_series.season_id_list) {
            const { data: seasonData, error } = await supabase
              .from('season')
              .select('*')
              .eq('season_id', seasonId)
              .single();

            if (!error && seasonData && seasonData.episode_id_list) {
              // Check if current episode is in this season
              if (seasonData.episode_id_list.includes(currentEpisode.episode_id)) {
                foundSeasonData = seasonData;
                break;
              }
            }
          }
          
          if (foundSeasonData) {
            setCurrentSeasonDetails(foundSeasonData);
          } else {
            // Fallback to first season if episode not found in any season
            const seasonId = content.web_series.season_id_list[0];
            if (seasonId) {
              const { data: seasonData, error } = await supabase
                .from('season')
                .select('*')
                .eq('season_id', seasonId)
                .single();

              if (!error && seasonData) {
                setCurrentSeasonDetails(seasonData);
              }
            }
          }
        } catch (err) {
          console.error('Error fetching season details:', err);
        }
      } else if (content.content_type === 'Web Series' && content.web_series?.season_id_list && !currentEpisode) {
        // If no specific episode, use first season
        try {
          const { supabase } = await import('@/integrations/supabase/client');
          const seasonId = content.web_series.season_id_list[0];

          if (seasonId) {
            const { data: seasonData, error } = await supabase
              .from('season')
              .select('*')
              .eq('season_id', seasonId)
              .single();

            if (!error && seasonData) {
              setCurrentSeasonDetails(seasonData);
            }
          }
        } catch (err) {
          console.error('Error fetching season details:', err);
        }
      }
    };

    fetchSeasonDetails();
  }, [content, currentEpisode]);

  // Get the actual video URL based on content type
  const getVideoUrl = () => {
    if (currentEpisode?.video_url) {
      return currentEpisode.video_url;
    }

    if (content.content_type === 'Movie' && content.movie?.video_url) {
      return content.movie.video_url;
    }

    if (content.content_type === 'Web Series') {
      if (content.web_series?.seasons?.[0]?.episodes?.[0]?.video_url) {
        return content.web_series.seasons[0].episodes[0].video_url;
      }
    }

    if (content.content_type === 'Show') {
      if (content.show?.episode_id_list?.length > 0) {
        const showVideoUrl = content.videoUrl || content.video_url;
        return showVideoUrl;
      }
    }

    const fallbackUrl = content.videoUrl || content.video_url || content.movie?.video_url;
    return fallbackUrl || '';
  };

  const videoUrl = getVideoUrl();

  // Debug logging for video URL
  useEffect(() => {
    console.log('=== VIDEO URL DEBUG ===');
    console.log('Raw video URL from getVideoUrl():', videoUrl);
    console.log('Video URL length:', videoUrl?.length);
    console.log('Video URL type:', typeof videoUrl);
    console.log('Processed video URL for player:', getVideoUrlForPlayer(videoUrl));

    // Validate Odysee URL if it's an Odysee URL
    if (videoUrl?.includes('odysee.com')) {
      const validation = validateOdysseeUrl(videoUrl);
      console.log('Odysee URL validation:', validation);
    }

    console.log('Content data for debugging:', {
      content_type: content.content_type,
      title: content.title,
      movie: content.movie ? {
        video_url: content.movie.video_url,
        video_url_length: content.movie.video_url?.length
      } : null
    });
    if (currentEpisode) {
      console.log('Current episode:', currentEpisode);
    }
    console.log('=== END DEBUG ===');
  }, [videoUrl, content, currentEpisode]);

  // Validate Odysee URL completeness
  const validateOdysseeUrl = (url) => {
    if (!url || !url.includes('odysee.com')) return { isValid: true, reason: 'Not an Odysee URL' };

    const requiredParams = ['r=', 'signature=', 'signature_ts='];
    const missingParams = requiredParams.filter(param => !url.includes(param));

    if (missingParams.length > 0) {
      return {
        isValid: false,
        reason: `Missing required parameters: ${missingParams.join(', ')}`,
        url: url
      };
    }

    return { isValid: true, reason: 'Valid Odysee URL' };
  };

  // Process video URL - if it's already embed code or complete URL, use directly
  const getVideoUrlForPlayer = (url) => {
    if (!url || typeof url !== 'string') {
      return '';
    }

    // If URL contains complete iframe embed code, return as-is (will be handled by dangerouslySetInnerHTML)
    if (url.includes('<iframe') && url.includes('</iframe>')) {
      return url;
    }

    // If URL contains iframe embed code, extract the src URL
    if (url.includes('<iframe') && url.includes('src=')) {
      const srcMatch = url.match(/src=["']([^"']+)["']/);
      if (srcMatch && srcMatch[1]) {
        return srcMatch[1];
      }
    }

    // If it's already an embed URL or contains embed path, use directly
    if (url.includes('/embed/') || url.includes('player.') || url.includes('iframe')) {
      return url;
    }

    // Convert page URLs to embed URLs for known platforms
    if (url.includes('bitchute.com/video/')) {
      const videoId = url.split('/video/')[1].split('?')[0].split('/')[0];
      return `https://www.bitchute.com/embed/${videoId}/?autoplay=1`;
    }

    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`;
    }

    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1].split('?')[0];
      return `https://player.vimeo.com/video/${videoId}?autoplay=0`;
    }

    if (url.includes('dailymotion.com/video/')) {
      const videoId = url.split('/video/')[1].split('?')[0];
      return `https://www.dailymotion.com/embed/video/${videoId}?autoplay=0`;
    }

    // For all other URLs, use them directly
    return url;
  };

  // Simple navigation prevention for video player
  useEffect(() => {
    const handleNavigation = (e: Event) => {
      const target = e.target as HTMLElement;
      const videoContainer = document.querySelector('.video-player-container');
      
      if (videoContainer && videoContainer.contains(target)) {
        // Check if it's any kind of link or navigation element
        const link = target.closest('a') || target.closest('[href]') || target.closest('[onclick]');
        if (link) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          console.log('Navigation attempt blocked by click interceptor');
          return false;
        }
      }
    };

    // Block all navigation attempts
    document.addEventListener('click', handleNavigation, true);
    document.addEventListener('mousedown', handleNavigation, true);
    document.addEventListener('mouseup', handleNavigation, true);

    // Block window.open from video area
    const originalOpen = window.open;
    window.open = function(...args) {
      const stack = new Error().stack || '';
      if (stack.includes('video') || stack.includes('iframe')) {
        console.log('Blocked window.open from video area');
        return null;
      }
      return originalOpen.apply(window, args);
    };

    return () => {
      document.removeEventListener('click', handleNavigation, true);
      document.removeEventListener('mousedown', handleNavigation, true);
      document.removeEventListener('mouseup', handleNavigation, true);
      window.open = originalOpen;
    };
  }, []);

  // Auto-reload logic
  useEffect(() => {
    let refreshTimer: NodeJS.Timeout;

    const setupAutoRefresh = () => {
      let estimatedDuration = 15 * 60 * 1000;

      if (currentEpisode?.duration) {
        estimatedDuration = currentEpisode.duration * 60 * 1000;
      } else if (content.content_type === 'Movie' && content.movie?.duration) {
        estimatedDuration = content.movie.duration * 60 * 1000;
      }

      estimatedDuration = Math.min(Math.max(estimatedDuration + 30000, 5 * 60 * 1000), 45 * 60 * 1000);

      if (videoUrl && videoUrl.includes('bitchute.com')) {
        estimatedDuration = Math.min(estimatedDuration, 10 * 60 * 1000);
      }

      refreshTimer = setTimeout(() => {
        window.location.reload();
      }, estimatedDuration);
    };

    if (videoUrl && !videoError) {
      setupAutoRefresh();
    }

    return () => {
      if (refreshTimer) {
        clearTimeout(refreshTimer);
      }
    };
  }, [videoUrl, videoError, currentEpisode, content]);

  // View tracking logic
  useEffect(() => {
    let viewTimer: NodeJS.Timeout;

    const sessionKey = episodeId ? `episode_${episodeId}` : `content_${id}`;
    const hasTrackedKey = `view_tracked_${sessionKey}`;
    const hasTrackedView = sessionStorage.getItem(hasTrackedKey) === 'true';

    const trackView = async () => {
      if (!hasTrackedView && content && (id || episodeId)) {
        try {
          const contentType = content.content_type?.toLowerCase() || content.type?.toLowerCase();
          let trackingPromise = null;

          if (contentType === 'movie' && id) {
            trackingPromise = incrementMovieViews.mutateAsync(id);
          } else if (episodeId) {
            trackingPromise = incrementEpisodeViews.mutateAsync(episodeId);
          } else if (contentType === 'show' && content.show?.episode_id_list?.[0]) {
            const firstEpisodeId = content.show.episode_id_list[0];
            trackingPromise = incrementShowEpisodeViews.mutateAsync(firstEpisodeId);
          } else if (contentType === 'web series' && content.web_series?.seasons?.[0]?.episodes?.[0]) {
            const firstEpisode = content.web_series.seasons[0].episodes[0];
            if (firstEpisode.episode_id) {
              trackingPromise = incrementEpisodeViews.mutateAsync(firstEpisode.episode_id);
            }
          }

          if (trackingPromise) {
            await trackingPromise;
            sessionStorage.setItem(hasTrackedKey, 'true');
          }
        } catch (error) {
          console.error('Error tracking view:', error);
        }
      }
    };

    if (content && videoUrl && !videoError && !hasTrackedView && (id || episodeId)) {
      viewTimer = setTimeout(() => {
        trackView();
      }, 30000);
    }

    return () => {
      if (viewTimer) {
        clearTimeout(viewTimer);
      }
    };
  }, [content, currentEpisode, id, incrementMovieViews, incrementEpisodeViews, incrementShowEpisodeViews, episodeId, videoUrl, videoError]);

  const getContentTypeDisplay = () => {
    switch (content.content_type) {
      case 'Movie': return 'Movie';
      case 'Web Series': return 'Web Series';
      case 'Show': return 'TV Show';
      default:
        if (content.type === 'series') return 'Web Series';
        if (content.type === 'show') return 'TV Show';
        return content.content_type || content.type || 'Content';
    }
  };

  const getEpisodeInfo = () => {
    if (currentEpisode) {
      // Try to extract episode number from title
      const episodeMatch = currentEpisode.title?.match(/episode\s*(\d+)/i);
      if (episodeMatch) {
        return `Episode ${episodeMatch[1]}`;
      }
      
      // Check if episode has episode_number field
      if (currentEpisode.episode_number) {
        return `Episode ${currentEpisode.episode_number}`;
      }
      
      // Try to find episode position in season's episode list
      if (currentSeasonDetails?.episode_id_list) {
        const episodeIndex = currentSeasonDetails.episode_id_list.findIndex(
          epId => epId === currentEpisode.episode_id
        );
        if (episodeIndex >= 0) {
          return `Episode ${episodeIndex + 1}`;
        }
      }
      
      return 'Episode';
    }
    return null;
  };

  const getSeasonInfo = () => {
    if (content.content_type === 'Web Series') {
      if (currentSeasonDetails?.season_number) {
        return `Season ${currentSeasonDetails.season_number}`;
      } else if (content.seasonNumber) {
        return `Season ${content.seasonNumber}`;
      } else if (currentEpisode && content.web_series?.season_id_list) {
        // Try to determine season number from episode position in season list
        const seasonIndex = content.web_series.season_id_list.findIndex(seasonId => {
          // This is a best-effort approach - we'd need to check episode lists
          return true; // For now, fallback to season 1
        });
        return `Season ${seasonIndex >= 0 ? seasonIndex + 1 : 1}`;
      }
      return 'Season 1';
    }
    return null;
  };

  const getDuration = () => {
    if (currentEpisode?.duration) {
      return `${currentEpisode.duration} min`;
    }
    if (content.content_type === 'Movie' && content.movie?.duration) {
      return `${content.movie.duration} min`;
    }
    return null;
  };

  const getDescription = () => {
    if (currentEpisode?.description) {
      return currentEpisode.description;
    }
    if (content.content_type === 'Movie' && content.movie?.description) {
      return content.movie.description;
    } else if (content.content_type === 'Web Series' && currentSeasonDetails?.season_description) {
      return currentSeasonDetails.season_description;
    } else if (content.content_type === 'Show' && content.show?.description) {
      return content.show.description;
    }
    return content.description || 'No description available';
  };

  const getRatingInfo = () => {
    if (content.content_type === 'Movie' && content.movie) {
      return {
        rating_type: content.movie.rating_type,
        rating: content.movie.rating,
        release_year: content.movie.release_year
      };
    } else if (content.content_type === 'Web Series' && currentSeasonDetails) {
      return {
        rating_type: currentSeasonDetails.rating_type,
        rating: currentSeasonDetails.rating,
        release_year: currentSeasonDetails.release_year
      };
    } else if (content.content_type === 'Show' && content.show) {
      return {
        rating_type: content.show.rating_type,
        rating: content.show.rating,
        release_year: content.show.release_year
      };
    }
    return {
      rating_type: content.rating_type || content.rating || 'Not Rated',
      rating: content.score || content.rating || 0,
      release_year: content.year || content.release_year || new Date().getFullYear()
    };
  };

  const ratingInfo = getRatingInfo();

  const handlePlay = () => {
    console.log('Video started playing');
  };

  // Safety check
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      const hasValidContent = content && (content.content_type || content.type);
      const hasValidIds = id || episodeId;
      const hasVideoUrl = !!videoUrl;
      const isStillLoading = isVideoLoading;

      if (!hasValidContent && !hasValidIds && !hasVideoUrl && !isStillLoading) {
        navigate('/', { replace: true });
      }
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, [content, navigate, episodeId, id, videoUrl, isVideoLoading]);

  // Manage video loading state based on content availability
  useEffect(() => {
    if (content && videoUrl && !videoError) {
      setIsVideoLoading(false);
    }
  }, [content, videoUrl, videoError]);

  // Force disable loading when video URL is available
  useEffect(() => {
    if (videoUrl && videoUrl.trim() !== '') {
      setIsVideoLoading(false);
    }
  }, [videoUrl]);


  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <Header />

        <div className="pt-20"></div>
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
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
              className="bg-primary/5 backdrop-blur-sm border border-primary/30 text-primary hover:bg-gradient-to-br hover:from-black/30 hover:via-[#0A7D4B]/5 hover:to-black/30 hover:border-primary/20 transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <Button
              onClick={() => setIsIssueFormOpen(true)}
              variant="outline"
              size="sm"
              className="bg-red-500/10 backdrop-blur-sm border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-300"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Report Issue
            </Button>
          </div>

          <div className="space-y-8">
            {/* Video Player Section */}
            <Card className="bg-gradient-to-br from-black/90 via-[#0A7D4B]/20 to-black/90 backdrop-blur-sm border border-border/50 wave-transition relative overflow-hidden">
              <div className="absolute inset-0">
                <div className="player-wave-bg-1"></div>
                <div className="player-wave-bg-2"></div>
                <div className="player-wave-bg-3"></div>
              </div>

              <CardContent className="p-8 relative z-10">
                {/* Video Player */}
                <div className="w-full max-w-4xl mx-auto mb-8">
                  <div className="aspect-video bg-gradient-to-br from-black/95 via-[#0A7D4B]/10 to-black/95 rounded-xl relative border border-primary/20 shadow-2xl overflow-hidden">
                    {videoUrl && !videoError ? (
                      <div className="video-player-container relative w-full h-full">
                        {/* Check if videoUrl contains complete iframe embed code */}
                        {videoUrl.includes('<iframe') && videoUrl.includes('</iframe>') ? (
                          <div 
                            className="w-full h-full rounded-xl overflow-hidden"
                            dangerouslySetInnerHTML={{ __html: videoUrl.replace(/sandbox="[^"]*"/gi, '').replace(/<iframe/gi, '<iframe sandbox="allow-scripts allow-same-origin allow-presentation allow-forms allow-modals"') }}
                            onLoad={() => {
                              setIsVideoLoading(false);
                              console.log('Iframe embed code rendered successfully');
                            }}
                            style={{
                              filter: 'contrast(1.1) brightness(1.05)',
                              outline: 'none',
                              transition: 'opacity 0.3s ease'
                            }}
                          />
                        ) : (videoUrl.includes('/embed/') ||
                          videoUrl.includes('player.') ||
                          videoUrl.includes('bitchute.com') ||
                          videoUrl.includes('odysee.com') ||
                          videoUrl.includes('youtube.com') ||
                          videoUrl.includes('youtu.be') ||
                          videoUrl.includes('vimeo.com') ||
                          videoUrl.includes('dailymotion.com')) ? (
                          <div className="w-full h-full rounded-xl">
                            <iframe
                              className="w-full h-full rounded-xl"
                              src={getVideoUrlForPlayer(videoUrl)}
                              title="Video Player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                              allowFullScreen
                              sandbox="allow-scripts allow-same-origin allow-presentation allow-forms allow-modals"
                              onLoad={() => {
                                setIsVideoLoading(false);
                                console.log('Video iframe loaded successfully for URL:', getVideoUrlForPlayer(videoUrl));
                              }}
                              onError={() => {
                                console.error('Video iframe failed to load for URL:', getVideoUrlForPlayer(videoUrl));
                                setVideoError(true);
                                setIsVideoLoading(false);
                              }}
                              style={{
                                filter: 'contrast(1.1) brightness(1.05)',
                                outline: 'none',
                                transition: 'opacity 0.3s ease',
                                border: 'none'
                              }}
                            />
                          </div>
                        ) : (
                          /* For direct video files - use video element */
                          <div className="w-full h-full rounded-xl">
                            <video
                              className="w-full h-full rounded-xl object-cover custom-video-player"
                              controls
                              poster={content.image || content.thumbnail_url || content.movie?.thumbnail_url}
                              preload="metadata"
                              autoPlay={false}
                              onLoadStart={() => setIsVideoLoading(true)}
                              onCanPlay={() => setIsVideoLoading(false)}
                              onError={() => {
                                setVideoError(true);
                                setIsVideoLoading(false);
                              }}
                              onEnded={() => {
                                setTimeout(() => {
                                  window.location.reload();
                                }, 2000);
                              }}
                              onPlay={handlePlay}
                              onClick={(e) => {
                                const video = e.target as HTMLVideoElement;
                                if (video.paused) {
                                  video.play();
                                } else {
                                  video.pause();
                                }
                              }}
                              style={{
                                filter: 'contrast(1.1) brightness(1.05)',
                                outline: 'none',
                                transition: 'opacity 0.3s ease'
                              }}
                            >
                              <source src={getVideoUrlForPlayer(videoUrl)} type="video/mp4" />
                              <source src={getVideoUrlForPlayer(videoUrl)} type="video/webm" />
                              <source src={getVideoUrlForPlayer(videoUrl)} type="video/ogg" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        )}

                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 pointer-events-none"></div>
                      </div>
                    ) : (
                      <div className="w-full h-full rounded-xl bg-gradient-to-br from-black/95 via-[#0A7D4B]/10 to-black/95 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                            <Play className="w-8 h-8 text-primary fill-current" />
                          </div>
                          <div className="text-primary text-xl font-semibold mb-2">
                            {videoError ? "Unable to Play Content" : "⚠️ Video Not Available"}
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {videoError
                              ? "The video could not be loaded or played. This may be due to an invalid URL, network issues, or platform restrictions."
                              : "No video URL found for this content"}
                          </p>
                          <p className="text-xs text-muted-foreground/70 mt-2">
                            Content Type: {getContentTypeDisplay()}
                          </p>
                          {!videoError && videoUrl && (
                            <p className="text-xs text-muted-foreground/70 mt-1">
                              Video Source: {videoUrl.includes('<iframe') ? 'Iframe Embed Code' : 'Direct URL'}
                            </p>
                          )}
                          {videoError && videoUrl && (
                            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-md">
                              <p className="text-xs text-red-300 leading-relaxed">
                                <strong>Debug Info:</strong> Please check if the video URL or embed code is valid and accessible.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Information */}
                <div className="max-w-4xl mx-auto space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <h1 className="text-3xl font-bold text-foreground">
                      {currentEpisode?.title || 
                       (content.content_type === 'Web Series' ? content.title :
                        content.content_type === 'Show' ? content.show?.title || content.title :
                        content.title)}
                    </h1>
                    <div className="flex items-center space-x-3">
                      {content.content_type === 'Web Series' && getSeasonInfo() && (
                        <span className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 px-3 py-1 rounded-md border border-blue-500/30 text-sm font-medium">
                          {getSeasonInfo()}
                        </span>
                      )}
                      {(content.content_type === 'Web Series' || content.content_type === 'Show') && getEpisodeInfo() && (
                        <span className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-300 px-3 py-1 rounded-md border border-purple-500/30 text-sm font-medium">
                          {getEpisodeInfo()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 flex-wrap">
                    {ratingInfo.rating_type && (
                      <span className="bg-primary/20 text-primary px-3 py-1 rounded-md border border-primary/30 text-sm font-medium">
                        {ratingInfo.rating_type}
                      </span>
                    )}
                    {ratingInfo.rating && (
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-foreground text-sm font-medium">
                          {ratingInfo.rating}
                        </span>
                      </div>
                    )}
                    {ratingInfo.release_year && (
                      <span className="text-muted-foreground text-sm font-medium">
                        {ratingInfo.release_year}
                      </span>
                    )}
                    {getDuration() && (
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground text-sm font-medium">
                          {getDuration()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">Description</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {getDescription()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Advertisement Sections */}
            <div className="space-y-6">
              {/* Special Advertisement Section - Top Priority */}
              <div className="w-full" id="player-special-ad-section">
                <Card className="bg-gradient-to-br from-black/25 via-[#0A7D4B]/12 to-black/25 backdrop-blur-sm border border-primary/25 shadow-xl">
                  <CardContent className="p-5">
                    <div className="w-full flex justify-center items-center min-h-[80px]">
                      <SpecialAdContainer
                        containerId="special-ad-player-top"
                        className="w-full text-center"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Second Advertisement Section - Banner Format */}
              <div className="w-full" id="player-ads-section-2">
                <Card className="bg-gradient-to-br from-black/30 via-[#0A7D4B]/8 to-black/30 backdrop-blur-sm border border-border/20 shadow-lg">
                  <CardContent className="p-4">
                    <div className="w-full flex justify-center items-center min-h-[100px]">
                      <PlayerAd2 />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Third and Fourth Advertisement Sections - Side by Side Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Third Advertisement Section - Medium Rectangle */}
                <div className="w-full flex justify-center" id="player-ads-section-3">
                  <Card className="bg-gradient-to-br from-black/30 via-[#0A7D4B]/8 to-black/30 backdrop-blur-sm border border-border/20 shadow-lg max-w-[370px] w-full">
                    <CardContent className="p-4">
                      <div className="flex justify-center items-center min-h-[280px]">
                        <PlayerAd3 />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Fourth Advertisement Section - Skyscraper */}
                <div className="w-full flex justify-center" id="player-ads-section-4">
                  <Card className="bg-gradient-to-br from-black/30 via-[#0A7D4B]/8 to-black/30 backdrop-blur-sm border border-border/20 shadow-lg max-w-[220px] w-full">
                    <CardContent className="p-4">
                      <div className="flex justify-center items-center min-h-[320px]">
                        <PlayerAd4 />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AutoClickAd pageType="player" />
      
      <ContentIssueForm
        isOpen={isIssueFormOpen}
        onClose={() => setIsIssueFormOpen(false)}
        contentTitle={content.content_type === 'Web Series' ? content.title :
                     content.content_type === 'Show' ? content.show?.title || content.title :
                     content.title}
        contentType={content.content_type}
        contentId={content.id || id}
        seasonNumber={content.content_type === 'Web Series' && currentSeasonDetails?.season_number ? currentSeasonDetails.season_number : 
                     content.seasonNumber ? content.seasonNumber : undefined}
        episodeNumber={currentEpisode ? 
                      (currentEpisode.episode_number ||
                       (currentSeasonDetails?.episode_id_list ? 
                        currentSeasonDetails.episode_id_list.findIndex(epId => epId === currentEpisode.episode_id) + 1 : 
                        undefined)) : undefined}
        episodeTitle={currentEpisode?.title}
      />
    </ErrorBoundary>
  );
};

export default Player;