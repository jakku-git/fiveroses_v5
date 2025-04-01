'use client'

import dynamic from "next/dynamic"

const DynamicGithubGlobeDemo = dynamic(
  () => import("@/components/ui/github-globe-demo").then((mod) => mod.GithubGlobeDemo),
  {
    loading: () => <div className="w-full h-screen bg-black" />,
    ssr: false
  }
)

export function GlobeWrapper() {
  return <DynamicGithubGlobeDemo />
} 