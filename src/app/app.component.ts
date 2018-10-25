import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  data: any;
  startCount = 1;
  end: any;
  constructor(private http:HttpClient) {}

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
      // console.log(this.data);
      // console.log(this.data[3]); 
      // let trial = this.data[3];
      // console.log(trial[8]);
      this.end = this.data.length;
      console.log(this.end);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  buttonOnClick() {
    // console.log(this.data[0]);
    // for(let i = 1; i < this.data.length; i++) {
    //   let arr = this.data[i];
    //   this.http.post('https://fast-wildwood-79987.herokuapp.com/students_ID', {
    //     name: arr[0],
    //     gender: arr[2],
    //     course: arr[5],
    //     year: arr[1],
    //     student_ID: arr[3],
    //     student_NFC: arr[4]
    //   }).subscribe(
    //     (data: any) => console.log("succes at " + i),
    //     error => console.log(error + "at" + arr[0])
    //   );
    // }
    // console.log("Upload Done");
    this.example(1, this.data.length);
  }

  // async function getAsyncData() {
  //   for(let i = 1; i < this.data.length; i++) {
  //     let arr = this.data[i];
  //     this.http.post('https://fast-wildwood-79987.herokuapp.com/students_ID', {
  //       name: arr[0],
  //       gender: arr[2],
  //       course: arr[5],
  //       year: arr[1],
  //       student_ID: arr[3],
  //       student_NFC: arr[4]
  //     }).toPromise();
  //   }
  // }

  example(i, limit) {
    let arr = this.data[i];
    this.http.post('INSERT_API_ENDPOINT_HERE', {
      name: arr[0],
      gender: arr[2],
      course: arr[5],
      year: arr[1],
      student_ID: arr[3],
      student_NFC: arr[4]
    }).subscribe(
        (data: any) => console.log("succes at " + i),
        error => console.log(error + "at" + arr[0]),
        () => ++i < limit ? this.example(i, limit) : null
    );
}

}