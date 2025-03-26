import axios from "axios"
import { useState } from "react"

import HistoryEntry from "./components/HistoryEntry"

function App() {
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

  const BanListEntry = ({ attr }) => {
    // remove from state array 
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
      <button
        onClick={() => { unbanAttribute(attr) }}
        className="bg-red-500 rounded-xl p-4 font-bold text-white"
      >
        {attr}
      </button>
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
          className="bg-yellow-500 rounded-xl p-4 font-bold"
        >
          {attr}
        </button>
      </li>
    )
  }

  const CatViewer = () => {
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


    async function newCat() {
      while (true) {
        try {
          // try getting data
          // needs to fully resolve, that's why we use () to ensure order of ops
          const res = await getRandomCat()
          const data = res.data[0];
          const breeds = res.data[0].breeds[0]

          // compile attributes 
          const lifespan = breeds.life_span;
          const origin = breeds.origin;
          const temperament = breeds.temperament.split(", ").map((attr) => {
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
            lifespan,
            origin,
            ...temperament
          ]

          // check if any are banned, get another cat if so
          let match = false;
          for (const attr of newAttrs) {
            if (bannedAttributes.includes(attr)) {
              console.log("Found banned attribute! Trying another cat...")
              match = true;
              break;
            }
          }

          if (match) {
            continue;
          }

          // if not, set new cat!
          setAttributes(newAttrs)
          setName(breeds.name)
          setDesc(breeds.description)
          setImageUrl(data.url)

          // ...add to history
          setHistory((prevHistory) => [
            ...prevHistory,
            [breeds.name, data.url]
          ]
          )

          // ...and break!
          return;
        } catch (error) {
          console.log("Something went wrong calling API: ", error)
          return;
        }
      }
    }

    return (
      <div>
        <h3>{name}</h3>
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
        {imageUrl &&
          <img
            src={imageUrl}
            className="w-60 aspect-square object-cover"
          />
        }
        <p>{desc}</p>
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
          {
            history.map(([name, imgUrl]) => {
              return (
                <HistoryEntry
                  name={name}
                  imgSrc={imgUrl}
                />
              )
            })
          }
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
