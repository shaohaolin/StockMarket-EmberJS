/**
 * Created by kurt on 15-3-1.
 */
StockMarket.MarketDepthRoute = Ember.Route.extend({
    model: function(params){
        return this.store.find('company', params.company_id);
    }
});
