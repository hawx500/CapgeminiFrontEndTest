import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EendPoint } from '../utils/EendPoins.enum';
import { IEmployeeResponseDto } from '../models/IEmployeeResponseDto';
import { isNullOrUndefined } from 'util';

const C_HEADER: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(public apiHttp: HttpClient) { }

  private getEndPoint(_metodo: string): string {
    return `${environment.server}${_metodo}`;
  }

   public Get<T>(_endpoint: string): Observable<IEmployeeResponseDto> {

    return this.apiHttp.get<IEmployeeResponseDto>(_endpoint)
      .pipe(
        catchError(this.ControlError)
      );
  }

  public GetById<T>(_endpoint: string, _params?: HttpParams | { [param: string]: string | string[] }): Observable<IEmployeeResponseDto> {

    return this.apiHttp.get<IEmployeeResponseDto>(_endpoint, { params: _params, headers: C_HEADER, observe: "body", responseType: 'json' })
      .pipe(
        catchError(this.ControlError)
      );
  }

  public ControlError(_error: HttpErrorResponse) {
    if (_error.status == 500){
      return throwError('There is an error in the transaction, please try again later');
    }else if(_error.status == 202){
      return throwError('Test');
    }
  };

  public findAllEmployee<T>(_opcion: EendPoint, _metodo: string = 'findAllEmployee'): Promise<IEmployeeResponseDto> {

    return new Promise((resolve, reject) => {

      this.Get<T>(`${this.getEndPoint(_opcion)}`)
        .subscribe((_result) => {          
          if (_result.httpCode == 200)
            return resolve(_result);
          else
            return reject();
        }
          ,(_error => {            
            reject(_error);
          })
        );
    });
  }

  public findEmployeeById<T>(_opcion: EendPoint, _params?: any, _metodo: string = 'findEmployeeById'): Promise<IEmployeeResponseDto> {

    return new Promise((resolve, reject) => {

      const params: HttpParams | { [param: string]: string | string[] } = (isNullOrUndefined(_params) ? null : new HttpParams({ fromObject: { 'employeeId': _params } }));

      this.GetById<T>(`${this.getEndPoint(_opcion)}`, params)
        .subscribe((_result) => {          
          if (_result.httpCode == 200)
            return resolve(_result);
          else if(_result.httpCode == 202)
            return reject('No data found with id: ' + _params);
        }
          , (_error => {            
            reject(_error);
          })
        );
    });
  }

}
