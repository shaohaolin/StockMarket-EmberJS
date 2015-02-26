/**
 * Created by kurt on 15-2-26.
 */
StockMarket.PlaceBidOrderRoute = Ember.Route.extend({
    model: function(params){
        return this.store.find('company', params.company_id);
    }
});