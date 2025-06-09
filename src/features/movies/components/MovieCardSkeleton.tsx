import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const MovieCardSkeleton = () => {
  return (
    <Card className="overflow-hidden animate-pulse">
      <CardHeader className="p-0">
        <Skeleton className="h-[330px] w-full" />
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
    </Card>
  );
};
