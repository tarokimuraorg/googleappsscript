function TKTEL(tel) {
  var intel = String(tel);
  var outtel = intel.replace(/^[\(（](\d+)[\)）](\d+)-(\d+)$/,'$1-$2-$3');
  return outtel;
}
