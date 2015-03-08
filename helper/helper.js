/**
 * Created by kurt on 15-3-5.
 */
Ember.Handlebars.helper('marketByOrderView', function (sortedBuyOrders, sortedSellOrders, option) {

        var length = sortedBuyOrders.length < sortedSellOrders.length ? sortedSellOrders.length : sortedBuyOrders.length;

        var tableView = "";


        tableView =  '<table class="table table-bordered buyByOrder"> <thead> <tr> <th colspan="2">Buy</th> <th colspan="2">Sell</th> </tr> <tr> <th>Volume</th> <th>Price</th> <th>Price</th> <th>Volume</th> </tr> </thead> <tbody>';

        for (var i = 0; i < length; i++) {

            if (i < sortedBuyOrders.length) {

                var temBidVolume = sortedBuyOrders[i].get('bidVolume');
                //console.log(temBidVolume);
                var temBidPrice = sortedBuyOrders[i].get('bidPrice');
                //console.log(temBidPrice);

                tableView = tableView + "<tr> <th>" + temBidVolume +"</th> <th>" + temBidPrice + "</th>";
            }
            else {
                tableView = tableView + "<tr><th></th> <th></th>";
            }

            if (i < sortedSellOrders.length) {
                var temSellPrice = sortedSellOrders[i].get('sellPrice');
                //console.log(temSellPrice);
                var temSellVolume = sortedSellOrders[i].get('sellVolume');
                //console.log(temBidVolume);

                tableView = tableView + "<th>" + temSellPrice + "</th> <th>" + temSellVolume +"</th> </tr>";
            }
            else {
                tableView = tableView + "<th> </th> <th></th> </tr>";
            }
        }

        tableView += "</tbody> </table>";

        return new Ember.Handlebars.SafeString(tableView);
});

Ember.Handlebars.helper('priceView', function (buyOrders, sellOrders, option) {

    var length = buyOrders.content.length < sellOrders.content.length ? sellOrders.content.length : buyOrders.content.length;

    var tableView = "";

    tableView = '<table class="table table-bordered byPrice"> <thead> <tr> <th colspan="3">Buy</th> <th colspan="3">Sell</th> </tr> <tr> <th>#</th> <th>Volume</th> <th>Price</th> <th>Price</th> <th>Volume</th> <th>#</th> </tr> </thead> </table>'

    return new Ember.Handlebars.SafeString(tableView);
});

