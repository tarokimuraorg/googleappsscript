function TKTel(e) {

  const sheet = e.source.getActiveSheet();
  const range = e.source.getActiveRange();

  if (sheet.getName() == "シート1" && range.getColumn() == 7 || range.getColumn() == 8) {

    if (!range.isBlank()) {
      
      const intel = String(e.value);
      var outtel = intel.trim()
      
      outtel = outtel.replace(/　/g, () => { return ''; });
      outtel = outtel.replace('tel:', '');
      outtel = outtel.replace(/\./g, () => { return ''; } );
      outtel = outtel.replace(/\(|（/g, () => { return ''; });
      outtel = outtel.replace(/\)|）/g, () => { return ''; });
      outtel = outtel.replace(/-|－|−|—|–|‒|‐|－|ー/g, () => { return ''; });
      outtel = outtel.replace(/ +/g, () => { return ''; });
      outtel = outtel.trim();

      outtel = outtel.replace(/[０-９]/g, (num) => {
        return String.fromCharCode(num.charCodeAt(0) - 0xFEE0);
      });

      if (outtel.slice(0,2) == '81') {
        outtel = outtel.slice(2);
      }

      const reg1 = /^(\d{9})$/;
      const reg2 = /^(\d{10})$/;

      if (reg1.test(outtel)) {

        outtel = outtel.replace(reg1,'0$1');
        outtel = telFomatter(outtel);

      } else if (reg2.test(outtel)) {
        outtel = telFomatter(outtel);
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

  var head = tel.slice(0,5);
  var tail = tel.slice(6,10);

  // 東京都, 福岡県, 愛知県,
  // 大阪府, 神奈川県, 埼玉県
  if (head == '04992' || head == '04994' || head == '04996' || 
      head == '04998' || head == '09496') {

    // 04992-3-4567
    // 09496-2-4567
    return head + '-' + tel.slice(5,6) + '-' + tail;

  }

  head = tel.slice(0,4);

  if (head == '0940' || head == '0942' || head == '0943' || 
      head == '0944' || head == '0946' || head == '0947' || 
      head == '0948' || head == '0531' || head == '0532' || 
      head == '0533' || head == '0536' || head == '0561' || 
      head == '0562' || head == '0563' || head == '0564' || 
      head == '0565' || head == '0566' || head == '0567' || 
      head == '0568' || head == '0569' || head == '0586' || 
      head == '0587' || head == '0721' || head == '0725' || 
      head == '0949' || head == '0930' || head == '0460' || 
      head == '0463' || head == '0465' || head == '0466' || 
      head == '0467' || head == '0480' || head == '0493' || 
      head == '0494' || head == '0495' || head == '0288' ||
      head == '0749' || head == '0956' || head == '0294' ||
      head == '0742' || head == '0250' || head == '0853' ||
      head == '0538') {

    // 0940-12-3456
    // 0531-12-3456
    // 0536-12-3456
    // 0569-12-3456
    // 0587-12-3456
    // 0721-12-3456
    // 0725-12-3456
    // 0949-23-4567
    // 0428-23-4567
    // 0930-12-3456
    // 0460-12-3456
    // 0463-45-6789
    return head + '-' + tel.slice(4,6) + '-' + tail;    

  } else if (head == '0428') {

    switch (tel.slice(3,5)) {

      // 042-801-2345
      case '80':
      // 042-812-3456
      case '81':
      // 042-845-6789
      case '84':
      // 042-856-7890
      case '85':
      // 042-867-8901
      case '86':
        return '042-8' + tel.slice(4,6) + '-' + tail;
      default:
        // 0428-81-2345
        return head + '-' + tel.slice(4,6) + '-' + tail;

    }

  }

  head = tel.slice(0,3);

  if (head == '042') {

    switch (tel.slice(3,5)) {

      // 04-2001-2345
      case '00':
      // 04-2901-2345
      case '90':
      // 04-2923-4567
      case '92':
      // 04-2934-5678
      case '93':
      // 04-2945-6789
      case '94':
      // 04-2956-7890
      case '95':
      // 04-2967-8901
      case '96':
      // 04-2990-1234
      case '99':
        return '04-' + tel.slice(2,6) + '-' + tail;

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
              
      default:
        // 042-201-2345
        return head + '-' + tel.slice(3,6) + '-' + tail;

    }

  } else if (head == '092' || head == '093' || head == '052' || 
             head == '072' || head == '044' || head == '045' || 
             head == '046' || head == '048' || head == '049' ||
             head == '055' || head == '087' || head == '089' ||
             head == '098' || head == '073' || head == '011' ||
             head == '082') {

    // 092-234-5678
    // 052-123-4567
    // 072-234-5678
    // 093-234-5678
    // 044-567-8901
    // 045-678-9012
    // 046-234-5678
    return head + '-' + tel.slice(3,6) + '-' + tail;

  }

  head = tel.slice(0,2);
  
  if (head == '03' || head == '06' || head == '04') {

    // 03-4567-8901
    // 06-1234-5678
    return head + '-' + tel.slice(2,6) + '-' + tail;

  }

  return tel
  
}

function isTel(tel) {

  //var intel = String(tel);
  const arrtel = tel.split('-');

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
