/**
 * Created by kurt on 15-2-25.
 */
StockMarket.StockStateSummaryRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('company');
    }
});