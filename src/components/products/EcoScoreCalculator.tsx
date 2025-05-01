import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Leaf, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface EcoScoreCalculatorProps {
  initialValues?: {
    materialsSustainability: number;
    productionProcess: number;
    packaging: number;
    transportFootprint: number;
  };
  onSave?: (scores: {
    score: number;
    materialsSustainability: number;
    productionProcess: number;
    packaging: number;
    transportFootprint: number;
  }) => void;
}

const EcoScoreCalculator: React.FC<EcoScoreCalculatorProps> = ({ 
  initialValues = {
    materialsSustainability: 5,
    productionProcess: 5,
    packaging: 5,
    transportFootprint: 5
  },
  onSave 
}) => {
  const [scores, setScores] = useState({
    materialsSustainability: initialValues.materialsSustainability,
    productionProcess: initialValues.productionProcess,
    packaging: initialValues.packaging,
    transportFootprint: initialValues.transportFootprint,
  });
  
  const [notes, setNotes] = useState({
    materialsSustainability: '',
    productionProcess: '',
    packaging: '',
    transportFootprint: '',
  });
  
  const [overallScore, setOverallScore] = useState(0);
  
  // Calculate overall score (weighted average)
  useEffect(() => {
    const weights = {
      materialsSustainability: 0.4, // 40% weight
      productionProcess: 0.3,       // 30% weight
      packaging: 0.2,               // 20% weight
      transportFootprint: 0.1       // 10% weight
    };
    
    const weightedScore = 
      (scores.materialsSustainability * weights.materialsSustainability) +
      (scores.productionProcess * weights.productionProcess) +
      (scores.packaging * weights.packaging) +
      (scores.transportFootprint * weights.transportFootprint);
    
    setOverallScore(parseFloat(weightedScore.toFixed(1)));
  }, [scores]);
  
  const handleSliderChange = (category: keyof typeof scores, value: number[]) => {
    setScores(prev => ({
      ...prev,
      [category]: value[0]
    }));
  };
  
  const handleNotesChange = (category: keyof typeof notes, value: string) => {
    setNotes(prev => ({
      ...prev,
      [category]: value
    }));
  };
  
  const handleSave = () => {
    if (onSave) {
      onSave({
        score: overallScore,
        ...scores
      });
    }
  };
  
  // Get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    if (score >= 4) return 'text-orange-600';
    return 'text-red-600';
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Leaf className="mr-2 text-green-600" size={20} />
          Eco-Score Calculator
        </CardTitle>
        <CardDescription>
          Evaluate the environmental impact of your product across multiple factors
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex items-center justify-between">
          <div>
            <h3 className="font-medium text-green-800">Overall Eco-Score</h3>
            <p className="text-sm text-green-700">Weighted average of all sustainability factors</p>
          </div>
          <div className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
            {overallScore.toFixed(1)}/10
          </div>
        </div>
        
        {/* Materials Sustainability */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium flex items-center">
              Materials Sustainability
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={16} className="ml-1 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Evaluate the sustainability of materials used in your product:</p>
                    <ul className="text-xs mt-1 list-disc pl-4">
                      <li>Natural/organic materials score higher</li>
                      <li>Recycled/upcycled materials score higher</li>
                      <li>Locally sourced materials score higher</li>
                      <li>Synthetic/non-biodegradable materials score lower</li>
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <span className={`font-medium ${getScoreColor(scores.materialsSustainability)}`}>
              {scores.materialsSustainability.toFixed(1)}/10
            </span>
          </div>
          
          <Slider
            value={[scores.materialsSustainability]}
            min={0}
            max={10}
            step={0.1}
            onValueChange={(value) => handleSliderChange('materialsSustainability', value)}
          />
          
          <Textarea
            placeholder="Notes about materials (e.g., natural dyes, organic cotton, recycled metals)"
            value={notes.materialsSustainability}
            onChange={(e) => handleNotesChange('materialsSustainability', e.target.value)}
            className="h-20"
          />
        </div>
        
        {/* Production Process */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium flex items-center">
              Production Process
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={16} className="ml-1 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Evaluate the sustainability of your production methods:</p>
                    <ul className="text-xs mt-1 list-disc pl-4">
                      <li>Hand-crafted methods score higher</li>
                      <li>Low energy consumption scores higher</li>
                      <li>Minimal waste production scores higher</li>
                      <li>Traditional techniques often score higher</li>
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <span className={`font-medium ${getScoreColor(scores.productionProcess)}`}>
              {scores.productionProcess.toFixed(1)}/10
            </span>
          </div>
          
          <Slider
            value={[scores.productionProcess]}
            min={0}
            max={10}
            step={0.1}
            onValueChange={(value) => handleSliderChange('productionProcess', value)}
          />
          
          <Textarea
            placeholder="Notes about production (e.g., hand-crafted, solar-powered workshop, traditional techniques)"
            value={notes.productionProcess}
            onChange={(e) => handleNotesChange('productionProcess', e.target.value)}
            className="h-20"
          />
        </div>
        
        {/* Packaging */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium flex items-center">
              Packaging
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={16} className="ml-1 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Evaluate the sustainability of your packaging:</p>
                    <ul className="text-xs mt-1 list-disc pl-4">
                      <li>Minimal packaging scores higher</li>
                      <li>Recycled/recyclable materials score higher</li>
                      <li>Biodegradable packaging scores higher</li>
                      <li>Plastic and excessive packaging score lower</li>
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <span className={`font-medium ${getScoreColor(scores.packaging)}`}>
              {scores.packaging.toFixed(1)}/10
            </span>
          </div>
          
          <Slider
            value={[scores.packaging]}
            min={0}
            max={10}
            step={0.1}
            onValueChange={(value) => handleSliderChange('packaging', value)}
          />
          
          <Textarea
            placeholder="Notes about packaging (e.g., recycled paper, minimal plastic, reusable containers)"
            value={notes.packaging}
            onChange={(e) => handleNotesChange('packaging', e.target.value)}
            className="h-20"
          />
        </div>
        
        {/* Transport Footprint */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium flex items-center">
              Transport Footprint
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={16} className="ml-1 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Evaluate the transportation impact of your product:</p>
                    <ul className="text-xs mt-1 list-disc pl-4">
                      <li>Locally sourced materials score higher</li>
                      <li>Shorter shipping distances score higher</li>
                      <li>Carbon offset shipping options score higher</li>
                      <li>International air freight scores lower</li>
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <span className={`font-medium ${getScoreColor(scores.transportFootprint)}`}>
              {scores.transportFootprint.toFixed(1)}/10
            </span>
          </div>
          
          <Slider
            value={[scores.transportFootprint]}
            min={0}
            max={10}
            step={0.1}
            onValueChange={(value) => handleSliderChange('transportFootprint', value)}
          />
          
          <Textarea
            placeholder="Notes about transportation (e.g., local materials, carbon offset shipping, distribution methods)"
            value={notes.transportFootprint}
            onChange={(e) => handleNotesChange('transportFootprint', e.target.value)}
            className="h-20"
          />
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleSave}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          <Leaf size={16} className="mr-2" />
          Save Eco-Score
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EcoScoreCalculator;
