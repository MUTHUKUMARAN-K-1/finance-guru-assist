
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cva, type VariantProps } from "class-variance-authority";

const statVariants = cva("", {
  variants: {
    trend: {
      positive: "text-finance-success",
      negative: "text-finance-danger",
      neutral: "text-muted-foreground",
    },
  },
  defaultVariants: {
    trend: "neutral",
  },
});

interface StatCardProps extends VariantProps<typeof statVariants> {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  trend?: "positive" | "negative" | "neutral";
  trendValue?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon,
  description,
  trend,
  trendValue,
  className,
  ...props
}: StatCardProps) {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <span className="text-sm font-medium">{title}</span>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        
        {(description || trendValue) && (
          <div className="flex items-center mt-1">
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
            {trendValue && (
              <p className={cn("text-xs ml-2", statVariants({ trend }))}>
                {trendValue}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
