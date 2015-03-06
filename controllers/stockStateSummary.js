/**
 * Created by kurt on 15-2-24.
 */
StockMarket.StockStateSummaryController = Ember.ArrayController.extend({


    //sort companies based on Company Name alphabet
    sortProperties: ['companyName:asc'],
    sortedCompany: Ember.computed.sort('model','sortProperties')

});