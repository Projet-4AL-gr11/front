import {Component, Inject, OnInit} from '@angular/core';
import {Language} from "../../../services/models/language.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EventService} from "../../../services/event/event.service";
import {AuthService} from "../../../services/auth/auth.service";
import {LanguageService} from "../../../services/language/language.service";
import {GroupService} from "../../../services/group/group.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {firstValueFrom} from "rxjs";
import {Group} from "../../../services/models/group.model";
import {ExerciseService} from "../../../services/exercise/exercise.service";
import {ExerciseTemplate} from "../../../services/models/erxercise_template.model";

@Component({
  selector: 'app-dialog-create-event',
  templateUrl: './dialog-create-event.component.html',
  styleUrls: ['./dialog-create-event.component.css']
})
export class DialogCreateEventComponent implements OnInit {
  languages: Language[];
  limitParticipant = new FormControl(2, Validators.min(2));
  newEventForm: FormGroup;
  picture: File;
  pictureURL: string;
  mediaURL: string;
  exerciseTemplates: ExerciseTemplate[]
  constructor(public dialogRef: MatDialogRef<DialogCreateEventComponent>,
              private _eventService: EventService,
              public _authService: AuthService,
              public _languageService: LanguageService,
              private _groupService: GroupService,
              private _exerciseService: ExerciseService,
              private _snackBar: MatSnackBar,
              private _formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: { group: Group }) {

  }

  ngOnInit(): void {
    this.updateData();
    this.initializeFormGroup();
  }

  onPictureSelected() {
    const inputNode: any = document.querySelector('#picture');
    if (typeof (FileReader) !== 'undefined') {

      const reader = new FileReader();
      reader.readAsDataURL(inputNode.files[0]);
      reader.onload = (e: any) => {
        const file: string = e.target.result
        if (file.match(/image\/*/) === null) {
          console.log('invalid file input');
          return;
        }
        if (typeof file === "string") {
          this.pictureURL = file;
          this.picture = inputNode.files[0];
        }
      };
    }
  }

  onClickSubmit() {
    if (this.newEventForm.value.startDate > this.newEventForm.value.endDate) {
      this._snackBar.open('La date de début doit précéder la date de fin prévue', 'Fermer', {
        duration: 3000
      });
      return;
    }
    if (this.newEventForm.valid){
      firstValueFrom(
        this._eventService.createEvent(this.newEventForm, this.data?.group))
        .then(() => this.dialogRef.close());
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private getAllLanguage() {
    firstValueFrom(this._languageService.getAllLanguage())
      .then(languages => this.languages = languages);
  }

  private updateData(): void {
    this.getAllLanguage();
    firstValueFrom(this._authService.user)
      .then(user => {
        this.newEventForm.value.user = user;
      });
    firstValueFrom(this._exerciseService.getAllExerciseTemplate()).then(
      exerciseTemplates => this.exerciseTemplates = exerciseTemplates
    )
  }

  private initializeFormGroup() {
    this.newEventForm = this._formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30)
      ]),
      description: new FormControl('', []),
      participationLimit: new FormControl('', [
        Validators.required,
        Validators.min(2),
        Validators.max(1000),
        Validators.pattern('^[0-9]*$')
      ]),
      languages: new FormControl('', [
        Validators.required
      ]),
      startDate: new FormControl('', [
        Validators.required
      ]),
      endDate: new FormControl('', [
        Validators.required
      ]),
      exerciseTemplateForm: new FormControl('',[
        Validators.required
      ])
    })
  }
}
