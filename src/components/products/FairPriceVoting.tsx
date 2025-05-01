import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, ThumbsDown, DollarSign, BarChart3 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface FairPriceVotingProps {
  productId: string;
  currentPrice: number;
  suggestedPrice?: number;
  communityRatings?: Array<{
    rating: number;
    comment: string;
  }>;
  onVoteSubmit?: (data: {
    productId: string;
    rating: number;
    suggestedPrice: number;
    comment: string;
  }) => void;
}

const FairPriceVoting: React.FC<FairPriceVotingProps> = ({
  productId,
  currentPrice,
  suggestedPrice,
  communityRatings = [],
  onVoteSubmit
}) => {
  const [voteType, setVoteType] = useState<'fair' | 'low' | 'high' | null>(null);
  const [suggestedPriceValue, setSuggestedPriceValue] = useState<number>(
    suggestedPrice || currentPrice
  );
  const [comment, setComment] = useState('');
  const [showSuggestionForm, setShowSuggestionForm] = useState(false);
  
  // Format the price with commas and currency symbol
  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };
  
  // Calculate rating based on vote type
  const getRatingFromVoteType = (type: 'fair' | 'low' | 'high' | null): number => {
    switch (type) {
      case 'fair': return 0; // 0 means price is fair
      case 'low': return -1; // -1 means price is too low
      case 'high': return 1; // 1 means price is too high
      default: return 0;
    }
  };
  
  // Handle vote submission
  const handleSubmit = () => {
    if (!voteType) {
      toast.error('Please select whether the price is fair, too low, or too high');
      return;
    }
    
    if (onVoteSubmit) {
      onVoteSubmit({
        productId,
        rating: getRatingFromVoteType(voteType),
        suggestedPrice: suggestedPriceValue,
        comment
      });
    }
    
    toast.success('Thank you for your feedback on fair pricing!');
    setShowSuggestionForm(false);
  };
  
  // Calculate distribution of votes
  const calculateVoteDistribution = () => {
    if (!communityRatings || communityRatings.length === 0) {
      return { fair: 0, low: 0, high: 0, total: 0 };
    }
    
    const distribution = communityRatings.reduce(
      (acc, rating) => {
        if (rating.rating === 0) acc.fair += 1;
        else if (rating.rating < 0) acc.low += 1;
        else acc.high += 1;
        
        acc.total += 1;
        return acc;
      },
      { fair: 0, low: 0, high: 0, total: 0 }
    );
    
    return distribution;
  };
  
  const voteDistribution = calculateVoteDistribution();
  
  // Calculate percentages for the chart
  const getPercentage = (count: number) => {
    if (voteDistribution.total === 0) return 0;
    return Math.round((count / voteDistribution.total) * 100);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <DollarSign className="mr-2 text-yellow-600" size={20} />
          Fair Price Evaluation
        </CardTitle>
        <CardDescription>
          Help ensure artisans receive fair compensation for their craft
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Current Price */}
        <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
          <div>
            <p className="text-sm text-muted-foreground">Current Price</p>
            <p className="text-2xl font-semibold">{formatPrice(currentPrice)}</p>
          </div>
          
          {suggestedPrice && suggestedPrice !== currentPrice && (
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Community Suggests</p>
              <p className="text-lg font-medium text-artisan-terracotta">
                {formatPrice(suggestedPrice)}
              </p>
            </div>
          )}
        </div>
        
        {/* Voting Buttons */}
        {!showSuggestionForm && (
          <div className="space-y-4">
            <p className="font-medium">Is this price fair to the artisan?</p>
            
            <div className="flex gap-2">
              <Button 
                variant={voteType === 'low' ? 'default' : 'outline'} 
                className={`flex-1 ${voteType === 'low' ? 'bg-blue-600' : ''}`}
                onClick={() => setVoteType('low')}
              >
                <ThumbsDown size={16} className="mr-2" /> Too Low
              </Button>
              <Button 
                variant={voteType === 'fair' ? 'default' : 'outline'}
                className={`flex-1 ${voteType === 'fair' ? 'bg-green-600' : ''}`}
                onClick={() => setVoteType('fair')}
              >
                <ThumbsUp size={16} className="mr-2" /> Fair
              </Button>
              <Button 
                variant={voteType === 'high' ? 'default' : 'outline'}
                className={`flex-1 ${voteType === 'high' ? 'bg-orange-600' : ''}`}
                onClick={() => setVoteType('high')}
              >
                <ThumbsDown size={16} className="mr-2" /> Too High
              </Button>
            </div>
            
            {voteType && voteType !== 'fair' && (
              <Button 
                variant="link" 
                onClick={() => setShowSuggestionForm(true)}
                className="p-0 h-auto text-artisan-terracotta"
              >
                Suggest a fair price
              </Button>
            )}
          </div>
        )}
        
        {/* Price Suggestion Form */}
        {showSuggestionForm && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="suggestedPrice">What would be a fair price?</Label>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg">₹</span>
                <Input
                  id="suggestedPrice"
                  type="number"
                  min={Math.max(1, currentPrice * 0.5)}
                  max={currentPrice * 2}
                  value={suggestedPriceValue}
                  onChange={(e) => setSuggestedPriceValue(Number(e.target.value))}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="priceSlider">Adjust Price</Label>
              <Slider
                id="priceSlider"
                value={[suggestedPriceValue]}
                min={Math.max(1, currentPrice * 0.5)}
                max={currentPrice * 2}
                step={10}
                onValueChange={(value) => setSuggestedPriceValue(value[0])}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{formatPrice(Math.max(1, currentPrice * 0.5))}</span>
                <span>{formatPrice(currentPrice)}</span>
                <span>{formatPrice(currentPrice * 2)}</span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="comment">Why do you think this is a fair price? (Optional)</Label>
              <Textarea
                id="comment"
                placeholder="Share your reasoning for suggesting this price..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowSuggestionForm(false)}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={handleSubmit}
                className="flex-1 bg-artisan-terracotta hover:bg-artisan-terracotta/90"
              >
                Submit Suggestion
              </Button>
            </div>
          </div>
        )}
        
        {/* Community Voting Stats */}
        {voteDistribution.total > 0 && !showSuggestionForm && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium flex items-center">
                <BarChart3 size={16} className="mr-2 text-muted-foreground" />
                Community Feedback
              </h4>
              <span className="text-sm text-muted-foreground">
                {voteDistribution.total} votes
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Fair Price</span>
                <span>{getPercentage(voteDistribution.fair)}%</span>
              </div>
              <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-green-600 h-full" 
                  style={{ width: `${getPercentage(voteDistribution.fair)}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span>Too Low</span>
                <span>{getPercentage(voteDistribution.low)}%</span>
              </div>
              <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full" 
                  style={{ width: `${getPercentage(voteDistribution.low)}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span>Too High</span>
                <span>{getPercentage(voteDistribution.high)}%</span>
              </div>
              <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-orange-600 h-full" 
                  style={{ width: `${getPercentage(voteDistribution.high)}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      {!showSuggestionForm && (
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            size="sm"
            className="text-xs"
            onClick={() => {
              toast.info('Thank you for your interest in fair pricing. Your feedback helps artisans receive fair compensation for their craft.');
            }}
          >
            Learn about fair pricing
          </Button>
          
          {voteType && (
            <Button 
              size="sm"
              onClick={handleSubmit}
              className="bg-artisan-terracotta hover:bg-artisan-terracotta/90"
            >
              Submit Vote
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default FairPriceVoting;
