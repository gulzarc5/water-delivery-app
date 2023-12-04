import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  header: { justifyContent: 'center', alignItems: 'center', paddingLeft: 10, paddingRight: 10, paddingBottom: 10, backgroundColor: '#fff', shadowColor: "#000", shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 10, },

  headerText: { fontSize: 30, fontWeight: "700", color: '#fff' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },

  addressBlock: { backgroundColor: '#fff', padding: 10, },
  addressHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  addressArea: { paddingTop: 5, },

  cartSection: { backgroundColor: '#eee', shadowColor: "#000", shadowOffset: { width: 0, height: 4, }, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 8 },
  cartBlock: { flexDirection: 'row', flexWrap: 'wrap', borderRadius: 5, },
  cartItem: { flexDirection: 'column', width: "100%", backgroundColor: '#fff', },
  cartImage: { marginTop: 5, marginBottom: 0, flexDirection: 'row', paddingLeft: 10, paddingRight: 10 },
  cartName: { fontSize: 18, color: '#333', fontWeight: '500' },
  cartPrice: { textAlign: 'left', marginTop: 10, marginBottom: 10, flexDirection: 'row' },
  itemPrice: { fontSize: 18, fontWeight: '700' },
  // cartPriceDiscount: {backgroundColor:'green',borderRadius:15},
  cartPriceDiscountText: { fontSize: 15, fontWeight: "700", color: 'green', textAlign: 'left', paddingTop: 3 },

  qtyBlock: { flexDirection: 'row', justifyContent: 'center', alignSelf: 'flex-start', marginLeft: 10, padding: 5, borderRadius: 5 },
  qtyHeadText: { fontWeight: '700', justifyContent: 'flex-start', paddingTop: 5 },
  // pickerBlock: {width:100,marginTop:-16,padding: 0,margin:0},

  cartItemBtnBlock: { borderTopWidth: 1, borderColor: '#eee', width: '100%', marginTop: 10, alignItems: 'center', padding: 8 },
  cartItemBtn: { flexDirection: 'row', justifyContent: 'center', backgroundColor: '#2c69bc', width: '50%', padding: 2, borderRadius: 10, paddingHorizontal: 20 },
  removeIcon: { fontSize: 16, color: '#fff', marginRight: 5, marginTop: 1 },
  cartItemBtnText: { fontSize: 14, color: '#fff' },

  cartValueBlock: { backgroundColor: '#fff' },
  cartValueHeaderText: { fontWeight: '700', borderBottomWidth: 1, borderColor: '#eee', padding: 10, color: '#333' },
  cartValuePriceBlock: { padding: 10, },
  cartValueInnerBlock: { flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5 },
  cartValueTotalBlock: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5, borderTopWidth: 1, borderColor: '#eee', borderStyle: 'dashed', padding: 10, borderRadius: 5 },
  cartValueTotalBlockText: { fontWeight: '700' },

  fixedButtonBlock: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#fff', shadowColor: "#000", shadowOffset: { width: 0, height: 0, }, shadowOpacity: 0.90, shadowRadius: 4.65, elevation: 500, alignSelf: 'center', justifyContent: 'center' },
  fixedButton1: { padding: 15, width: '50%', justifyContent: 'center' },
  fixedButton1Text: { textAlign: 'center', color: '#333', fontWeight: '700', marginTop: -8 },
  fixedButton1TextOther: { textAlign: 'center', color: '#2c69bc', fontSize: 12, fontWeight: '700' },
  fixedButton2: { padding: 15, backgroundColor: '#2c69bc', width: '50%', justifyContent: 'center', color: '#fff' },
  fixedButton2Text: { textAlign: 'center', color: '#fff', marginTop: -11 },
});
export default styles;