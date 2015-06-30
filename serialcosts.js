// Copyright 2015 (c) Calvin Mah - Simon Fraser University 

$(function(){

	// example CRDB title URL http://cufts2.lib.sfu.ca/CRDB4/BVAS/resource/9124
	
	// matching example catalog URL http://troy.lib.sfu.ca/record=b3953568
    
    var catalog_re = new RegExp("^http\:\/\/troy\.lib\.sfu\.ca*");
    var cufts_re = new RegExp("^http\:\/\/cufts2\.lib\.sfu\.ca*");
    if (catalog_re.test(window.location.href)) {
    	// catalogue URL
    	getLatestContentsCatalogue();
    }
    else {
    	if (cufts_re.test(window.location.href)) {
    		// cufts URL
    		getLatestContentsCUFTS();
    	}
    }

});    

function getLatestContentsCatalogue() {

	var link = $( "td.bibinfodata:contains('http://troy.lib.sfu.ca/record=')" );
	var bibnum = link.text();
	bibnum = bibnum.replace(/http:\/\/troy.lib.sfu.ca\/record=/,'');
	bibnum = bibnum.replace(/~S1a/,'');
	
    var URL = "http://api.lib.sfu.ca/serialcosts/search?issn=&bibnum=" + bibnum;

	var items = [];
    $.getJSON( URL, function( data ) {  
        $.each(data, function(idx, val) {
            var costs = '<ul>';
            $.each(val.costs, function(year, cost) {
            	costs = costs + '<li>' + year + " $" + cost.year_cost + '</li>';
            	// textcost = textcost + costs;
            });
            costs = costs + '</ul>';
            items.push(costs);
        });
        $.each(items, function(idx, obj) {
            link.closest("tr").after('<tr><td class="bibInfoLabel" width="20%">Costs for this title</td><td class="bibInfoData">' + obj + '</td></tr></table></td></tr>');
        });
    });
}

function getLatestContentsCUFTS() {
	var bibnum = $(" #resource-local_bib-data ").children().text();
	// console.log('the bibnum: |' + bibnum + '|');
	bibnum = bibnum.substring(0,8);
	// console.log('the bibnum: |' + bibnum + '|');

	var URL = "http://api.lib.sfu.ca/serialcosts/search?issn=&bibnum=" + bibnum;
	var items = [];
    $.getJSON( URL, function( data ) {  
        $.each(data, function(idx, val) {
            var costs = '<ul>';
            $.each(val.costs, function(year, cost) {
            	costs = costs + '<li>' + year + " $" + cost.year_cost + '</li>';
            	// textcost = textcost + costs;
            });
            costs = costs + '</ul>';
            items.push(costs);
        });
        $.each(items, function(idx, obj) {
            // link.closest("tr").after('<tr><td class="bibInfoLabel" width="20%">Costs for this title</td><td class="bibInfoData">' + obj + '</td></tr></table></td></tr>');
            var insert_html = '<dt id="resource-local_cost-label" class="resource-label has-data has-label">SFU Costs</dt>';
            insert_html +=    '<dd id="resource-local_bib-data" class="resource-data has-data has-label"><span class="field-data">' + obj + '</span></dd>';
            $(" #resource-local_bib-data ").after(insert_html);

            // console.log(obj);
            
        });
    });
	
	
}
