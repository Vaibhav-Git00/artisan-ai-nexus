import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Mic,
  Video,
  Edit,
  User
} from 'lucide-react';

interface Story {
  _id: string;
  title: string;
  content: string;
  mediaType: string;
  mediaUrls: string[];
}

interface Artisan {
  _id: string;
  name: string;
  location: string;
  bio: string;
  profileImage: string;
}

interface MeetTheMakerProps {
  artisan: Artisan;
  story?: Story | null;
  productId: string;
  isOwner?: boolean;
}

// Sample story data for testing
const sampleStory: Story = {
  _id: 'sample-story-1',
  title: 'The Art of Traditional Craftsmanship',
  content: 'I learned this craft from my grandmother when I was just 10 years old. Our family has practiced this art form for five generations, and each piece tells a story from our cultural heritage.\n\nTraditionally, these pieces were created using techniques passed down through generations. I use only natural materials sourced locally from our region.\n\nThis particular piece took me 12 days to complete. The intricate patterns represent the connection between earth and heaven, between our roots and our aspirations. Each symbol has a meaning in our tradition.',
  mediaType: 'video',
  mediaUrls: [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32'
  ]
};

const MeetTheMaker: React.FC<MeetTheMakerProps> = ({
  artisan,
  story: propStory,
  productId,
  isOwner = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [story, setStory] = useState<Story | null>(propStory || null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Use sample story if no story is provided
  useEffect(() => {
    if (!propStory && isOwner) {
      // Only show sample story for the owner
      setStory(sampleStory);
    }
  }, [propStory, isOwner]);

  // Format time in MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Handle play/pause
  const togglePlay = () => {
    if (story?.mediaType === 'audio' && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else if ((story?.mediaType === 'video' || story?.mediaType === 'mixed') && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle mute/unmute
  const toggleMute = () => {
    if (story?.mediaType === 'audio' && audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    } else if ((story?.mediaType === 'video' || story?.mediaType === 'mixed') && videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle time update
  const handleTimeUpdate = () => {
    if (story?.mediaType === 'audio' && audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setCurrentTime(current);
      setProgress((current / duration) * 100);
    } else if ((story?.mediaType === 'video' || story?.mediaType === 'mixed') && videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setCurrentTime(current);
      setProgress((current / duration) * 100);
    }
  };

  // Handle duration change
  const handleDurationChange = () => {
    if (story?.mediaType === 'audio' && audioRef.current) {
      setDuration(audioRef.current.duration);
    } else if ((story?.mediaType === 'video' || story?.mediaType === 'mixed') && videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Handle seeking
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;

    if (story?.mediaType === 'audio' && audioRef.current) {
      audioRef.current.currentTime = pos * audioRef.current.duration;
    } else if ((story?.mediaType === 'video' || story?.mediaType === 'mixed') && videoRef.current) {
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  // Handle end of media
  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <User size={18} className="mr-2 text-artisan-terracotta" />
          Meet the Maker
        </CardTitle>
        <CardDescription>
          Learn about the artisan and the story behind this creation
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Artisan Info */}
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <img
              src={artisan.profileImage || 'https://via.placeholder.com/100x100?text=A'}
              alt={artisan.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-medium">{artisan.name}</h3>
            <p className="text-sm text-muted-foreground">{artisan.location}</p>
            {artisan.bio && (
              <p className="text-sm mt-1">{artisan.bio}</p>
            )}
          </div>
        </div>

        {/* Story Content */}
        {story ? (
          <div className="space-y-4">
            {story.title && (
              <h4 className="text-md font-medium">{story.title}</h4>
            )}

            {story.content && (
              <div className="text-sm">
                {story.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-2">{paragraph}</p>
                ))}
              </div>
            )}

            {/* Audio Player */}
            {story.mediaType === 'audio' && story.mediaUrls && story.mediaUrls.length > 0 && (
              <div className="mt-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full h-10 w-10"
                      onClick={togglePlay}
                    >
                      {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </Button>

                    <div
                      className="flex-1 h-2 bg-gray-200 rounded-full cursor-pointer"
                      onClick={handleSeek}
                    >
                      <div
                        className="h-2 bg-artisan-terracotta rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={toggleMute}
                    >
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </Button>

                    <span className="text-sm text-muted-foreground min-w-[40px] text-right">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <audio
                    ref={audioRef}
                    src={story.mediaUrls[0]}
                    onTimeUpdate={handleTimeUpdate}
                    onDurationChange={handleDurationChange}
                    onEnded={handleEnded}
                    className="hidden"
                  />

                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mic size={14} className="mr-1" />
                    <span>Audio story by {artisan.name}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Video Player */}
            {(story.mediaType === 'video' || story.mediaType === 'mixed') &&
             story.mediaUrls &&
             story.mediaUrls.some(url => url.includes('/video/')) && (
              <div className="mt-4">
                <div className="relative rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    src={story.mediaUrls.find(url => url.includes('/video/'))}
                    poster={story.mediaUrls.find(url => url.includes('/images/')) || ''}
                    controls={false}
                    className="w-full aspect-video object-cover"
                    onTimeUpdate={handleTimeUpdate}
                    onDurationChange={handleDurationChange}
                    onEnded={handleEnded}
                  />

                  {!isPlaying && (
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

                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-white"
                      onClick={togglePlay}
                    >
                      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </Button>

                    <div
                      className="flex-1 h-1 bg-gray-500 rounded-full cursor-pointer"
                      onClick={handleSeek}
                    >
                      <div
                        className="h-1 bg-artisan-terracotta rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-white"
                      onClick={toggleMute}
                    >
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </Button>

                    <span className="text-xs text-white min-w-[60px] text-right">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-sm text-muted-foreground mt-2">
                  <Video size={14} className="mr-1" />
                  <span>Video story by {artisan.name}</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">
              No story has been shared for this product yet.
            </p>

            {isOwner && (
              <Button asChild className="bg-artisan-terracotta hover:bg-artisan-terracotta/90">
                <Link to={`/story-submission/${productId}`}>
                  <Edit size={16} className="mr-2" />
                  Share Your Story
                </Link>
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MeetTheMaker;
