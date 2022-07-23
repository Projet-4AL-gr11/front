import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import * as ace from "ace-builds";
import {ExecuteService} from "../../../../services/execute/execute.service";

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {

  @ViewChild("editor") private editor: ElementRef<HTMLElement>;
  @ViewChild("output") private output: ElementRef<HTMLElement>;

  result: string = "";
  aceEditor;

  selectLanguage = 'py';
  languages = [
    {
      name: 'Python',
      value: 'py'
    },
    {
      name: 'JavaScript',
      value: 'js'
    },
  ];

  constructor(public router: Router, private executeService: ExecuteService) { }

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
    if(event.target.value == 'Python'){
      this.selectLanguage = 'py'
      editor.session.setMode("ace/mode/python");
    }
    else if(event.target.value == 'JavaScript'){
      this.selectLanguage = 'js'
      editor.session.setMode("ace/mode/javascript");
    }
  }

  executeCode() {
    this.executeService.runCode(this.aceEditor.getValue(), this.selectLanguage).subscribe(response => {
      this.result = response;
    });
  }

}
