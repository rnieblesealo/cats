function App() {
  const HistoryEntry = () => {
    return (
      <div>
        <img
          src="/cat.avif"
          className="w-40 aspect-square object-cover"
        />
        <p>This cat</p>
      </div>
    )
  }

  const BanListEntry = () => {
    return (
      <button
        className="bg-red-500 rounded-xl p-4 font-bold text-white"
      >
        United States
      </button>
    )
  }

  const AttributeListEntry = () => {
    return (
      <button
        className="bg-yellow-500 rounded-xl p-4 font-bold"
      >
        Liberal
      </button>
    )
  }

  const CatViewer = () => {
    return (
      <div>
        <h3>Monin</h3>
        <div>
          <AttributeListEntry />
          <AttributeListEntry />
          <AttributeListEntry />
        </div>
        <img
          src="/cat.avif"
          className="w-60 aspect-square object-cover"
        />
        <button
          className="bg-gray-500 rounded-xl p-4 font-bold text-white"
        >
          Discover!
        </button>
      </div>
    )
  }

  const CatHistory = () => {
    return (
      <div>
        <h3>Who have we seen so far?</h3>
        <div>
          <HistoryEntry />
          <HistoryEntry />
          <HistoryEntry />
        </div>
      </div>
    )
  }

  const BanList = () => {
    return (
      <div>
        <h3>Ban List</h3>
        <p>Select an attribute in your listing to ban it</p>
        <div>
          <BanListEntry />
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1>Trippin' on Cats!</h1>
      <p>Discover cats from your wildest dreams!</p>
      <CatViewer />
      <CatHistory />
      <BanList />
    </div >
  )
}

export default App
