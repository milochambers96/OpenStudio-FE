import { useState, useEffect } from "react";

interface AddressValidationResult {
  isValid: boolean;
  errors: string[];
}

export const useAddressValidation = (
  address: string
): AddressValidationResult => {
  const [validationResult, setValidationResult] =
    useState<AddressValidationResult>({
      isValid: false,
      errors: [],
    });

  useEffect(() => {
    const validateAddress = () => {
      const errors: string[] = [];

      if (!address.trim()) {
        errors.push("Address cannot be empty");
      }

      if (address.length < 10) {
        errors.push("Address seems too short");
      }

      if (!/\d/.test(address)) {
        errors.push("Address should include a number");
      }

      if (!/[a-zA-Z]/.test(address)) {
        errors.push("Address should include letters");
      }

      if (!address.includes(",")) {
        errors.push("Address parts should be separated by commas");
      }

      if (!/[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][ABD-HJLNP-UW-Z]{2}/.test(address)) {
        errors.push("Address should include a valid UK postcode");
      }

      setValidationResult({
        isValid: errors.length === 0,
        errors: errors,
      });
    };

    validateAddress();
  }, [address]);

  return validationResult;
};
