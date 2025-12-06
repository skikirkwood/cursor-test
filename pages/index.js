import { useState } from 'react'
import TCOCalculator from '../components/TCOCalculator'
import ModelSelector from '../components/ModelSelector'

export default function Home() {
  const [selectedModel, setSelectedModel] = useState(null)

  if (!selectedModel) {
    return <ModelSelector onSelectModel={setSelectedModel} />
  }

  return <TCOCalculator model={selectedModel} onBack={() => setSelectedModel(null)} />
}
