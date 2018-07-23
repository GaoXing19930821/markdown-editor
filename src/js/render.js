const filter = {
  inline : {
    bold : /(?:\*|_){2}(.+?)(?:\*|_){2}/g,
    italic: /(?:\*|_){1}(.+?)(?:\*|_){1}/g,
    bolditalic: /()/g ,
    code: /(?:`)(.+?)(?:`)/g,
    image: /(?:!\[(.+?)\])(?:\((.+?)\))/g,
    link: /(?:\[(.+?)\])(?:\((.+?)\))/g,
    deleteline: /(?:~~)(.+?)(?:~~)/g,
  },
  block : {
    header: /^(#){1,6}\s/g,
    quote: /^(>)\s/g,
    code: /^`{3}(?:\s|\n)/g,

  }
};



class Render{
  constructor(markdown){
    this.markdown = markdown;
    this.markdownArr = this.getArray();
    this.inline = this.inlinerender();
  }
  inlinerender(){
    let output = [] , content;

    let str = "**Marked** - Markdown Parser\n========================\n[Marked] lets you convert [Markdown] into HTML. Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML. This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.";
    let mdArr = str.split("\n");
    console.log(mdArr);
    // const mdArr = this.markdownArr;
    for(let i=0;i<=mdArr.length-1;i++){
      if(filter.inline.bold.test(mdArr[i])){
        content = this.addInlineLabel(filter.inline.bold,mdArr[i],'strong');
      }
      else if(filter.inline.italic.test(mdArr[i])){
        content = this.addInlineLabel(filter.inline.italic,mdArr[i],'em');
      }
      else if(filter.inline.code.test(mdArr[i])){
        content = this.addInlineLabel(filter.inline.code,mdArr[i],'code');
      }else{
        content = mdArr[i];
      }
      output.push(content);
    }

    return output;
  };
  render(){
    //console.log(this.markdownArr);
    let output = [] ,content;
    const inlineArr = this.inline;
    for(let i=0;i<inlineArr.length;i++){
      content = '<p>'+ inlineArr[i] + '</p>\n';
      output.push(content);
    }

    return output;
  }

  addInlineLabel(reg,content,label){
    let result = '';
    let addlabel = [];
    const match = content.match(reg);
    for(let i=0;i<=match.length-1;i++){
      let labelplus = '<' + label + '>' + reg.exec(match[i])[1] + '</' + label + '>';
     addlabel.push(labelplus);
    }

    const rest = content.split(/(?:\*|_){2}(.+?)(?:\*|_){2}/g);
    console.log(rest);
    for(let i=0;i<=rest.length-1;i++){
     result = result + rest[i] + addlabel[i];
     console.log(result)
    }
    return result;
  }
  getArray(){
    return this.markdown.split('\n');
  }
}
