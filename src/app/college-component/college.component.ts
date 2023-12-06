import { Component, OnInit} from '@angular/core';
import { Students } from '../student/student'
import { CrudService } from '../service/crud.service';
import { Colleges } from '../college/colleges';
import { Programs } from '../programs/programs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css']
})
export class CollegeComponent {

  selectedCollege: Colleges = null;
  selectedProgram: Programs = null;

   StudentsObj : Students = null;
   StudentsArr : Students[] = [];

   collegeObj : Colleges = new Colleges();
   collegeArr : Colleges[] = [];

   programObj : Programs = new Programs();
   programArr : Programs[] = [];
  

   UpdateCollegeInfo: boolean = false;
   printable: boolean = false;
   entries: boolean = true;

   myForm: FormGroup;
    constructor (private crudService : CrudService, private fb: FormBuilder) {

    }
    ngOnInit(): void {
  
      this.myForm = this.fb.group({
        collid: ['', [Validators.required,Validators.pattern(/^[0-9]+$/)]],
        collfullname:  [ '',[Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
        collshortname:  [ '',[Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
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

            this.ngOnInit;
            console.log('POST request successful', response);
          },
          (error) => {
            console.error('Error in POST request', error);
          }
        );
      }
      
     
    
      deleteCollege(collID: any): void {
        this.crudService.removeCollege(collID).subscribe(
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
        if(this.printable == true){
          this.printable = false
          
        }
        else this.printable = true
        this.ngOnInit;
     }
     public printStudentUpdate(): void {
      
      if(this.UpdateCollegeInfo == true){
        this.UpdateCollegeInfo = false
      }
      else this.UpdateCollegeInfo = true;
   }
   public printStudentInput(): void {
      
    if(this.entries == true){
      this.entries = false
    }
    else this.entries = true;
    this.ngOnInit;
 }


 editCollege(data: any): void {
  // Assuming student.studid is the ID of the selected student
  const collid = data.collid;
  console.log("collid: " + collid)
  this.crudService.getCollegeInfo(collid).subscribe(
    (collegeinfo) => {
      // Handle the received studentInfo as needed
       console.log( collegeinfo);
       this.collegeObj = collegeinfo;
       console.log(this.collegeObj)
       this.myForm.patchValue({
        collid: this.collegeObj.collid,
        collfullname:  this.collegeObj.collfullname,
        collshortname:  this.collegeObj.collshortname,
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
    },
    (error) => {
      console.error('Error updating student info', error);
    }
  );
}
}


