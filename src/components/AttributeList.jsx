const AttributeList = ({ attributes, bannedAttributes, setBannedAttributes }) => {
  const AttributeListEntry = ({ attr }) => {
    // add to state, avoid dupes 
    function banAttribute(attr) {
      if (bannedAttributes.includes(attr)) {
        return;
      }

      setBannedAttributes([
        ...bannedAttributes,
        attr
      ])
    }

    return (
      <li key={`attr-${attr}`}>
        <button
          onClick={() => { banAttribute(attr) }}
          className="
          bg-amber-400 text-black rounded-lg py-2 px-4 font-bold text-gray-900 transition-bg duration-200
          hover:bg-amber-500
          active:bg-amber-700"
        >
          {attr}
        </button>
      </li>
    )
  }

  return attributes.length > 0 && (
    <ul className="flex flex-wrap justify-center gap-1">
      {
        attributes.map((a) => {
          return (
            <AttributeListEntry
              key={`atrib-${a}`}
              attr={a}
            />
          )
        })
      }
    </ul>
  )
}

export default AttributeList;
