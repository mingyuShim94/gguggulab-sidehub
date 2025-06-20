import { PrivacyPolicy } from "@/types/privacy-policy";

interface PrivacyPolicyContentProps {
  policy: PrivacyPolicy;
}

export function PrivacyPolicyContent({ policy }: PrivacyPolicyContentProps) {
  // Simple markdown-like formatting
  const formatContent = (content: string) => {
    return content
      .split("\n")
      .map((line, index) => {
        // Handle bold text
        if (line.includes("**")) {
          const parts = line.split(/(\*\*.*?\*\*)/);
          return (
            <p key={index} className="mb-4">
              {parts.map((part, partIndex) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                  return (
                    <strong key={partIndex} className="font-semibold">
                      {part.slice(2, -2)}
                    </strong>
                  );
                }
                return part;
              })}
            </p>
          );
        }

        // Handle bullet points
        if (line.startsWith("* ")) {
          return (
            <li key={index} className="mb-2">
              {line.slice(2)}
            </li>
          );
        }

        // Handle empty lines
        if (line.trim() === "") {
          return null;
        }

        // Regular paragraph
        return (
          <p key={index} className="mb-4">
            {line}
          </p>
        );
      })
      .filter(Boolean);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">
          Privacy Policy for {policy.appName}
        </h1>
        <p className="text-muted-foreground">
          Effective Date: {policy.effectiveDate}
        </p>
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm">
            This Privacy Policy explains how the &quot;{policy.appName}&quot;
            app (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) collects,
            uses, and protects your information. By using the app, you agree to
            the terms of this policy.
          </p>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="mb-12 p-6 bg-muted/30 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
        <ol className="space-y-2">
          {policy.sections.map((section, index) => (
            <li key={index}>
              <a
                href={`#section-${index}`}
                className="text-primary hover:underline"
              >
                {index + 1}. {section.title}
              </a>
            </li>
          ))}
        </ol>
      </div>

      {/* Sections */}
      <div className="space-y-12">
        {policy.sections.map((section, index) => (
          <section key={index} id={`section-${index}`} className="scroll-mt-8">
            <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
              {index + 1}. {section.title}
            </h2>
            <div className="prose prose-gray max-w-none">
              {section.content.includes("* ") ? (
                <ul className="list-disc list-inside space-y-2 mb-4">
                  {formatContent(section.content)}
                </ul>
              ) : (
                <div>{formatContent(section.content)}</div>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Last Updated */}
      <div className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground">
        <p>Last updated: {policy.effectiveDate}</p>
      </div>
    </div>
  );
}
