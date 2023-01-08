import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserAdd } from 'src/app/interfaces/user-add';
import { AuthService, User } from '@auth0/auth0-angular';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  currentUser: User | undefined; //Stores user data
  successnotificationHidden = true; //Stores value to hide message (should be showed when user is successfully updated)
  errornotificationHidden = true; //Stores value to hide message (should be showed when user had errors while updating)
  roleNames: string[] = [] //Stores the warehouseIds
  min1RoleSuccessfullyLoaded = false; //Stores value to hide sections, should be true when 1 role loaded
  notAllFieldsHaveDataErrorHidden = true; //Stores value to show notification when not all fields have data

  role: string | undefined;
  notFoundHidden = true;
  constructor(
    private route: ActivatedRoute, //We need this to read the current route url
    private roleService: RoleService, public auth: AuthService, private user: UserService
  ) { }

  ngOnInit(): void {
    if (this.auth.user$) {
      this.auth.user$.subscribe(
        (profile) => {
          this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
            if (isAuthenticated) {
              this.user.getUser(profile.email).subscribe({
                next: (data) => {
                  this.role = data.role;
                  if (this.role == "admin" || this.role == "logistics_manager") {
                    this.getUser(); //Load the detailed warehouse route data when loading this page
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

  getUser(): void {
    const email = String(this.route.snapshot.paramMap.get('email')); //Reads the user email parameter at the end of the route url
    this.user.getUser(email) //Uses userService to get the user data associated with the entered id.
      .subscribe({
        next: (v) => {
          this.currentUser = v as UserAdd;
          this.currentUser.password = "";
          this.roleService.getRoles().subscribe({
            next: (v) => {
              v.forEach(role => this.roleNames.push(role.name)); //For each received role the name will be pushed to the roleNames list.
              this.roleNames.sort(); //RoleNames list will be sorted.
              if (this.roleNames.length < 1) {
                this.min1RoleSuccessfullyLoaded = false; //If less than 1 role exists this variable should be false so that on the html page the form won't be visible to create a new user.
              }
              else {
                this.min1RoleSuccessfullyLoaded = true; //Set to true so that the form is visible
              }
            },
            error: (e) => {
              console.error("Internal Server Error, the GET request for roles couldn't be processed, which means no routes can't be added at the moment. Try again later.");
              this.min1RoleSuccessfullyLoaded = false; //When there's an error to load roles it shouldn't be possible to update a user.
            },
          })
        },
        error: (e) => {
          console.error("Internal Server Error, the GET request for the user couldn't be processed. Try again later.");
          setTimeout(() => window.location.reload(), 5000)
        },
      });
  }

  updateUser(): void {
    if (this.currentUser) { //User can't be undefined
      if ((this.currentUser.firstName != undefined && this.currentUser.firstName != "") &&
      (this.currentUser.lastName != undefined && this.currentUser.lastName != "") &&
      (this.currentUser.email != undefined && this.currentUser.email != "") &&
      (this.currentUser.password != undefined && this.currentUser.password != "") &&
      (this.currentUser.phoneNr != undefined && this.currentUser.phoneNr != "" && this.currentUser.phoneNr.includes("+"))) {
        this.user.updateUser(this.currentUser.email, this.currentUser as UserAdd).subscribe({ //Use the userService to update a user and subscribe to the result.
          next: (v) => {
            this.successnotificationHidden = false; //Show success message
            setTimeout(() => {
              this.successnotificationHidden = true;
              window.location.href = 'users';
            }, 4000) //Will redirect to users listing page and hide success message after 4 seconds
          },
          error: (e) => {
            this.errornotificationHidden = false; //Will show failure message
            console.error("Internal Server Error, the PUT request couldn't be processed. Try again later.");
            console.error(e)
            setTimeout(() => {
              this.errornotificationHidden = true;
            }, 4000) //Will reset failure message after 5 seconds
          },
        })
      }
      else {
        this.notAllFieldsHaveDataErrorHidden = false;
        setTimeout(() => this.notAllFieldsHaveDataErrorHidden = true, 5000);
      }
    }
  }
} 
