function TKTEL(e) {

  var sheet = e.source.getActiveSheet();
  var range = e.source.getActiveRange();

  if (sheet.getName() == "シート1" && range.getColumn() == 7) {

    var reg = /^[\(（]([0-9]|[０-９]+)[\)）]([0-9]|[０-９]+)-([0-9]|[０-９]+)$/;

    var intel = String(e.value);

    if (reg.test(intel)) {

      var outtel = intel.replace(reg,'$1-$2-$3');
      
      outtel = outtel.replace(/[０-９]/g, function(num) {
        return String.fromCharCode(num.charCodeAt(0) - 0xFEE0);
      });
      
      range.setValue(outtel);

    } 
    
  }

}
