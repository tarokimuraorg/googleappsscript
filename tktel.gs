function TKTEL(e) {

  var sheet = e.source.getActiveSheet();
  var range = e.source.getActiveRange();

  if (sheet.getName() == "シート1") {

    if (range.getColumn() == 7 || range.getColumn() == 8) {

      var intel = String(e.value);
      var outtel = intel.trim();

      outtel = outtel.replace(/　/g, () => { return ' '; });
      outtel = outtel.replace(/ +/g, () => { return ' '; });
      outtel = outtel.replace(/ /g, () => { return '-'; });

      outtel = outtel.replace(/－/g, () => { return '-'; });
      outtel = outtel.replace(/[０-９]/g, (num) => {
        return String.fromCharCode(num.charCodeAt(0) - 0xFEE0);
      });

      var reg1 = /^(\d+)-(\d+)-(\d+)$/;
      var reg2 = /^[\(（](\d+)[\)）](\d+)-(\d+)$/;
      var reg3 = /^(\d+)[\(（](\d+)[\)）](\d+)$/;

      if (reg1.test(outtel)) {
        range.setValue(outtel);
      }
      else if (reg2.test(outtel)) {

        outtel = outtel.replace(reg2,'$1-$2-$3');
        range.setValue(outtel);

      } else if (reg3.test(outtel)) {

        outtel = outtel.replace(reg3,'$1-$2-$3');
        range.setValue(outtel);

      }

    }

  }

}
