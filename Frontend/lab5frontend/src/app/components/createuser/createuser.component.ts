import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { Role } from 'src/app/interfaces/role';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router'
//import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  constructor(private UserService: UserService) { }

  ngOnInit(): void {
  }
  id: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  password: string | undefined;
  role: string | undefined;

notAllFieldsHaveDataErrorHidden = true; //Shows error when not all data was given
userWasSuccessfullyAddedHidden = true; //Show success message when truck was successfully created
userWasNotAddedErrorHidden = true; //Show failure message when there were errors while trying to create the truck


  addUser(): void { //Function to create a new truck
    if ((this.firstName != undefined)) { //Id needs to have 6 characters.      
      if ((this.lastName != undefined ) && //Will check if none of the fields are undefined and in the right format, if so the code will continue executing.
        (this.email != undefined) &&
        (this.password != undefined) &&
        (this.role != undefined)){
        let body = {
          //"id": uuidv4(),
          "id": this.id,
          "firstName": this.firstName,
          "lastName": this.lastName,
          "email": this.email,
          "password": this.password,
          "role": this.role
        }
        this.UserService.addUser(body as User).subscribe({ //Will call the service to create the truck
          next: (v) => {
            this.userWasSuccessfullyAddedHidden = false; //Show success message
            setTimeout(() => { window.location.href = 'trucks'; this.userWasSuccessfullyAddedHidden = true; }, 3000)
          },
          error: (e) => {
            this.userWasNotAddedErrorHidden = false; //Will show failure message
          },
        })
      }
      else {
        this.notAllFieldsHaveDataErrorHidden = false; //Will show failure message because not all fields have data
        setTimeout(() => this.notAllFieldsHaveDataErrorHidden = true, 5000) //Will reset failure message because not all fields have data after 5 seconds
      }
    }
  }
}

