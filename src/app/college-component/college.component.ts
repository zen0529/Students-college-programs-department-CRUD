import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Colleges } from '../college/colleges';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css']
})
export class CollegeComponent {

  selectedCollege: Colleges = null;
  collegeObj: Colleges = new Colleges();
  collegeArr: Colleges[] = [];

  UpdateCollegeInfo: boolean = false;
  printable: boolean = false;
  entries: boolean = true;

  myForm: FormGroup;
  constructor(private crudService: CrudService, private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.myForm = this.fb.group({
      collid: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      collfullname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      collshortname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
    })

    this.myForm.valueChanges.subscribe(console.log);
    this.getAllCollege();
  }
  addCollege() {
    const data = {
      collid: this.myForm.get('collid').value,
      collfullname: this.myForm.get('collfullname').value,
      collshortname: this.myForm.get('collshortname').value,
    };
    console.log(data);
    this.crudService.addCollege(data).subscribe(
      (response) => {

        console.log('POST request successful', response);

        Swal.fire({
          title: "Success!",
          text: "New College added.",
          icon: "success"
        });

        this.clearEntries()
      },
      (error) => {
        console.error('Error in POST request', error);
        Swal.fire({
          icon: "error",
          title: "Invalid",
          text: "Check your inputs",
        });
      }
    );
  }
  deleteCollege(collID: any): void {
    this.crudService.removeCollege(collID).subscribe(
      (response) => {
        this.getAllCollege();
        console.log('DELETE request successful', response);
        this.getAllCollege();
        Swal.fire({
          title: "Success!",
          text: "Deleted Successfully",
          icon: "success"
        });
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Invalid",
          text: "This college cannot be deleted because it is referenced by other records.",
        });
        console.error('Error in DELETE request', error);

      }
    );
  }

  getAllCollege() {
    this.crudService.getAllCollege().subscribe(res => {
      this.collegeArr = res;
      for (let i = 0; i < this.collegeArr.length; i++) {
        console.log(this.collegeArr[i]);
      }
    }, err => {
      alert("Unable to get list of Colleges");
    })
  }


  public printStudentEntries(): void {
    if (this.printable == true) {
      this.printable = false

    }
    else {
      this.getAllCollege();
      this.printable = true
    }
  }
  public printStudentUpdate(): void {

    if (this.UpdateCollegeInfo == true) {
      this.UpdateCollegeInfo = false
    }
    else this.UpdateCollegeInfo = true;
  }
  public printStudentInput(): void {

    if (this.entries == true) {
      this.entries = false
    }
    else this.entries = true;
  }


  editCollege(data: any): void {
    // Assuming student.studid is the ID of the selected student
    const collid = data.collid;
    console.log("collid: " + collid)
    this.crudService.getCollegeInfo(collid).subscribe(
      (collegeinfo) => {
        // Handle the received studentInfo as needed
        console.log(collegeinfo);
        this.collegeObj = collegeinfo;
        console.log(this.collegeObj)
        this.myForm = this.fb.group({
          collid: [{ value: this.collegeObj.collid, disabled: true }],
          collfullname: this.collegeObj.collfullname,
          collshortname: this.collegeObj.collshortname,
        })
      },
      (error) => {
        console.error('Error fetching student info', error);
      }
    );
  }

  updateCollege(): void {

    const data = {
      collid: this.myForm.get('collid').value,
      collfullname: this.myForm.get('collfullname').value,
      collshortname: this.myForm.get('collshortname').value,
    };
    console.log(data);
    // Call the method to update student information
    this.crudService.updateCollegeInfo(data).subscribe(
      (response) => {
        // Handle the response as needed
        console.log(response);
        Swal.fire({
          title: "Success!",
          text: "College Information Updated.",
          icon: "success"
        });
      },
      (error) => {
        console.error('Error updating student info', error);
        Swal.fire({
          icon: "error",
          title: "Invalid",
          text: "Check your inputs",
        });
      }
    );
  }

  public clearEntries(): void {
    this.myForm.reset();
  }
}


