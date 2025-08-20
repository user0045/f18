
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

export const useContentIssues = () => {
  return useQuery({
    queryKey: ['content-issues'],
    queryFn: async () => {
      const response = await fetch('/api/content-issues');
      if (!response.ok) {
        throw new Error('Failed to fetch content issues');
      }
      return response.json();
    },
  });
};

export const useDeleteContentIssue = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (issueId: string) => {
      const response = await fetch(`/api/content-issues/${issueId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete content issue');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content-issues'] });
      toast({
        title: "Success",
        description: "Content issue deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete content issue",
        variant: "destructive"
      });
    },
  });
};

export const useUpdateContentIssueStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ issueId, status }: { issueId: string; status: string }) => {
      const response = await fetch(`/api/content-issues/${issueId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error('Failed to update content issue status');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content-issues'] });
      toast({
        title: "Success",
        description: "Content issue status updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update content issue status",
        variant: "destructive"
      });
    },
  });
};
