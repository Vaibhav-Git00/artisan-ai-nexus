import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Mic,
  Video,
  Upload,
  X,
  Loader2,
  Save,
  FileText,
  Music,
  Film
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/sonner';

interface StorySubmissionFormProps {
  productId?: string;
  onSuccess?: (storyId: string) => void;
}

const StorySubmissionForm: React.FC<StorySubmissionFormProps> = ({
  productId,
  onSuccess
}) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [region, setRegion] = useState('');
  const [culturalTags, setCulturalTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');

  const audioInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Handle audio file selection
  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.size > 50 * 1024 * 1024) {
      setError('Audio file is too large. Maximum size is 50MB.');
      return;
    }

    setAudioFile(file);
    setError('');
  };

  // Handle video file selection
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.size > 50 * 1024 * 1024) {
      setError('Video file is too large. Maximum size is 50MB.');
      return;
    }

    setVideoFile(file);
    setError('');
  };

  // Trigger audio file input click
  const handleAudioUploadClick = () => {
    audioInputRef.current?.click();
  };

  // Trigger video file input click
  const handleVideoUploadClick = () => {
    videoInputRef.current?.click();
  };

  // Remove audio file
  const handleRemoveAudio = () => {
    setAudioFile(null);
    if (audioInputRef.current) {
      audioInputRef.current.value = '';
    }
  };

  // Remove video file
  const handleRemoveVideo = () => {
    setVideoFile(null);
    if (videoInputRef.current) {
      videoInputRef.current.value = '';
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!title || !content) {
      setError('Please provide a title and story content');
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);
    setError('');

    try {
      // Simulate API call with progress updates
      const simulateUpload = () => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setUploadProgress(progress);

          if (progress >= 100) {
            clearInterval(interval);

            // Create a mock story object
            const storyId = `story-${Date.now()}`;
            const mockStory = {
              _id: storyId,
              title: title,
              content: content,
              mediaType: videoFile ? 'video' : (audioFile ? 'audio' : 'text'),
              mediaUrls: [],
              region: region,
              culturalTags: culturalTags ? culturalTags.split(',').map(tag => tag.trim()) : [],
              createdAt: new Date().toISOString()
            };

            // Add media URLs if files were selected
            if (videoFile) {
              // For demo purposes, use a sample video URL
              mockStory.mediaUrls.push('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
            }

            if (audioFile) {
              // For demo purposes, use a sample audio URL
              mockStory.mediaUrls.push('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
            }

            // Save to localStorage for persistence
            try {
              // Get existing stories or create empty array
              const existingStoriesStr = localStorage.getItem('artisan_stories');
              const existingStories = existingStoriesStr ? JSON.parse(existingStoriesStr) : [];

              // Add new story
              existingStories.unshift(mockStory);

              // Save back to localStorage
              localStorage.setItem('artisan_stories', JSON.stringify(existingStories));

              // Show success message
              toast.success('Your story has been submitted successfully!');

              // Handle success
              if (onSuccess) {
                onSuccess(storyId);
              } else if (productId) {
                // Redirect to product detail page
                navigate(`/products/${productId}`);
              } else {
                // Reset form
                setTitle('');
                setContent('');
                setAudioFile(null);
                setVideoFile(null);
                setRegion('');
                setCulturalTags('');
                setUploadProgress(0);
              }
            } catch (storageError) {
              console.error('Error saving to localStorage:', storageError);
              setError('Failed to save your story. Please try again.');
            }

            setIsSubmitting(false);
          }
        }, 300);
      };

      // Start the simulated upload
      simulateUpload();
    } catch (error) {
      console.error('Error submitting story:', error);
      setError('Failed to submit your story. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Share Your Story</CardTitle>
        <CardDescription>
          Tell the world about your craft, traditions, and the story behind your creations
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Story Title</Label>
            <Input
              id="title"
              placeholder="Give your story a title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {/* Story Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Your Story</Label>
            <Textarea
              id="content"
              placeholder="Share your craft's story, traditions, and techniques..."
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isSubmitting}
              className="resize-none"
            />
          </div>

          {/* Audio Upload */}
          <div className="space-y-2">
            <Label>Audio Recording (Optional)</Label>
            <div className="flex items-center gap-4">
              {!audioFile ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAudioUploadClick}
                  disabled={isSubmitting}
                  className="flex items-center gap-2"
                >
                  <Mic size={16} />
                  Upload Audio
                </Button>
              ) : (
                <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/20 w-full">
                  <Music size={20} className="text-muted-foreground" />
                  <div className="flex-1 truncate">
                    <p className="text-sm font-medium truncate">{audioFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleRemoveAudio}
                    disabled={isSubmitting}
                    className="h-8 w-8"
                  >
                    <X size={16} />
                  </Button>
                </div>
              )}
              <input
                type="file"
                ref={audioInputRef}
                accept="audio/*"
                onChange={handleAudioChange}
                className="hidden"
                disabled={isSubmitting}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Upload an MP3 or other audio file (max 50MB)
            </p>
          </div>

          {/* Video Upload */}
          <div className="space-y-2">
            <Label>Video Recording (Optional)</Label>
            <div className="flex items-center gap-4">
              {!videoFile ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleVideoUploadClick}
                  disabled={isSubmitting}
                  className="flex items-center gap-2"
                >
                  <Video size={16} />
                  Upload Video
                </Button>
              ) : (
                <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/20 w-full">
                  <Film size={20} className="text-muted-foreground" />
                  <div className="flex-1 truncate">
                    <p className="text-sm font-medium truncate">{videoFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleRemoveVideo}
                    disabled={isSubmitting}
                    className="h-8 w-8"
                  >
                    <X size={16} />
                  </Button>
                </div>
              )}
              <input
                type="file"
                ref={videoInputRef}
                accept="video/*"
                onChange={handleVideoChange}
                className="hidden"
                disabled={isSubmitting}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Upload an MP4 or other video file (max 50MB)
            </p>
          </div>

          {/* Region */}
          <div className="space-y-2">
            <Label htmlFor="region">Region (Optional)</Label>
            <Select
              value={region}
              onValueChange={setRegion}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="North India">North India</SelectItem>
                <SelectItem value="South India">South India</SelectItem>
                <SelectItem value="East India">East India</SelectItem>
                <SelectItem value="West India">West India</SelectItem>
                <SelectItem value="Central India">Central India</SelectItem>
                <SelectItem value="Northeast India">Northeast India</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cultural Tags */}
          <div className="space-y-2">
            <Label htmlFor="culturalTags">Cultural Tags (Optional)</Label>
            <Input
              id="culturalTags"
              placeholder="e.g., traditional, heritage, tribal (comma-separated)"
              value={culturalTags}
              onChange={(e) => setCulturalTags(e.target.value)}
              disabled={isSubmitting}
            />
            <p className="text-xs text-muted-foreground">
              Add tags to help others discover your story
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          {/* Upload Progress */}
          {isSubmitting && uploadProgress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
        </form>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            if (productId) {
              navigate(`/products/${productId}`);
            } else {
              navigate(-1);
            }
          }}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-artisan-terracotta hover:bg-artisan-terracotta/90"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Save size={16} className="mr-2" />
              Submit Story
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StorySubmissionForm;
