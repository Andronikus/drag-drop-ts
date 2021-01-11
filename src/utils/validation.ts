export interface Validatable {
    value: string | number;
    require?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number; 
}

export function validate(validate: Validatable){
    const valueLength = validate.value.toString().length;

    let isValid = true;

    if(validate.require){
        isValid = isValid && valueLength !== 0;
    }

    if(validate.minLength !== undefined && typeof validate.value === 'string'){
        isValid = isValid && valueLength >= validate.minLength;
    }

    if(validate.maxLength !== undefined && typeof validate.value === 'string'){
        isValid = isValid && valueLength <= validate.maxLength;
    }

    if(validate.min !== undefined && typeof validate.value === 'number'){
        isValid = isValid && valueLength >= validate.min;
    }

    if(validate.max !== undefined && typeof validate.value === 'number'){
        isValid = isValid && valueLength <= validate.max;
    }

    return isValid;
}

export default validate;