import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Colleges } from '../college/colleges';
import { Programs } from '../programs/programs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Department } from '../department/department';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-program-component',
  templateUrl: './program-component.component.html',
  styleUrls: ['./program-component.component.css']
})
export class ProgramComponentComponent {
  selectedCollege: Colleges = null;
  selectedProgram: Programs = null;
  selectedDepartment: Department = null;

  collegeObj: Colleges = new Colleges();
  collegeArr: Colleges[] = [];

  DepartmentObj: Department = new Department();
  DepartmentArr: Department[] = [];

  programObj: Programs = new Programs();
  programArr: Programs[] = [];

  UpdateInfo: boolean = false;
  printable: boolean = false;
  entries: boolean = true;

  myForm: FormGroup;
  constructor(private crudService: CrudService, private fb: FormBuilder) {

  }
  ngOnInit(): void {

    this.myForm = this.fb.group({
      progid: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      progfullname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      progshortname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      progcollid: [null, [Validators.required]],
      progcolldeptid: [null, [Validators.required]],
    })

    this.myForm.valueChanges.subscribe(console.log);
    this.getAllProgram();
    this.getAllDepartment();
    this.getAllCollege();
  }


  addProgram() {
    const data = {
      progid: this.myForm.get('progid').value,
      progfullname: this.myForm.get('progfullname').value,
      progshortname: this.myForm.get('progshortname').value,
      progcollid: this.selectedCollege.collid,
      progcolldeptid: this.selectedDepartment.deptid
    };
    console.log(data);
    this.crudService.addProgram(data).subscribe(
      (response) => {
        console.log('POST request successful', response);
        Swal.fire({
          title: "Success!",
          text: "New Program added.",
          icon: "success"
        });
        this.clearEntries()
      }, (error) => {
        Swal.fire({
          icon: "error",
          title: "Invalid",
          text: "Check your inputs",
        });
        console.error('Error in POST request', error);
      }
    );
  }
  deleteProgram(Progid: number): void {
    let toString: string = '' + Progid;
    console.log("ProgID: " + Progid);
    this.crudService.removeProgram(toString).subscribe(
      (response) => {
        console.log('DELETE request successful', response);
        this.getAllProgram();
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
          text: "This program cannot be deleted because it is referenced by other records.",
        });
        console.error('Error in DELETE request', error);
      }
    );
  }

  getAllProgram() {
    this.crudService.getAllPrograms().subscribe(res => {
      this.programArr = res;
    }, err => {
      alert("Unable to get list of Colleges");
    })
  }

  getAllDepartment() {
    this.crudService.getAllDepartments().subscribe(res => {
      this.DepartmentArr = res;
    }, err => {
      alert("Unable to get list of Colleges");
    })
  }

  public printStudentEntries(): void {
    if (this.printable == true) {
      this.printable = false
    }
    else {
      this.printable = true
      this.getAllProgram();
    }
  }
  public printStudentUpdate(): void {
    if (this.UpdateInfo == true) {
      this.UpdateInfo = false
    }
    else this.UpdateInfo = true;
  }
  public printStudentInput(): void {
    if (this.entries == true) {
      this.entries = false
    } else this.entries = true;
  }

  getAllCollege() {
    this.crudService.getAllCollege().subscribe(res => {
      this.collegeArr = res;
    }, err => {
      alert("Unable to get list of Colleges");
    })
  }
  editProgram(data: any): void {
    const programdata = data.progid;
    console.log("prog: " + programdata)
    this.crudService.getProgramInfo(programdata).subscribe(
      (programInfo) => {
        console.log("programInfo" + programInfo);
        this.programObj = programInfo;
        console.log(this.programObj)
        this.myForm = this.fb.group({
          progid: [{ value: this.programObj.progid, disabled: true }],
          progfullname: this.programObj.progfullname,
          progshortname: this.programObj.progshortname,
          progcollid: selectedCollege,
          progcolldeptid: selectedDepartment
        })
        
        var selectedCollege = this.collegeArr.find(college => college.collid === this.programObj.progcollid);
        var selectedDepartment = this.DepartmentArr.find(Department => Department.deptid === this.programObj.progcolldeptid);
        console.log("Selected Department")
        console.log(selectedDepartment);
        console.log("Selected college")
        console.log(selectedCollege);

        this.selectedCollege = selectedCollege;
        this.selectedDepartment = selectedDepartment;
      },
      (error) => {
        console.error('Error fetching student info', error);
      }
    );
  }

  updateProgram(): void {

    const data = {
      progid: this.myForm.get('progid').value,
      progfullname: this.myForm.get('progfullname').value,
      progshortname: this.myForm.get('progshortname').value,
      progcollid: this.selectedCollege.collid,
      progcolldeptid: this.selectedDepartment.deptid
    };
    console.log(data);
    // Call the method to update student information
    this.crudService.updateProgramInfo(data).subscribe({
      next:(response) => {
        console.log(response);
      },
      error:(error) => {
        console.error('Error updating student info', error);
        Swal.fire({
          icon: "error",
          title: "Invalid",
          text: "Check your inputs",
        });
      }, 
      complete: () => {
        Swal.fire({
          title: "Success!",
          text: "Department Information Updated.",
          icon: "success"
        });
      }
  });
  }

  public clearEntries(): void {
    this.myForm.reset();
  }
}
