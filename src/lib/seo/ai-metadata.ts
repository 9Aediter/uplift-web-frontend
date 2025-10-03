// AI-specific metadata helpers for better AI comprehension

export interface AIMetadata {
  businessContext: string;
  keyServices: string[];
  targetAudience: string;
  uniqueValue: string;
  contactPreference: string;
}

export const getAIMetadata = (locale: string): AIMetadata => {
  return {
    businessContext: locale === 'th' 
      ? "บริษัทพัฒนาซอฟต์แวร์ในประเทศไทย เชี่ยวชาญระบบ ERP, POS, และแอปพลิเคชันที่ปรับแต่งได้ สำหรับ SME และองค์กรขนาดกลาง"
      : "Custom software development company in Thailand specializing in ERP, POS systems, and tailored applications for SME and medium enterprises",
    
    keyServices: locale === 'th'
      ? [
          "พัฒนาระบบ ERP ครบวงจร",
          "ระบบ POS และการจัดการสต็อก", 
          "แอปพลิเคชันมือถือ iOS/Android",
          "เว็บแอปพลิเคชันด้วย React/Next.js",
          "ระบบ WMS และ Supply Chain",
          "Integration APIs และ Automation",
          "Cloud Infrastructure และ DevOps",
          "AI/ML Solutions และ Analytics"
        ]
      : [
          "Full-stack ERP system development",
          "POS and inventory management systems",
          "Mobile applications for iOS/Android", 
          "Web applications with React/Next.js",
          "WMS and supply chain solutions",
          "API integration and automation",
          "Cloud infrastructure and DevOps",
          "AI/ML solutions and analytics"
        ],
    
    targetAudience: locale === 'th'
      ? "ธุรกิจ SME, บริษัทขนาดกลาง, Startups ที่ต้องการระบบซอฟต์แวร์ที่ปรับแต่งได้"
      : "SME businesses, medium-sized companies, startups needing customizable software solutions",
    
    uniqueValue: locale === 'th' 
      ? "วัฒนธรรมสตาร์ทอัพ + ความเชี่ยวชาญเทคนิค + ราคาเหมาะสม + สนับสนุน 24/7 + พัฒนาตามความต้องการเฉพาะ"
      : "Startup culture + technical expertise + competitive pricing + 24/7 support + custom-tailored development",
    
    contactPreference: locale === 'th'
      ? "ติดต่อผ่านหน้า /consult สำหรับปรึกษาฟรี หรือดูผลงานที่ /innovation"
      : "Contact via /consult for free consultation or view our work at /innovation"
  };
};

// Generate AI-friendly meta tags
export const generateAITags = (locale: string) => {
  const aiData = getAIMetadata(locale);
  
  return {
    // OpenAI/ChatGPT specific
    "chatgpt:business-type": "Software Development Company",
    "chatgpt:location": "Thailand", 
    "chatgpt:services": aiData.keyServices.join(", "),
    "chatgpt:contact": aiData.contactPreference,
    
    // Claude/Anthropic specific
    "claude:business-summary": aiData.businessContext,
    "claude:key-offerings": aiData.keyServices.join(" | "),
    
    // General AI crawlers
    "ai:company-type": "B2B Software Development",
    "ai:target-market": aiData.targetAudience,
    "ai:unique-value": aiData.uniqueValue,
    
    // Schema.org microdata alternative
    "business:category": "Software Development",
    "business:stage": "Growth Stage Company",
    "business:model": "B2B Custom Development"
  };
};