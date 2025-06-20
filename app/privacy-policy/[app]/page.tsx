import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PrivacyPolicyContent } from "@/components/privacy-policy-content";
import { getPrivacyPolicyByAppId, getAllAppsInfo } from "@/lib/privacy-policies";
import { Metadata } from "next";

interface PageProps {
  params: { app: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const policy = getPrivacyPolicyByAppId(params.app);
  
  if (!policy) {
    return {
      title: "Privacy Policy Not Found",
    };
  }

  return {
    title: `Privacy Policy - ${policy.appName} | gguggulab`,
    description: `Privacy policy for ${policy.appName}. Learn how we collect, use, and protect your information when using our app.`,
  };
}

export async function generateStaticParams() {
  const apps = getAllAppsInfo();
  return apps.map((app) => ({
    app: app.id,
  }));
}

export default function AppPrivacyPolicyPage({ params }: PageProps) {
  const policy = getPrivacyPolicyByAppId(params.app);

  if (!policy) {
    notFound();
  }

  return (
    <div>
      {/* Navigation */}
      <div className="mb-8">
        <Link href="/privacy-policy">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Privacy Policies
          </Button>
        </Link>
      </div>

      {/* Privacy Policy Content */}
      <PrivacyPolicyContent policy={policy} />

    </div>
  );
}