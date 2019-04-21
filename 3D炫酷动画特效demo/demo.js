window.onload = function() {
	var img = $('img');
	// console.log(img[0])
	var len = img.length;
	var deg = 360 / len;
	for (var i = 0; i < len; i++){
		// img.eq(i)
		$(img[i]).css({
			transform:'rotateY(' + deg*i + 'deg) translateZ(300px)',
			transition:'transform 0.5s linear ' + (len - 1 - i) * 0.1 + 's' 

		})
	}
	bindEvent();
}

// 水平旋转 rotateY

// 垂直旋转 rotateX

function bindEvent() {
	var lastX, lastY, nowX, nowY, disX = 0, disY = 0, rotX = 0, rotY = 0, timer;
	$('body').on('mousedown', function(e) {
		// console.log(e)
		lastX = e.clientX;
		lastY = e.clientY;
		$('body').on('mousemove', function(e) {
			clearInterval(timer);
			nowX = e.clientX;
			nowY = e.clientY;

			//坐标差值 作为选择的角度
			disX = nowX - lastX;
			disY = nowY - lastY;
			// console.log(disX)

			// 旋转角度
			rotX -= disY * 0.2;
			rotY += disX * 0.2;
			// console.log(rotY)
			$('.box').css({
				transform:'rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)'
			});
			lastX = nowX;
			lastY = nowY;
		});
		$('body').on('mouseup', function() {

			$('body').off('mousemove');


			// 缓冲运动 角度越来越小
			timer = setInterval(function() {
				// console.log(disX)
				disX *= 0.95;
				disY *= 0.95;
				rotX -= disY * 0.5;
				rotY += disX * 0.5;

				$('.box').css({
					transform:'rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)'
				});
				// console.log(disY)
				if(Math.abs(disX) < 0.1 && Math.abs(disY) < 0.1 ) {
					console.log('a')
					clearInterval(timer);
				
				}	
				$('body').off('mousemove');
				$('body').off('mouseup');
			}, 20);

			// console.log(disX)
			// console.log(rotY)
			
		})
		return false;
	})
}
