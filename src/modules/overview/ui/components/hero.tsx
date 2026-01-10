import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Hero = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div>
            <CardTitle className="text-3xl">Trace</CardTitle>
            <p className="text-muted-foreground mt-1">
              Ein Rückblick auf unser Basislehrjahr in Issues, Pull Requests und
              Commits
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="prose prose-sm max-w-none dark:prose-invert">
        <p className="text-base text-muted-foreground">
          Trace ist kein klassisches Projektmanagement-Tool. Es ist ein kleines
          Archiv unserer gemeinsamen Zeit im Basislehrjahr und zeigt, wie aus
          einzelnen Modulen, Projekten und Themen Schritt für Schritt
          Entwicklung entstanden ist.
        </p>
      </CardContent>
    </Card>
  );
};
