import { useState, useEffect } from "react";

interface AddressValidationResult {
  isValid: boolean;
  errors: {
    address: string[];
    postcode: string[];
  };
}

export const useAddressValidation = (
  address: string,
  postcode: string
): AddressValidationResult => {
  const [validationResult, setValidationResult] =
    useState<AddressValidationResult>({
      isValid: false,
      errors: {
        address: [],
        postcode: [],
      },
    });

  useEffect(() => {
    const validateAddress = () => {
      const addressErrors: string[] = [];
      const postcodeErrors: string[] = [];

      // ! Address validation
      if (!address.trim()) {
        addressErrors.push("Address cannot be empty");
      }
      if (address.length < 10) {
        addressErrors.push("Address seems too short");
      }
      if (!/\d/.test(address)) {
        addressErrors.push("Address should include a number");
      }
      if (!/[a-zA-Z]/.test(address)) {
        addressErrors.push("Address should include letters");
      }
      if (!address.includes(",")) {
        addressErrors.push("Address parts should be separated by commas");
      }

      // ! Postcode validation
      if (!postcode.trim()) {
        postcodeErrors.push("Postcode cannot be empty");
      }
      if (
        !/^[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][ABD-HJLNP-UW-Z]{2}$/.test(
          postcode.toUpperCase()
        )
      ) {
        postcodeErrors.push("Invalid UK postcode format");
      }

      setValidationResult({
        isValid: addressErrors.length === 0 && postcodeErrors.length === 0,
        errors: {
          address: addressErrors,
          postcode: postcodeErrors,
        },
      });
    };

    validateAddress();
  }, [address, postcode]);

  return validationResult;
};
