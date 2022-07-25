import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
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

  @Output('execCode') execCode: EventEmitter<any> = new EventEmitter<any>()
  input: string;
  aceEditor;
  language: string;
  log: string;

  constructor() { }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.aceEditor = ace.edit(this.editor.nativeElement)
    ace.config.set("fontSize", "14px");
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
    this.aceEditor.setTheme("ace/theme/monokai");

  }

  changeLanguage(language: string) {
    const editor = ace.edit(this.editor.nativeElement);

    if(language == 'Python'){
      editor.session.setMode("ace/mode/python");
    }
    else if(language  == 'JS'){
      editor.session.setMode("ace/mode/javascript");
    }

  }

  getCode(): string {
    return this.aceEditor.getValue();
  }


  executeCode() {
    this.execCode.emit()
  }

  setLog(log) {
    this.log = log
  }

  clearIde() {
    this.aceEditor.session.setValue("");
    this.log = "";
  }
}
