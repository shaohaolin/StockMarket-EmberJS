/**
 * Created by kurt on 15-3-1.
 */
StockMarket.MarketByOrderRoute = Ember.Route.extend({
    model: function(params){
        return this.store.find('company', params.company_id);
    }
});
