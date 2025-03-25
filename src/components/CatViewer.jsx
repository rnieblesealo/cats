import axios from "axios"

const CatViewer = ({ attributes }) => {
  async function callAPI() {
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

  function newCat() {
    callAPI()
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
        const allAttributes = [
          name,
          lifespan,
          origin,
          ...temperament
        ]

        // generate components 
        const atribs = allAttributes.map((a) => {
          return (
            <AttributeListEntry
              key={`atrib-${a}`}
              attribute={a}
            />
          )
        })

        setAttributes(atribs)

      })
      .catch((error) => {
        console.log("Something went wrong calling API: ", error)
      })
  }

  return (
    <div>
      <h3>Monin</h3>
      <ul>
        {attributes}
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

export default CatViewer;
