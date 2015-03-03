/**
 * Created by kurt on 15-3-1.
 */
StockMarket.BuyOrder = DS.Model.extend({
    bidPrice: DS.attr(),
    bidVolume: DS.attr(),
    companyID: DS.attr(),
    company: DS.belongsTo('company')
});