export interface PrivacyPolicySection {
  title: string;
  content: string;
}

export interface PrivacyPolicy {
  appName: string;
  effectiveDate: string;
  contactEmail: string;
  sections: PrivacyPolicySection[];
}

export interface PrivacyPolicyData {
  [appId: string]: PrivacyPolicy;
}

export interface AppInfo {
  id: string;
  name: string;
  effectiveDate: string;
}