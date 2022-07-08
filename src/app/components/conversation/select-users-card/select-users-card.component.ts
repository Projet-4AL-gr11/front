import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../services/models/user.model";
import {FormControl} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs";

@Component({
  selector: 'app-select-users-card',
  templateUrl: './select-users-card.component.html',
  styleUrls: ['./select-users-card.component.css']
})
export class SelectUsersCardComponent implements OnInit {


  @Input() users: User[] = [];
  @Output() addUser: EventEmitter<User> = new EventEmitter<User>();
  @Output() removeUser: EventEmitter<User> = new EventEmitter<User>();

  searchUsername = new FormControl();
  filteredUsers: User[] = [];
  selectedUser: User = null;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.searchUsername.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((username: string) => this.userService.researchUsername(username).pipe(
        tap((users: User[]) => this.filteredUsers = users)
      ))
    ).subscribe();
  }

  addUserToForm() {
    this.addUser.emit(this.selectedUser);
    this.filteredUsers = [];
    this.selectedUser = null;
    this.searchUsername.setValue(null);
  }

  removeUserFromForm(user: User) {
    this.removeUser.emit(user);
  }

  setSelectedUser(user: User) {
    this.selectedUser = user;
  }

  displayFn(user: User) {
    if (user) {
      return user.username;
    } else {
      return '';
    }
  }
}
