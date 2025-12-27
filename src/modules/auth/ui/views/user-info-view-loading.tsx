import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const UserInfoViewLoading = () => {
  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="mb-1 flex justify-center">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <Skeleton className="mx-auto h-7 w-40" />
        <Skeleton className="mx-auto h-4 w-48" />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
};
