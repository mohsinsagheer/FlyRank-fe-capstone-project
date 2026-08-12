export interface FAQItem {
  question: string;
  answer: string;
}

export interface PolicySection {
  id: string;
  title: string;
  iconName: string;
  summary: string;
  lastUpdated: string;
  content: string[];
  faqs?: FAQItem[];
}
