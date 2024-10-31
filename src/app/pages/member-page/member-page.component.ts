import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-page',
  templateUrl: './member-page.component.html',
  styleUrls: ['./member-page.component.scss'],
})
export class MemberPageComponent {
  memberForm: FormGroup;

  inputFile: FormControl = new FormControl('');
  urlCreate = 'http://localhost:8080/member-api/create';
  filePic: any = null;

  constructor(
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.memberForm = fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    this.filePic = event.target.files[0];
  }

  submitMember() {
    const formDataMember = new FormData();

    formDataMember.append('name', this.memberForm.value.name);
    formDataMember.append('position', this.memberForm.value.position);
    formDataMember.append(
      'createUser',
      String(localStorage.getItem('username'))
    );
    if (this.filePic != null) {
      formDataMember.append('file', this.filePic);
    }

    this.httpClient
      .post(this.urlCreate, formDataMember)
      .subscribe((result: any) => {
        alert(result.message);
        if (String(result.status) == 'Success') {
          this.router.navigate(['member']);
        } 
      });
  }
}
