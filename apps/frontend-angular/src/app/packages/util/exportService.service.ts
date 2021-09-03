import { Injectable } from '@angular/core';
import date from 'date-and-time';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { LanguageMessagesService } from './languageMessagesService';
const jsPDF = require('jspdf');
require('jspdf-autotable');


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExportService {

  constructor(private languageMessagesService: LanguageMessagesService) { }

  async exportPdf(selectedColumns, originalRows, pdfFileName, innerObjectInfo?) {
    let rows = JSON.parse(JSON.stringify(originalRows));
    rows.forEach(record => {
      Object.keys(record).forEach(oldKey => {
        if (oldKey === 'epoch' || oldKey === 'startDate' || oldKey === 'endDate' || oldKey === 'date' || oldKey === 'createDateEpoch') {
          record[oldKey] = date.format(new Date(record[oldKey]), 'DD/MM/YYYY • HH:mm:ss');
        }
        if (this.languageMessagesService.msgjson[record[oldKey].toString()]) {
          record[oldKey] = this.languageMessagesService.msgjson[record[oldKey].toString()];
        }
      });
    });

    const doc = new jsPDF.default('p', 'px', 'a4');

  
    
    let columns = [];
    if (innerObjectInfo) {
      selectedColumns.forEach(col => {
        let flag = false;
        innerObjectInfo.forEach(element => {
          if (element.objectColumn === col) {
            columns.push({ title: this.languageMessagesService.msgjson[col.toString()] ? this.languageMessagesService.msgjson[col.toString()] : col, dataKey: col, displayProperty: element.objectProperty });
            flag = true;
          }
        });
        if (flag === false) {
          columns.push({ title: this.languageMessagesService.msgjson[col.toString()] ? this.languageMessagesService.msgjson[col.toString()] : col, dataKey: col });
        }
      });
    } else {
      selectedColumns.forEach(col => {
        columns.push({ title: this.languageMessagesService.msgjson[col.toString()] ? this.languageMessagesService.msgjson[col.toString()] : col, dataKey: col });
      });
    }
    doc.autoTable(columns, rows, {
      didParseCell: function(data) {
        if (data.column.raw.displayProperty) {
          var prop = data.column.raw.displayProperty;
          var text = data.cell.raw[prop];
          if (text && text.length > 0) {
            data.cell.text = text;
          }
        }
      }
    });
    doc.save(pdfFileName);
  }

  public exportAsExcelFile(selectedColumns, originalRows: any[], excelFileName: string, innerObjectInfo?): void {
    let json = JSON.parse(JSON.stringify(originalRows));
    if (innerObjectInfo) {
      json.forEach(record => {
        Object.keys(record).forEach(key => {
          if (selectedColumns.includes(key)) {
            innerObjectInfo.forEach(element => {
              if (element.objectColumn === key) {
                record[key] = record[key][element.objectProperty];
              }
            });
          }
        })
      })
    }
    
    json.forEach(record => {
      Object.keys(record).forEach(oldKey => {
        if (selectedColumns.includes(oldKey)) {
          if (oldKey === 'epoch' || oldKey === 'startDate' || oldKey === 'endDate' || oldKey === 'date' || oldKey === 'createDateEpoch') {
            record[oldKey] = date.format(new Date(record[oldKey]), 'DD/MM/YYYY • HH:mm:ss');
          }
          if (this.languageMessagesService.msgjson[oldKey.toString()]) {
            let newKey = this.languageMessagesService.msgjson[oldKey.toString()];
            Object.defineProperty(record, newKey, Object.getOwnPropertyDescriptor(record, oldKey));
            if (this.languageMessagesService.msgjson[record[newKey].toString()]) {
              record[newKey] = this.languageMessagesService.msgjson[record[newKey].toString()];
            }
            delete record[oldKey];
          }
        } else {
          delete record[oldKey];
        }
      });
    });
    
    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName);
  }

}