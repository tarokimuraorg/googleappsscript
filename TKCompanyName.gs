function TKCompanyName(e) {

  const sheet = e.source.getActiveSheet();
  const range = e.source.getActiveRange();

  if (!range.isBlank() && sheet.getName() == "シート1" && range.getColumn() == 4) {

    const inname = String(e.value);
    var outname = inname.trim();

    outname = outname.replace(/　/g, () => { return ' '; });
    outname = outname.replace(/\s/g, () => { return ' '; });
    outname = outname.replace(/ +/g, () => { return ' '; });
    outname = outname.replace(/－|−/g, () => { return '-' });
    outname = outname.replace(/＆/g, () => { return '&' });
    outname = outname.replace(/[０-９Ａ-Ｚａ-ｚ]/g, (cha) => {
      return String.fromCharCode(cha.charCodeAt(0) - 0xFEE0);
    });

    const reg1 = /^株式会社 (.+)$/;
    const reg2 = /^(.+) 株式会社$/;

    if (reg1.test(outname)) {

      outname = outname.replace(reg1, '株式会社$1');
      range.setValue(outname);

    } else if(reg2.test(outname)) {

      outname = outname.replace(reg2, '$1株式会社');
      range.setValue(outname);

    }

    const rule = SpreadsheetApp.newDataValidation().requireTextContains('株式会社').build();
    range.setDataValidation(rule);

    range.setValue(outname);    

  }
  
}
