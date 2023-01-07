import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Role } from 'src/app/interfaces/role';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent {
  role: string | undefined
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
                  if (this.role != "admin") {
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
  //Define all the fields necessary for a role
  name: string | undefined;

  notAllFieldsHaveDataErrorHidden = true; //Shows error when not all data was given
  roleWasSuccessfullyAddedHidden = true; //Show success message when role was successfully created
  roleWasNotAddedErrorHidden = true; //Show failure message when there were errors while trying to create the role

  addRole(): void { //Function to create a new role
    if ((this.name != undefined)) { //Id needs to have 6 characters.      

      let body = {
        "name": this.name.toLowerCase(),
      }
      this.roleService.addRole(body as Role).subscribe({ //Will call the service to create the role
        next: (v) => {
          this.roleWasSuccessfullyAddedHidden = false; //Show success message
          setTimeout(() => { window.location.href = 'roles'; this.roleWasSuccessfullyAddedHidden = true; }, 5000) //Will redirect to role listing page and hide success message after 5 seconds
        },
        error: (e) => {
          this.roleWasNotAddedErrorHidden = false; //Will show failure message
          console.error("Internal Server Error, the POST request for a new Role couldn't be processed. Try again later.");
          setTimeout(() => { this.roleWasNotAddedErrorHidden = true; }, 5000) //Will reset failure message after 5 seconds
        },
      })
    }
    else {
      this.notAllFieldsHaveDataErrorHidden = false; //Will show failure message because not all fields have data
      console.error("Not all necessary fields for a new role were filled in. POST Request can only be executed when this is the case.");
      setTimeout(() => this.notAllFieldsHaveDataErrorHidden = true, 5000) //Will reset failure message because not all fields have data after 5 seconds
    }
  }
}
