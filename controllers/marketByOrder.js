/**
 * Created by kurt on 15-3-5.
 */
StockMarket.MarketByOrderController = Ember.ArrayController.extend({


    sortProperties: ['bidPrice:asc'],
    sortedBuyOrders: Ember.computed.sort('model.buyOrders', 'sortProperties'),

    sortSellProperties: ['sellPrice:asc'],
    sortedSellOrders: Ember.computed.sort('model.sellOrders', 'sortSellProperties')


});