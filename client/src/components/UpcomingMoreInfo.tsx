import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import TrailerModal from '@/components/TrailerModal';
import AutoClickAd from '@/components/AutoClickAd';
import SpecialAdContainer from '@/components/SpecialAdContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowLeft, Play, Calendar, Clock } from 'lucide-react';

// Individual Ad Components with proper isolation and error handling - Same as Player Page
const MoreInfoAd2: React.FC = () => {
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
      const optionsKey = `atOptions_moreinfo2_${timestamp}`;
      (window as any)[optionsKey] = uniqueOptions;
      (window as any).atOptions = uniqueOptions;

      // Create and load the script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//www.highperformanceformat.com/9b4e8b40e2674e797095c9825bbf58f0/invoke.js';
      script.async = true;
      script.id = `moreinfo-ad-2-script-${timestamp}`;

      script.onload = () => {
        console.log('MoreInfo Ad 2 loaded successfully');
        setAdLoaded(true);
        setRetryCount(0);
      };

      script.onerror = () => {
        console.warn('MoreInfo Ad 2 failed to load');
        setAdError(true);
      };

      container.appendChild(script);

      // Check if ad content loaded after timeout
      setTimeout(() => {
        if (container && container.innerHTML && !container.querySelector('iframe') && !adLoaded && retryCount < 3) {
          console.log('MoreInfo Ad 2 content not found, retrying...', `(${retryCount + 1}/3)`);
          setRetryCount(prev => prev + 1);
          loadAd();
        }
      }, 3000);

    } catch (error) {
      console.warn('Error loading MoreInfo Ad 2:', error);
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

const MoreInfoAd3: React.FC = () => {
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
      const optionsKey = `atOptions_moreinfo3_${timestamp}`;
      (window as any)[optionsKey] = uniqueOptions;
      (window as any).atOptions = uniqueOptions;

      // Create and load the script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//www.highperformanceformat.com/bae2d0d07c2b8e24730cc20afdd2faa5/invoke.js';
      script.async = true;
      script.id = `moreinfo-ad-3-script-${timestamp}`;

      script.onload = () => {
        console.log('MoreInfo Ad 3 loaded successfully');
        setAdLoaded(true);
        setRetryCount(0);
      };

      script.onerror = () => {
        console.warn('MoreInfo Ad 3 failed to load');
        setAdError(true);
      };

      container.appendChild(script);

      // Check if ad content loaded after timeout
      setTimeout(() => {
        if (container && container.innerHTML && !container.querySelector('iframe') && !adLoaded && retryCount < 3) {
          console.log('MoreInfo Ad 3 content not found, retrying...', `(${retryCount + 1}/3)`);
          setRetryCount(prev => prev + 1);
          loadAd();
        }
      }, 3000);

    } catch (error) {
      console.warn('Error loading MoreInfo Ad 3:', error);
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

const MoreInfoAd4: React.FC = () => {
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
      const optionsKey = `atOptions_moreinfo4_${timestamp}`;
      (window as any)[optionsKey] = uniqueOptions;
      (window as any).atOptions = uniqueOptions;

      // Create and load the script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//www.highperformanceformat.com/78e88b204108820f7e99c412c9223d3f/invoke.js';
      script.async = true;
      script.id = `moreinfo-ad-4-script-${timestamp}`;

      script.onload = () => {
        console.log('MoreInfo Ad 4 loaded successfully');
        setAdLoaded(true);
        setRetryCount(0);
      };

      script.onerror = () => {
        console.warn('MoreInfo Ad 4 failed to load');
        setAdError(true);
      };

      container.appendChild(script);

      // Check if ad content loaded after timeout
      setTimeout(() => {
        if (container && container.innerHTML && !container.querySelector('iframe') && !adLoaded && retryCount < 3) {
          console.log('MoreInfo Ad 4 content not found, retrying...', `(${retryCount + 1}/3)`);
          setRetryCount(prev => prev + 1);
          loadAd();
        }
      }, 3000);

    } catch (error) {
      console.warn('Error loading MoreInfo Ad 4:', error);
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

const UpcomingMoreInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const content = location.state;
  const [showAllDetails, setShowAllDetails] = useState(false);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
  const [adsLoaded, setAdsLoaded] = useState(false);

  // Load ads with proper timing - same as Player and Details pages
  useEffect(() => {
    try {
      console.log('Initializing ads for UpcomingMoreInfo page');
      const timer = setTimeout(() => {
        setAdsLoaded(true);
        console.log('Ads marked as ready to load');
      }, 0); // Give 0 seconds for all ads and content to load properly

      return () => clearTimeout(timer);
    } catch (error) {
      console.warn('Error initializing ads:', error);
      setAdsLoaded(true); // Proceed anyway
    }
  }, []);

  // Debug thumbnail URL
  console.log('UpcomingMoreInfo content:', content);
  console.log('UpcomingMoreInfo thumbnail_url:', content?.thumbnail_url);

  const handleTrailerClick = () => {
    setIsTrailerModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <AutoClickAd pageType="moreinfo" />

      <TrailerModal
        isOpen={isTrailerModalOpen}
        onClose={() => setIsTrailerModalOpen(false)}
        trailerUrl={content?.trailer_url || ''}
        title={content?.title || 'Upcoming Content'}
      />

      <div className="pt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button onClick={() => navigate(-1)} variant="outline" size="sm" className="bg-primary/5 backdrop-blur-sm border border-primary/30 text-primary hover:bg-gradient-to-br hover:from-black/30 hover:via-dark-green/5 hover:to-black/30 hover:border-primary/20 transition-all duration-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>

          <Card className="bg-gradient-to-br from-black/90 via-dark-green/20 to-black/90 backdrop-blur-sm border border-border/50 wave-transition relative overflow-hidden">
            {/* Animated Background Waves */}
            <div className="absolute inset-0">
              <div className="upcoming-wave-bg-1"></div>
              <div className="upcoming-wave-bg-2"></div>
              <div className="upcoming-wave-bg-3"></div>
            </div>

            <CardHeader className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <div className="w-full aspect-[16/9] relative overflow-hidden rounded-lg">
                    <img 
                      src={content.thumbnail_url || content.image || '/placeholder.svg'} 
                      alt={content.title} 
                      className="w-full h-full object-cover object-center" 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== '/placeholder.svg') {
                          target.src = '/placeholder.svg';
                        }
                      }}
                    />
                  </div>

                  {/* Watch Trailer Button below thumbnail */}
                  <div className="mt-4 flex justify-center">
                    <Button 
                      onClick={handleTrailerClick} 
                      className="bg-transparent backdrop-blur-sm border border-primary/60 text-primary hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300 font-semibold text-base px-12 py-3 min-w-[180px] rounded-lg shadow-lg"
                    >
                      <Play className="w-5 h-5 mr-3" />
                      Watch Trailer
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-6 min-w-0">
                  <h1 className="text-xl font-bold text-foreground">
                    {content.title}
                  </h1>

                  <div className="flex items-center space-x-3 flex-wrap">
                    {content.rating_type && (
                      <span className="bg-primary/20 text-primary px-2 py-1 rounded border border-primary/30 text-xs font-medium">
                        {content.rating_type}
                      </span>
                    )}
                    {content.content_type && (
                      <span className="bg-blue-900/25 text-blue-200 px-2 py-1 rounded border border-blue-800/40 text-xs font-medium">
                        {content.content_type}
                      </span>
                    )}
                    {content.release_date && (
                      <div className="flex items-center space-x-2 bg-emerald-800/20 px-2 py-1 rounded-md border border-emerald-700/30">
                        <Calendar className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-100 font-medium text-xs">
                          {new Date(content.release_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    )}
                  </div>

                  {content.description && (
                    <div className="mt-4">
                      <p className="text-foreground/90 leading-relaxed text-sm font-normal whitespace-pre-line break-words">
                        {content.description}
                      </p>
                    </div>
                  )}

                  {/* See More Button */}
                  <div className="mt-4">
                    <button 
                      onClick={() => setShowAllDetails(!showAllDetails)}
                      className="text-primary hover:text-primary/80 text-sm font-medium bg-transparent border-none p-0 cursor-pointer transition-colors duration-300"
                    >
                      {showAllDetails ? 'Show Less' : 'See More'}
                    </button>
                  </div>

                  {/* Additional Details shown inline when expanded */}
                  {showAllDetails && (
                    <div className="space-y-4 mt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {content.genre && content.genre.length > 0 && (
                          <div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">Genres</h3>
                            <div className="flex flex-wrap gap-2">
                              {content.genre.map((g, index) => (
                                <span key={index} className="bg-purple-800/20 text-purple-300 px-2 py-1 rounded border border-purple-700/30 text-xs">
                                  {g}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {content.directors && content.directors.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">Directors</h3>
                          <div className="flex flex-wrap gap-2">
                            {content.directors.map((director, index) => (
                              <span key={index} className="bg-orange-800/20 text-orange-300 px-2 py-1 rounded border border-orange-700/30 text-xs">
                                {director}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {content.writers && content.writers.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">Writers</h3>
                          <div className="flex flex-wrap gap-2">
                            {content.writers.map((writer, index) => (
                              <span key={index} className="bg-teal-800/20 text-teal-300 px-2 py-1 rounded border border-teal-700/30 text-xs">
                                {writer}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {content.cast_members && content.cast_members.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">Cast Members</h3>
                          <div className="flex flex-wrap gap-2">
                            {content.cast_members.map((cast, index) => (
                              <span key={index} className="bg-pink-800/20 text-pink-300 px-2 py-1 rounded border border-pink-700/30 text-xs">
                                {cast}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Advertisement Sections - Exact same as Player Page with 4 sections */}
          <div className="space-y-6 mt-8">
            {/* Special Advertisement Section - Top Priority */}
            <div className="w-full" id="moreinfo-ads-section-1">
              <Card className="bg-gradient-to-br from-black/25 via-[#0A7D4B]/12 to-black/25 backdrop-blur-sm border border-primary/25 shadow-xl">
                <CardContent className="p-5">
                  <div className="w-full flex justify-center items-center min-h-[80px]">
                    <SpecialAdContainer 
                      containerId="special-ad-moreinfo-top"
                      className="w-full text-center"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Second Advertisement Section - Banner Format */}
            <div className="w-full" id="moreinfo-ads-section-2">
              <Card className="bg-gradient-to-br from-black/30 via-[#0A7D4B]/8 to-black/30 backdrop-blur-sm border border-border/20 shadow-lg">
                <CardContent className="p-4">
                  <div className="w-full flex justify-center items-center min-h-[100px]">
                    <MoreInfoAd2 />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Third and Fourth Advertisement Sections - Side by Side Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Third Advertisement Section - Medium Rectangle */}
              <div className="w-full flex justify-center" id="moreinfo-ads-section-3">
                <Card className="bg-gradient-to-br from-black/30 via-[#0A7D4B]/8 to-black/30 backdrop-blur-sm border border-border/20 shadow-lg max-w-[370px] w-full">
                  <CardContent className="p-4">
                    <div className="flex justify-center items-center min-h-[280px]">
                      <MoreInfoAd3 />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Fourth Advertisement Section - Skyscraper */}
              <div className="w-full flex justify-center" id="moreinfo-ads-section-4">
                <Card className="bg-gradient-to-br from-black/30 via-[#0A7D4B]/8 to-black/30 backdrop-blur-sm border border-border/20 shadow-lg max-w-[220px] w-full">
                  <CardContent className="p-4">
                    <div className="flex justify-center items-center min-h-[320px]">
                      <MoreInfoAd4 />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingMoreInfo;