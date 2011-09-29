// ----------------------------------------------------------------------------
// markItUp!
// ----------------------------------------------------------------------------
// Copyright (C) 2008 Jay Salvat
// http://markitup.jaysalvat.com/
// ----------------------------------------------------------------------------
markdownSettings = {
    nameSpace:          'markdown', // Useful to prevent multi-instances CSS conflict
    onShiftEnter:       {keepDefault:false, openWith:'\n\n'},
    markupSet: [
        {name:'First Level Heading', key:"1", openWith: '# ', placeHolder:'Your title here...' },
        {name:'Second Level Heading', key:"2", openWith: '## ', placeHolder:'Your title here...' },
        {name:'Heading 3', key:"3", openWith:'### ', placeHolder:'Your title here...' },
        {name:'Heading 4', key:"4", openWith:'#### ', placeHolder:'Your title here...' },
        {name:'Heading 5', key:"5", openWith:'##### ', placeHolder:'Your title here...' },
        {name:'Heading 6', key:"6", openWith:'###### ', placeHolder:'Your title here...' },
        {separator:'---------------' },        
        {name:'Bold', key:"B", openWith:'**', closeWith:'**'},
        {name:'Italic', key:"I", openWith:'_', closeWith:'_'},
        {separator:'---------------' },
        {name:'Bulleted List', openWith:'- ' },
        {name:'Numeric List', openWith:function(markItUp) {
            return markItUp.line+'. ';
        }},
        {separator:'---------------' },
        {name:'Picture', key:"P", replaceWith:'![[![Alternative text]!]]([![Url:!:http://]!] "[![Title]!]")'},
        {name:'Link', key:"L", openWith:'[', closeWith:']([![Url:!:http://]!] "[![Title]!]")', placeHolder:'Your text to link here...' },
        {separator:'|'},    
        {name:'Quotes', openWith:'> '},
        {name:'Code Block / Code', openWith:'(!(\t|!|`)!)', closeWith:'(!(`)!)'},
        // {separator:'---------------'},
        // {name:'Preview', call:'preview', className:"preview"}
    ],
    
    onEnter: {
      openWith: function(markItUp, char) {
        // var $textarea = $(markItUp.textarea),
        //     line_breaks = miu.count_line_breaks($textarea.val()),
        //     hex = miu.count_line_breaks($textarea.val(), true),
        //     
        //     current_line = miu.get_current_line($textarea.val(), markItUp.caretPosition, hex);
        // 
        // // console.log(current_line);
        // console.trace();
        console.log(markItUp.line);
      }
    }
}

// mIu nameSpace to avoid conflict.
miu = {
    markdownTitle: function(markItUp, char) {
        heading = '';
        n = $.trim(markItUp.selection||markItUp.placeHolder).length;
        for(i = 0; i < n; i++) {
            heading += char;
        }
        return '\n'+heading+'\n';
    },
    count_line_breaks: function(text, get_hex) {
        var hex = '', tmp, count = 0;

        if( text ) {
            for( var i = 0, len = text.length; i < len; i++ ) {
                tmp = text.charCodeAt(i).toString(16);
                tmp = (tmp.length == 2) ? tmp : '0' + tmp;
                
                hex += tmp;
                
                // Hex for line break
                if( tmp === '0a' )
                    count++;
            }
        }
        
        if( get_hex )
          return hex;
        else
          return count;
    },
    get_current_line: function(text, caretPosition, hex) {
      // regex matches all hex code characters
      // up to the caretPosition
      var regex = new RegExp('[\\w+]{' + (caretPosition * 2) + '}');
          matches = hex.match(regex),
          num = 0;
      
      // Make sure we have some line breaks
      if( /0a/g.test(matches) ) {
        num = matches[0].match(/0a/g).length;
      }
      
      // Never return 0, because documents start at line #1
      return ++num;
    }
};