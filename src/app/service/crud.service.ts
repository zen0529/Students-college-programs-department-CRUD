import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Students } from '../student/student'
import { Observable } from 'rxjs'
import { Colleges } from '../college/colleges';
import { Programs } from '../programs/programs';
import { Department } from '../department/department';
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  baseURL: string;
  saveStudentURL : string;
  getCollegeURL: string;
  getProgramsURL: string;
  constructor(private http: HttpClient) { 
    this.baseURL = "http://localhost:9001/usjr-app/api/"
    
  }
  //saveStudent
  addStudents(Students : any) : Observable<any> {
     const httpOptions = {
       headers : new HttpHeaders({
        'content-type': 'application/json'
       }),
      }
      //const headers = { 'content-type': 'application/json'}  
      const body=JSON.stringify(Students);
      console.log(body)
     
    return this.http.post(this.baseURL + 'savestudent.php', body, httpOptions)
  
  }

 
  getAllStudents() : Observable<Students[]> {
    return this.http.get<Students[]>(this.baseURL + 'getstudents.php');
  }

  deleteStudent(Students : Students) : Observable<Students> {
    return this.http.delete<Students>(this.baseURL + '/removestudent.php' +'/'+Students.studid);
  }

  removeStudent(studID: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        studid: studID,
      },
    };
  
    return this.http.delete(this.baseURL + '/removestudent.php', options);
  }

  editStudent(Students : Students) : Observable<Students> {
    return this.http.put<Students>(this.baseURL +'getstudentinfo.php'+'/'+Students.studid,Students);
  }
  
  getStudentInfo(studid: string): Observable<any> {
    const url = `${this.baseURL}/getstudentinfo.php`;
    return this.http.post(url, { studid });
  }

 

  updateStudentInfo(studentUpdateData: any): Observable<any> {
    const httpOptions = {
      headers : new HttpHeaders({
       'content-type': 'application/json'
      }),
     }
     const body=JSON.stringify(studentUpdateData);
     console.log(body)
    return this.http.post(`${this.baseURL}/poststudentupdates.php`, body, httpOptions);
  }

  
  //colleges
  addCollege(college : any) : Observable<any> {
    const httpOptions = {
      headers : new HttpHeaders({
       'content-type': 'application/json'
      }),
     }
     //const headers = { 'content-type': 'application/json'}  
     const body=JSON.stringify(college);
     console.log(body)
    
   return this.http.post(this.baseURL + 'savecollege.php', body, httpOptions)
 
 }

 editCollege(College : Colleges) : Observable<Colleges> {
  return this.http.put<Colleges>(this.baseURL +'getcollegeinfo.php'+'/'+College.collid,Colleges);
}

getCollegeInfo(collid: string): Observable<any> {
  const url = `${this.baseURL}/getcollegeinfo.php`;
  return this.http.post(url, { collid });
}

getAllCollege() : Observable<Colleges[]> {
  return this.http.get<Colleges[]>(this.baseURL + 'getcolleges.php');
} 


removeCollege(CollID: string): Observable<any> {
  const options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    body: {
      collid: CollID,
    },
  };

  return this.http.delete(this.baseURL + '/removecollege.php', options);
}

updateCollegeInfo(data: any): Observable<any> {
  const httpOptions = {
    headers : new HttpHeaders({
     'content-type': 'application/json'
    }),
   }
   const body=JSON.stringify(data);
   console.log(body)
  return this.http.post(`${this.baseURL}/postcollegeupdates.php`, body, httpOptions);
}


//programs

addProgram(data : any) : Observable<any> {
  const httpOptions = {
    headers : new HttpHeaders({
     'content-type': 'application/json'
    }),
   }
   //const headers = { 'content-type': 'application/json'}  
   const body=JSON.stringify(data);
   console.log(body)
  
 return this.http.post(this.baseURL + 'saveprogram.php', body, httpOptions)

}

editProgram(program : Programs) : Observable<Programs> {
return this.http.put<Programs>(this.baseURL +'getprograminfo.php'+'/'+program.progid,Programs);
}

getProgramInfo(progid: string): Observable<any> {
const url = `${this.baseURL}/getprograminfo.php`;
return this.http.post(url, { progid });
}

getAllPrograms() : Observable<Programs[]> {
  return this.http.get<Programs[]>(this.baseURL + 'getprograms.php');
} 


removeProgram(Progid: string): Observable<any> {
  const options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    body: {
      progid: Progid, 
    },
  };

  return this.http.delete(this.baseURL + 'removeprogram.php', options);
}


updateProgramInfo(data: any): Observable<any> {
const httpOptions = {
  headers : new HttpHeaders({
   'content-type': 'application/json'
  }),
 }
 const body=JSON.stringify(data);
 console.log(body)
return this.http.post(`${this.baseURL}postprogramupdates.php`, body, httpOptions);
}




//Departments
addDepartment(data : any) : Observable<any> {
  const httpOptions = {
    headers : new HttpHeaders({
     'content-type': 'application/json'
    }),
   }

   const body=JSON.stringify(data);
   console.log(body)
  
 return this.http.post(this.baseURL + 'savedepartment.php', body, httpOptions)

}

editDepartment(Department : Department) : Observable<Department> {
return this.http.put<Department>(this.baseURL +'getdepartmentinfo.php'+'/'+Department.deptid,Department);
}

getDepartmentInfo(deptid: string): Observable<any> {
const url = `${this.baseURL}/getDepartmentinfo.php`;
return this.http.post(url, { deptid });
}

getAllDepartments() : Observable<Department[]> {
  return this.http.get<Department[]>(this.baseURL + 'getdepartments.php');
} 


removeDepartment(id: string): Observable<any> {
const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  body: {
    deptid: id,
  },
};

return this.http.delete(this.baseURL + '/removedepartment.php', options);
}

updateDepartmentInfo(deptData: any): Observable<any> {
const httpOptions = {
  headers : new HttpHeaders({
   'content-type': 'application/json'
  }),
 }
 const body=JSON.stringify(deptData);
 console.log(body)
return this.http.post(`${this.baseURL}postdepartmentupdate.php`, body, httpOptions);
}
}
