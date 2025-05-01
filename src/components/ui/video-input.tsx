import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Video,
  Upload,
  X,
  Youtube,
  ExternalLink,
  Play,
  Loader2
} from 'lucide-react';

interface VideoInputProps {
  onChange: (value: { url: string; type: 'youtube' | 'vimeo' | 'upload' | null }) => void;
  value?: { url: string; type: 'youtube' | 'vimeo' | 'upload' | null };
  disabled?: boolean;
}

const VideoInput: React.FC<VideoInputProps> = ({
  onChange,
  value = { url: '', type: null },
  disabled = false
}) => {
  const [videoType, setVideoType] = useState<'youtube' | 'vimeo' | 'upload' | null>(value.type);
  const [videoUrl, setVideoUrl] = useState<string>(value.url || '');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle video type change
  const handleTypeChange = (type: 'youtube' | 'vimeo' | 'upload' | null) => {
    setVideoType(type);
    setVideoUrl('');
    setVideoFile(null);
    setPreviewUrl('');
    onChange({ url: '', type });
  };
  
  // Handle URL input change
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setVideoUrl(url);
    
    // Extract video ID and create preview URL
    if (videoType === 'youtube') {
      // Extract YouTube video ID
      const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
      const match = url.match(youtubeRegex);
      
      if (match && match[1]) {
        const videoId = match[1];
        setPreviewUrl(`https://img.youtube.com/vi/${videoId}/0.jpg`);
      } else {
        setPreviewUrl('');
      }
    } else if (videoType === 'vimeo') {
      // For Vimeo, we can't easily get the thumbnail without an API call
      // So we'll just use a placeholder for now
      setPreviewUrl('https://i.vimeocdn.com/video/default_1280x720.jpg');
    }
    
    onChange({ url, type: videoType });
  };
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Check file size (limit to 50MB)
    if (file.size > 50 * 1024 * 1024) {
      alert('File is too large. Maximum size is 50MB.');
      return;
    }
    
    setVideoFile(file);
    
    // Create a preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setVideoUrl(file.name);
    
    // Simulate upload progress
    simulateUpload(file);
    
    onChange({ url: file.name, type: 'upload' });
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Simulate file upload with progress
  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const totalSize = file.size;
    let uploadedSize = 0;
    const chunkSize = totalSize / 10; // Divide into 10 chunks
    
    const interval = setInterval(() => {
      uploadedSize += chunkSize;
      const progress = Math.min(Math.round((uploadedSize / totalSize) * 100), 100);
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
      }
    }, 300);
  };
  
  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  // Remove video
  const handleRemoveVideo = () => {
    setVideoType(null);
    setVideoUrl('');
    setVideoFile(null);
    setPreviewUrl('');
    setIsUploading(false);
    setUploadProgress(0);
    onChange({ url: '', type: null });
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Video Type</Label>
        <Select
          value={videoType || ''}
          onValueChange={(value) => handleTypeChange(value as any)}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select video type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="youtube">
              <div className="flex items-center">
                <Youtube size={16} className="mr-2 text-red-600" />
                YouTube Link
              </div>
            </SelectItem>
            <SelectItem value="vimeo">
              <div className="flex items-center">
                <ExternalLink size={16} className="mr-2 text-blue-600" />
                Vimeo Link
              </div>
            </SelectItem>
            <SelectItem value="upload">
              <div className="flex items-center">
                <Upload size={16} className="mr-2" />
                Upload Video
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {videoType === 'youtube' && (
        <div className="space-y-2">
          <Label>YouTube Video URL</Label>
          <Input
            placeholder="https://www.youtube.com/watch?v=..."
            value={videoUrl}
            onChange={handleUrlChange}
            disabled={disabled}
          />
          <p className="text-xs text-muted-foreground">
            Paste the full YouTube video URL
          </p>
        </div>
      )}
      
      {videoType === 'vimeo' && (
        <div className="space-y-2">
          <Label>Vimeo Video URL</Label>
          <Input
            placeholder="https://vimeo.com/..."
            value={videoUrl}
            onChange={handleUrlChange}
            disabled={disabled}
          />
          <p className="text-xs text-muted-foreground">
            Paste the full Vimeo video URL
          </p>
        </div>
      )}
      
      {videoType === 'upload' && (
        <div className="space-y-2">
          <Label>Upload Video</Label>
          <div className="space-y-4">
            {!videoFile && !isUploading && (
              <Button
                type="button"
                variant="outline"
                onClick={handleUploadClick}
                disabled={disabled}
                className="w-full"
              >
                <Upload size={16} className="mr-2" />
                Select Video File
              </Button>
            )}
            
            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center">
                    <Loader2 size={14} className="mr-2 animate-spin" />
                    Uploading...
                  </span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-artisan-terracotta rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            <input
              type="file"
              ref={fileInputRef}
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={disabled}
            />
            
            <p className="text-xs text-muted-foreground">
              Upload an MP4 or other video file (max 50MB)
            </p>
          </div>
        </div>
      )}
      
      {/* Preview */}
      {previewUrl && (
        <div className="relative rounded-lg overflow-hidden border">
          <div className="aspect-video relative">
            <img
              src={previewUrl}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <Button
                size="icon"
                className="rounded-full h-12 w-12 bg-artisan-terracotta/90 hover:bg-artisan-terracotta"
              >
                <Play size={24} />
              </Button>
            </div>
          </div>
          
          <div className="p-2 bg-muted/20 flex items-center justify-between">
            <div className="truncate text-sm">
              {videoType === 'upload' ? videoUrl : 'Video Preview'}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleRemoveVideo}
              disabled={disabled}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <X size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoInput;
