import { IEmployeeDto } from "./IEmployeeDto";

export interface IEmployeeResponseDto {

    empoyeeList: IEmployeeDto[];
    httpCode: number;
}