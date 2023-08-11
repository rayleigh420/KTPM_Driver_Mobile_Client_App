import axios from "axios"
import { EXPO_PUBLIC_MAP_APIKEY } from "@env";

export const getCoordinates = async (targetAddress) => {
    const result = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${targetAddress}&key=${EXPO_PUBLIC_MAP_APIKEY}`)
    return {
        latitude: result.data.results[0].geometry.location.lat,
        longitude: result.data.results[0].geometry.location.lng
    }
}

export const calculateDistance = async ({ origin, destination }) => {
    const org = origin.latitude + ',' + origin.longitude
    const des = destination.latitude + ',' + destination.longitude

    const result = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${org}&destinations=${des}&key=${EXPO_PUBLIC_MAP_APIKEY}`)

    return result.data.rows[0].elements[0].distance.text
}