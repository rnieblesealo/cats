import axios from "axios"
import { useState } from "react"

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

  const BanListEntry = ({ attr }) => {
    return (
      <button
        onClick={() => { unbanAttribute(attr) }}
        className="bg-red-500 rounded-xl p-4 font-bold text-white"
      >
        {attr}
      </button>
    )
  }

  const AttributeListEntry = ({ attr }) => {
    return (
      <li key={`attr-${attr}`}>
        <button
          onClick={() => { banAttribute(attr) }}
          className="bg-yellow-500 rounded-xl p-4 font-bold"
        >
          {attr}
        </button>
      </li>
    )
  }

  const CatViewer = () => {
    return (
      <div>
        <h3>Monin</h3>
        <ul>
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
        <img
          src="/cat.avif"
          className="w-60 aspect-square object-cover"
        />
        <button
          onClick={newCat}
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
          {
            bannedAttributes.map((a) => {
              return (
                <BanListEntry
                  key={`atrib-${a}`}
                  attr={a}
                />
              )
            })
          }
        </div>
      </div>
    )
  }

  async function getRandomCat() {
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_CAT_API_KEY
    }

    return axios.get("https://api.thecatapi.com/v1/images/search", {
      params: {
        size: "med",
        mime_types: "jpg",
        format: "json",
        has_breeds: 1,
        order: "RAND",
        page: 0,
        limit: 1
      },
      headers: headers
    })
  }

  /* wanted attribute:
    * name 
    * lifespan
    * origin 
    * temperament (split string)
    */

  const [attributes, setAttributes] = useState([])
  const [bannedAttributes, setBannedAttributes] = useState([])

  function newCat() {
    getRandomCat()
      .then((result) => {
        const data = result.data[0].breeds[0]

        const name = data.name;
        const lifespan = data.life_span;
        const origin = data.origin;
        const temperament = data.temperament.split(", ").map((attr) => {
          // extract individual temperament words
          const words = attr.split(" ")

          // capitalize them
          for (let i = 0; i < words.length; ++i) {
            words[i] = words[i][0].toUpperCase() + words[i].slice(1, words[i].length).toLowerCase();
          }

          // give back in OK format
          return words.join(" ")
        })

        // put all attrs in one arr 
        const newAttrs = [
          name,
          lifespan,
          origin,
          ...temperament
        ]

        // check if any are banned
        for (const attr of newAttrs) {
          if (bannedAttributes.includes(attr)) {
            console.log("Found banned attribute! Not doing this cat")
            return;
          }
        }

        // if not, set new cat
        setAttributes(newAttrs)
      })
      .catch((error) => {
        console.log("Something went wrong calling API: ", error)
      })
  }

  function banAttribute(attr) {
    if (bannedAttributes.includes(attr)) {
      return;
    }

    setBannedAttributes([
      ...bannedAttributes,
      attr
    ])
  }

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
