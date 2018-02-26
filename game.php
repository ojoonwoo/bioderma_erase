<?
	include_once "./include/autoload.php";

    $mnv_f = new mnv_function();
    $my_db         = $mnv_f->Connect_MySQL();
    // $rs_tracking   = $mnv_f->InsertTrackingInfo($media, $gubun);
    // $mobileYN      = $mnv_f->MobileCheck();
    // $saveMedia     = $mnv_f->SaveMedia();

    include_once "./head.php";
?>
	<body>
		<div class="wrap">
			<div class="c-header">
				<div class="c-header__aligner">
					<h1 class="c-h1"><a href="#" class="c-h1__logo"><img src="./images/common/c-logo.png" alt="BIODERMA" /></a></h1>
					<div class="c-sns">
						<button class="c-sns__button c-sns__button--facebook">페이스북</button>
						<button class="c-sns__button c-sns__button--kakao">카카오스토리</button>
					</div>
					<div class="c-events">
						<button class="c-event c-event--1"><span>EVENT 1</span>건강한 피부만 남기다</button>
						<button class="c-event c-event--2"><span>EVENT 2</span>투고 키트 샘플링</button>
					</div>
				</div>
			</div>

			<div class="c-content c-content--sub">
				<div class="game__popup">
					<div class="game__starts">
						<a href="#" class="game__start">게임시작</a>
						<div class="game__start-txt"><img src="./images/pages/s-start__txt.png" alt="클릭 시 게임이 시작됩니다." /></div>
					</div>
				</div>
				<div class="c-content__aligner">
					<div class="gauge">
						<div class="gauge__time">30</div>
						<div class="gauge__bars">
							<div class="gauge__bar">
								<div class="gauge__adds"><div class="gauge__add"></div></div>
							</div>
						</div>
					</div>

					<div class="game">
						<div class="game__aligner">
							<!--
								.game__box에 "game__box--active"클래스 추가해주면 활성화
							-->
							<div class="game__box game__box--active">
								<div class="game__image game__image-1"><img src="./images/pages/game__image-1.png" alt="" /></div>
								<a href="#" class="game__cotton game__cotton-1"><img src="./images/pages/cotton-1.png" alt="" /></a>
							</div>
							<div class="game__box">
								<div class="game__image game__image-2"><img src="./images/pages/game__image-2.png" alt="" /></div>
								<a href="#" class="game__cotton game__cotton-2"><img src="./images/pages/cotton-2.png" alt="" /></a>
							</div>
							<div class="game__box">
								<div class="game__image game__image-3"><img src="./images/pages/game__image-3.png" alt="" /></div>
								<a href="#" class="game__cotton game__cotton-3"><img src="./images/pages/cotton-3.png" alt="" /></a>
							</div>
							<!--
								.game__step에 "game__step--active"클래스 추가해주면 활성화
							-->
							<div class="game__steps">
								<a href="#" class="game__step game__step--active">1</a>
								<a href="#" class="game__step">2</a>
								<a href="#" class="game__step">3</a>
							</div>
						</div>
					</div>
				</div>
			</div>
<?
	include_once "./footer.php";
?>		
			<script type="text/javascript">
						// gauge
						$('.game__start').on('click', function(){
							$('.game__popup').addClass('game__popup--active');
							$('.gauge__body').css('width','0');

							var count = -1;
							for ( var time=0 ; time <= 30; time++){
                                setTimeout(function(){
                                    var gaugeWidths = $('.gauge__adds').css('width'),
                                            gaugeWidth = parseInt(gaugeWidths.replace('px',''));
                                    $('.gauge__time').text(count+=1);
                                    $('.gauge__adds').animate({'width': ((count+1)*3.45)+'%'},1000,'linear');

                                    if ( count == 30){
                                        $('.gauge__adds').addClass('gauge__adds--active');
                                    }
                                },1000*time);
                            }
						});

						// eraser 
						eraserSet(1,100);
						eraserSet(2,80);
						eraserSet(3,60);

						 function eraserSet(imageNum, sizeValue) {
							$('.game__image-'+imageNum).find('img').eraser({
                                size: sizeValue,
                                progressFunction: function(p) {
                                    console.log(Math.round(p * 100) + '%');
                                }
							});
						 }

						 $('.game__cotton').on('mouseover', function(){
							var thisImgs = $(this).find('img').attr('src'),
								  thisImg = thisImgs.replace('.png','.cur');
							$(this).addClass('game__cotton--active');
							$('.game__aligner').css( 'cursor', 'url('+thisImg+'), auto' );
						 });
			</script>
		</div>
	</body>
</html>