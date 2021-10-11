function TKNumberOfEmployees(e) {
  
  var sheet = e.source.getActiveSheet();
  var range = e.source.getActiveRange();

  if (sheet.getName() == "シート1" && range.getColumn() == 6) {

    var num = Number(e.value);

    if (num > 49) {
      range.setValue(num);
      return
    }

    range.clearContent();

  }

}
