/**
 * Created by kurt on 15-2-24.
 */
StockMarket.StockStateSummaryController = Ember.ArrayController.extend({


    //sort companies based on Company Name alphabet
    sortProperties: ['companyName:asc'],
    sortedCompany: Ember.computed.sort('model','sortProperties')

    /*
    sortBuyOrderPrice : ['bidPrice:asc'],
    sortBuyOrders : Ember.computed.sort('model.buyOrders', 'sortBuyOrderPrice'),

    sortSellOrderPrice : ['sellPrice:asc'],
    sortSellOrders : Ember.computed.sort('model.sellOrders', 'sortSellOrderPrice')
    */

});