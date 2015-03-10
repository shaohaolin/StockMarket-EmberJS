/**
 * Created by kurt on 15-2-25.
 */
StockMarket.StockStateSummaryRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('company');
    },

    afterModel: function(companies, transition){
        this.transitionTo('marketByOrder', companies.get('firstObject'));
    }
});