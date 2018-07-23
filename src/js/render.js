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
    this.markdownArr = this.getArray()
  }
  inlinerender(){
    let output = [] , match, content;
    const mdArr = this.markdownArr;
    for(let i=0;i<=mdArr.length;i++){
      if(match=filter.inline.bold.exec(mdArr[i])){
        content = '<strong>' + match[1] + '</strong>';
      }
      else if(match=filter.inline.italic.exec(mdArr[i])){
        content = '<em>' + match[1] + '</em>';
      }
      else if(match=filter.inline.code.exec(mdArr[i])){
        content = '<code>' + match[1] + '</code>';
      }

    }
    return output;
  };
  getArray(){
    return this.markdown.split('\n');
  }
}
