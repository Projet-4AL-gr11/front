import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as ace from "ace-builds";
import {ExerciseService} from "../../../services/exercise/exercise.service";

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {
  //creer le tableau des language
  @ViewChild("editor") private editor: ElementRef<HTMLElement>;
  @ViewChild("output") private output: ElementRef<HTMLElement>;
  foo: string = "";
  aceEditor;


  language = 'python';

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.aceEditor = ace.edit(this.editor.nativeElement)
    ace.config.set("fontSize", "14px");
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
    this.aceEditor.setTheme("ace/theme/monokai");

    this.changeLanguage();
  }

  changeLanguage() {
  const editor = ace.edit(this.editor.nativeElement);

  if(this.language == 'c' || this.language == 'cpp'){
    editor.session.setMode("ace/mode/c_cpp");
    editor.session.setValue("testc");
  }
  else if(this.language == 'php'){
    editor.session.setMode("ace/mode/php");
    editor.session.setValue("testcphp");

  }
  else if(this.language == 'python'){
    editor.session.setMode("ace/mode/python");
    editor.session.setValue("testpyuthonc");

  }
  else if(this.language == 'node'){
    editor.session.setMode("ace/mode/javascript");
    editor.session.setValue("testnodec");

  }
}

  executeCode() {
    console.log("hello");

    this.foo = this.exerciseService.runCode(this.aceEditor.getValue()).message;
  }


}


