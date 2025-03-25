const AttributeListEntry = ({ attribute }) => {
  return (
    <li>
      <button
        className="bg-yellow-500 rounded-xl p-4 font-bold"
      >
        {attribute}
      </button>
    </li>
  )
}

export default AttributeListEntry;
