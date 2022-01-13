function TKTel(e) {

  var sheet = e.source.getActiveSheet();
  var range = e.source.getActiveRange();

  if (sheet.getName() == "シート1" && range.getColumn() == 7 || range.getColumn() == 8) {

    if (!range.isBlank()) {
      
      var intel = String(e.value);
      var outtel = intel.trim();

      outtel = outtel.replace('tel:', '');
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
      var reg4 = /^(\d{9})$/;
      var reg5 = /^(\d{10})$/;

      if (reg1.test(outtel)) {
        outtel = outtel.replace(reg1,'$1-$2-$3');
      } else if (reg2.test(outtel)) {
        outtel = outtel.replace(reg2,'$1-$2-$3');
      } else if (reg3.test(outtel)) {
        outtel = outtel.replace(reg3,'$1-$2-$3');
      } else if (reg4.test(outtel)) {
        outtel = outtel.replace(reg4,'0$1');
        outtel = telFomatter(outtel)
      } else if (reg5.test(outtel)) {
        outtel = telFomatter(outtel)
      }

      if (isTel(outtel) && range.getNote().length > 0) {

        range.clearNote();
        range.setBackground(null);
          
      } else if (!isTel(outtel) && range.getNote().length == 0) {

        range.setNote("電話番号を入力してください。");
        range.setBackground('#ffd966');

      }
      
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

function telFomatter(tel) {

  var head = tel.slice(0,2);
  var tail = tel.slice(6,10);

  // 東京都,福岡県
  if (head == '03') {
    // 03-4567-8901
    return head + '-' + tel.slice(2,6) + '-' + tail;
  }

  head = tel.slice(0,3);

  if (head == '042') {

    switch (tel.slice(3,5)) {

      // 0422-23-4567
      case '22':
      // 0422-34-5678
      case '23':
      // 0422-45-6789
      case '24':
      // 0422-56-7890
      case '25':
      // 0422-67-8901
      case '26':
      // 0422-78-9012
      case '27':
      // 0422-89-0123
      case '28':
      // 0422-90-1234
      case '29':
        return head + '2-' + tel.slice(4,6) + '-' + tail;

      // 0428-23-4567
      case '82':
      // 0428-34-5678
      case '83':
      // 0428-78-9012
      case '87':
      // 0428-89-0123
      case '88':
      // 0428-90-1234
      case '89':
        return head + '8-' + tel.slice(4,6) + '-' + tail;
              
      default:
        // 042-201-2345
        return head + '-' + tel.slice(3,6) + '-' + tail;

    }

  } else if (head == '092') {

    // 092-234-5678
    return head + '-' + tel.slice(3,6) + '-' + tail;

  } else if (head == '093') {

    if (tel.slice(3,4) == '0') {

      // 0930-12-3456
      return head + '0-' + tel.slice(4,6) + '-' + tail;

    } else {

      // 093-234-5678
      return head + '-' + tel.slice(3,6) + '-' + tail;

    }

  }

  head = tel.slice(0,4);

  if (head == '0940' || head == '0942' || head == '0943' || 
      head == '0944' || head == '0946' || head == '0947' || 
      head == '0948') {

    // 0940-12-3456
    return head + '-' + tel.slice(4,6) + '-' + tail;    

  } else if (head == '0949') {
    if (tel.slice(4,5) == '6') {
      // 09496-2-4567
      return head + '6-' + tel.slice(5,6) + '-' + tail;
    } else {
      // 0949-23-4567
      return head + '-' + tel.slice(4,6) + '-' + tail;
    }
  }
        
  head = tel.slice(0,5);

  if (head == '04992' || head == '04994' || head == '04996' || 
      head == '04998') {
    // 04992-3-4567
    return head + '-' + tel.slice(5,6) + '-' + tail;
  }

}

function isTel(tel) {

  //var intel = String(tel);
  var arrtel = tel.split('-');

  if (arrtel[0].slice(0,1) == 0 && arrtel.length == 3) {

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
