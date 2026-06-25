export interface AddressData {
  displayName: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
}

export async function getAddressFromCoords(
  latitude: number,
  longitude: number
): Promise<AddressData | null> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
    );

    const data = await response.json();

    return {
      displayName: data.display_name,
      city:
        data.address?.city ||
        data.address?.town ||
        data.address?.village,
      state: data.address?.state,
      country: data.address?.country,
      pincode: data.address?.postcode,
    };
  } catch (error) {
    console.error("Address fetch error:", error);
    return null;
  }
}