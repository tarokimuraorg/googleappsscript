function TKTEL(e) {

  var sheet = e.source.getActiveSheet();
  var range = e.source.getActiveRange();

  if (sheet.getName() == "シート1" && range.getColumn() == 7) {

    var reg1 = /^[\(（]([0-9]+)[\)）]([0-9]+)-([0-9]+)$/;
    var reg2 = /^[\(（]([０-９]+)[\)）]([０-９]+)-([０-９]+)$/;

    var intel = String(e.value);

    if (reg1.test(intel)) {

      var outtel = intel.replace(reg1,'$1-$2-$3');
      
      range.setValue(outtel);

    } else if (reg2.test(intel)) {

      var outtel = intel.replace(reg2,'$1-$2-$3');
      
      outtel = outtel.replace(/[０-９]/g, function(num) {
        return String.fromCharCode(num.charCodeAt(0) - 0xFEE0);
      });
      
      range.setValue(outtel);

    }
    
  }

}
