function TKTEL(e) {

  var sheet = e.source.getActiveSheet();
  var range = e.source.getActiveRange();

  if (sheet.getName() == "シート1" && range.getColumn() == 7) {

    var intel = String(e.value);
    var outtel = intel.replace("－", "-");
    
    outtel = outtel.replace(/[０-９]/g, function(num) {
      return String.fromCharCode(num.charCodeAt(0) - 0xFEE0);
    });

    var reg = /^[\(（](\d+)[\)）](\d+)-(\d+)$/;

    if (reg.test(outtel)) {

      outtel = outtel.replace(reg,'$1-$2-$3');
      range.setValue(outtel);

    } 
    
  }

}
