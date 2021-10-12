function TKNumberOfEmployees(e) {
  
  var sheet = e.source.getActiveSheet();
  var range = e.source.getActiveRange();

  if (sheet.getName() == "シート1" && range.getColumn() == 6) {

    var rule = SpreadsheetApp.newDataValidation().requireNumberGreaterThanOrEqualTo(50);

    range.setDataValidation(rule);
    range.setNumberFormat('#,##名');

  }

}
