import { Component, OnInit } from '@angular/core';
import {Language} from "../../../../../services/models/language.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LanguageService} from "../../../../../services/language/language.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ExerciseService} from "../../../../../services/exercise/exercise.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../../../environments/environment";
import {ExerciseTemplate} from "../../../../../services/models/erxercise_template.model";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-update-create-exercise-template',
  templateUrl: './update-exercise-template.component.html',
  styleUrls: ['./update-exercise-template.component.css']
})
export class UpdateExerciseTemplateComponent implements OnInit {

  exerciseTemplate: ExerciseTemplate = new ExerciseTemplate();
  languages: Language[];
  newExerciseTemplate: FormGroup;

  constructor(
    private _languageService: LanguageService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _exerciseService: ExerciseService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _titleService: Title,
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.getExerciseTemplate(params["id"]).then(() => {
          this._titleService.setTitle(this.exerciseTemplate.name + " - " + environment.name)
        }
      );
    });
    this.getAllLanguage();
    this.initializeFormGroup();
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
      language: new FormControl('', [
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
      this._exerciseService.updateExerciseTemplate(this.exerciseTemplate.id, this.newExerciseTemplate).subscribe({
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

  private async getExerciseTemplate(id: string) {
    this._exerciseService.getExerciseTemplateWithId(id).subscribe({
      next: exerciseTemplate => {
        this.exerciseTemplate = exerciseTemplate;
        this.patchValue();
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
    })
  }

  private patchValue() {
    this.newExerciseTemplate.patchValue({
      name: this.exerciseTemplate.name,
      code: this.exerciseTemplate.code,
      description: this.exerciseTemplate.description,
      language: this.exerciseTemplate.language,
    })
  }
}
