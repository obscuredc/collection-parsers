var _C = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var _FP = "_.-";
var _VP = "_";
var _SP = "$@";
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
	  console.log("called this.Continue()");
  }
  Lex() {
    while (this.Stop == false) {
      if (this.ctok == "$") {
        this.BuildVariable();
      } else if (this.ctok == "@") {
        this.BuildFile();
      } else {
        this.BuildNormal();
      }
    }
    return this.Output;
  }
  BuildVariable() {
    this._ = "";
	  console.log("began building variable");
	  this.Continue();
    while ((_C.includes(this.ctok) == true || _VP.includes(this.ctok) == true) && this.Stop == false) {
      this._ += this.ctok;
      this.Continue();
    }
    this.Output.push({Type: "variable", Value: this._});
  }
  BuildFile() {
		this._ = "";
	  console.log("began building file");
	  this.Continue();
    while ((_C.includes(this.ctok) == true || _FP.includes(this.ctok) == true) && this.Stop == false) {
      this._ += this.ctok;
      this.Continue();
    }
    this.Output.push({Type: "file", Value: this._});
  }
	BuildNormal() {
		this._ = "";
	  console.log("began building normal");
    while (_SP.includes(this.ctok) == false && this.Stop == false) {
      this._ += this.ctok;
      this.Continue();
    }
    this.Output.push({Type: "string", Value: this._});
  }
}
