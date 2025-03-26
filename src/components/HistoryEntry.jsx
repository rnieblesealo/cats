const HistoryEntry = ({ name, imgSrc }) => {
  return (
    <div>
      <h3>{name}</h3>
      <img
        src={imgSrc}
        className="w-40 aspect-square object-cover"
      />
    </div>
  )
}

export default HistoryEntry;
