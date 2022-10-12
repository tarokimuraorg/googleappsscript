function TKNumberOfEmployees(e) {

  const sheet = e.source.getActiveSheet();
  const range = e.source.getActiveRange();

  if (!range.isBlank() && sheet.getName() == "シート1" && range.getColumn() == 6) {

    const innum = String(e.value);
    var outnum = innum.trim();
    
    outnum = outnum.replace(/[０-９]/g, (num) => {
      return String.fromCharCode(num.charCodeAt(0) - 0xFEE0);
    });

    const rule = SpreadsheetApp.newDataValidation().requireNumberGreaterThanOrEqualTo(50);

    range.setValue(outnum);
    range.setDataValidation(rule);
    range.setNumberFormat('#,##名');

  }

}
