import { FeatureSteps } from "@/components/ui/feature-section"

const features = [
  { 
    step: 'Step 1', 
    title: 'Upload Log File',
    content: 'Start by uploading your .CSV file.', 
    image: '/log.png' 
  },
  { 
    step: 'Step 2',
    title: 'AI Analyzes it',
    content: ' Our AI analyzes your data to identify performance issues and patterns.',
    image: '/ai.svg'
  },
  { 
    step: 'Step 3',
    title: 'Optimize Effectively',
    content: ' Receive actionable insights and optimization recommendations.',
    image: '/optimize.svg'
  },
]

export function FeatureStepsDemo() {
  return (
      <FeatureSteps 
        features={features}
        title="How You Will Benefit"
        autoPlayInterval={4000}
        imageHeight="h-[500px]"
        className="font-work-sans"
      />
  )
}