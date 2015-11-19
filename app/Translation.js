Ext.define('Admin.Translation', {}, function() {
	console.log('Get translation array');
	var Loader = Ext.Loader, wasLoading = Loader.isLoading;
	
	Loader.loadScriptsSync(['http://localhost:3000/translation']);

	if (Admin.Translation) {
		String.prototype.translate = function() {
			var s = this.valueOf();
			// console.log('TRANSLATE: ' + s);
			var t = {},
					i = 0,
					n = Admin.Translation.length;
			while (i < n) {
				t = Admin.Translation[i];
				// console.log(t);
				if (t.id == s) {
					return t.translation;
				}
				i++;
			}
			return s;
		};
	} else {
		String.prototype.translate = function() {
			var s = this.valueOf();
			console.log('SEM TRANSLATE: ' + s);
			return s;
		};
	}

	/*
	Loader.loadScript('http://localhost:3000/translation', // URL of script
	function() {// callback fn when script is loaded
		console.log('Loader.loadScript /translation ok');

		String.prototype.translate = function() {
			var s = this.valueOf();
			// console.log('TRANSLATE: ' + s);
			var t = {},
			    i = 0,
			    n = Admin.Translation.length;
			while (i < n) {
				t = Admin.Translation[i];
				// console.log(t);
				if (t.id == s) {
					return t.translation;
				}
				i++;
			}
			return s;
		};

	}, function() {// callback fn if load fails
		console.log('Loader.loadScript /translation NOT ok');
	}, this, // scope of callbacks
	true);
	Loader.isLoading = wasLoading;
	*/
	
});
