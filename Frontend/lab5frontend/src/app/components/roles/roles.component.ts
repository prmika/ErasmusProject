import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Role } from 'src/app/interfaces/role';
import { UserService } from 'src/app/services/user.service';
import { RoleService } from '../../services/role.service'

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
  constructor(private user: UserService, private roleService: RoleService, public auth: AuthService) { }
  role: string | undefined;
  notFoundHidden = true;

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
                    this.getRoles(); //Load role data when user loads this page
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

  roles: Role[] = []; //Roles will be stored here
  rolesSuccessfullyLoaded = true;
  getRoles(): void { //Will load all the role data via the roleservice
    this.roleService.getRoles().subscribe({
      next: (v) => {
        this.roles = v //Assign result to the role list
      },
      error: (e) => {
        this.rolesSuccessfullyLoaded = false;
        console.error("Internal Server Error, the GET request for roles couldn't be processed. Try again later.");
        setTimeout(() => window.location.reload(), 5000) //Reload page every 5 seconds
      },
    });
  }
}
