import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as moment from 'moment';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() { }


exporttabletoexcel(tableid:string,filename:string): void
{
   let element = document.getElementById(tableid);
   const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

   //delete action column
   delete (ws['F1'])

   const wb: XLSX.WorkBook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');


   XLSX.writeFile(wb, filename);

}

public exportAsExcelFile(json: any[], excelFileName: string): void {
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});

  FileSaver.saveAs(data, fileName + '_export_' + '_created_on' + moment(Date.now()).format('YYYY_MM_DD') + EXCEL_EXTENSION);
  }

}


