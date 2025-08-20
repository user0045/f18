
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, X, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getUserIP } from '@/utils/ipUtils';

interface ContentIssueFormProps {
  isOpen: boolean;
  onClose: () => void;
  contentTitle: string;
  contentType: string;
  contentId: string;
  seasonNumber?: number;
  episodeNumber?: number;
  episodeTitle?: string;
}

const ContentIssueForm: React.FC<ContentIssueFormProps> = ({
  isOpen,
  onClose,
  contentTitle,
  contentType,
  contentId,
  seasonNumber,
  episodeNumber,
  episodeTitle
}) => {
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (description.length > 1000) {
      toast({
        title: "Error",
        description: "Description must be less than 1000 characters",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const userIP = await getUserIP();
      
      const response = await fetch('/api/content-issues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentTitle,
          contentType,
          contentId,
          seasonNumber,
          episodeNumber,
          description: description.trim() || null,
          userIP
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: "Success",
          description: "Your issue has been submitted successfully",
        });
        setDescription('');
        onClose();
      } else {
        const errorMsg = data.error === 'Rate limit exceeded' 
          ? `Rate limit exceeded. You can submit ${data.rate_limit_info?.max_total || 5} total issues in 2 hours and ${data.rate_limit_info?.max_content || 1} issue per content per hour.`
          : data.error || 'Failed to submit issue';
        
        toast({
          title: "Error",
          description: errorMsg,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error submitting issue:', error);
      toast({
        title: "Error",
        description: "Failed to submit issue. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setDescription('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-black/90 via-[#0A7D4B]/20 to-black/90 backdrop-blur-sm border border-border/50">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Report Content Issue
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-6 w-6 p-0 hover:bg-primary/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Card className="bg-gradient-to-br from-black/40 via-[#0A7D4B]/10 to-black/40 border border-primary/20">
            <CardContent className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Content Title</Label>
                  <Input 
                    value={contentTitle} 
                    readOnly 
                    className="bg-background/30 border-border/30 text-foreground cursor-default"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Content Type</Label>
                  <Input 
                    value={contentType} 
                    readOnly 
                    className="bg-background/30 border-border/30 text-foreground cursor-default"
                  />
                </div>
              </div>

              {(contentType === 'Web Series' || contentType === 'Show') && (
                <div className="grid grid-cols-2 gap-4">
                  {contentType === 'Web Series' && seasonNumber && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Season</Label>
                      <Input 
                        value={`Season ${seasonNumber}`} 
                        readOnly 
                        className="bg-background/30 border-border/30 text-foreground cursor-default"
                      />
                    </div>
                  )}
                  {episodeNumber && (
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Episode</Label>
                      <Input 
                        value={`Episode ${episodeNumber}${episodeTitle ? `: ${episodeTitle}` : ''}`} 
                        readOnly 
                        className="bg-background/30 border-border/30 text-foreground cursor-default"
                      />
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-foreground">
              Describe the Issue <span className="text-muted-foreground">(Optional)</span>
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please describe the issue you're experiencing with this content..."
              className="bg-background/50 border-border/50 focus:border-primary min-h-[100px] resize-none"
              maxLength={1000}
            />
            <div className="text-right">
              <span className={`text-xs ${description.length > 950 ? 'text-red-400' : 'text-muted-foreground'}`}>
                {description.length}/1000
              </span>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              disabled={isSubmitting}
              className="bg-background/20 hover:bg-background/30 border-border/50"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Issue
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContentIssueForm;
