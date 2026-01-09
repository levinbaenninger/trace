import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
}

export const WorkflowStep = ({
  icon: Icon,
  step,
  title,
  description,
}: Props) => {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold mb-1">
          {step}. {title}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
