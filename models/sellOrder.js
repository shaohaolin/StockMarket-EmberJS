/**
 * Created by kurt on 15-3-2.
 */
StockMarket.SellOrder = DS.Model.extend({
   sellPrice: DS.attr(''),
   sellVolume: DS.attr(),
   companyID: DS.attr(),
   company: DS.belongsTo('company')
});