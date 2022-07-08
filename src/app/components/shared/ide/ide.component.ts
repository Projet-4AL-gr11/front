import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ExerciseService} from "../../../services/exercise/exercise.service";
import * as ace from "ace-builds";

@Component({
  selector: 'app-ide',
  templateUrl: './ide.component.html',
  styleUrls: ['./ide.component.css']
})
export class IdeComponent implements OnInit {

  @ViewChild("editor") private editor: ElementRef<HTMLElement>;
  @ViewChild("output") private output: ElementRef<HTMLElement>;
  foo: string = "";
  aceEditor;

  selectLanguage = 'python';
  languages = [ 'Python', 'JavaScript'
  ];

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.aceEditor = ace.edit(this.editor.nativeElement)
    ace.config.set("fontSize", "14px");
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
    this.aceEditor.setTheme("ace/theme/monokai");

    this.changeLanguage(event);
  }

  changeLanguage(event: any) {
    const editor = ace.edit(this.editor.nativeElement);

    this.selectLanguage = event.target.value;

    if(this.selectLanguage == 'Python'){
      editor.session.setMode("ace/mode/python");
      editor.session.setValue("Ready to Python");
    }
    else if(this.selectLanguage == 'JavaScript'){
      editor.session.setMode("ace/mode/javascript");
      editor.session.setValue("Ready to JavasSript");
    }

  }

  executeCode() {
    this.foo = this.exerciseService.runCode(this.aceEditor.getValue()).message;
  }


}
