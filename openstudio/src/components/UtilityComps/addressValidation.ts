import { useState, useEffect } from "react";

interface AddressInfo {
  display_name: string;
  lat: string;
  lon: string;
  address: {
    country: string;
    state?: string;
    city?: string;
    town?: string;
    village?: string;
    postcode: string;
    road?: string;
  };
}

export const useAddressValidation = (address: string) => {
  const [isValid, setIsValid] = useState(false);
  const [addressInfo, setAddressInfo] = useState<AddressInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const validateAddress = async () => {
      if (!address) {
        setIsValid(false);
        setAddressInfo(null);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            address
          )}&format=json&addressdetails=1&limit=1`,
          {
            headers: {
              "User-Agent": "OpenStudio/1.0",
            },
          }
        );
        const data = await response.json();

        if (data && data.length > 0) {
          setIsValid(true);
          setAddressInfo(data[0]);
        } else {
          setIsValid(false);
          setAddressInfo(null);
          setError("Address not found");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setIsValid(false);
        setAddressInfo(null);
        setError("Error validating address");
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(validateAddress, 1000);

    return () => clearTimeout(timeoutId);
  }, [address]);

  return { isValid, addressInfo, isLoading, error };
};
