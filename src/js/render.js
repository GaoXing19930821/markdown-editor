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

    //let str = "**Marked** - **down**  **Markdown** Markdown Parser\n========================\n[Marked] lets you convert [Markdown] into HTML. Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML. This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.";
    //let mdArr = str.split("\n");

    const mdArr = this.markdownArr;
    console.log(mdArr);

    for(let i=0;i<=mdArr.length-1;i++){
      if(filter.inline.bold.test(mdArr[i])){
        content = this.addInlineLabel(filter.inline.bold,mdArr[i],'strong');
      }
      else if(filter.inline.italic.test(mdArr[i])){
        content = this.addInlineLabel(filter.inline.italic,mdArr[i],'em');
      }
      else if(filter.inline.code.test(mdArr[i])){
        content = this.addInlineLabel(filter.inline.code,mdArr[i],'code');
      }else if(filter.inline.deleteline.test(mdArr[i])){
        content = this.addInlineLabel(filter.inline.deleteline,mdArr[i],'s')
      }

      else{
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
    console.log(output);
    return output;
  }

  addInlineLabel(reg,content,label){
    let result = '';
    let addlabel = [];
    let rest = [];
    const match = content.match(reg);
    for(let i=0;i<=match.length-1;i++){
      let labelplus = '<' + label + '>' + /(?:\*|_){2}(.+?)(?:\*|_){2}/g.exec(match[i])[1] + '</' + label + '>';
     addlabel.push(labelplus);
    }
    addlabel.push('');
    for(let i=0;i<content.split(reg).length;i++){
      if(i % 2 == 0){
        rest.push(content.split(reg)[i]);
      }
    }
    for(let i=0;i<=rest.length-1;i++){
     result = result + rest[i] + addlabel[i];
    }
    console.log(result)
    return result;
  }



  getArray(){
    return this.markdown.split("\n");
  }
}
