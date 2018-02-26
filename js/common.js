var wmbt;

// $('[data-layer-popup]').on('click', function() {
// 	console.log($(this));
// });
var bioderma = function() {
	var _this = this;
	this.init = function() {
		var forms;
		forms = $('input');
		forms.placeholder();
	},
	this.popupOpen = function(me) {
		var $this = $(me),
			val = $this.attr('data-layer-popup');

		$("#"+val).addClass("c-popup--active");

		return false;
	},
	this.popupClose = function(me) {
		$('html').removeClass('is-popup-open');
		$(me).parent().parent().removeClass('c-popup--active');

		return false;
	},
	this.move = function(me) {
		var $this = $(me),
			val = $this.attr('data-move');

		location.href = val + ".php";
		
		return false;
	},
	this.findAddr = function(level) {
		new daum.Postcode({
			oncomplete: function(data) {
				// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
	
				// 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
				// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
				var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
				var extraRoadAddr = ''; // 도로명 조합형 주소 변수
	
				// 법정동명이 있을 경우 추가한다. (법정리는 제외)
				// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
				if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
					extraRoadAddr += data.bname;
				}
				// 건물명이 있고, 공동주택일 경우 추가한다.
				if(data.buildingName !== '' && data.apartment === 'Y'){
				   extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
				}
				// 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
				if(extraRoadAddr !== ''){
					extraRoadAddr = ' (' + extraRoadAddr + ')';
				}
				// 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
				if(fullRoadAddr !== ''){
					fullRoadAddr += extraRoadAddr;
				}
	
				// 우편번호와 주소 정보를 해당 필드에 넣는다.
				// document.getElementById('mb_zipcode').value = data.zonecode; //5자리 새우편번호 사용
				// document.getElementById('mb_addr1').value 	= fullRoadAddr;
				document.getElementById('level' + level + '_addr').value 	= "(" + data.zonecode + ") " + fullRoadAddr;
			}
		}).open();	
	},
	this.levelSubmit = function(me, level) {
        var level_name      = $("#level" + level + "_name").val();
        var level_phone     = $("#level" + level + "_phone").val();
        var level_addr      = $("#level" + level + "_addr").val();
        // var level           = $("#level").val();

        // 임시 변수값
        // level_name          = "김영훈";
        // level_phone         = "11111";
        // level_addr          = "테스트 주소";
        // level               = 2;

		if (level_name == "")
		{
			alert("이름을 입력해 주세요.");
			$("#level" + level + "_name").focus();
			return false;
		}
		
		if (level_phone == "")
		{
			alert("전화번호를 입력해 주세요.");
			$("#level" + level + "_phone").focus();
			return false;
		}
		
		if (level_addr == "")
		{
			alert("주소를 입력해 주세요.");
			return false;
		}
		
		if ($("#level" + level+ "_agree1").prop("checked") === false)
		{
			alert('개인 정보 수집 및 이용약관에 동의하셔야만 이벤트 참여가 가능합니다.');
			return false;
		}
		
		if ($("#level" + level+ "_agree2").prop("checked") === false)
		{
			alert('개인 정보 취급 위탁 약관에 동의하셔야만 이벤트 참여가 가능합니다.');
			return false;
		}

        $.ajax({
			type:"POST",
			data:{
				"exec"					: "level_input_info",
				"level_name"			: level_name,
				"level_phone"			: level_phone,
				"level_addr"			: level_addr,
				"level"			        : level

			},
			url: "./main_exec.php",
			success: function(response){
				console.log(response);
			}
		});
		return false;
	}
}

wmbt = new bioderma();
wmbt.init();


// $(document).ready(function(){
// 	//	 input placeholder 
// 	var forms;
// 	forms = $('input');
// 	forms.placeholder();

// 	// popup
// 	$('.c-popup__close').on('click', function(){
// 		$('html').removeClass('is-popup-open');
// 		$(this).parent().parent().removeClass('c-popup--active');

// 		return false;
// 	});
	
// 	// game start
// 	$('.m-visual__button').on('click', function(){
// 		location.href = "game.php";

// 		return false;
// 	});
	
// 	// game start
// 	$('.m-video__button').on('click', function(){
// 		location.href = "game.php";

// 		return false;
// 	});
	
// 	// 팝업 오픈
// 	$('.m-video__button').on('click', function(){
// 		location.href = "game.php";

// 		return false;
// 	});
	

// });