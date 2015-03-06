/**
 * Created by kurt on 15-3-5.
 */
Ember.Handlebars.helper('marketByOrderView', function (buyOrders, sellOrders, option) {

        var length = buyOrders.content.length < sellOrders.content.length ? sellOrders.content.length : buyOrders.content.length;
        console.log("buyOrders:" + buyOrders.content.length);
        console.log("sellOrders:" + sellOrders.content.length);

        var tableView = "";

        console.log(length);

        tableView =  '<table class="table table-bordered buyByOrder"> <thead> <tr> <th colspan="2">Buy</th> <th colspan="2">Sell</th> </tr> <tr> <th>Volume</th> <th>Price</th> <th>Price</th> <th>Volume</th> </tr> </thead> <tbody>';

        for (var i = 0; i < length; i++) {

            if (i < buyOrders.content.length) {

                var temBidVolume = buyOrders.content[i].get('bidVolume');
                console.log(temBidVolume);
                var temBidPrice = buyOrders.content[i].get('bidPrice');
                console.log(temBidPrice);

                tableView = tableView + "<tr> <th>" + temBidVolume +"</th> <th>" + temBidPrice + "</th>";
            }
            else {
                tableView = tableView + "<tr><th></th> <th></th>";
            }

            if (i < sellOrders.content.length) {
                var temSellPrice = sellOrders.content[i].get('sellPrice');
                console.log(temSellPrice);
                var temSellVolume = sellOrders.content[i].get('sellVolume');
                console.log(temBidVolume);

                tableView = tableView + "<th>" + temSellPrice + "</th> <th>" + temSellVolume +"</th> </tr>";
            }
            else {
                tableView = tableView + "<th> </th> <th></th> </tr>";
            }
        }

        tableView += "</tbody> </table>";

        return new Ember.Handlebars.SafeString(tableView);
});