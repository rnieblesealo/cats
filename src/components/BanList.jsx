import { useMemo } from "react"

import UseAPIContext from "../apiContext"

export const BanList = () => {
  const ctx = UseAPIContext()

  const BanListEntry = ({ attr }) => {
    // remove from state array 
    function unbanAttribute(attr) {
      ctx.setBannedAttributes((prevBannedAttrs) => {
        const prev = [...prevBannedAttrs]

        // i f***ing hate javascript
        // why is there no builtin array removal?!
        return prev.filter((a) => {
          return a !== attr;
        })
      })
    }

    return (
      <button
        onClick={() => { unbanAttribute(attr) }}
        className="
        bg-rose-600 rounded-lg p-2 font-bold text-white w-full animate-jump-in animate-duration-200 transition-bg duration-200 
        hover:bg-rose-700
        active:bg-rose-800"
      >
        {attr}
      </button>
    )
  }

  const bannedAttributes = useMemo(() => {
    return ctx.bannedAttributes.map((a) => {
      return (
        <BanListEntry
          key={`atrib-${a}`}
          attr={a}
        />
      )
    })
  }, [ctx.bannedAttributes])

  const bannedAttributesPlaceholder = <p className="text-gray-300">Select an attribute in your listing to ban it; click it again to unban it</p>

  return (
    <div className="h-min right-0 m-4 p-4 bg-black rounded-2xl flex flex-col items-center text-center w-50 min-w-50 shadow-2xl text-white">
      <h3 className="font-extrabold text-xl mb-3">Banned Attributes</h3>
      <div className="flex flex-col gap-1 w-full">
        {ctx.bannedAttributes.length === 0 ? bannedAttributesPlaceholder : bannedAttributes}
      </div>
    </div>
  )
}

export default BanList
