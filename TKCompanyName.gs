function TKCompanyName(e) {

  const sheet = e.source.getActiveSheet();
  const range = e.source.getActiveRange();

  if (!range.isBlank() && sheet.getName() == "シート1" && range.getColumn() == 4) {

    const inname = String(e.value);
    var outname = inname.replace(/ /g, () => { return ''; });

    outname = outname.replace(/　/g, () => { return ''; });
    outname = outname.replace(/\s/g, () => { return ''; });

    outname = outname.replace(/^㈱/,'株式会社');
    outname = outname.replace(/㈱$/,'株式会社');
    outname = outname.replace(/^\(株\)/,'株式会社');
    outname = outname.replace(/\(株\)$/,'株式会社');
    outname = outname.replace(/^\（株\）/,'株式会社');
    outname = outname.replace(/\（株\）$/,'株式会社');

    //outname = outname.replace(/－|−/g, () => { return '-'; });
    
    outname = outname.replace(/＆/g, () => { return '&'; });
    outname = outname.replace(/[０-９Ａ-Ｚａ-ｚ]/g, (cha) => {
      return String.fromCharCode(cha.charCodeAt(0) - 0xFEE0);
    });

    range.setValue(outname);

    const rule = SpreadsheetApp.newDataValidation().requireTextContains('株式会社').build();
    range.setDataValidation(rule);

  }
  
}
