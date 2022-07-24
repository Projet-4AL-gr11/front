import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as ace from "ace-builds";
import {ExecuteService} from "../../../services/execute/execute.service";

@Component({
  selector: 'app-event-ide',
  templateUrl: './event-ide.component.html',
  styleUrls: ['./event-ide.component.css']
})
export class EventIdeComponent implements OnInit {

  @ViewChild("editor") private editor: ElementRef<HTMLElement>;
  @ViewChild("output") private output: ElementRef<HTMLElement>;

  input: string;
  aceEditor;
  language: string;


  constructor() { }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    ace.config.set("fontSize", "14px");
    ace.config.set(
      "basePath",
      "https://unpkg.com/ace-builds@1.4.12/src-noconflict"
    );
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.session.setValue("<h1>Ace Editor works great in Angular!</h1>");
    ace.config.set("fontSize", "14px");
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
    this.aceEditor.setTheme("ace/theme/twilight");
    this.aceEditor.session.setMode("ace/mode/html");
    this.aceEditor.on("change", () => {
      console.log(this.aceEditor.getValue());
    });

    this.changeLanguage();
  }

  changeLanguage() {
    const editor = ace.edit(this.editor.nativeElement);

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


}
