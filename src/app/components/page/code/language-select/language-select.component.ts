import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.css']
})
export class LanguageSelectComponent implements OnInit {

  constructor(
    public router: Router,

  ) { }

  ngOnInit(): void {

  }

  test() {
    console.log("envoi vers la page du theme");
  }

  goToSendBox() {
    this.router.navigateByUrl("/code/sandbox");

  }
}
