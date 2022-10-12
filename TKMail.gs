function TKMail(e) {

  const sheet = e.source.getActiveSheet();
  const range = e.source.getActiveRange();

  if (!range.isBlank() && sheet.getName() == "シート1" && range.getColumn() == 10) {

    const inname = String(e.value);
    var outname = inname.trim();
    const reg = /<(.+@.+)>;$/;
    
    if (reg.test(outname)) {
      outname = outname.replace(reg,'');
      outname = outname.trim();
    }

    range.setValue(outname);

  }
  
}
