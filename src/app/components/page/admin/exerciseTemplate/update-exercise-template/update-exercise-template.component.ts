import {Component, OnInit, ViewChild} from '@angular/core';
import {Language} from "../../../../../services/models/language.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LanguageService} from "../../../../../services/language/language.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ExerciseService} from "../../../../../services/exercise/exercise.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../../../environments/environment";
import {ExerciseTemplate} from "../../../../../services/models/erxercise_template.model";
import {Title} from "@angular/platform-browser";
import {AdminIdeComponent} from "../../../../shared/admin-ide/admin-ide.component";
import {AdminIdeValidateComponent} from "../../../../shared/admin-ide-validate/admin-ide-validate.component";
import {
  AdminIdeValidateBadCodeComponent
} from "../../../../shared/admin-ide-validate-bad-code/admin-ide-validate-bad-code.component";
import {ExecuteValidateDto} from "../../../../../services/models/dto/execute-validate.dto";
import {ExecCodeEnum} from "../../../../../services/models/enum/execCode.enum";

@Component({
  selector: 'app-update-create-exercise-template',
  templateUrl: './update-exercise-template.component.html',
  styleUrls: ['./update-exercise-template.component.css']
})
export class UpdateExerciseTemplateComponent implements OnInit {

  @ViewChild(AdminIdeComponent) private editor: AdminIdeComponent;
  @ViewChild(AdminIdeValidateComponent) private editorValidate: AdminIdeValidateComponent;
  @ViewChild(AdminIdeValidateBadCodeComponent) private editorValidateBadCode: AdminIdeValidateComponent;

  exerciseTemplate: ExerciseTemplate = new ExerciseTemplate();
  languages: Language[];
  newExerciseTemplate: FormGroup;
  languageSelected: Language;
  badCode: boolean;
  goodCode: boolean;
  codeValidated: boolean;
  loadingExecBad: boolean;
  loadingExecValid: boolean;

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
    })

  }

  onClickSubmit() {
    this.newExerciseTemplate.value.code = this.editor.getCode();
    this.newExerciseTemplate.value.language = this.languageSelected;
    if (!this.newExerciseTemplate.valid) {
      this._snackBar.open('Le schéma n\'est pas validé, veillez réessayer', 'Fermer', {
        duration: 3000
      });
      return;
    } else if (!this.newExerciseTemplate?.value?.code?.includes("#@#@#@#@#@")) {
      this._snackBar.open('Veillez insérer le flag #@#@#@#@#@ dans le code', 'Fermer', {
        duration: 3000
      });
      return;
    } else if (!this.newExerciseTemplate?.value?.code?.includes("EverythingIsGood")) {
      this._snackBar.open('Vous n\'avez pas mis le code de retour EverythingIsGood', 'Fermer', {
        duration: 3000
      });
      return;
    } else {
      if (this.codeValidated) {
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
    this.languageSelected = this.exerciseTemplate.language;
    this.editor.setCode(this.exerciseTemplate.code);
  }


  async validateBadTest() {
    const exerciseRequest = new ExecuteValidateDto(
      this.setLanguage(this.languageSelected.name),
      this.editor.getCode().replace(ExecCodeEnum.EXEC_PATTERN, this.editorValidateBadCode.getCode()),
    );
    return this._exerciseService.executeValidateCode(exerciseRequest).subscribe({
      next: result => {
        if (!result.isGoToNextExercise) {
          this.loadingExecBad = false;
          this.badCode = true
        } else {
          this.loadingExecBad = false;
          this._snackBar.open('Le retour pour un code qui où les test ne passe pas n\'est pas bon', 'Fermer', {
            duration: 3000
          });
          return true;
        }
      },
      error: err => {
        if (!environment.production) {
          console.log(err)
        }
        this._snackBar.open('Une érreur à été rencontré lors de l\'envoie du code', 'Fermer', {
          duration: 3000
        });
        this.loadingExecBad = false;
        return;
      }
    })
  }
  async validateGoodCode() {
    this.loadingExecValid = true;
    const exerciseRequest = new ExecuteValidateDto(
      this.setLanguage(this.languageSelected.name),
      this.editor.getCode().replace(ExecCodeEnum.EXEC_PATTERN, this.editorValidate.getCode()),
    );
    return this._exerciseService.executeValidateCode(exerciseRequest).subscribe({
      next: result => {
        if (!result.isGoToNextExercise) {

          this.loadingExecValid = false;
          this.goodCode = true
        } else {
          this.loadingExecValid = false;
          this._snackBar.open('Le retour pour un code qui devrait être bon est faux', 'Fermer', {
            duration: 3000
          });
          return false;
        }
      },
      error: err => {
        if (!environment.production) {
          console.log(err)
        }
        this._snackBar.open('Une érreur à été rencontré lors de l\'envoie du code', 'Fermer', {
          duration: 3000
        });
        this.loadingExecBad = false;
        return;
      }
    });
  }
  executeCode() {

  }

  setLanguage(language: string): string {
    if(language == "Python") return "py";
    if(language == "JS") return "js";
    return "";
  }

  async validateExec() {

    await this.validateBadTest();
    await this.validateGoodCode();
    console.log(this.badCode && this.goodCode)
    if (this.badCode && this.goodCode) {
      this._snackBar.open('Code Valide', 'Fermer', {
        duration: 3000
      });
      this.codeValidated = true;
    } else {
      this._snackBar.open('Code Invalide', 'Fermer', {
        duration: 3000
      });
    }
  }
}
