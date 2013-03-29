function(head, req)
{
        var ddoc = this;
	var path = require("vendor/couchapp/lib/path").init(req);
	var dateiso = require("vendor/date/date-iso8601rfc3339");
	var datefmt = require("vendor/date/date.format");
	var mustache = require("lib/mustache-s");

	provides("html", function() {
		var row;

		var data = {
			title: "Scrumptious Bookmarks"
		};

		send(mustache.to_html(ddoc.templates.bookmarksfile.head, data));

		while(row = getRow()) {

			var dt = new Date();
			dt.setISO8601(row.value.date);
			var timestamp = dt.getTime() / 1000;

			send(mustache.to_html(ddoc.templates.bookmarksfile.row, {
				url: row.value.url,
				date: timestamp,
				desc: row.value.desc,
				title: row.value.title
			}));
		}
		send(mustache.to_html(ddoc.templates.bookmarksfile.tail, data));
	});
}
