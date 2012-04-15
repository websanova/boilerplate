/******************************************
 * Websanova.com
 *
 * Resources for web entrepreneurs
 *
 * @author          Websanova
 * @copyright       Copyright (c) 2012 Websanova.
 * @license         This websanova jQuery boilerplate is dual licensed under the MIT and GPL licenses.
 * @link            http://www.websanova.com
 * @docs            http://www.websanova.com/plugins/websanova/boilerplate
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
			var data = this.data('_wBoiler');

			if(data)
			{
				if($.fn.wBoiler.defaultSettings[option] !== undefined)
				{
					if(settings !== undefined){
						//if you need to make any specific changes to the DOM make them here
						data.settings[option] = settings;
						return true;
					}
					else return data.settings[option];
				}
				else return false;
			}
			else return false;
		}

		settings = $.extend({}, $.fn.wBoiler.defaultSettings, settings || {});

		return this.each(function()
		{
			var $elem = $(this);

			var $settings = jQuery.extend(true, {}, settings);

			var boiler = new Boiler($settings);

			boiler.generate();

			// run some code here
			// try to keep as much of the main code in the prototype methods as possible
			// focus on just setting up the plugin and calling proper methods from here

			$elem.data('_wBoiler', boiler);
		});
	}

	$.fn.wBoiler.defaultSettings = {
		position	: 'mouse',
		color		: 'black'
	};

	function Boiler(settings)
	{
		this.boiler = null;
		this.settings = settings;

		return this;
	}

	Boiler.prototype = 
	{
		generate: function()
		{
			var $this = this;

			if($this.boiler) return $this.boiler;

			$this.boiler = $('<div>boiler</div>');

			return $this.boiler;
		},

		someFunc: function()
		{
			//code
		}
	}
})(jQuery);