export const BanList = ({ bannedAttrs, setBannedAttributes }) => {
  const BanListEntry = ({ attr }) => {
    // remove from state array 
    function unbanAttribute(attr) {
      setBannedAttributes((prevBannedAttrs) => {
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

  return (
    <div className="absolute right-0 m-4 p-4 bg-black rounded-2xl flex flex-col items-center text-center max-w-50 shadow-2xl text-white">
      <h3 className="font-extrabold text-xl mb-3">Banned Attributes</h3>
      {
        bannedAttrs.length === 0 ? (
          <p className="text-gray-300">Select an attribute in your listing to ban it; click it again to unban it</p>
        ) : (
          <div className="flex flex-col gap-1 w-full">
            {
              bannedAttrs.map((a) => {
                return (
                  <BanListEntry
                    key={`atrib-${a}`}
                    attr={a}
                    setBannedAttributes={setBannedAttributes}
                  />
                )
              })
            }
          </div>
        )
      }
    </div>
  )
}

export default BanList
