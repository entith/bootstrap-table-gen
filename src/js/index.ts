import 'bootstrap/dist/css/bootstrap.css';
// import jQuery from 'jquery';
import $ = require("jquery");

declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

class Main {

  headers: string[];
  body: string[][];

  constructor() {
      $(document).ready(() => {
          $('#input').keyup(() => {
            this.parse($('#input').val());
          })
      });
  }

  parse(input: string){
    var queue = input.split('\n');
    this.headers = this.parseRow(queue.shift());
    this.body = [];
    queue.forEach(x => {
      this.body.push(this.parseRow(x));
    });

    console.log('Headers: ' + this.headers);
    console.log('Body: ' + this.body);

    this.render();
  }

  parseRow(row: string): string[]{
    var parsed: string[] = row.split('\t');
    return parsed;
  }

  render(){
    var template: (x:any) => string = <(x:any) => string>require("!pug-loader!./table-template.pug");
    var locals = {
      headers: this.headers,
      body: this.body
    };
    var html: string = template(locals);
    $('#table').html(html);
    $('#src').val(html);
  }
}

var main:Main = new Main();
