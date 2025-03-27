import { useMemo } from "react"

import UseAPIContext from "../apiContext"

const CatHistory = () => {
  const ctx = UseAPIContext()

  const HistoryEntry = ({ name, imgSrc }) => {
    return (
      <div className="bg-white p-3 rounded-xl animate-fade-right animate-duration-300">
        <img
          src={imgSrc}
          className="w-40 aspect-square object-cover rounded-sm animate-fade animate-duration-500"
        />
        <h3 className="mt-3 font-bold">{name}</h3>
      </div>
    )
  }

  // NOTE:
  // if any specific state is modified in a parent, all children using state will be re-rendered
  // this is even if the child uses another unrelated piece of state
  // to remedy this, we memoize
  // it ensures that re-render occurs only when a specific dependency changes

  const catHistory = useMemo(() => {
    return ctx.history.map(([name, imgUrl]) => {
      return (
        <HistoryEntry
          name={name}
          imgSrc={imgUrl}
        />
      )
    })
  }, [ctx.history])

  const catHistoryPlaceholder = <p className="text-gray-300">Discovered cats will appear here!</p>

  return (
    <div className="h-min relative left-0 m-4 p-4 bg-black rounded-2xl flex flex-col items-center text-center w-50 min-w-50 shadow-2xl">
      <h3 className="text-white font-extrabold text-xl mb-3">View History</h3>
      <div className="flex flex-col items-center gap-3">
        {ctx.history.length === 0 ? catHistoryPlaceholder : catHistory}
      </div>
    </div>
  )
}

export default CatHistory;
