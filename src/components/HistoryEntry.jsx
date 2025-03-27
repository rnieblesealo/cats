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

export default HistoryEntry;
