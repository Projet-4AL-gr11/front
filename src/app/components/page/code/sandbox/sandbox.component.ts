import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {

  constructor(
    public router: Router,

  ) { }

  ngOnInit(): void {

  }

  test() {
    console.log("envoi vers la page du theme");
  }

  goToSendBox() {
    this.router.navigateByUrl("/code");

  }

}
