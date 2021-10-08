function TKAREA(e) {

  var sheet = e.source.getActiveSheet();
  var range = e.source.getActiveRange();

  if (sheet.getName() == "シート1" && range.getColumn() == 2) {

    var prefecture = String(e.value);
    var areas = ['―'];

    if (prefecture == '東京都') {

      areas.push('千代田区');
      areas.push('港区');
      areas.push('中央区');
      areas.push('新宿区');
      areas.push('渋谷区');
      areas.push('品川区');
      areas.push('江東区');
      areas.push('大田区');
      areas.push('台東区');
      areas.push('豊島区');
      areas.push('文京区');
      areas.push('目黒区');
      areas.push('墨田区');
      areas.push('中野区');
      areas.push('北区');

      var rule = SpreadsheetApp.newDataValidation().requireValueInList(areas).build();

      sheet.getRange(range.getRow(), range.getColumn() + 1).setDataValidation(rule);

    } else if (prefecture == '福岡県') {

      areas.push('福岡市　博多区');
      areas.push('福岡市　中央区');
      areas.push('福岡市　東区');
      areas.push('福岡市　南区');
      areas.push('福岡市　早良区');
      areas.push('福岡市　西区');
      areas.push('福岡市　城南区');
      areas.push('北九州市');

      var rule = SpreadsheetApp.newDataValidation().requireValueInList(areas).build();

      sheet.getRange(range.getRow(), range.getColumn() + 1).setDataValidation(rule);

    } else if (prefecture == '愛知県') {

      areas.push('豊田市');
      areas.push('一宮市');
      areas.push('豊橋市');
      areas.push('岡崎市');
      areas.push('春日井市');
      areas.push('名古屋市 緑区');
      areas.push('名古屋市 中川区');
      areas.push('豊川市');
      areas.push('安城市');
      areas.push('名古屋市 守山区');
      areas.push('名古屋市 北区');
      areas.push('西尾市');
      areas.push('名古屋市 名東区');
      areas.push('名古屋市 千種区');
      areas.push('名古屋市 天白区');
      areas.push('名古屋市 港区');
      areas.push('小牧市');
      areas.push('刈谷市');
      areas.push('名古屋市 西区');
      areas.push('名古屋市 南区');

      var rule = SpreadsheetApp.newDataValidation().requireValueInList(areas).build();

      sheet.getRange(range.getRow(), range.getColumn() + 1).setDataValidation(rule);

    } else if (prefecture == '大阪府') {

      areas.push('大阪市 平野区');
      areas.push('大阪市 東淀川区');
      areas.push('大阪市 淀川区');
      areas.push('大阪市 城東区');
      areas.push('大阪市 住吉区');
      areas.push('大阪市 生野区');
      areas.push('大阪市 東住吉区');
      areas.push('大阪市 住之江区');
      areas.push('大阪市 鶴見区');
      areas.push('大阪市 北区');
      areas.push('大阪市 阿倍野区');
      areas.push('大阪市 都島区');
      areas.push('大阪市 西淀川区');
      areas.push('大阪市 旭区');
      areas.push('大阪市 港区');
      areas.push('大阪市 西区');
      areas.push('大阪市 中央区');
      areas.push('大阪市 天王寺区');
      areas.push('大阪市 大正区');
      areas.push('大阪市 福島区');
      areas.push('大阪市 此花区');
      areas.push('大阪市 浪速区');
      areas.push('堺市');
      areas.push('豊中市');
      areas.push('吹田市');
      areas.push('茨木市');

      var rule = SpreadsheetApp.newDataValidation().requireValueInList(areas).build();

      sheet.getRange(range.getRow(), range.getColumn() + 1).setDataValidation(rule);

    } else if (prefecture == '神奈川県') {

      areas.push('横須賀市');
      areas.push('藤沢市');
      areas.push('横浜市 港北区');
      areas.push('横浜市 青葉区');
      areas.push('相模原市 南区');
      areas.push('横浜市  戸塚区');
      areas.push('横浜市 鶴見区');
      areas.push('相模原市 中央区');
      areas.push('平塚市');
      areas.push('横浜市 旭区');
      areas.push('茅ヶ崎市');
      areas.push('川崎市 中原区');
      areas.push('横浜市 神奈川区');
      areas.push('大和市');
      areas.push('厚木市');
      areas.push('横浜市 港南区');
      areas.push('川崎市 宮前区');
      areas.push('川崎市 高津区');
      areas.push('川崎市 川崎区');
      areas.push('川崎市 多摩区');
      areas.push('横浜市 金沢区');
      areas.push('横浜市 保土ケ谷区');

      var rule = SpreadsheetApp.newDataValidation().requireValueInList(areas).build();

      sheet.getRange(range.getRow(), range.getColumn() + 1).setDataValidation(rule);

    } else if (prefecture == '埼玉県') {

      areas.push('川口市');
      areas.push('川越市');
      areas.push('所沢市');
      areas.push('越谷市');
      areas.push('草加市');
      areas.push('春日部市');
      areas.push('上尾市');
      areas.push('熊谷市');
      areas.push('さいたま市 南区');
      areas.push('新座市');
      areas.push('さいたま市 見沼区');
      areas.push('狭山市');
      areas.push('久喜市');
      areas.push('入間市');
      areas.push('さいたま市 浦和区');
      areas.push('深谷市');
      areas.push('さいたま市 北区');
      areas.push('三郷市');
      areas.push('朝霞市');
      areas.push('戸田市');

      var rule = SpreadsheetApp.newDataValidation().requireValueInList(areas).build();

      sheet.getRange(range.getRow(), range.getColumn() + 1).setDataValidation(rule);

    }

  }
  
}
