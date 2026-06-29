import axios from "axios";
import { UserLocation } from "@/types/location";

export async function reverseGeocode(
    lat: number,
    lng: number
): Promise<UserLocation> {
    const key = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;

    const url =
        `https://api.geoapify.com/v1/geocode/reverse` +
        `?lat=${lat}&lon=${lng}` +
        `&apiKey=${key}`;

    const { data } = await axios.get(url);

    const result = data.features?.[0];

    if (!result) {
        throw new Error("Unable to determine address.");
    }

    const p = result.properties;

    return {
        latitude: lat,
        longitude: lng,

        accuracy: 0,

        address: p.formatted ?? "",

        city: p.city ?? "",

        state: p.state ?? "",

        country: p.country ?? "",

        postcode: p.postcode ?? "",
    };
}