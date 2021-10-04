function TKTEL(e) {

  var sheet = e.source.getActiveSheet();
  var range = e.source.getActiveRange();

  if (sheet.getName() == "シート1" && range.getColumn() == 9) {

    var intel = String(e.value);
    var outtel = intel.replace(/^[\(（](\d+)[\)）](\d+)-(\d+)$/,'$1-$2-$3');
    
    range.setValue(outtel);
    
  }

}
