import { Component, OnInit } from '@angular/core';
import { Students } from '../student/student'
import { CrudService } from '../service/crud.service';
import { Colleges } from  '../college/colleges';
import { Programs } from '../programs/programs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-component',
  templateUrl: './student-component.component.html',
  styleUrls: ['./student-component.component.css']
})
export class StudentComponentComponent implements OnInit {

  selectedCollege: Colleges = null;
  selectedProgram: Programs = null;

  StudentsObj: Students = null;
  StudentsArr: Students[] = [];

  collegeObj: Colleges = new Colleges();
  collegeArr: Colleges[] = [];

  programObj: Programs = new Programs();
  programArr: Programs[] = [];

  UpdateStudentInfo: boolean = false;
  printable: boolean = false;
  entries: boolean = true;
  myForm: FormGroup;

  constructor(private crudService: CrudService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.myForm = this.fb.group({
      studid: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      studfirstname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      studlastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      studmidname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      studcollege: [null, [Validators.required]],
      studprogram: [null, [Validators.required]],
      studyear: ['', [Validators.required, Validators.pattern(/^[1-5]+$/)]],
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
    console.log("thisform", this.myForm.value)
    this.crudService.addStudents(data).subscribe(
      (response) => {
        console.log('POST request successful', response);
        Swal.fire({
          title: "Success!",
          text: "New Student added.",
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
  deleteStudent(studID: string): void {
    this.crudService.removeStudent(studID).subscribe(
      (response) => {
        console.log('Successful', response);
        this.getAllStudents();
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
          text: "This student cannot be deleted because it is referenced by other records.",
        });
        console.error('Error in DELETE request', error);
      }
    );
  }
  getAllStudents() {
    this.crudService.getAllStudents().subscribe(response => {
      this.StudentsArr = response;
    }, err => {
      alert("Unable to get list of Studentss");
    });
  }
  getAllCollege() {
    this.crudService.getAllCollege().subscribe(res => {
      this.collegeArr = res;
    }, err => {
      alert("Unable to get list of Colleges");
    })
  }
  getAllProgram() {
    this.crudService.getAllPrograms().subscribe(res =>{
      this.programArr = res;
    }, err => {
      alert("Unable to get list of Programs");
    })
  }
  public printStudentEntries(): void {
    if (this.printable == true) {
      this.printable = false
    }
    else {
      this.getAllStudents();
      this.printable = true
    }
  }
  public printStudentUpdate(): void {
    if (this.UpdateStudentInfo == true) {
      this.UpdateStudentInfo = false
    }
    else this.UpdateStudentInfo = true;
  }
  public printStudentInput(): void {
    if (this.entries == true) {
      this.entries = false
    }
    else this.entries = true;
  }
  editStudent(student: any): void {
    // Assuming student.studid is the ID of the selected student
    const studid = student.studid;
    this.crudService.getStudentInfo(studid).subscribe(
      (studentInfo) => {
        // Handle the received studentInfo as needed
        console.log("stuentinfo: " + studentInfo);
        this.StudentsObj = studentInfo;
        console.log("stuentInfo" + this.StudentsObj)
        this.myForm = this.fb.group({
          studid: [{ value: this.StudentsObj.studid, disabled: true }],
          studfirstname: this.StudentsObj.studfirstname,
          studlastname: this.StudentsObj.studlastname,
          studmidname: this.StudentsObj.studmidname,
          studprogram: selectedProgram,
          studcollege: selectedCollege,
          studyear: this.StudentsObj.studyear,
        })

        var selectedProgram = this.programArr.find(program => program.progid === this.StudentsObj.studprogid);
        var selectedCollege = this.collegeArr.find(college => college.collid === this.StudentsObj.studcollid);

        console.log("college: " + selectedCollege);
        console.log("Program " + selectedProgram);

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
        Swal.fire({
          title: "Success!",
          text: "Student Information Updated.",
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
