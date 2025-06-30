import { Progress } from '@/components/ui/progress'
import { TextShimmerWave } from '@/components/ui/text-shimmer-wave'
import React from 'react'

const loading = () => {
  return (
        <div className="h-dvh w-screen flex flex-col justify-center items-center">
          <TextShimmerWave
            className="font-mono max-sm:text-sm sm:text-lg md:text-2xl"
            duration={1}
          >
            Loading From DB...
          </TextShimmerWave>
        </div>
  )
}

export default loading