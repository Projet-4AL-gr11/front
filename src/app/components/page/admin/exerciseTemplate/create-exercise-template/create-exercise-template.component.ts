import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Language} from "../../../../../services/models/language.model";
import {LanguageService} from "../../../../../services/language/language.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {ExerciseService} from "../../../../../services/exercise/exercise.service";
import {AdminIdeComponent} from "../../../../shared/admin-ide/admin-ide.component";

@Component({
  selector: 'app-create-exercise-template',
  templateUrl: './create-exercise-template.component.html',
  styleUrls: ['./create-exercise-template.component.css']
})
export class CreateExerciseTemplateComponent implements OnInit {

  @ViewChild(AdminIdeComponent) private editor: AdminIdeComponent;

  languages: Language[];
  newExerciseTemplate: FormGroup;

  constructor(
    private _languageService: LanguageService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _exerciseService: ExerciseService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeFormGroup();
    this.getAllLanguage();
  }


  private getAllLanguage() {
    this._languageService.getAllLanguage().subscribe({
      next: languages => {
        this.languages = languages;
      },
      error: err => {
        if (!environment.production) {
          console.log(err)
        }
      }
    });
  }

  private initializeFormGroup() {
    this.newExerciseTemplate = this._formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(30)
      ]),
      description: new FormControl('', [
        Validators.required
      ]),
      languages: new FormControl('', [
        Validators.required
      ]),
      code: new FormControl('', [
        Validators.required
      ])
    })
  }

  onClickSubmit() {
    if (!this.newExerciseTemplate.valid) {
      this._snackBar.open('Le schéma n\'est pas validé, veillez réessayer', 'Fermer', {
        duration: 3000
      });
      return;
    } else {
      this._exerciseService.createExerciseTemplate(this.newExerciseTemplate).subscribe({
        next: () => {
          this._router.navigateByUrl("/admin/listExerciseTemplate")
        },
        error: err => {
          if (!environment.production) {
            console.log(err)
          }
          this._snackBar.open('Une erreur a été rencontré', 'Fermer', {
            duration: 3000
          });
          return;
        }
      });
    }
  }

  test() {
    console.log(this.editor.getCode());
  }

}
