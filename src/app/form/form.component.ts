import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

    public shouldYearPassedOutBeShown: boolean = false;
    public shouldPasswordErrorBeShown: boolean = false;
    public shouldConfirmPasswordErrorBeShown: boolean = false;
    public passwordFieldValue: string = "";

    constructor() { }

    ngOnInit(): void {
    }

    onPersonTypeChange(selectedValueEvent: any): void {
        try {
            const selectedValue = selectedValueEvent.target.value;
            if (selectedValue === "alumini") {
                setTimeout(() => {
                    this.shouldYearPassedOutBeShown = true;
                }, 100);
            } else {
                setTimeout(() => {
                    this.shouldYearPassedOutBeShown = false;
                }, 100);
            }
        } catch (error) {
            console.error(error);
        }
    }

    passwordOnBlur(event: any): void {
        try {
            const enteredValue = event.target.value;
            const specialCharacterGroup = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            const isALetterUpperCase = enteredValue.split("").some((letter: any) => /^[A-Z]*$/.test(letter));
            console.log(enteredValue);
            console.log(specialCharacterGroup.test(enteredValue));
            console.log(isALetterUpperCase);
            if (enteredValue.length > 8 && specialCharacterGroup.test(enteredValue) && isALetterUpperCase) {
                this.shouldPasswordErrorBeShown = false;
                this.passwordFieldValue = enteredValue;
            } else {
                this.shouldPasswordErrorBeShown = true;
            }
        } catch (error) {
            console.error(error);
        }
    }

    confirmPasswordOnBlur(event: any): void {
        try {
            const enteredValue = event.target.value;
            console.log(enteredValue, this.passwordFieldValue);
            if (enteredValue === this.passwordFieldValue) {
                this.shouldConfirmPasswordErrorBeShown = false;
            } else {
                this.shouldConfirmPasswordErrorBeShown = true;
            }
        } catch (error) {
            console.error(error);
        }
    }

}
