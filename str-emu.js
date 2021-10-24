var _C = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var _FP = "_.-";
var _VP = "_";
class StringLexer {
  constructor(text) {
    this.Text = text;
    this.Index = 0;
    this.Stop = false;
    this.ctok = this.Text[this.Index];
    this.Output = [];
    this._ = "";
  }
  Continue() {
    this.Index++;
    this.ctok = this.Text[this.Index];
    if (this.Index >= this.Text.length) {
    	this.ctok = "\u2929";
      this.Stop = true;
    }
  }
  Lex() {
    while (this.Stop == false) {
      if (this.ctok == "$") {
        this.BuildVariable();
      } else if (this.ctok == "@") {
        this.BuildFile();
      } else {
        this.Output.push({
          Type: "string",
          Value: this.ctok
        });
      }
    }
    return this.Output;
  }
  BuildVariable() {
    this._ = "";
    while (_C.includes(this.ctok) == true || _VP.includes(this.ctok) == true) {
      this._ += this.ctok;
      this.Continue();
    }
    this.Output.push({Type: "variable", Value: this._});
  }
  BuildFile() {
		this._ = "";
    while (_C.includes(this.ctok) == true || _FP.includes(this.ctok) == true) {
      this._ += this.ctok;
      this.Continue();
    }
    this.Output.push({Type: "file", Value: this._});
  }
}
var StringParserTest = new StringLexer("normal text lmao $variablelmao! @filerefrence_.-h normal!");
StringParserTest.Lex();
var  o = StringParserTest.Output.map((e) => {
	return `${e.Type}:${e.Value}`;
});
console.log(o);
