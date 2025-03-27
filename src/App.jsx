import { APIContextProvider } from "./apiContext.jsx"
import BanList from "./components/BanList.jsx"
import CatHistory from "./components/CatHistory.jsx"
import CatViewer from "./components/CatViewer.jsx"

function App() {
  return (
    <APIContextProvider>
      <div className="min-h-screen w-screen flex items-top justify-center bg-yellow-500 text-black text-center relative">
        <CatHistory />
        <CatViewer />
        <BanList />
      </div >
    </APIContextProvider>
  )
}

export default App
