import UseAPIContext from "../apiContext"

const AttributeList = () => {
  const ctx = UseAPIContext()

  const AttributeListEntry = ({ attr }) => {
    // add to state, avoid dupes 
    function banAttribute(attr) {
      if (ctx.bannedAttributes.includes(attr)) {
        return;
      }

      ctx.setBannedAttributes([
        ...ctx.bannedAttributes,
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

  const attributeList = ctx.attributes.map((a) => {
    return (
      <AttributeListEntry
        key={`atrib-${a}`}
        attr={a}
      />
    )
  })

  return (
    <ul className="flex flex-wrap justify-center gap-1">
      {ctx.attributes.length > 0 && attributeList}
    </ul>
  )
}

export default AttributeList;
