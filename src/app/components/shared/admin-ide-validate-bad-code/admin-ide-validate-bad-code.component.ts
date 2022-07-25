import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as ace from "ace-builds";

@Component({
  selector: 'app-admin-ide-validate-bad-code',
  templateUrl: './admin-ide-validate-bad-code.component.html',
  styleUrls: ['./admin-ide-validate-bad-code.component.css']
})
export class AdminIdeValidateBadCodeComponent implements OnInit {

  @ViewChild("editorValidateBadCode") private editorValidateBadCode: ElementRef<HTMLElement>;
  @ViewChild("output") private output: ElementRef<HTMLElement>;

  input: string;
  aceEditor;
  language: string;


  constructor() { }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.aceEditor = ace.edit(this.editorValidateBadCode.nativeElement)
    ace.config.set("fontSize", "14px");
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
    this.aceEditor.setTheme("ace/theme/monokai");

    this.changeLanguage();
  }

  changeLanguage() {
    const editor = ace.edit(this.editorValidateBadCode.nativeElement);

    if(this.language == 'Python'){
      this.language  = 'py'
      editor.session.setMode("ace/mode/python");
    }
    else if(this.language  == 'JavaScript'){
      this.language  = 'js'
      editor.session.setMode("ace/mode/javascript");
    }

  }

  getCode(): string {
    return this.aceEditor.getValue();
  }

  setCode(code: string) {
    this.aceEditor.session.setValue(code);
  }
}
