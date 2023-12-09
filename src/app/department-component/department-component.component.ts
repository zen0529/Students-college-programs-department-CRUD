import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Colleges } from '../college/colleges';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Department } from '../department/department';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department-component',
  templateUrl: './department-component.component.html',
  styleUrls: ['./department-component.component.css']
})
export class DepartmentComponentComponent {
  selectedCollege: Colleges = null;
  collegeObj: Colleges = null;
  collegeArr: Colleges[] = [];

  DepartmentObj: Department = new Department();
  DepartmentArr: Department[] = [];

  UpdateCollegeInfo: boolean = false;
  printable: boolean = false;
  entries: boolean = true;
  myForm: FormGroup;
  constructor(private crudService: CrudService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.myForm = this.fb.group({
      deptid: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      deptfullname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      deptshortname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      deptcollid: [null, [Validators.required]],
    })
    this.myForm.valueChanges.subscribe(console.log);
    this.getAllDeparment();
    this.getAllCollege();
  }
  addDepartment() {
    const data = {
      deptid: this.myForm.get('deptid').value,
      deptfullname: this.myForm.get('deptfullname').value,
      deptshortname: this.myForm.get('deptshortname').value,
      deptcollid: this.selectedCollege.collid,
    };

    console.log(data);
    this.crudService.addDepartment(data).subscribe(
      (response) => {
        console.log('POST request successful', response);
        Swal.fire({
          title: "Success!",
          text: "New Department added.",
          icon: "success"
        });
        this.clearEntries()
      }, (error) => {
        console.error('Error in POST request', error);
        Swal.fire({
          icon: "error",
          title: "Invalid",
          text: "Check your inputs",
        });
      }
    );
  }
  deleteDepartment(id: any): void {
    this.crudService.removeDepartment(id).subscribe(
      (response) => {
        console.log('DELETE request successful', response);
        this.getAllDeparment();
        Swal.fire({
          title: "Success!",
          text: "Deleted Successfully",
          icon: "success"
        });
        // Handle success, e.g., notify the user or update the UI
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Invalid",
          text: "This department cannot be deleted because it is referenced by other records.",
        });
        console.error('Error in DELETE request', error);

        // Handle error, e.g., show an error message to the user
      }
    );
  }

  getAllDeparment() {
    this.crudService.getAllDepartments().subscribe(res => {
      this.DepartmentArr = res;
    }, err => {
      alert("Unable to get list of Colleges");
    })
  }


  public printEntries(): void {
    if (this.printable == true) {
      this.printable = false

    }
    else {
      this.getAllDeparment();
      this.printable = true

    }
  }
  public printUpdate(): void {

    if (this.UpdateCollegeInfo == true) {
      this.UpdateCollegeInfo = false
    }
    else this.UpdateCollegeInfo = true;
  }
  public printInput(): void {

    if (this.entries == true) {
      this.entries = false
    }
    else this.entries = true;
  }


  editDepartment(data: any): void {
    const DepartmentId = data.deptid;
    console.log(DepartmentId);
    this.crudService.getDepartmentInfo(DepartmentId).subscribe(
      (Info) => {
        console.log(Info);
        this.DepartmentObj = Info;
        console.log(this.DepartmentObj)
        this.myForm = this.fb.group({
          deptid: [{ value: this.DepartmentObj.deptid, disabled: true }],
          deptfullname: this.DepartmentObj.deptfullname,
          deptshortname: this.DepartmentObj.deptshortname,
          deptcollid: selectedCollege
        })
        var selectedCollege = this.collegeArr.find(college => college.collid === this.DepartmentObj.deptcollid);
        console.log(selectedCollege);
        this.selectedCollege = selectedCollege;
      },
      (error) => {
        console.error('Error fetching student info', error);
      }
    );
  }

  updateDepartment(): void {

    const data = {
      deptid: this.myForm.get('deptid').value,
      deptfullname: this.myForm.get('deptfullname').value,
      deptshortname: this.myForm.get('deptshortname').value,
      deptcollid: this.selectedCollege.collid,
    };
    console.log(data);
    // Call the method to update student information
    this.crudService.updateDepartmentInfo(data).subscribe(
      (response) => {
        // Handle the response as needed
        console.log(response);
        Swal.fire({
          title: "Success!",
          text: "Department Information Updated.",
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

  getAllCollege() {
    this.crudService.getAllCollege().subscribe(res => {
      this.collegeArr = res;
    }, err => {
      alert("Unable to get list of Colleges");
    })
  }

  public clearEntries(): void {
    this.myForm.reset();
  }
}
