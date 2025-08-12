// Site configuration for feature flags and settings

export const siteConfig = {
  // Guide sections configuration
  guideSections: {
    platformEngineering: {
      enabled: true,
      title: 'Platform Engineering',
      description: 'Building and scaling internal developer platforms, infrastructure automation, and cloud-native architectures',
      icon: '🏗️',
      categories: ['platform-engineering', 'infrastructure', 'cloud-native', 'devops']
    },
    contextEngineering: {
      enabled: true,
      title: 'Context Engineering',
      description: 'AI-consumable documentation, semantic architecture patterns, and knowledge management systems',
      icon: '🧠',
      categories: ['context-engineering', 'ai-architecture', 'knowledge-management', 'semantic-design']
    },
    mlops: {
      enabled: true,
      title: 'MLOps',
      description: 'Machine learning operations, model deployment pipelines, and AI infrastructure at scale',
      icon: '🤖',
      categories: ['mlops', 'model-deployment', 'ml-infrastructure', 'feature-engineering']
    }
  }
};

// Helper to get only enabled guide sections
export function getEnabledGuideSections() {
  return Object.entries(siteConfig.guideSections)
    .filter(([_, section]) => section.enabled)
    .reduce((acc, [key, section]) => {
      acc[key] = section;
      return acc;
    }, {} as typeof siteConfig.guideSections);
}