import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {
  title: string;
  image: File;
  public message: string;
  constructor(private _authService: AuthService,) { }

  ngOnInit(): void {
  }

  onTitleChanged(event: any){
    this.title = event.target.value;

  }

  onImageChanged(event: any){
    this.image = event.target.files[0];
  }

  diagnose(){
    this.message = "";
    const imgProcessData = new FormData();
    imgProcessData.append('title', this.title);
    imgProcessData.append('image', this.image, this.image.name);
    this._authService.processImage(imgProcessData).subscribe(
      res => {
        console.log(res);
        console.log(res.image);
        this.message = res.image;
      },
      err => {
        console.log(err);
        this.message = err.error.errors.error[0];
      }
    );
  }

}
