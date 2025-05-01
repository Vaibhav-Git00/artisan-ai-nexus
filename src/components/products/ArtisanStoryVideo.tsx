import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, Video, ExternalLink } from 'lucide-react';

interface ArtisanStoryVideoProps {
  videoUrl: string;
  videoType: 'youtube' | 'vimeo' | 'upload' | null;
  artisanName: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
}

const ArtisanStoryVideo: React.FC<ArtisanStoryVideoProps> = ({
  videoUrl,
  videoType,
  artisanName,
  autoplay = false,
  loop = false,
  muted = false,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(muted);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Reset error state when props change
  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [videoUrl, videoType]);

  // Handle autoplay when component mounts
  useEffect(() => {
    if (autoplay && videoRef.current && videoType === 'upload') {
      // For uploaded videos, we need to play manually
      videoRef.current.muted = true; // Browsers require muted for autoplay
      setIsMuted(true);

      // Use a small delay to ensure the video is loaded
      const timer = setTimeout(() => {
        videoRef.current?.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(err => {
            console.error('Autoplay failed:', err);
            setIsPlaying(false);
          });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [autoplay, videoType, isLoaded]);

  // Extract video ID from URL
  const getYoutubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getVimeoVideoId = (url: string): string | null => {
    const regExp = /vimeo\.com\/(?:video\/)?([0-9]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  // Handle play/pause for uploaded videos
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle mute/unmute for uploaded videos
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle video end
  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  // Handle video load
  const handleVideoLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  // Handle video error
  const handleVideoError = () => {
    setHasError(true);
    setIsLoaded(false);
    console.error('Error loading video:', videoUrl);
  };

  // Render YouTube embed
  const renderYoutubeEmbed = () => {
    const videoId = getYoutubeVideoId(videoUrl);
    if (!videoId) {
      // If we can't extract a valid YouTube ID, trigger error
      setTimeout(() => handleVideoError(), 0);
      return null;
    }

    // Build YouTube URL with parameters
    let youtubeUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;

    // Add autoplay parameter if needed
    if (autoplay) {
      youtubeUrl += '&autoplay=1';
    }

    // Add muted parameter if needed
    if (muted) {
      youtubeUrl += '&mute=1';
    }

    // Add loop parameter if needed
    if (loop) {
      youtubeUrl += '&loop=1&playlist=' + videoId;
    }

    return (
      <div className="aspect-video rounded-lg overflow-hidden">
        <iframe
          ref={iframeRef}
          src={youtubeUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          onLoad={handleVideoLoad}
          onError={handleVideoError}
        ></iframe>
      </div>
    );
  };

  // Render Vimeo embed
  const renderVimeoEmbed = () => {
    const videoId = getVimeoVideoId(videoUrl);
    if (!videoId) {
      // If we can't extract a valid Vimeo ID, trigger error
      setTimeout(() => handleVideoError(), 0);
      return null;
    }

    // Build Vimeo URL with parameters
    let vimeoUrl = `https://player.vimeo.com/video/${videoId}?`;

    // Add autoplay parameter if needed
    if (autoplay) {
      vimeoUrl += 'autoplay=1&';
    }

    // Add muted parameter if needed
    if (muted) {
      vimeoUrl += 'muted=1&';
    }

    // Add loop parameter if needed
    if (loop) {
      vimeoUrl += 'loop=1&';
    }

    // Remove trailing & if present
    vimeoUrl = vimeoUrl.endsWith('&') ? vimeoUrl.slice(0, -1) : vimeoUrl;

    return (
      <div className="aspect-video rounded-lg overflow-hidden">
        <iframe
          ref={iframeRef}
          src={vimeoUrl}
          title="Vimeo video player"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          onLoad={handleVideoLoad}
          onError={handleVideoError}
        ></iframe>
      </div>
    );
  };

  // Render uploaded video player
  const renderVideoPlayer = () => {
    return (
      <div className="relative rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full aspect-video object-cover"
          onEnded={handleVideoEnd}
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          muted={isMuted}
          playsInline
          loop={loop}
          autoPlay={autoplay}
        />

        {!isPlaying && !hasError && (
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/30"
            onClick={togglePlay}
          >
            <Button
              size="icon"
              className="rounded-full h-16 w-16 bg-artisan-terracotta/90 hover:bg-artisan-terracotta"
            >
              <Play size={32} />
            </Button>
          </div>
        )}

        {!hasError && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-white"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-white"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </Button>
          </div>
        )}
      </div>
    );
  };

  // Render placeholder if video is not loaded yet
  const renderPlaceholder = () => {
    return (
      <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <Video size={48} className="mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground">Loading video...</p>
        </div>
      </div>
    );
  };

  // Render error state
  const renderError = () => {
    return (
      <div className="aspect-video bg-red-50 rounded-lg flex items-center justify-center">
        <div className="text-center p-4">
          <Video size={48} className="mx-auto text-red-400 mb-2" />
          <p className="text-red-600 font-medium mb-1">Failed to load video</p>
          <p className="text-red-500 text-sm">The video may be unavailable or in an unsupported format</p>
        </div>
      </div>
    );
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Video size={18} className="mr-2 text-artisan-terracotta" />
          Hear the Artisan's Story
        </CardTitle>
        <CardDescription>
          Watch {artisanName} share the story behind this creation
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {hasError && renderError()}
          {!isLoaded && !hasError && renderPlaceholder()}

          {!hasError && videoType === 'youtube' && renderYoutubeEmbed()}
          {!hasError && videoType === 'vimeo' && renderVimeoEmbed()}
          {!hasError && videoType === 'upload' && renderVideoPlayer()}

          <div className="flex items-center text-sm text-muted-foreground mt-2">
            {videoType === 'youtube' && (
              <>
                <ExternalLink size={14} className="mr-1 text-red-600" />
                <span>YouTube video by {artisanName}</span>
              </>
            )}

            {videoType === 'vimeo' && (
              <>
                <ExternalLink size={14} className="mr-1 text-blue-600" />
                <span>Vimeo video by {artisanName}</span>
              </>
            )}

            {videoType === 'upload' && (
              <>
                <Video size={14} className="mr-1" />
                <span>Video story by {artisanName}</span>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtisanStoryVideo;
