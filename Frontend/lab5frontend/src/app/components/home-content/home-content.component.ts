import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {
  faLink = faLink;
  personalUserData: User | undefined;

  constructor(public auth: AuthService, private user: UserService) { }

  ngOnInit() {
    this.auth.user$.subscribe(
      (profile) => {
        this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
          if (isAuthenticated){
            this.user.getUser(profile.email).subscribe({
              next: (data) => {
                this.personalUserData = data;
              }
            });
          };
        })      
      }); 
  }

}
