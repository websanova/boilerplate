/******************************************
 * Websanova.com
 *
 * Resources for web entrepreneurs
 *
 * @author          Websanova
 * @copyright       Copyright (c) 2012 Websanova.
 * @license         This websanova jQuery boilerplate is dual licensed under the MIT and GPL licenses.
 * @link            http://www.websanova.com
 * @github          http://github.com/websanova/boilerplate
 * @version			1.2.1
 *
 ******************************************/

(function($)
{
	$.fn.wBoiler = function(option, settings)
	{
		if(typeof option === 'object')
		{
			settings = option;
		}
		else if(typeof option === 'string')
		{
			var values = [];

			var elements = this.each(function()
			{
				var data = $(this).data('_wBoiler');

				if(data)
				{
					if(option === 'reset') { data.reset(); }
					else if(option === 'theme') { data.setTheme(settings); }
					else if($.fn.wBoiler.defaultSettings[option] !== undefined)
					{
						if(settings !== undefined) { data.settings[option] = settings; }
						else { values.push(data.settings[option]); }
					}
				}
			});

			if(values.length === 1) { return values[0]; }
			if(values.length > 0) { return values; }
			else { return elements; }
		}

		settings = $.extend({}, $.fn.wBoiler.defaultSettings, settings || {});

		return this.each(function()
		{
			var $elem = $(this);

			var $settings = jQuery.extend(true, {}, settings);

			var boiler = new Boiler($settings, $elem);

			var $el = boiler.generate();

			$('body').append($el);

			$elem.data('_wBoiler', boiler);
		});
	}

	$.fn.wBoiler.defaultSettings = {
		theme		: 'red',
		onClick		: null
	};

	function Boiler(settings, $elem)
	{
		this.boiler = null;
		this.settings = settings;
		this.$elem = $elem;

		return this;
	}

	Boiler.prototype = 
	{
		generate: function()
		{
			var $this = this;

			if($this.boiler) return $this.boiler;

			$this.boiler = $('<div class="_wBoiler_holder"></div>');

			$this.boiler
			.click(function()
			{
				$this.boiler.html('you clicked me!');

				if($this.settings.onClick) $this.settings.onClick.apply($this, []);
			})
			.mousedown(function() //works on mobile too
			{
				$this.boiler.html('you mouse downed me!');
			});

			$this.bindMobile($this.boiler);
			$this.setTheme($this.settings.theme);
			$this.reset();

			return $this.boiler;
		},

		setTheme: function(theme)
		{
			this.settings.theme = theme;
			this.boiler.attr('class', '_wBoiler_holder _wBoiler_' + this.settings.theme);
		},

		reset: function()
		{
			this.boiler.html('click me');
		},

		bindMobile: function($el)
		{
			$el.bind('touchstart touchmove touchend touchcancel', function ()
			{
				var touches = event.changedTouches, first = touches[0], type = ""; 

				switch (event.type)
				{
					case "touchstart": type = "mousedown"; break; 
					case "touchmove": type = "mousemove"; break; 
					case "touchend": type = "mouseup"; break; 
					default: return;
				}

				var simulatedEvent = document.createEvent("MouseEvent"); 

				simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0/*left*/, null);
				first.target.dispatchEvent(simulatedEvent);
				//event.preventDefault(); //if you don't want to disable click uncomment this
			});
		}
	}
})(jQuery);