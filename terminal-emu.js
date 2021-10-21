//warning: only minimally tested
//(good enough for obscuredc)

//goal
// pkg install -f "core"
//[Keyword:"pkg",Keyword:"install",Flag:"f",Data:"core"]
//[System:pkg, SubCommand:install, Flags:["f"], Parameters: ["core"]

/** global helpers */
/* string regex-likes */
const HString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_/$^&*#@! ";
const HFlag = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
const HKeyword = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const Allowed = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_/ 0123456789";
const SpaceAllowed = " ";

/* type classes */
class Normal {
    constructor(Type, Value) {
        this.Type = Type;
        this.Value = Value;
    }
}
class TTKeyword extends Normal {
    constructor(Value) {
        super(Value);
        this.Type = "KEYWORD";
        this.Value = Value;
    }
}
class TTString extends Normal {
    constructor(Value) {
        super(Value);
        this.Type = "STRING";
        this.Value = Value;
    }
}
class TTFlag extends Normal {
    constructor(Value) {
        super(Value);
        this.Type = "FLAG";
        this.Value = Value;
    }
}

class Lexer {
  constructor(Text) {
    this.Text = Text;
    this.Index = 0;
    this.Tokens = [];
    this.ctok = this.Text[this.Index];

    /** types */
    this.Endl = false;
  }
  Lex() {
    this.ThrowLog(`beginning lexing`);
    while(this.Endl == false) {
        if(this.ctok == "\"") {
            this.Continue();
            this.BuildString();
        } else if(this.ctok =="-") {
            this.Continue();
            this.BuildFlag();
        } else if(HKeyword.includes(this.ctok)) {
            //this.Continue();
            this.BuildKeyword();
        } else if (SpaceAllowed.includes(this.ctok)) {
            this.Continue();
        } else {
            this.ThrowError(`LEXING invalid tok "${this.ctok}"`);
            //remeber to implement <TERMINALSTRICTMODE == true?>
            this.Endl = true;
        }
    }
    this.ThrowLog(`ending lexing`);

    return this.Tokens;
  }
  Continue() {
      this.Index++;
      if(this.Index == this.Text.length) {
          this.Endl = true;
      }
      if(this.Endl == false) {
        this.ctok = this.Text[this.Index];
      }
      //console.log(`CONTINUECALL i=${this.Index} c=${this.ctok}`);
  }
  BuildString() {
    //console.log("building string");
    var temp = "";
    while(HString.includes(this.ctok)) {
        temp += this.ctok;
        this.Continue();
    }
    if(this.ctok == "\"") {
        //normal string exit
        this.Tokens.push(new TTString(temp));
        temp = "";
        this.Continue();
    } else {
        //invalidchar
        this.ThrowError(`LEXING invalid tok "${this.ctok}"`);
    }
  }
  BuildFlag() {
    //console.log("building flag");
    var temp = "";
    while(HFlag.includes(this.ctok)) {
        temp += this.ctok;
        this.Continue();
    }
    if(SpaceAllowed.includes(this.ctok)) {
        //normal string exit
        this.Tokens.push(new TTFlag(temp));
        temp = "";
    } else {
        //invalidchar
        this.ThrowError(`LEXING invalid tok "${this.ctok}"`);
    }
  }
  BuildKeyword() {
    //console.log("building keyboard");
    var temp = "";
    while(HKeyword.includes(this.ctok)) {
        temp += this.ctok;
        this.Continue();
    }
    if(SpaceAllowed.includes(this.ctok)) {
        //normal string exit
        this.Tokens.push(new TTKeyword(temp));
        temp = "";
    } else {
        //invalidchar
        this.ThrowError(`LEXING invalid tok "${this.ctok}"`);
    }
  }
  ThrowLog(Message) {
    console.log(Message);
  }
  ThrowWarning(Message) {
    console.warn(Message);
  }
  ThrowError(Message) {
    console.error(Message);
  }
}
