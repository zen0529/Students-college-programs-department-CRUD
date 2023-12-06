import { Component, OnInit} from '@angular/core';
import { Students } from '../student/student'
import { CrudService } from '../service/crud.service';
import { Colleges } from '../college/colleges';
import { Programs } from '../programs/programs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Department } from '../department/department';


@Component({
  selector: 'app-department-component',
  templateUrl: './department-component.component.html',
  styleUrls: ['./department-component.component.css']
})
export class DepartmentComponentComponent {
  selectedCollege: Colleges = null;

   StudentsObj : Students = null;
   StudentsArr : Students[] = [];

   collegeObj: Colleges = null;
   collegeArr: Colleges[] = [];

   programObj : Programs = null;
   programArr : Programs[] = [];

   DepartmentObj : Department = new Department();
   DepartmentArr : Department[] = [];

   UpdateCollegeInfo: boolean = false;
   printable: boolean = false;
   entries: boolean = true;

   myForm: FormGroup;
    constructor (private crudService : CrudService, private fb: FormBuilder) {

    }
    ngOnInit(): void {
  
      this.myForm = this.fb.group({
        deptid:  [null, [Validators.required,Validators.pattern(/^[0-9]+$/)]],
        deptfullname: [ '',[Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
        deptshortname: [ '',[Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
        deptcollid: [ null,[Validators.required]],
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

            this.ngOnInit;
            console.log('POST request successful', response);
          },
          (error) => {
            console.error('Error in POST request', error);
          }
        );
      }
      
     
    
      deleteDepartment(id: any): void {
        this.crudService.removeDepartment(id).subscribe(
          (response) => {
            console.log('DELETE request successful', response);
            // Handle success, e.g., notify the user or update the UI
          },
          (error) => {
            console.error('Error in DELETE request', error);
            // Handle error, e.g., show an error message to the user
          }
        );
      }
    
      getAllDeparment() {
        this.crudService.getAllDepartments().subscribe(res => {
          this.DepartmentArr = res;
          for (let i = 0; i < this.DepartmentArr.length; i++) {
            console.log(this.DepartmentArr[i]); 
          }
        }, err => {
          alert("Unable to get list of Colleges");
        })
      }

      
      public printEntries(): void {
        if(this.printable == true){
          this.printable = false
          
        }
        else this.printable = true
        this.ngOnInit;
     }
     public printUpdate(): void {
      
      if(this.UpdateCollegeInfo == true){
        this.UpdateCollegeInfo = false
      }
      else this.UpdateCollegeInfo = true;
   }
   public printInput(): void {
      
    if(this.entries == true){
      this.entries = false
    }
    else this.entries = true;
    this.ngOnInit;
 }


 editDepartment(data: any): void {
  // Assuming student.studid is the ID of the selected student
  const DepartmentId = data.deptid;
  console.log(DepartmentId);
  this.crudService.getDepartmentInfo(DepartmentId).subscribe(
    (Info) => {
      // Handle the received studentInfo as needed
       console.log(Info);
       this.DepartmentObj = Info;
       console.log(this.DepartmentObj)
       this.myForm.patchValue({
        deptid: this.DepartmentObj.deptid,
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
    },
    (error) => {
      console.error('Error updating student info', error);
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
}
