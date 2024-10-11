nterface FormData {
  [key: string]: string;
}

interface ValidationRules {
  [key: string]: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    match?: string;
  };
}

interface FormErrors {
  [key: string]: string;
}

export function validateForm(formData: FormData, validationRules: ValidationRules): FormErrors {
  const errors: FormErrors = {};

  Object.keys(validationRules).forEach((fieldName) => {
    const value = formData[fieldName];
    const rules = validationRules[fieldName];

    if (rules.required && !value) {
      errors[fieldName] = 'This field is required';
    } else if (value) {
      if (rules.minLength && value.length < rules.minLength) {
        errors[fieldName] = `Minimum length is ${rules.minLength} characters`;
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        errors[fieldName] = `Maximum length is ${rules.maxLength} characters`;
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        errors[fieldName] = 'Invalid format';
      }

      if (rules.match && value !== formData[rules.match]) {
        errors[fieldName] = 'Fields do not match';
      }
    }
  });

  return errors;