import { PrivacyPolicy, PrivacyPolicyData, AppInfo } from "@/types/privacy-policy";
import privacyPoliciesData from "@/data/privacy-policies.json";

export function getAllPrivacyPolicies(): PrivacyPolicyData {
  return privacyPoliciesData as PrivacyPolicyData;
}

export function getPrivacyPolicyByAppId(appId: string): PrivacyPolicy | undefined {
  const policies = getAllPrivacyPolicies();
  return policies[appId];
}

export function getAllAppsInfo(): AppInfo[] {
  const policies = getAllPrivacyPolicies();
  return Object.entries(policies).map(([id, policy]) => ({
    id,
    name: policy.appName,
    effectiveDate: policy.effectiveDate
  }));
}

export function getAppInfo(appId: string): AppInfo | undefined {
  const policy = getPrivacyPolicyByAppId(appId);
  if (!policy) return undefined;
  
  return {
    id: appId,
    name: policy.appName,
    effectiveDate: policy.effectiveDate
  };
}