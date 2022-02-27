import { ValidationErrors, AbstractControl } from '@angular/forms';

export class RegisterValidators {
  static match(controlName: string, matchingControlName: string) {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(controlName);
      const matchingControl = group.get(matchingControlName);

      if (!control || !matchingControl) {
        return { controlNotFound: false };
      }

      const error =
        control.value === matchingControl.value ? null : { noMatch: true };

      matchingControl.setErrors(error);
      return error;
    };
  }
}
