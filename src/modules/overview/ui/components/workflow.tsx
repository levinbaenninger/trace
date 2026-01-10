import { CircleDot, GitCommit, GitPullRequest } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkflowStep } from "./workflow-step";

export const Workflow = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Wie Trace funktioniert</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <WorkflowStep
            description="Issues stehen für Themen, Fragen und Aufgaben, mit denen wir uns beschäftigt haben. Manchmal ging es um ein ganzes Modul, manchmal um ein konkretes Problem oder eine Idee. Nicht alles war sofort klar und nicht alles hat auf Anhieb funktioniert. Genau das gehört zum Lernprozess dazu."
            icon={CircleDot}
            step="1"
            title="Issues"
          />

          <WorkflowStep
            description="Pull Requests zeigen den Weg zur Lösung. Sie verbinden Arbeit mit den ursprünglichen Themen und machen sichtbar, wie wir vorgegangen sind. Hier sieht man Versuche, Feedback, Anpassungen und gemeinsame Entscheidungen."
            icon={GitPullRequest}
            step="2"
            title="Pull Requests"
          />

          <WorkflowStep
            description="Commits sind die tatsächlichen Fortschritte, die wir gemacht haben. Sie sind die Grundlage für alles andere. Ohne Commits gäbe es keine Trace."
            icon={GitCommit}
            step="3"
            title="Commits"
          />
        </div>
      </CardContent>
    </Card>
  );
};
