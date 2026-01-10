"use client";

import { GitMerge } from "lucide-react";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";

interface MergeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
  issueCount: number;
}

export const MergeDialog = ({
  open,
  onOpenChange,
  onConfirm,
  isLoading,
  issueCount,
}: MergeDialogProps) => {
  const description = `Dies wird diesen Pull Request als merged markieren, einen Commit mit dem PR-Titel erstellen und ${issueCount} verbundene Issue${issueCount !== 1 ? "s" : ""} schliessen. Diese Aktion kann nicht rückgängig gemacht werden.`;

  return (
    <ResponsiveDialog
      description={description}
      onOpenChange={onOpenChange}
      open={open}
      title="Pull Request mergen"
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3 rounded-lg border p-4">
          <GitMerge className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" />
          <div className="space-y-2 text-sm">
            <p className="font-medium">Dies wird:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Dieser Pull Request als merged markieren</li>
              <li>Einen Commit mit dem PR-Titel erstellen</li>
              <li>
                {issueCount} verbundene Issue{issueCount !== 1 ? "s" : ""}{" "}
                schliessen
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2 lg:flex-row lg:justify-end">
          <Button
            className="w-full lg:w-auto"
            disabled={isLoading}
            onClick={() => onOpenChange(false)}
            variant="outline"
          >
            Abbrechen
          </Button>
          <Button
            className="w-full lg:w-auto"
            disabled={isLoading}
            onClick={onConfirm}
          >
            {isLoading ? "Mergen..." : "Pull Request mergen"}
          </Button>
        </div>
      </div>
    </ResponsiveDialog>
  );
};
