function TKMail(e) {

  const sheet = e.source.getActiveSheet();
  const range = e.source.getActiveRange();

  if (!range.isBlank() && sheet.getName() == "シート1" && range.getColumn() == 10) {

    const inname = String(e.value);
    var outname = inname.trim() 
    
    outname = inname.replace(/＠/g,() => { return '@'; });
    outname = outname.replace(/－/g, () => { return '-'; });
    outname = outname.replace(/．/g, () => { return '.'; });
    outname = outname.replace(/<(.+@.+)>;$/,'');

    outname = outname.replace(/[０-９Ａ-Ｚａ-ｚ]/g, (cha) => {
      return String.fromCharCode(cha.charCodeAt(0) - 0xFEE0);
    })
    
    outname = outname.replace(/ +/g, () => { return ''; });

    range.setValue(outname);

  }
  
}
