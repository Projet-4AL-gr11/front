import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Language} from "../../../../../services/models/language.model";
import {LanguageService} from "../../../../../services/language/language.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {ExerciseService} from "../../../../../services/exercise/exercise.service";
import {AdminIdeComponent} from "../../../../shared/admin-ide/admin-ide.component";
import {ExecCodeEnum} from "../../../../../services/models/enum/execCode.enum";
import {ExecuteDto} from "../../../../../services/models/dto/execute.dto";
import {ExecuteValidateDto} from "../../../../../services/models/dto/execute-validate.dto";
import {AdminIdeValidateComponent} from "../../../../shared/admin-ide-validate/admin-ide-validate.component";
import {
  AdminIdeValidateBadCodeComponent
} from "../../../../shared/admin-ide-validate-bad-code/admin-ide-validate-bad-code.component";

@Component({
  selector: 'app-create-exercise-template',
  templateUrl: './create-exercise-template.component.html',
  styleUrls: ['./create-exercise-template.component.css']
})
export class CreateExerciseTemplateComponent implements OnInit {

  loadingExec: boolean = false;

  @ViewChild(AdminIdeComponent) private editor: AdminIdeComponent;
  @ViewChild(AdminIdeValidateComponent) private editorValidate: AdminIdeValidateComponent;
  @ViewChild(AdminIdeValidateBadCodeComponent) private editorValidateBadCode: AdminIdeValidateComponent;

  codeValidated: boolean = false;
  languages: Language[];
  newExerciseTemplate: FormGroup;
  languageSelected: Language;
  badCode: boolean;
  goodCode: boolean;
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
      error: err => {    this.initializeFormGroup();

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

  async onClickSubmit() {
    this.newExerciseTemplate.value.code = this.editor.getCode();
    this.newExerciseTemplate.value.language = this.languageSelected;
    if (!this.newExerciseTemplate.valid) {
      this._snackBar.open('Le schéma n\'est pas validé, veillez réessayer', 'Fermer', {
        duration: 3000
      });
      return;
    } else if (this.languageSelected == undefined) {
      this._snackBar.open('Veillez sélectionner un langage', 'Fermer', {
        duration: 3000
      });
      return;
    } else if (!this.newExerciseTemplate?.value?.code?.includes(ExecCodeEnum.EXEC_PATTERN)) {
      this._snackBar.open('Veillez insérer le flag #@#@#@#@#@ dans le code', 'Fermer', {
        duration: 3000
      });
      return;
    } else if (!this.newExerciseTemplate?.value?.code?.includes(ExecCodeEnum.EXEC_GOOD_RESULT)) {
      this._snackBar.open('Vous n\'avez pas mis le code de retour EverythingIsGood', 'Fermer', {
        duration: 3000
      });
      return;
    } else {
      if (this.codeValidated) {

        await this._exerciseService.createExerciseTemplate(this.newExerciseTemplate, this.languageSelected).subscribe({
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
      } else {
        this._snackBar.open('Valider votre code Avant de créer le template', 'Fermer', {
          duration: 3000
        });
        return;
      }

    }
  }

  async validateBadTest() {
    const exerciseRequest = new ExecuteValidateDto(
      this.setLanguage(this.languageSelected.name),
      this.editor.getCode().replace(ExecCodeEnum.EXEC_PATTERN, this.editorValidateBadCode.getCode()),
    );
    return this._exerciseService.executeValidateCode(exerciseRequest).subscribe({
      next: result => {
        if (!result.isGoToNextExercise) {
          this.loadingExec = false;
          this.badCode = true
        } else {
          this.loadingExec = false;
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
        this.loadingExec = false;
        return;
      }
    })
  }
  async validateGoodCode() {

    const exerciseRequest = new ExecuteValidateDto(
      this.setLanguage(this.languageSelected.name),
      this.editor.getCode().replace(ExecCodeEnum.EXEC_PATTERN, this.editorValidate.getCode()),
    );
    return this._exerciseService.executeValidateCode(exerciseRequest).subscribe({
      next: result => {
        if (!result.isGoToNextExercise) {

          this.loadingExec = false;
          this.goodCode = true
        } else {
          this.loadingExec = false;
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
        this.loadingExec = false;
        return;
      }
    });
  }
  executeCode() {
    this.loadingExec = true;

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
