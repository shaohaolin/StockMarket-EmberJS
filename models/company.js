/**
 * Created by kurt on 15-2-23.
 */
StockMarket.Company = DS.Model.extend({
    companyName: DS.attr(),
    openPrice: DS.attr('number'),
    currentPrice: DS.attr('number'),
    shareVolume: DS.attr('number'),
    url:DS.attr(),
    netChange: function() {
        var changePercentage;
        changePercentage = (this.get('currentPrice') - this.get('openPrice')) / (this.get('currentPrice')) * 100;
        return changePercentage.toFixed(2);
    }.property('currentPrice','openPrice')

});
