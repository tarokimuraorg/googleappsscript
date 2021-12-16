function TKNumberOfEmployees(e) {
  
  var sheet = e.source.getActiveSheet();
  var range = e.source.getActiveRange();

  if (!range.isBlank() && sheet.getName() == "シート1" && range.getColumn() == 6) {

    var rule = SpreadsheetApp.newDataValidation().requireNumberGreaterThanOrEqualTo(50);

    range.setDataValidation(rule);

    var innum = String(e.value);
    var outnum = innum.trim();
    
    outnum = outnum.replace(/[０-９]/g, (num) => {
      return String.fromCharCode(num.charCodeAt(0) - 0xFEE0);
    });

    range.setValue(outnum);
    range.setNumberFormat('#,##名');

  }

}
