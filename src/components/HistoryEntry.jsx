const HistoryEntry = ({ imgSrc, desc }) => {
  return (
    <div>
      <img
        src={imgSrc}
        className="w-40 aspect-square object-cover"
      />
      <p>{desc}</p>
    </div>
  )
}

export default HistoryEntry;
