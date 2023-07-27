import axios from "../utils/axios"

export const test = async () => {
    // setTimeout(async () =>{
    // }, 3000)
    const result = await axios.get(`/`)
    return result.data
}