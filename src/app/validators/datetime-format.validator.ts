import { AbstractControl, ValidatorFn } from '@angular/forms';

export function datetimeFormatValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/; // Kiểm tra định dạng YYYY-MM-DDTHH:MM:SS
    const isValid = regex.test(control.value);
    return isValid ? null : { 'invalidDatetimeFormat': { value: control.value } };
  };
}
