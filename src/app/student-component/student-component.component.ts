import { Component, OnInit} from '@angular/core';
import { Students } from '../student/student'
import { CrudService } from '../service/crud.service';
import { Colleges } from '../college/colleges';
import { Programs } from '../programs/programs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-student-component',
  templateUrl: './student-component.component.html',
  styleUrls: ['./student-component.component.css']
})
export class StudentComponentComponent implements OnInit {
   
  selectedCollege: Colleges = null;
  selectedProgram: Programs = null;

   StudentsObj : Students = null;
   StudentsArr : Students[] = [];

   collegeObj : Colleges = new Colleges();
   collegeArr : Colleges[] = [];

   programObj : Programs = new Programs();
   programArr : Programs[] = [];
  
   addStudentsValue : string = '';
   editStudentsValue : string = '';

   UpdateStudentInfo: boolean = false;
   printable: boolean = false;
   entries: boolean = true;
   myForm: FormGroup;
    constructor (private crudService : CrudService, private fb: FormBuilder) {

    }
    ngOnInit(): void {
  
      this.myForm = this.fb.group({
        studid: ['', [Validators.required,Validators.pattern(/^[0-9]+$/)]],
        studfirstname:[ '',[Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
        studlastname: [ '',[Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
        studmidname:  [ '',[Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
        studcollege: [ null,[Validators.required]],
        studprogram: [ null,[Validators.required]],
        studyear:  ['', [Validators.required,Validators.pattern(/^[1-5]+$/)]],
      })

      this.myForm.valueChanges.subscribe(console.log);
      this.getAllStudents();
      this.getAllCollege();
      this.getAllProgram();
    }
    
    
      addStudents() {
         const data = {
           studID: this.myForm.get('studid').value,
           studFirstName: this.myForm.get('studfirstname').value,
           studLastName: this.myForm.get('studlastname').value,
           studMidName: this.myForm.get('studmidname').value,
           studProgId: this.selectedProgram.progid,
           studCollId: this.selectedCollege.collid,
           studYear: this.myForm.get('studyear').value
         };
         
         console.log(data);
        this.crudService.addStudents(data).subscribe(
          (response) => {
            console.log('POST request successful', response);
          },
          (error) => {
            console.error('Error in POST request', error);
          }
        );
      }
      
     
    
      deleteStudent(studID: string): void {
        this.crudService.removeStudent(studID).subscribe(
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
    
      call(eStudents : Students) {
        this.StudentsObj = eStudents;
        this.editStudentsValue = eStudents.studfirstname;
      }
      
      getAllStudents() {
    
        this.crudService.getAllStudents().subscribe(response => {
          this.StudentsArr = response;
          for (let i = 0; i < this.StudentsArr.length; i++) {
            console.log(this.StudentsArr[i]); 
          }
        }, err => {
          alert("Unable to get list of Studentss");
        });
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

      getAllProgram() {
        this.crudService.getAllPrograms().subscribe(res => {
          this.programArr = res;
          for (let i = 0; i < this.programArr.length; i++) {
            console.log(this.programArr[i]); 
          }
        }, err => {
          alert("Unable to get list of Programs");
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
      
      if(this.UpdateStudentInfo == true){
        this.UpdateStudentInfo = false
      }
      else this.UpdateStudentInfo = true;
   }
   public printStudentInput(): void {
      
    if(this.entries == true){
      this.entries = false
    }
    else this.entries = true;
    this.ngOnInit;
 }


 editStudent(student: any): void {
  // Assuming student.studid is the ID of the selected student
  const studid = student.studid;

  this.crudService.getStudentInfo(studid).subscribe(
    (studentInfo) => {
      // Handle the received studentInfo as needed
       console.log("stuentinfo: "+ studentInfo);
       this.StudentsObj = studentInfo;
       console.log("stuentInfo" + this.StudentsObj)
       this.myForm.patchValue({
        studid: this.StudentsObj.studid,
        studfirstname:  this.StudentsObj.studfirstname,
        studlastname:  this.StudentsObj.studlastname,
        studmidname:  this.StudentsObj.studmidname,
        studprogram: selectedProgram,
        studcollege: selectedCollege,
        studyear:  this.StudentsObj.studyear,
      })

      var selectedProgram = this.programArr.find(program => program.progid === this.StudentsObj.studprogid);
      var selectedCollege = this.collegeArr.find(college => college.collid === this.StudentsObj.studcollid);

      console.log("college: " + selectedCollege);
      console.log(" Program " + selectedProgram);

      this.selectedCollege = selectedCollege;
      this.selectedProgram = selectedProgram;
    },
    (error) => {
      console.error('Error fetching student info', error);
    }
  );
}

updateStudent(): void {

  const data = {
    studID: this.myForm.get('studid').value,
    studFirstName: this.myForm.get('studfirstname').value,
    studLastName: this.myForm.get('studlastname').value,
    studMidName: this.myForm.get('studmidname').value,
    studProgId: this.selectedProgram.progid,
    studCollId: this.selectedCollege.collid,
    studYear: this.myForm.get('studyear').value
  };
  console.log(data);
  // Call the method to update student information
  this.crudService.updateStudentInfo(data).subscribe(
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
