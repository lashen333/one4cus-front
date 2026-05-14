// src\features\legal\data\privacy-policy.data.ts
// src/features/legal/data/privacy-policy.data.ts
import type { LegalPageData } from "../types/legal.types";

export const privacyPolicyData: LegalPageData = {
  title: "Privacy Policy",
  lastUpdated: "May 13, 2026",
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      paragraphs: [
        {
          id: "intro-1",
          text: "one4cus respects your privacy and is committed to protecting your personal information.",
        },
        {
          id: "intro-2",
          text: "This Privacy Policy explains how we collect, use, store, and protect your information when you use our website, platform, and services.",
        },
        {
          id: "intro-3",
          text: "By using one4cus, you agree to the practices described in this Privacy Policy.",
        },
      ],
    },
    {
      id: "information-we-collect",
      title: "1. Information We Collect",
      subsections: [
        {
          id: "personal-information",
          title: "Personal Information",
          items: [
            { id: "personal-1", text: "Full name" },
            { id: "personal-2", text: "Email address" },
            { id: "personal-3", text: "Mobile number" },
            { id: "personal-4", text: "Business information" },
            { id: "personal-5", text: "Profile details" },
            { id: "personal-6", text: "Identification documents (for verification/KYC)" },
            { id: "personal-7", text: "Payment-related information" },
          ],
        },
        {
          id: "technical-information",
          title: "Technical Information",
          items: [
            { id: "technical-1", text: "IP address" },
            { id: "technical-2", text: "Browser type" },
            { id: "technical-3", text: "Device information" },
            { id: "technical-4", text: "Operating system" },
            { id: "technical-5", text: "Login activity" },
            { id: "technical-6", text: "Cookies and usage data" },
          ],
        },
        {
          id: "listing-communication-information",
          title: "Listing and Communication Information",
          items: [
            { id: "listing-1", text: "Business listings" },
            { id: "listing-2", text: "Messages exchanged through the platform" },
            { id: "listing-3", text: "Uploaded documents and images" },
            { id: "listing-4", text: "Reviews and feedback" },
          ],
        },
      ],
    },
    {
      id: "how-we-use-information",
      title: "2. How We Use Information",
      paragraphs: [
        {
          id: "use-intro",
          text: "We use collected information to:",
        },
      ],
      subsections: [
        {
          id: "use-list",
          title: "",
          items: [
            { id: "use-1", text: "Create and manage user accounts" },
            { id: "use-2", text: "Verify users and listings" },
            { id: "use-3", text: "Provide platform services" },
            { id: "use-4", text: "Improve user experience" },
            { id: "use-5", text: "Process subscriptions and payments" },
            { id: "use-6", text: "Communicate with users" },
            { id: "use-7", text: "Prevent fraud and misuse" },
            { id: "use-8", text: "Comply with legal obligations" },
            { id: "use-9", text: "Monitor platform performance and security" },
          ],
        },
      ],
    },
    {
      id: "user-verification-kyc",
      title: "3. User Verification and KYC",
      paragraphs: [
        {
          id: "kyc-1",
          text: "To maintain trust and security, one4cus may request identity verification documents and business-related information.",
        },
        {
          id: "kyc-2",
          text: "Verification does not guarantee the legitimacy, reliability, or financial performance of any user or listing.",
        },
      ],
    },
    {
      id: "sharing-of-information",
      title: "4. Sharing of Information",
      paragraphs: [
        {
          id: "sharing-intro",
          text: "We may share information:",
        },
      ],
      subsections: [
        {
          id: "sharing-list",
          title: "",
          items: [
            { id: "sharing-1", text: "With other users when you choose to connect" },
            { id: "sharing-2", text: "With service providers assisting platform operations" },
            { id: "sharing-3", text: "With payment processors" },
            { id: "sharing-4", text: "With legal or regulatory authorities when required" },
            {
              id: "sharing-5",
              text: "During investigations related to fraud, disputes, or security concerns",
            },
          ],
        },
      ],
    },
    {
      id: "cookies-and-tracking",
      title: "5. Cookies and Tracking Technologies",
      paragraphs: [
        {
          id: "cookies-intro",
          text: "We may use cookies and similar technologies to:",
        },
      ],
      subsections: [
        {
          id: "cookies-list",
          title: "",
          items: [
            { id: "cookies-1", text: "Improve website functionality" },
            { id: "cookies-2", text: "Remember user preferences" },
            { id: "cookies-3", text: "Analyze website traffic" },
            { id: "cookies-4", text: "Enhance security and performance" },
          ],
        },
      ],
    },
    {
      id: "data-storage-security",
      title: "6. Data Storage and Security",
      paragraphs: [
        {
          id: "security-1",
          text: "We implement reasonable technical and organizational measures to protect user information.",
        },
        {
          id: "security-2",
          text: "However, no online platform can guarantee complete security. Users share information at their own risk.",
        },
      ],
    },
    {
      id: "data-retention",
      title: "7. Data Retention",
      paragraphs: [
        {
          id: "retention-intro",
          text: "We retain information for as long as necessary to:",
        },
      ],
      subsections: [
        {
          id: "retention-list",
          title: "",
          items: [
            { id: "retention-1", text: "Operate the platform" },
            { id: "retention-2", text: "Meet legal obligations" },
            { id: "retention-3", text: "Resolve disputes" },
            { id: "retention-4", text: "Enforce agreements" },
          ],
        },
      ],
    },
    {
      id: "third-party-services",
      title: "8. Third-Party Services",
      paragraphs: [
        {
          id: "third-party-intro",
          text: "The platform may use third-party services including:",
        },
      ],
      subsections: [
        {
          id: "third-party-list",
          title: "",
          items: [
            { id: "third-party-1", text: "Authentication providers" },
            { id: "third-party-2", text: "Payment gateways" },
            { id: "third-party-3", text: "Cloud storage services" },
            { id: "third-party-4", text: "Analytics providers" },
            { id: "third-party-5", text: "AI and verification services" },
          ],
        },
      ],
    },
    {
      id: "user-rights",
      title: "9. User Rights",
      paragraphs: [
        {
          id: "rights-intro",
          text: "Users may request to:",
        },
      ],
      subsections: [
        {
          id: "rights-list",
          title: "",
          items: [
            { id: "rights-1", text: "Access their information" },
            { id: "rights-2", text: "Correct inaccurate information" },
            { id: "rights-3", text: "Delete their account" },
            { id: "rights-4", text: "Withdraw consent where applicable" },
          ],
        },
      ],
    },
    {
      id: "international-users",
      title: "10. International Users",
      paragraphs: [
        {
          id: "international-1",
          text: "Users accessing the platform from outside Sri Lanka acknowledge that information may be processed and stored in different countries.",
        },
      ],
    },
    {
      id: "childrens-privacy",
      title: "11. Children’s Privacy",
      paragraphs: [
        {
          id: "children-1",
          text: "one4cus is intended only for users aged 18 years and above.",
        },
        {
          id: "children-2",
          text: "We do not knowingly collect personal information from children.",
        },
      ],
    },
    {
      id: "changes-to-policy",
      title: "12. Changes to this Privacy Policy",
      paragraphs: [
        {
          id: "changes-1",
          text: "We may update this Privacy Policy from time to time.",
        },
        {
          id: "changes-2",
          text: "Updated versions become effective upon publication on the website.",
        },
        {
          id: "changes-3",
          text: "Continued use of the platform after updates indicates acceptance of the revised policy.",
        },
      ],
    },
    {
      id: "contact-information",
      title: "13. Contact Information",
      paragraphs: [
        {
          id: "contact-1",
          text: "For privacy-related inquiries, please contact:",
        },
        {
          id: "contact-2",
          text: "one4cus",
        },
        {
          id: "contact-3",
          text: "Email: one4cus.support@gmail.com",
        },
      ],
    },
  ],
};
