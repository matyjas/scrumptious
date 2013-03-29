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
			title: "Scrumptious Bookmarks",
			nextkey: "0"
		};

		send(mustache.to_html(ddoc.templates.index.head, data));

		while(row = getRow()) {

			var dt = new Date();
			dt.setISO8601(row.value.date);

			data.nextkey = row.value.id;

			send(mustache.to_html(ddoc.templates.index.row, {
				url: row.value.url,
				date: dt.format('dd-mmm-yy'),
				id: row.value.id,
				desc: row.value.desc,
				title: row.value.title,
				tags: row.value.tags.sort(function(x,y) {
					var a = x.toLowerCase();
					var b = y.toLowerCase();
					if (a > b) return 1;
					if (a < b) return -1;
					return 0;
				           }),
				bytag: path.list('ls', 'bytag'),
				show: path.show('bookmark', row.value.id)

			}));
		}
		send(mustache.to_html(ddoc.templates.index.tail, data));
	});
}
