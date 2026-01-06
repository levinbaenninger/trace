import { CircleDot, GitMerge, GitPullRequest } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OverviewPage = () => {
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Hero Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div>
              <CardTitle className="text-3xl">Trace</CardTitle>
              <p className="text-muted-foreground mt-1">
                Ein Rückblick auf unser Basislehrjahr in Issues, Pull Requests
                und Commits
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
          <p className="text-base text-muted-foreground">
            Trace ist kein klassisches Projektmanagement-Tool. Es ist ein
            kleines Archiv unserer gemeinsamen Zeit im Basislehrjahr und zeigt,
            wie aus einzelnen Modulen, Projekten und Themen Schritt für Schritt
            Entwicklung entstanden ist.
          </p>
        </CardContent>
      </Card>

      {/* Workflow Section */}
      <Card>
        <CardHeader>
          <CardTitle>Wie Trace funktioniert</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <CircleDot className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">1. Issues</h3>
                <p className="text-sm text-muted-foreground">
                  Issues stehen für Themen, Fragen und Aufgaben, mit denen wir
                  uns beschäftigt haben. Manchmal ging es um ein ganzes Modul,
                  manchmal um ein konkretes Problem oder eine Idee. Nicht alles
                  war sofort klar und nicht alles hat auf Anhieb funktioniert.
                  Genau das gehört zum Lernprozess dazu.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <GitPullRequest className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">2. Pull Requests</h3>
                <p className="text-sm text-muted-foreground">
                  Pull Requests zeigen den Weg zur Lösung. Sie verbinden Arbeit
                  mit den ursprünglichen Themen und machen sichtbar, wie wir
                  vorgegangen sind. Hier sieht man Versuche, Feedback,
                  Anpassungen und gemeinsame Entscheidungen.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <GitMerge className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">3. Commits</h3>
                <p className="text-sm text-muted-foreground">
                  Commits sind die tatsächlichen Fortschritte, die wir gemacht
                  haben. Sie sind die Grundlage für alles andere. Ohne Commits
                  gäbe es keine Trace.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewPage;
