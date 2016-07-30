  // this function sets values for object properties returned by the parkInfo request
  var showInfo = function(item) {
    	// clone our result template code
    	var result = $('.templates .info').clone();
    	// display user's display name with link
    	var park = result.find('.display-name');
      console.log(park);
      console.log(result);

    	return result;
  };  // end showInfo

  // parse the results object returned and determine number of results to be appended to DOM
  var showSearchResults = function(resultNum) {
      var results = resultNum + ' results for <strong>Animals</strong>';
      return results;
  };

  // captures error string and turns it into displayable DOM element
  var showError = function(error){
      var errorElem = $('.templates .error-msg').clone();
      var errorText = '<p>' + error + '</p>';
      errorElem.append(errorText);
  };

  // sends a string of tag(s) (semi-colon separated) in "get unanswered questions" call to stackexchange
  var getInfo = function() {  // tags is a string containing one or more user submitted tags

  	// the data: parameters passed in ajax request
  	/*var request = {
  		tag: 'Animals',   //ind questions tagged with a string array of tag(s) submitted by user and passed into this function
    };*/

    // deferred object var created
    $.ajax({
      	url: "http://www.balboaparkcommons.org/json/objectview/listview/14149813/Animals", //specifies the domain and end point method
      	dataType: "jsonp",
        type: "GET",
    })

	  .done(function(result){  // wait for successful return of objects
        console.log(result);

        var searchResults = showSearchResults(result.ct.length);
        $('.search-results').html(searchResults);

        $.each(result.ct, function(i, item) { //$.each executes the function passed in once for each item in array passed in
      	    var parkInfo = showInfo(item);
      	    $('.results').append(parkInfo);
        });

	  })  // end done

	  .fail(function(jqXHR, error){ //this waits for the ajax to return with an error promise object
        var errorElem = showError(error);
        $('.search-results').append(errorElem);
	  });  // end fail

}; // end getInfo

$(document).ready( function() {
    $('.topic-finder').submit( function(e){
    		e.preventDefault();
    		// zero out results container, including # of results, if previous search has run
        $('.results').html('');
    		// get the value of the tags the user submitted and pass as parameter in ajax call
    		var tag = $(this).find("input[name='topic']").val();

    		getInfo();
	  });
});
