function TKMail(e) {

  const sheet = e.source.getActiveSheet();
  const range = e.source.getActiveRange();

  if (!range.isBlank() && sheet.getName() == "シート1" && range.getColumn() == 10) {

    var inname = String(e.value);
    var outname = inname.trim();
    
    const mail = outname.match(/<(.+@.+)>;$/);

    if (mail.length == 2) {
      outname = mail[1];
    }

    range.setValue(outname);

  }
  
}
