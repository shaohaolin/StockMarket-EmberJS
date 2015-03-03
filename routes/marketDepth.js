/**
 * Created by kurt on 15-3-1.
 */
StockMarket.MarketDepthRoute = Ember.Route.extend({
    model: function(){
        return this.store.find('BuyOrder');
    }
});
