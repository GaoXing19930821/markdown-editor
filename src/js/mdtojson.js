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


class Parser{
  constructor(markdown){
    this.markdown = markdown;
    this.block = {};
    this.number = 0;
  }
  getblockJson(){
    for(let i=0;i<=this.markdown.length-1;i++){
      if(filter.block.header.test(this.markdown[i])){




        this.block.push({
          'type' : 'header'
        });

      }
    }
  }
}
