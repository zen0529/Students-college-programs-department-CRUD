import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponentComponent } from './student-component/student-component.component';
import { CollegeComponent } from './college-component/college.component';
import { ProgramComponentComponent } from './program-component/program-component.component';
import { DepartmentComponentComponent } from './department-component/department-component.component';

const routes: Routes = [
  { component: StudentComponentComponent,
    path: ''
 }, 
 { component: StudentComponentComponent,
   path: 'students'
}, 
 { component: CollegeComponent, 
   path: 'colleges'
},
{ component: ProgramComponentComponent, 
  path: 'programs'
},
{ component: DepartmentComponentComponent, 
  path: 'department'
}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// export const routingComponents = [ StudentComponentComponent, CollegeComponent]