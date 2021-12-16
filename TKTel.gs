function TKTel(e) {

  var sheet = e.source.getActiveSheet();
  var range = e.source.getActiveRange();

  if (sheet.getName() == "シート1" && range.getColumn() == 7 || range.getColumn() == 8) {

    if (!range.isBlank()) {
      
      var intel = String(e.value);
      var outtel = intel.trim();

      outtel = outtel.replace(/　/g, () => { return ' '; });
      outtel = outtel.replace(/ +/g, () => { return ' '; });
      outtel = outtel.replace(/ /g, () => { return '-'; });

      outtel = outtel.replace(/－|−|—/g, () => { return '-'; });
      outtel = outtel.replace(/[０-９]/g, (num) => {
        return String.fromCharCode(num.charCodeAt(0) - 0xFEE0);
      });

      var reg1 = /^[\(（](\d+)[\)）](\d+)-(\d+)$/;
      var reg2 = /^(\d+)[\(（](\d+)[\)）](\d+)$/;
      var reg3 = /^[\(（](\d+)[\)）]-(\d+)-(\d+)$/;

      if (reg1.test(outtel)) {
        outtel = outtel.replace(reg1,'$1-$2-$3');
      } else if (reg2.test(outtel)) {
        outtel = outtel.replace(reg2,'$1-$2-$3');
      } else if (reg3.test(outtel)) {
        outtel = outtel.replace(reg3,'$1-$2-$3');
      }

      if (isTel(outtel) && range.getNote().length > 0) {

        range.clearNote();
        range.setBackground(null);
          
      } else if (!isTel(outtel) && range.getNote().length == 0) {

        range.setNote("電話番号を入力してください。");
        range.setBackground('#ffd966');

      }
      
      // 電話番号の表記法:X, メモ:有 -> 処理不要
      /*else if (!isTel(outtel) && range.getNote().length > 0) {

      }*/
      
      // 電話番号の表記法:O, メモ:無 -> 処理不要
      /*else if (isTel(outtel) && range.getNote().length == 0) {

      }*/

      range.setValue(outtel);

    } else if (range.isBlank()) {

      // セル:空白, メモ:有 -> メモを削除
      if (range.getNote().length > 0) {

        range.clearNote();
        range.setBackground(null);

      }

    }

  }

}

function isTel(tel) {

  var intel = String(tel);
  var arrtel = intel.split('-');

  if (arrtel[0].substr(0,1) == 0 && arrtel.length == 3) {

    // [国内プレフィックス + 市外局番 = 2] - [市内局番 = 4] - [加入者番号 = 4]
    if (arrtel[0].length == 2 && arrtel[1].length == 4 && arrtel[2].length == 4) {
      return true;
    }

    // [国内プレフィックス + 市外局番 = 3] - [市内局番 = 3] - [加入者番号 = 4]
    if (arrtel[0].length == 3 && arrtel[1].length == 3 && arrtel[2].length == 4) {
      return true;
    }

    // [国内プレフィックス + 市外局番 = 4] - [市内局番 = 2] - [加入者番号 = 4]
    if (arrtel[0].length == 4 && arrtel[1].length == 2 && arrtel[2].length == 4) {
      return true;
    }

    // [国内プレフィックス + 市外局番 = 5] - [市内局番 = 1] - [加入者番号 = 4]
    if (arrtel[0].length == 5 && arrtel[1].length == 1 && arrtel[2].length == 4) {
      return true;
    }

  }

  return false;

}
