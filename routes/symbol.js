/**
 * Created by kurt on 15-2-25.
 */
StockMarket.SymbolRoute = Ember.Route.extend({
    model: function(params) {
        return this.store.find('company', params.company_id);
    }
});