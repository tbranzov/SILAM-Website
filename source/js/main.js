		 function pad(num, size) {
				var s = "00" + num;
				return s.substr(s.length-size);
		}

		function information_row() {
				var info_row = "AQ parameter: " + set_view[0] + " . Teritory: " + set_view[2] + ". Height: " + set_view[1]+" m.";
				return info_row;
		}		

		
			// This function is called when all images are loaded
			function Preload_Callback() {
				$("#loading").hide();
				$("#images").show();
				$('.slider').bbslider('play');				
			}
			
			// This function is called every time an image is loaded. It is being passed 2 parameters:
			// the number of images loaded so far and the number of total images. This allows you to
			// calculate a % and show it to the user.
			function imageLoaded(elementsLoadedCount, totalImagesCount) {
				var percent = Math.round((elementsLoadedCount / totalImagesCount) * 100);
				$('#progressbar').progressbar('option', 'value', percent);
			}

		
		function generate_imgset(ifirst,ilast,dirname, calc_module, day_dir, meteo_parameter, forecasted_height, region_name, fileext, file_sep, dir_sep) {
			var imgpath = [];
			
			if (forecasted_height == 0) {
				forecasted_height = "srf";
			} else if (forecasted_height == 500) {
				forecasted_height = "500m";
			} else if (forecasted_height == 1000) {
				forecasted_height = "1000m";		
			} else if (forecasted_height == 3000) {
				forecasted_height = "3000m";	
			} else {
				region_name = "srf";
			}
			
			if (region_name == "Europe") {
				region_name="europe";
			} else if (region_name == "Northern Europe") {
				region_name="regional";
			} else {
				region_name="europe";
			}
			
			
			
			for (var i=ifirst; i<=ilast; i++) {
				imgpath[imgpath.length]= dirname + dir_sep + region_name + dir_sep + calc_module + dir_sep + day_dir +dir_sep + meteo_parameter + file_sep + forecasted_height + file_sep + pad(i,3) + fileext;		
			}
			
			return imgpath;
		}



		
		function produce_slides(ifirst,ilast,startpos,meteoparam,forecast_height, region_name, imgresponsive) {

			var addhtml;
			var displayset = paramset(meteoparam, forecast_height, region_name);			   	
			
			$('.slider').bbslider('pause');	
			
			if (imgresponsive==1) {
				addhtml = ' class="img-responsive" ';
			} else {
				addhtml = '';
			}
				
			$('.slider').empty();
			  

			$("#images").hide();
			$("#loading").show();
			$("#progressbar").progressbar({ value: 0 });
			
			  for (var i = ifirst; i <= ilast; i++) {
				$('.slider').append('<div> <img src=" '+ displayset[i] +' " ' + addhtml + ' ></div>');
			  }

			$("#images").find('img').batchImageLoad({
				loadingCompleteCallback: Preload_Callback,
				imageLoadedCallback: imageLoaded
			});

			  $("#slide-info").text(information_row());
			  
			  $('.slider').bbslider('update');
			  $('.slider').bbslider('travel',startpos);	
		}	
	


	
			
		function paramset(paramid, forecast_height, region_name) {

			
			if (paramid =="CO") {

				var imgset=[];	

				imgset = generate_imgset(0,24,"http://silam.fmi.fi/AQ/operational", "acid", "003", "CO_gas", forecast_height, region_name, ".png", "_", "/");
				imgset= imgset.concat(generate_imgset(1,24,"http://silam.fmi.fi/AQ/operational", "acid", "002", "CO_gas", forecast_height, region_name,".png", "_", "/"));
				imgset= imgset.concat(generate_imgset(1,24,"http://silam.fmi.fi/AQ/operational", "acid", "001","CO_gas", forecast_height, region_name,".png", "_", "/"));
				imgset= imgset.concat(generate_imgset(1,96,"http://silam.fmi.fi/AQ/operational", "acid", "000", "CO_gas", forecast_height, region_name,".png", "_", "/"));			
				return imgset;

			} else if (paramid =="O3") {

				var imgset=[];	

				imgset = generate_imgset(0,24,"http://silam.fmi.fi/AQ/operational", "acid", "003", "O3_gas", forecast_height, region_name, ".png", "_", "/");
				imgset= imgset.concat(generate_imgset(1,24,"http://silam.fmi.fi/AQ/operational", "acid", "002", "O3_gas", forecast_height, region_name,".png", "_", "/"));
				imgset= imgset.concat(generate_imgset(1,24,"http://silam.fmi.fi/AQ/operational", "acid", "001","O3_gas", forecast_height, region_name,".png", "_", "/"));
				imgset= imgset.concat(generate_imgset(1,96,"http://silam.fmi.fi/AQ/operational", "acid", "000", "O3_gas", forecast_height, region_name,".png", "_", "/"));			
				return imgset;

			} else if (paramid =="NO2") {

				var imgset=[];	

				imgset = generate_imgset(0,24,"http://silam.fmi.fi/AQ/operational", "acid", "003", "NO2_gas", forecast_height, region_name, ".png", "_", "/");
				imgset= imgset.concat(generate_imgset(1,24,"http://silam.fmi.fi/AQ/operational", "acid", "002", "NO2_gas", forecast_height, region_name,".png", "_", "/"));
				imgset= imgset.concat(generate_imgset(1,24,"http://silam.fmi.fi/AQ/operational", "acid", "001","NO2_gas", forecast_height, region_name,".png", "_", "/"));
				imgset= imgset.concat(generate_imgset(1,96,"http://silam.fmi.fi/AQ/operational", "acid", "000", "NO2_gas", forecast_height, region_name,".png", "_", "/"));				
				return imgset;			

			} else if (paramid =="NO") {

				var imgset=[];	

				imgset = generate_imgset(0,24,"http://silam.fmi.fi/AQ/operational", "acid", "003", "NO_gas", forecast_height, region_name, ".png", "_", "/");
				imgset= imgset.concat(generate_imgset(1,24,"http://silam.fmi.fi/AQ/operational", "acid", "002", "NO_gas", forecast_height, region_name,".png", "_", "/"));
				imgset= imgset.concat(generate_imgset(1,24,"http://silam.fmi.fi/AQ/operational", "acid", "001","NO_gas", forecast_height, region_name,".png", "_", "/"));
				imgset= imgset.concat(generate_imgset(1,96,"http://silam.fmi.fi/AQ/operational", "acid", "000", "NO_gas", forecast_height, region_name,".png", "_", "/"));				
				return imgset;	

			} else if (paramid =="SO2") {

				var imgset=[];	

				imgset = generate_imgset(0,24,"http://silam.fmi.fi/AQ/operational", "acid", "003", "SO2_gas", forecast_height, region_name, ".png", "_", "/");
				imgset= imgset.concat(generate_imgset(1,24,"http://silam.fmi.fi/AQ/operational", "acid", "002", "SO2_gas", forecast_height, region_name,".png", "_", "/"));
				imgset= imgset.concat(generate_imgset(1,24,"http://silam.fmi.fi/AQ/operational", "acid", "001","SO2_gas", forecast_height, region_name,".png", "_", "/"));
				imgset= imgset.concat(generate_imgset(1,96,"http://silam.fmi.fi/AQ/operational", "acid", "000", "SO2_gas", forecast_height, region_name,".png", "_", "/"));				
				return imgset;					

			} else if (paramid =="PM10") {

				var imgset=[];	

				imgset = generate_imgset(0,24,"http://silam.fmi.fi/AQ/operational", "acid", "003", "PM10", forecast_height, region_name, ".png", "_", "/");
				imgset= imgset.concat(generate_imgset(1,24,"http://silam.fmi.fi/AQ/operational", "acid", "002", "PM10", forecast_height, region_name,".png", "_", "/"));
				imgset= imgset.concat(generate_imgset(1,24,"http://silam.fmi.fi/AQ/operational", "acid", "001","PM10", forecast_height, region_name,".png", "_", "/"));
				imgset= imgset.concat(generate_imgset(1,96,"http://silam.fmi.fi/AQ/operational", "acid", "000", "PM10", forecast_height, region_name,".png", "_", "/"));			
				return imgset;	

			} else if (paramid =="PM25") {

				var imgset=[];	

				imgset = generate_imgset(0,24,"http://silam.fmi.fi/AQ/operational", "acid", "003", "PM2_5", forecast_height, region_name, ".png", "_", "/");
				imgset= imgset.concat(generate_imgset(1,24,"http://silam.fmi.fi/AQ/operational", "acid", "002", "PM2_5", forecast_height, region_name,".png", "_", "/"));
				imgset= imgset.concat(generate_imgset(1,24,"http://silam.fmi.fi/AQ/operational", "acid", "001","PM2_5", forecast_height, region_name,".png", "_", "/"));
				imgset= imgset.concat(generate_imgset(1,96,"http://silam.fmi.fi/AQ/operational", "acid", "000", "PM2_5", forecast_height, region_name,".png", "_", "/"));			
				return imgset;	

				
			} else {
					greeting = "Good evening";
			}
		
		}
