import { Component } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { UserService } from 'src/app/services/user.service';
import { NotfoundComponent } from '../notfound/notfound.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  constructor(private user: UserService, public auth: AuthService) { }
  role: string | undefined;
  selectedForAnonymizingId: string | undefined;
  successAnonymizedHidden = true;
  usersAnonymizedErrorHidden = true;
  notFoundHidden = true;

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => {
        this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
          if (isAuthenticated) {
            this.user.getUser(profile.email).subscribe({
              next: (data) => {
                this.role = data.role;
                if (this.role == "admin") {
                  this.getUsers(); //Load user data when user loads this page
                }
                else{
                  this.notFoundHidden = false;
                }
              }
            });
          }
          else{
            this.notFoundHidden = false;
          }
        })
      });
  }

  users: User[] = []; //Users will be stored here
  usersSuccessfullyLoaded = true;
  getUsers(): void { //Will load all the user data via the userservice
    this.user.getUsers().subscribe({
      next: (v) => {
        this.users = v //Assign result to the user list
        this.users.sort((u1, u2) => { //Sort loaded warehouse data
          if (u1.isActive < u2.isActive) {
            return 1;
          } else if (u1.isActive > u2.isActive) {
            return -1;
          } else {
            return 0;
          }
        })
      },
      error: (e) => {
        this.usersSuccessfullyLoaded = false;
        console.error("Internal Server Error, the GET request for users couldn't be processed. Try again later.");
        setTimeout(() => window.location.reload(), 5000) //Reload page every 5 seconds
      },
    });
  }

  showAnonymizingNotification(id: string) {
    this.selectedForAnonymizingId = id;
  }

  cancelAnonymizing() {
    this.selectedForAnonymizingId = undefined;
  }

  executeAnonymizing() {
    this.user.anonymizeUser(this.selectedForAnonymizingId).subscribe({
      next: () => {
        this.successAnonymizedHidden = false;
        setTimeout(() => {window.location.reload(); this.successAnonymizedHidden = true}, 5000) //Reload page after 5 seconds
      },
      error: (err) => {
        this.usersAnonymizedErrorHidden = false;
        console.log(err);
        setTimeout(() => {this.usersAnonymizedErrorHidden = true}, 5000)
      }
    });
  }
}
