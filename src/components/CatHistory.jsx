const CatHistory = ({ history }) => {
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

  return (
    <div className="absolute left-0 m-4 p-4 bg-black rounded-2xl flex flex-col items-center text-center max-w-50 shadow-2xl">
      <h3 className="text-white font-extrabold text-xl mb-3">View History</h3>
      <div className="flex flex-col items-center gap-3">
        {history.length === 0 ? (
          <p className="text-gray-300">Discovered cats will appear here!</p>
        ) : (
          history.map(([name, imgUrl]) => {
            return (
              <HistoryEntry
                name={name}
                imgSrc={imgUrl}
              />
            )
          }))
        }
      </div>
    </div>
  )
}

export default CatHistory;
