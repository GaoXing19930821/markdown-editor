

const filter = {
    bold : /(?:\*|_){2}(.+?)(?:\*|_){2}/g,
    italic: /(?:\*|_){1}([^\*]+?)(?:\*|_){1}/g,
    bolditalic: /()/g ,
    code: /(?:`)([^`]+)(?:`)/g,
    image: /(?:!\[(.+?)*\])(?:\((.+?)*("(.+?)")\))/,
    link: /(?:\[(.+?)\])(?:\((.+?)\))/g,
    deleteline: /(?:~~)(.+?)(?:~~)/g,
    header: /^(#{1,6})\s(.+)/,
    quote: /^(>)\s(.+)/,
    blockcode: /^`{3}(.+)*/,

};

const fullfilter = {
    bold : /(?:\*|_){2}.+?(?:\*|_){2}/g,
    italic: /(?:\*|_){1}.+?(?:\*|_){1}/g,
    code: /(?:`).+?(?:`)/g,
    image: /!\[.+?\]\(.+?\)/g,
    deleteline: /(?:~~).+?(?:~~)/g,

}

document.addEventListener('keyup', (e) => {
    e = e || window.event;
    if(e.key = '13'){
        const editor = document.getElementById('editor').innerText;
        let preview = document.getElementById('preview');
        let render = new Render(editor);
        preview.innerHTML = render.render().join('');
        // console.log(preview.innerHTML)
    }
});

class Render{
  constructor(markdown){
    this.markdown = markdown;
    this.markdownArr = this.getArray();
    this.inline = this.inlineRender();
  }
  inlineRender(){
    let output = [] , content, href, blod, italtic, code, deleteline, img;

    const mdArr = this.markdownArr;
    //console.log(mdArr);
    for(let i=0;i<=mdArr.length-1;i++){
      if(filter.bold.test(mdArr[i])||filter.italic.test(mdArr[i])||
        filter.code.test(mdArr[i])||filter.deleteline.test(mdArr[i])){
        blod = this.getBold(mdArr[i]);
        italtic = this.getItalic(blod);
        code = this.getCode(italtic);
        deleteline = this.getDeleteLine(code);
        img = this.getImage(deleteline);
        content = img;
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
    for(let i=0;i<inlineArr.length-1;i++){
      if(filter.header.test(inlineArr[i])){
        filter.header.lastIndex = 0;
        let hlevel = filter.header.exec(inlineArr[i])[1].length;
        let text = filter.header.exec(inlineArr[i])[2];
        content = '<h' + hlevel + '>' + text + '</h' + hlevel + '>';
      }
      else if(filter.quote.test(inlineArr[i])){
        let quote = [], text = '';
        while(filter.quote.test(inlineArr[i])){
          quote.push(inlineArr[i]);
          i++;
        }
        for(let i=0;i<=quote.length-1;i++){
          text = text + filter.quote.exec(quote[i])[2] + '</br>';
        }
        content = '<blockquote><p>' + text + '</p></blockquote>';
      }
      else if(filter.blockcode.test(inlineArr[i])) {
        let blockcode = [], language, text = '';
        blockcode.push(inlineArr[i]);
        i++;
        while(inlineArr.length >= i){
          blockcode.push(inlineArr[i]);
          if(inlineArr[i] == '```')
            break;
          i++;
        }
        i++;
        if(language = filter.blockcode.exec(blockcode[0])[1])
        language = filter.blockcode.exec(blockcode[0])[1];
        for (let i = 1; i <= blockcode.length - 2; i++) {
          text = text + blockcode[i] + '\n';
        }
        content = '<pre class="hljs language-' + language + '"><code>' + text + '</code></pre>';
      }
      else{
        content = '<p>' + inlineArr[i] + '</p>'
      }
      output.push(content);
    }
    console.log(output);
    return output;
  }

  getItalic(text){
    if(filter.italic.test(text)){
      return this.addInlineLabel(filter.italic,fullfilter.italic,text,'em');
    }else{
      return text;
    }
  }
  getBold(text){
    if(filter.bold.test(text)){
      return this.addInlineLabel(filter.bold,fullfilter.bold,text,'strong');
    }else{
      return text;
    }
  }
  getCode(text){
    if(filter.code.test(text)){
      return this.addInlineLabel(filter.code,fullfilter.code,text,'code');
    }else{
      return text;
    }
  }
  getDeleteLine(text){
    if(filter.deleteline.test(text)){
      return this.addInlineLabel(filter.deleteline,fullfilter.deleteline,text,'del')
    }else{
      return text;
    }
  }
  getImage(text){
    if(filter.image.test(text)){
      const reg = filter.image;
      const match = text.match(filter.image);
      const rest = text.split(fullfilter.image);
      let addlabel = [];
      for(let i=0;i<=match.length-1;i++){
        reg.lastIndex = 0;
        let alt = reg.exec(match[i])[1];
        let src = reg.exec(match[i])[2];
        let title = reg.exec(match[i])[3];
        let labelhref = '<img src="' + src + '" alt="' + alt + '" title="' + title + '"/>';
        addlabel.push(labelhref);
      }
      content = this.getConnect(addlabel,rest);
    }
  }
  addInlineLabel(reg,fullreg,content,label){
    let result = '', addlabel = [], rest = [];
    const match = content.match(reg);
    // console.log(reg, reg instanceof RegExp);
    //debugger;
    for(let i=0;i<=match.length-1;i++){
      reg.lastIndex = 0;
      let labelplus = '<' + label + '>' + reg.exec(match[i])[1] + '</' + label + '>';
      addlabel.push(labelplus);
    }
    rest = content.split(fullreg);
    result = this.getConnect(addlabel,rest);
    return result;
  }
  getConnect(addlabel,rest){
    let result = '';
    addlabel.push('');
    for(let i=0;i<=rest.length-1;i++){
      result = result + rest[i] + addlabel[i];
    }
    return result;
  }
  getArray(){
    return this.markdown.split("\n");
  }

}
