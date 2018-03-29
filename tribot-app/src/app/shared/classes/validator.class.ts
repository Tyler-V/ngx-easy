import { FormGroup, FormControl } from '@angular/forms';

export class Validator {
    public static validate(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validate(control);
            }
        });
    }
}
