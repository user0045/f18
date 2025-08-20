
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, Eye, Search, ChevronLeft, ChevronRight, AlertTriangle, Calendar, User, FileText } from 'lucide-react';
import { useContentIssues, useDeleteContentIssue, useUpdateContentIssueStatus } from '@/hooks/useContentIssues';

const IssuesTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { data: issues = [], isLoading, error } = useContentIssues();
  const deleteIssueMutation = useDeleteContentIssue();
  const updateStatusMutation = useUpdateContentIssueStatus();

  const itemsPerPage = 10;

  // Filter and search issues
  const filteredIssues = issues.filter((issue: any) => {
    const matchesSearch = issue.content_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || issue.content_type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredIssues.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentIssues = filteredIssues.slice(startIndex, endIndex);

  const [deleteConfirm, setDeleteConfirm] = useState<any>(null);

  const handleDeleteIssue = (issue: any) => {
    setDeleteConfirm(issue);
  };

  const confirmDelete = async () => {
    if (deleteConfirm) {
      try {
        await deleteIssueMutation.mutateAsync(deleteConfirm.id);
        setDeleteConfirm(null);
      } catch (error) {
        console.error('Error deleting issue:', error);
      }
    }
  };

  const handleStatusChange = async (issueId: string, status: string) => {
    updateStatusMutation.mutate({ issueId, status });
  };

  const openIssueDetail = (issue: any) => {
    setSelectedIssue(issue);
    setIsDetailOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30', label: 'Pending' },
      resolved: { color: 'bg-green-500/20 text-green-300 border-green-500/30', label: 'Resolved' },
      rejected: { color: 'bg-red-500/20 text-red-300 border-red-500/30', label: 'Rejected' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Badge className={`${config.color} border`}>
        {config.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <div className="text-lg text-primary">Loading content issues...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <div className="text-lg text-red-400">Error loading content issues</div>
          <div className="text-sm text-muted-foreground mt-2">
            Please try refreshing the page
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Content Issues</h2>
          <p className="text-muted-foreground">
            Manage user-reported content issues ({issues.length} total)
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="bg-gradient-to-br from-black/40 via-[#0A7D4B]/10 to-black/40 backdrop-blur-sm border border-border/30">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by content title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                />
              </div>
            </div>
            
            

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px] bg-background/50 border-border/50">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Movie">Movie</SelectItem>
                <SelectItem value="Web Series">Web Series</SelectItem>
                <SelectItem value="Show">TV Show</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Issues Table */}
      <Card className="bg-gradient-to-br from-black/40 via-[#0A7D4B]/10 to-black/40 backdrop-blur-sm border border-border/30">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border/30">
                <TableHead className="text-foreground">Content</TableHead>
                <TableHead className="text-foreground">Type</TableHead>
                <TableHead className="text-foreground">Season/Episode</TableHead>
                <TableHead className="text-foreground">Submitted</TableHead>
                <TableHead className="text-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentIssues.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <div className="text-lg text-muted-foreground">No issues found</div>
                    <div className="text-sm text-muted-foreground mt-2">
                      {searchTerm || typeFilter !== 'all'
                        ? 'Try adjusting your filters'
                        : 'No content issues have been reported yet'}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                currentIssues.map((issue: any) => (
                  <TableRow key={issue.id} className="border-border/20">
                    <TableCell className="text-foreground max-w-[200px]">
                      <div className="truncate font-medium">{issue.content_title}</div>
                      {issue.description && (
                        <div className="text-xs text-muted-foreground truncate mt-1">
                          {issue.description}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {issue.content_type}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {issue.content_type === 'Web Series' && issue.season_number && (
                        <div>S{issue.season_number}</div>
                      )}
                      {(issue.content_type === 'Web Series' || issue.content_type === 'Show') && issue.episode_number && (
                        <div>E{issue.episode_number}</div>
                      )}
                      {!issue.season_number && !issue.episode_number && '-'}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDate(issue.created_at)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openIssueDetail(issue)}
                          className="bg-blue-500/10 border-blue-500/30 text-blue-300 hover:bg-blue-500/20"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteIssue(issue)}
                          className="bg-red-500/10 border-red-500/30 text-red-300 hover:bg-red-500/20"
                          disabled={deleteIssueMutation.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-border/30">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredIssues.length)} of {filteredIssues.length} issues
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="bg-background/20 hover:bg-background/30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium text-foreground">
                  {currentPage} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="bg-background/20 hover:bg-background/30"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Issue Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-black/90 via-[#0A7D4B]/20 to-black/90 backdrop-blur-sm border border-border/50">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Content Issue Details
            </DialogTitle>
          </DialogHeader>

          {selectedIssue && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Content Title</label>
                  <div className="text-foreground font-medium">{selectedIssue.content_title}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Content Type</label>
                  <div className="text-foreground">{selectedIssue.content_type}</div>
                </div>
              </div>

              {(selectedIssue.season_number || selectedIssue.episode_number) && (
                <div className="grid grid-cols-2 gap-4">
                  {selectedIssue.season_number && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Season</label>
                      <div className="text-foreground">Season {selectedIssue.season_number}</div>
                    </div>
                  )}
                  {selectedIssue.episode_number && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Episode</label>
                      <div className="text-foreground">Episode {selectedIssue.episode_number}</div>
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-muted-foreground">User IP</label>
                <div className="text-foreground font-mono text-sm">{selectedIssue.user_ip}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Submitted</label>
                  <div className="text-foreground text-sm flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(selectedIssue.created_at)}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                  <div className="text-foreground text-sm flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(selectedIssue.updated_at)}
                  </div>
                </div>
              </div>

              {selectedIssue.description && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    Issue Description
                  </label>
                  <div className="mt-2 p-3 bg-background/30 rounded-lg border border-border/30">
                    <div className="text-foreground whitespace-pre-wrap">{selectedIssue.description}</div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDetailOpen(false)}
                  className="bg-background/20 hover:bg-background/30 border-border/50"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="sm:max-w-[400px] bg-gradient-to-br from-black/90 via-[#0A7D4B]/20 to-black/90 backdrop-blur-sm border border-border/50">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-400" />
              Delete Content Issue
            </DialogTitle>
          </DialogHeader>

          {deleteConfirm && (
            <div className="space-y-4">
              <div className="text-muted-foreground">
                Are you sure you want to delete this content issue for "{deleteConfirm.content_title}"? 
                This action cannot be undone.
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setDeleteConfirm(null)}
                  className="bg-background/20 hover:bg-background/30 border-border/50"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={confirmDelete}
                  disabled={deleteIssueMutation.isPending}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  {deleteIssueMutation.isPending ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IssuesTab;
