import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { getAllAppsInfo } from "@/lib/privacy-policies";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policies | gguggulab Apps",
  description: "Privacy policies for all gguggulab mobile applications. Learn how we protect your privacy and handle your data.",
};

export default function PrivacyPolicyPage() {
  const apps = getAllAppsInfo();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Privacy Policies</h1>
        <p className="text-muted-foreground text-lg">
          Privacy policies for all gguggulab mobile applications
        </p>
      </div>

      {/* Apps List */}
      <div className="grid gap-6 md:grid-cols-2">
        {apps.map((app) => (
          <Card key={app.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {app.name}
                <ExternalLink className="h-5 w-5 text-muted-foreground" />
              </CardTitle>
              <CardDescription>
                Effective Date: {app.effectiveDate}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                View the privacy policy for {app.name} to understand how we collect, 
                use, and protect your information.
              </p>
              <Link href={`/privacy-policy/${app.id}`}>
                <Button className="w-full">
                  View Privacy Policy
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* General Information */}
      <div className="mt-16 p-6 bg-muted/30 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">About Our Privacy Policies</h2>
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            At gguggulab, we take your privacy seriously. Each of our mobile applications 
            has its own privacy policy that explains:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>What information we collect (if any)</li>
            <li>How we use your information</li>
            <li>What permissions our apps require</li>
            <li>How we comply with privacy regulations</li>
            <li>How to contact us with privacy questions</li>
          </ul>
          <p>
            Our privacy policies are updated regularly to reflect any changes in our 
            data practices or relevant privacy laws.
          </p>
        </div>
      </div>
    </div>
  );
}