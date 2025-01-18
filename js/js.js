function start() { // inicio start()
	$("#inicio").hide()
	$('#fundoGame').append("<div id='fundoGame' class='anima1'></div>")
	$("#fundoGame").append("<div id='jogador' class='anima2'></div>")
	$("#fundoGame").append("<div id='obstaculo1' class='anima3'></div>")
	$("#fundoGame").append("<div id='obstaculo2' class='anima4'></div>")
	$("#fundoGame").append("<div id='placar'></div>")
	$("#fundoGame").append("<div id='energia'></div>")

	// principais variáveis
	var jogo = {}
	var velocidade = 5
	var posicaoX = parseInt(Math.random() * 334)
	var posicaoX2 = parseInt(Math.random() * 224)
	var fimdejogo = false
	var pontos = 0
	var salvos = 0
	var perdidos = 0
	var energiaAtual = 3
	var TECLA = {E:37, D:39}

	jogo.pressionou = []
	$(document).keydown(function(e) {
		jogo.pressionou[e.which] = true
	})
	$(document).keyup(function(e) {
		jogo.pressionou[e.which] = false
	})
	
	// game loop
	jogo.timer = setInterval(loop, 30)
	function loop() {
		movejogador()
		moveobstaculo1()
		moveobstaculo2()
		colisao()
		placar()
		energia()
	}// fim loop


	//moveJogador
	function movejogador() {
		if (jogo.pressionou[TECLA.E]) {
			var esq = parseInt($("#jogador").css("left"))
			$("#jogador").css("left", esq - 7)
			if (esq <= 0){ 
				$("#jogador").css("left", esq + 1)
			}
		}
		if (jogo.pressionou[TECLA.D]) {
			var esq = parseInt($("#jogador").css("left"))
			$("#jogador").css("left", esq + 7)
			if (esq >= 475) {
				$("#jogador").css("left", esq - 1)
			}
		}
	}
	//fim moveJogador

	//moveObstaculos
	function moveobstaculo1() {
		posicaoY = parseInt($("#obstaculo1").css("top"))
		$("#obstaculo1").css("top", posicaoY - velocidade)
		$("#obstaculo1").css("left", posicaoX)
		if (posicaoY <= 200) { 
			posicaoX = parseInt(Math.random() * 534)
			$("#obstaculo1").css("top", 400)
			$("#obstaculo1").css("left", posicaoX)
		}
		if (posicaoX >= 475) { 
			posicaoX = parseInt(Math.random() * 534)
			$("#obstaculo1").css("left", posicaoX)
		}
		
	}

	function moveobstaculo2() {
		posicaoY = parseInt($("#obstaculo2").css("top"))
		$("#obstaculo2").css("top", posicaoY - velocidade - 1)
		$("#obstaculo2").css("left", posicaoX2)
		if (posicaoY <= 220) {
			posicaoX2 = parseInt(Math.random() * 522)
			$("#obstaculo2").css("top", 400)
			$("#obstaculo2").css("left", posicaoX2)
		}
		if (posicaoX2 >= 475) { 
			posicaoX2 = parseInt(Math.random() * 534)
			$("#obstaculo2").css("top", 400)
			$("#obstaculo2").css("left", posicaoX2)
		}
	} // fim moveobstaculos

	//inicio colisao
	function colisao () {
		var colisao1 = ($("#jogador").collision($("#obstaculo1")))
		var colisao2 = ($("#jogador").collision($("#obstaculo2")))

		if (colisao1.length > 0) {
			pontos = pontos + 100
			salvos++
			obstaculo1X = parseInt($("#obstaculo1").css("left"))
			obstaculo1Y = parseInt($("#obstaculo1").css("top"))
			explosao1 (obstaculo1X, obstaculo1Y)
			posicaoX = parseInt(Math.random() * 334)
			$("#obstaculo1").css("top", 380)
			$("#obstaculo1").css("left", posicaoX)
		}

		if (colisao2.length > 0) {
			energiaAtual--
			perdidos++
			obstaculo2X = parseInt($("#obstaculo2").css("left"))
			obstaculo2Y = parseInt($("#obstaculo2").css("top"))
			explosao2 (obstaculo2X, obstaculo2Y)
			posicaoX2 = parseInt(Math.random() * 334)
			$("#obstaculo2").css("top", 380)
			$("#obstaculo2").css("left", posicaoX2)
		}
	} // fim colisao

	// explosões
	function explosao1(obstaculo1X, obstaculo1Y) {
		$("#fundoGame").append("<div id ='explosao1'></div>")
		$("#explosao1").css("background-image", "url(imgs/explosao1.png)")
		var div = $("#explosao1")
		div.css("top", obstaculo1Y)
		div.css("left", obstaculo1X)
		div.animate({width:100, opacity:0}, "slow")
		var tempoExplosao = window.setInterval(removeExplosao, 1000)
		function removeExplosao(){
			div.remove()
			window.clearInterval(tempoExplosao)
			tempoExplosao = null
		}
	} 
	function explosao2(obstaculo2X, obstaculo2Y) {
		$("#fundoGame").append("<div id ='explosao2'></div>")
		$("#explosao2").css("background-image", "url(imgs/explosao2.png)")
		var div2 = $("#explosao2")
		div2.css("top", obstaculo2Y)
		div2.css("left", obstaculo2X)
		div2.animate({width:70, opacity:0}, "slow")
		var tempoExplosao2 = window.setInterval(removeExplosao2, 1000)
		function removeExplosao2(){
			div2.remove()
			window.clearInterval(tempoExplosao2)
			tempoExplosao2 = null
		}
	} // fim explosões 

	// placar
	function placar() {
		$("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>")
	} // fim placar()

	// barra de energia
	function energia() {
		console.log(energiaAtual)
		if (energiaAtual==3) {
			$("#energia").css("background-image", "url(imgs/energia3.png)")
		}
		if (energiaAtual==2) {
			$("#energia").css("background-image", "url(imgs/energia2.png)")
		}
		if (energiaAtual==1) {
			$("#energia").css("background-image", "url(imgs/energia1.png)")
		}
		if (energiaAtual==0) {
			$("#energia").css("background-image", "url(imgs/energia0.png)")
			gameOver()
		}
	} // fim barra energia 


	// GameOver
	function gameOver() {
		fimdejogo = true
		window.clearInterval(jogo.timer)
		jogo.timer = null
		$("#jogador").remove()
		$("#obstaculo1").remove()
		$("#obstaculo2").remove()
		$("#fundoGame").append("<div id ='fim'></div>")
		$("#fim").html("<h1>Fim De Jogo!</h1><h3><p>Pontuacao: " + pontos + "</p></h3>" + 
		"<div id = 'reinicia' onClick = reiniciaJogo()><h3>Clique aqui para jogar novamente</h3></div>")
	} // fim GameOver
} // fim start()

// Reinicia Jogo
function reiniciaJogo() {
	$("#fim").remove()
	start()
}// fim reinicia
