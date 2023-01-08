import { Component } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-useradd',
  templateUrl: './useradd.component.html',
  styleUrls: ['./useradd.component.css']
})
export class UseraddComponent {
  role: string | undefined;
  notFoundHidden = true;
  constructor(private roleService: RoleService, public auth: AuthService, private user: UserService) { }

  ngOnInit(): void {
    if (this.auth.user$) {
      this.auth.user$.subscribe(
        (profile) => {
          this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
            if (isAuthenticated) {
              this.user.getUser(profile.email).subscribe({
                next: (data) => {
                  this.role = data.role;
                  if (this.role == "admin") {
                    this.roleService.getRoles().subscribe({
                      next: (v) => {
                        v.forEach(role => this.roleNames.push(role.name)); //For each received role the name will be pushed to the roleNames list.
                        this.roleNames.sort(); //RoleNames list will be sorted.
                        if (this.roleNames.length < 1) {
                          this.min1RoleSuccessfullyLoaded = false; //If less than 1 role exists this variable should be false so that on the html page the form won't be visible to create a new user.
                        }
                        else {
                          this.userRole = this.roleNames[0]; //Default selected role is the first warehouse in the id list
                          this.min1RoleSuccessfullyLoaded = true; //Set to true so that the form is visible
                        }
                      },
                      error: (e) => {
                        console.error("Internal Server Error, the GET request for roles couldn't be processed, which means no routes can't be added at the moment. Try again later.");
                        this.min1RoleSuccessfullyLoaded = false; //When there's an error to load warehouses it shouldn't be possible to create a warehouse route.
                      },
                    })
                  }
                  else {
                    this.notFoundHidden = false;
                  }
                }
              });
            }
            else {
              this.notFoundHidden = false;
            }
          })
        });
    }
  }

  //All the user fields
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  password: string | undefined;
  phoneNr: string | undefined;
  userRole: string | undefined;

  //All the message hidden status variables
  notAllFieldsHaveDataErrorHidden = true;
  userWasSuccessfullyAddedHidden = true;
  userWasNotAddedErrorHidden = true;

  roleNames: string[] = [] //Stores warehouse ids
  min1RoleSuccessfullyLoaded = false; //Stores value to know if at least 2 warehouses were successfully loaded

  addUser(): void {
    if ((this.firstName != undefined && this.firstName != "") &&
    (this.lastName != undefined && this.lastName != "") &&
    (this.email != undefined && this.email != "") &&
    (this.password != undefined && this.password != "") &&
    (this.phoneNr != undefined && this.phoneNr != "" && this.phoneNr.includes("+"))) {
      let body = {
        "firstName": this.firstName,
        "lastName": this.lastName,
        "email": this.email,
        "password": this.password,
        "role": this.userRole,
        "phoneNr": this.phoneNr.replace(/ /g,"")
      }
      this.user.addUser(body as User).subscribe({ //Use the userService to create a user.
        next: (v) => {
          this.userWasSuccessfullyAddedHidden = false; //Show success message
          setTimeout(() => { window.location.href = 'users'; this.userWasSuccessfullyAddedHidden = true; }, 5000) //Will redirect to user listing page and hide success message after 5 seconds      
        },
        error: (e) => {
          this.userWasNotAddedErrorHidden = false; //Will show failure message
          console.error("Internal Server Error, the POST request for a new User couldn't be processed. Try again later.");
          setTimeout(() => { this.userWasNotAddedErrorHidden = true; }, 5000) //Will reset failure message after 5 seconds
        },
      })
    }
    else {
      this.notAllFieldsHaveDataErrorHidden = false; //Will show failure message because not all fields have data
      setTimeout(() => this.notAllFieldsHaveDataErrorHidden = true, 5000) //Will reset failure message because not all fields have data after 5 seconds
    }
  }
}
