//warning: untested & unready!

//goal
// pkg install -f "core"
//[Keyword:"pkg",Keyword:"install",Flag:"f",Data:"core"]
//[System:pkg, SubCommand:install, Flags:["f"], Parameters: ["core"]
/** global helpers */
const HString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_/";
const HFlag = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
const HKeyword = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

class Lexer {
  constructor(Text) {
    this.Text = Text;
    this.Index = 0;
    this.Tokens = [];

    /** types */
    this.BuildString = false;
    this.BuildFlag = false;
    this.BuildKeyword = false;

    this.Builder = "";
  }
  Lex() {
    console.log(`beginning lex`);
    while(this.Index < this.Text.length) {
      var ctok = this.Text[this.Index];
      if(HKeyword.includes(ctok) == true && this.BuildString == false && this.BuildFlag == false) {
        //ok we can start keyword
        this.BuildKeyword = true;
      } else if (ctok == "\"") {
        this.BuildString = !this.BuildString;
      } else if (ctok == "-" && this.BuildString == false && this.BuildFlag == false) {
        this.BuildFlag = true;
      }
      //see where characters fit
      if(this.BuildString == true && HString.includes(ctok) == true) {
        this.Builder += ctok;
      } else if (HString.includes(ctok) == false) {
        //throw error: Unknown Character in a string position == index
      }

      console.log(`Lex index=${this.Index}, char=${this.Text[this.Index]}`);
      this.Index++;
    }
    console.log(`ended lex`);
  }
  ThrowLog(Message) {
    console.log(Message);
  }
  ThrowWarning(Message) {
    console.warn(Message);
  }
  ThrowError() {
    console.error(Message);
  }
}
var lexer = new Lexer(`help -cmd "help"`); //=> [Keyword: "help", Flag: "cmd", String: "help"]
lexer.Lex();
