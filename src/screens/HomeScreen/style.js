import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: { justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: '#fff', },
  headerText: { fontSize: 30, fontWeight: "700", color: '#fff' },
  pagination: { flexDirection: 'row', position: 'absolute', bottom: -20, alignSelf: 'center', },
  paginationText: { color: '#888', fontSize: 50, },
  paginationActiveText: { color: '#fff', fontSize: 50, },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  navLogo: { width: 100, height: 50, resizeMode: 'cover', marginRight: 120 },
  navIcon: { width: 30, height: 30, resizeMode: 'contain', alignSelf: 'flex-end' },
  navUser: { width: 40, height: 40, resizeMode: 'cover', alignSelf: 'flex-end', borderWidth: 1, borderRadius: 50, borderColor: '#bbb', marginTop: 10 },

  productBrand: { backgroundColor: '#fff', marginHorizontal:5, borderWidth: 1, borderColor: '#ddd', borderRadius:10,},

  homeBanner: { backgroundColor: '#fff', marginHorizontal:5, borderWidth: 1, borderColor: '#ddd', borderRadius:10,},
  homeBannerInner: { borderRadius: 10, overflow: 'hidden',minHeight:'14%'},
  bannerImage: { width: '100%', height: 185, resizeMode: 'cover'},
  bannerImageText: {fontSize: 35, color: '#fff',alignSelf:'center', fontWeight: '700',paddingHorizontal:10,marginTop:15},
  bannerImageText2: {fontSize: 15, color: '#f3f3f3',alignSelf:'center', fontWeight: '700',paddingHorizontal:5,textAlign:'center',marginTop:5},
  bannerBtnText: { fontSize: 18, color: '#2c69bc', paddingLeft: 10, paddingRight: 10, padding: 2, alignSelf: 'center', borderWidth: 2, borderRadius: 50, borderColor: '#C99738', backgroundColor: '#fff',paddingHorizontal:10,marginTop:15 },

  subscriptionPlan: { backgroundColor: '#2c69bc', marginHorizontal:5, borderWidth: 1, borderColor: '#ddd', borderRadius:10,},

  productSection: { backgroundColor: '#fff', marginHorizontal:5, borderWidth: 1, borderColor: '#ddd', borderRadius:10,overflow:'hidden'},
  headerBlock: { flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, marginBottom: 10 },
  productHeading: { fontSize: 16, color: '#333', alignSelf: 'center', fontWeight: '700', marginTop: 10, textTransform: 'uppercase' },
  productSubHeading: { fontSize: 12, color: '#fff', paddingLeft: 10, paddingRight: 10, padding: 2, marginTop: 10, alignSelf: 'center', borderWidth: 1, borderRadius: 50, borderColor: '#bbb', backgroundColor: '#2c69bc' },
  productBlock: { flexDirection: 'row', flexWrap: 'wrap', borderTopWidth: 1, borderColor: '#eee', overflow: 'hidden',backgroundColor:'#eee', justifyContent: 'space-between' },
  productItem: { flexDirection: 'column', width: "49.8%", alignItems: 'center', backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee', },
  productImage: { margin: 10,marginBottom:0 },
  productName: { fontSize: 15, color: '#333', fontWeight: '500' },
  productQuantity: { fontSize: 13, color: 'red', },
  productPrice: { fontSize: 15, color: '#333' },
  
  reorderSection: { backgroundColor: '#fff', marginHorizontal:5, borderWidth: 1, borderColor: '#ddd', borderRadius:10,overflow:'hidden',padding: 10},
  reorderInner: { flexDirection: 'row', justifyContent: 'space-between',alignItems:'center'},
  reorderProduct: { flexDirection: 'column',width:'80%'},
  reorderProductText: { fontSize: 16, color: '#fff', fontWeight: '700' },
  reorderBtnText: {fontSize: 12, color: 'red', fontWeight: '700', backgroundColor: '#fff',borderRadius:10,paddingHorizontal:8,padding:3},
  reorderProductTextMore: {color:'#eee', fontSize: 15,fontWeight: '700'},

  cartPrice: { textAlign: 'left', marginBottom: 10, flexDirection: 'row' },
  itemPrice: { fontSize: 15, fontWeight: '700' },
  // cartPriceDiscount: {backgroundColor:'green',borderRadius:15},
  cartPriceDiscountText: { fontSize: 15, fontWeight: "700", color: 'green', textAlign: 'left' },
  
  pointsblock: {borderWidth: 1,borderColor: '#ddd',borderRadius:10,padding: 10,paddingVertical: 15,width:'100%',backgroundColor:'#fff'},
  pointsText: {fontSize:15,paddingLeft:10,flexDirection:'column',color:'#fff'},

});