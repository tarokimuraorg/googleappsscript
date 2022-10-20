function TKMail(e) {

  const sheet = e.source.getActiveSheet();
  const range = e.source.getActiveRange();

  if (!range.isBlank() && sheet.getName() == "シート1" && range.getColumn() == 10) {

    const inname = String(e.value);
    var outname = inname.trim();

    outname = outname.replace(/＠/g,() => { return '@'; });
    outname = outname.replace(/<(.+@.+)>;$/,'');
    outname = outname.trim();

    range.setValue(outname);

  }
  
}
