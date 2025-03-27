import axios from "axios"
import { useState } from "react"

import BanList from "./components/BanList.jsx"
import AttributeList from "./components/AttributeList.jsx"
import CatHistory from "./components/CatHistory.jsx"

import { FaCat } from "react-icons/fa6"

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
          ])

          // ...and break!
          return;
        } catch (error) {
          console.log("Something went wrong calling API: ", error)
          return;
        }
      }
    }

    return (
      <div className="max-w-1/3 bg-black shadow-2xl p-4 rounded-2xl flex flex-col items-center gap-4 text-white m-4 overflow-hidden">
        <div className="flex flex-col items-center m-2">
          <h1 className="text-2xl font-extrabold">Find-A-Cat!</h1>
          <p className="text-gray-300">Discover wild new cats!</p>
        </div>
        <div className="rounded-2xl flex flex-col items-center bg-white text-black animate-flip-up animate-duration-[400ms]">
          {imageUrl ? (
            <img
              src={imageUrl}
              className="p-3 w-60 aspect-square object-cover rounded-2xl"
            />) : (
            <div className="w-60 aspect-square rounded-2xl bg-gray-400 flex items-center justify-center">
              <FaCat className="text-gray-900 text-4xl" />
            </div>
          )
          }
          {name && (
            <h3 className="text-xl font-bold p-1 mb-3">{name}</h3>
          )}
        </div>
        <AttributeList
          attributes={attributes}
          bannedAttributes={bannedAttributes}
          setBannedAttributes={setBannedAttributes}
        />
        {desc && (
          <p className="text-center text-gray-300">{desc}</p>
        )}
        <button
          onClick={newCat}
          className="
          bg-blue-500 rounded-xl p-4 font-bold text-white transition-bg duration-200
          hover:bg-blue-600
          active:bg-blue-700"
        >
          Discover!
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-screen flex flex-col items-center bg-yellow-500 text-black text-center">
      <CatViewer />
      <CatHistory
        history={history}
      />
      <BanList
        bannedAttrs={bannedAttributes}
        setBannedAttributes={setBannedAttributes}
      />
    </div >
  )
}

export default App
