import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { EendPoint } from '../../utils/EendPoins.enum';
import { isNullOrUndefined } from 'util';
import { MessageComponent } from '../message/message.component';
import { IEmployeeDto } from 'src/app/models/IEmployeeDto';
import { EnumMessage, IDataMessage } from 'src/app/models/IMessageData';
import { IEmployeeResponseDto } from 'src/app/models/IEmployeeResponseDto';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  columns: string[] = ['employeId', 'employeeName', 'employeeSalary', 'employeeAnualSalary','employeeAge','employeeProfileImage'];
  dataService: MatTableDataSource<IEmployeeDto>;

  public formSearch: FormGroup;
  public loading: boolean = true;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort: MatSort;
  @ViewChild('dataTable', { static: false}) dataTable: MatTable<IEmployeeDto>;

  constructor(private employeeService: EmployeeService, private sMessage: MatDialog) {
    this.formSearch = new FormGroup({
      userId: new FormControl()          
    });    
  }

  async ngOnInit() {    
    this.loading = false;
  }

  private loadData(): void {

    this.loading = true;
    this.dataService = new MatTableDataSource<IEmployeeDto>();
    let idValue = JSON.stringify(this.formSearch.value);
    let idObject = JSON.parse(idValue);
    if(idObject.userId == '' || idObject.userId == null){
     this.employeeService.findAllEmployee<IEmployeeResponseDto>(EendPoint.employeeAll, this.formSearch.value)
       .then(_data => {        
         this.UpdateDataSource(_data.empoyeeList);         
       }
         , (_error) => {
           this.ShowMessage(new IDataMessage('Error', _error, EnumMessage.error));
         });
    }else{
      this.employeeService.findEmployeeById<IEmployeeResponseDto>(EendPoint.employeeById, idObject.userId)
       .then(_data => {   
         this.UpdateDataSource(_data.empoyeeList);         
       }
         , (_error) => {
           this.ShowMessage(new IDataMessage('Error', _error, EnumMessage.error));
         });
    }
  }

  public get loadedData(): boolean {
    return (isNullOrUndefined(this.dataService) ? false : (this.dataService.data.length > 0));
  }

  private UpdateDataSource(_data?: Array<IEmployeeDto>) {

    if (!isNullOrUndefined(_data)) {
      this.dataService = new MatTableDataSource(_data);
    }else{
      this.dataTable.renderRows();
    }

    this.dataService.paginator = this.paginator;
    this.dataService.sort = this.sort;
    this.loading = false;
  }

  private ShowMessage(_data: IDataMessage): Promise<boolean> {
    this.loading = false;
    return new Promise((resolve) => {
      const dialogRef = this.sMessage.open(MessageComponent, {
        data: _data,
        panelClass: 'message'
      });

      dialogRef.afterClosed().subscribe(_respuesta => {
        resolve(_respuesta);
      });
    });
  }

  public Cancel() {
    this.dataService.data.length = 0;
    this.loadedData;
    this.formSearch.reset({
      userId: null
    });
  }

}
