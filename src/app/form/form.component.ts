import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { waitForAsync } from '@angular/core/testing';

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
    public profileForm: any;
    @ViewChild('title', { static: false }) title: Input | undefined;
    @ViewChild('firstName', { static: false }) firstName: Input | undefined;


    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.profileForm = this.fb.group({
            title: [''],
            firstName: [''],
            lastName: [''],
            email: [''],
            userType: [''],
            yearPassedOut: [''],
            password: [''],
            confirmPassword: ['']
        });
    }



    save(): any {
        this.title = this.profileForm.get('title').value;
        // this.userType=this.profileForm.get('userType').value;
        console.log(this.profileForm.value);
        let userString: any;
        userString = JSON.stringify(this.profileForm.value);
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
