import validator from 'validator';

export const isFormValid = ({pacient, owner, phoneNumber, date, symptoms}) => {
  let result = true;
  let error = '';
  const valuesToValidate = [
    validator.isEmpty(pacient),
    validator.isEmpty(owner),
    validator.isEmpty(phoneNumber),
    validator.isEmpty(date.toISOString()),
    validator.isEmpty(symptoms),
  ];
  const inputNameToValidate = [
    'nombre del paciente',
    'nombre del propietario',
    'teléfono de contacto',
    'fecha y hora',
    'sintomas',
  ];
  const indexValueOnArray = valuesToValidate.indexOf(true);
  if (indexValueOnArray !== -1) {
    error = `El campo ${inputNameToValidate[indexValueOnArray]} es obligatorio`;
    result = false;
  } else if (validator.isDate(date.toISOString())) {
    error = 'Debe ingresar una fecha valida';
    if (validator.isBefore(date.toISOString())) {
      error = 'La fecha debe ser mayor a la fecha actual';
    }
    result = false;
  }
  return {result, error};
};
