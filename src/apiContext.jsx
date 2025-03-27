import { createContext, useContext, useState } from "react"

const APIContext = createContext(null);

export const APIContextProvider = ({ children }) => {
  /* attributes we care about:
    * name 
    * lifespan
    * origin 
    * temperament (split string)
  */
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [attributes, setAttributes] = useState([])
  const [bannedAttributes, setBannedAttributes] = useState([])
  const [history, setHistory] = useState([])

  const info = {
    name,
    setName,
    desc,
    setDesc,
    imageUrl,
    setImageUrl,
    attributes,
    setAttributes,
    bannedAttributes,
    setBannedAttributes,
    history,
    setHistory
  }

  return (
    <APIContext.Provider value={info}>
      {children}
    </APIContext.Provider >
  )
}

export default function UseAPIContext() {
  const ctx = useContext(APIContext)

  if (!ctx) {
    throw new Error("No API context defined!")
  }

  return ctx;
}
