
import axios from "axios"

const getEmployees = async () => {
  await axios.get(
      "http://localhost:8081/api"
    ).then((response) => {
      console.log(response.data)

    })
}

export { getEmployees }
