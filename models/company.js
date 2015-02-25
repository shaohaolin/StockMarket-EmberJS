/**
 * Created by kurt on 15-2-23.
 */
var attr = DS.attr;

StockMarket.Company = DS.Model.extend({
    companyName: attr('string'),
    companySymbol:attr(),
    openPrice: attr('number'),
    currentPrice: attr('number'),
    shareVolume: attr('number')

});
