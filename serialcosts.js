// Copyright 2015 (c) Calvin Mah - Simon Fraser University 

$(function(){
    var contents = getLatestContents();
});    

function getLatestContents() {

	var link = $( "td.bibinfodata:contains('http://troy.lib.sfu.ca/record=')" );
	var linktext = link.text();
	linktext = linktext.replace(/http:\/\/troy.lib.sfu.ca\/record=/,'');
	linktext = linktext.replace(/~S1a/,'');
	
    var URL = "http://api.lib.sfu.ca/serialcosts/search?issn=&bibnum=" + linktext;

	var items = [];
	var textcost;
    $.getJSON( URL, function( data ) {  
        
        $.each(data, function(idx, val) {
            var link = "<a href='" + val.url + "'>" + val.title + "</a>";
            var costs = '<ul>';
            $.each(val.costs, function(year, cost) {
            	costs = costs + '<li>' + year + " $" + cost.year_cost + '</li>';
            	textcost = textcost + costs;
            });
            costs = costs + '</ul>';
            items.push(costs);
        });

        $.each(items, function(idx, obj) {
            link.closest("tr").after('<tr><td class="bibInfoLabel" width="20%">Costs for this title</td><td class="bibInfoData">' + obj + '</td></tr></table></td></tr>');
        });

    });
}