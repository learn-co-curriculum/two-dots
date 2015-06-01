describe('TwoDots', function() {
  var board;
  beforeEach(function(done){
    setFixtures('<body role="document"><link href="///Users/sprout/Development/fellowship/bk-002/js/two-dots/public/stylesheets/custom/style.css" rel="stylesheet" property="stylesheet"><link href="///Users/sprout/Development/fellowship/bk-002/js/two-dots/public/stylesheets/lib/bootstrap.min.css" rel="stylesheet" property="stylesheet"><link href="///Users/sprout/Development/fellowship/bk-002/js/two-dots/public/stylesheets/lib/bootstrap-theme.min.css" rel="stylesheet" property="stylesheet"><link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" property="stylesheet"><div class="container theme-showcase" role="main"><div class="jumbotron"><h1>Two Dots</h1><p>This is a basic object-oriented implementation of Two Dots.</p><p>Score: <span id="score">0</span></p></div></div><div class="container"><div class="row"><div class="col-md-6 col-md-offset-3 noselect" id="board"><i class="fa fa-cog fa-spin fa-5x"></i><p>Making snow...</p></div></div></div></body>');
    var width = 6;
    board = new Board(width);
    board.createBoard();
    for (var x = 0; x < board.dots.length; x++){
      for (var y = 0; y < board.dots[x].length; y++){
        board.dots[x][y].color = "red";
      }
    }
    board.dots[1][1].color = "blue";
    board.dots[2][1].color = "blue";
    board.dots[1][3].color = "yellow";
    board.dots[2][3].color = "yellow";
    board.dots[2][4].color = "yellow";
    board.render();
    setTimeout(function() {
      done();
    }, 2200);
  });

  describe('#init', function() {
    it('should build a square board with 36 dot objects', function() {
      board.init();
      expect($('.dot').length).toBe(36);
    });
  });

  describe('#makeDot', function() {
    it('returns a new dot object', function() {
      expect(board.makeDot()).toEqual(jasmine.any(Dot));
    });
  });

  describe('#validDrag', function() {
    it('should change dots accordingly if a valid horizontal move is made', function() {
      var first = $('[data-xaxis="1"][data-yaxis="1"]');
      var second = $('[data-xaxis="2"][data-yaxis="1"]');
      first.mousedown();
      second.mouseenter();
      second.mouseup();
      expect(board.dots[1][1].color).toBe("red");
      expect(board.dots[2][1].color).toBe("red");
    });

    it('should change dots accordingly if a valid vertical move is made', function() {
      var first = $('[data-xaxis="2"][data-yaxis="3"]');
      var second = $('[data-xaxis="2"][data-yaxis="4"]');
      first.mousedown();
      second.mouseenter();
      second.mouseup();
      expect(board.dots[2][3].color).toBe("blue");
      expect(board.dots[2][4].color).toBe("red");
    });

    it('should change dots accordingly if a valid L-shaped move is made', function() {
      var twoAbove = board.findDot([2,1]);
      $('[data-xaxis="1"][data-yaxis="3"]').mousedown();
      $('[data-xaxis="2"][data-yaxis="3"]').mouseenter();
      $('[data-xaxis="2"][data-yaxis="4"]').mouseenter();
      $('[data-xaxis="2"][data-yaxis="4"]').mouseup();
      var explodedDot = board.findDot([2,3]);
      expect(explodedDot).toEqual(twoAbove);
      expect(board.dots[1][3].color).toBe("red");
      expect(board.dots[2][3].color).toBe("blue");
      expect(board.dots[2][4].color).toBe("red");
    });
  });

  describe('invalidDrag', function() {
    it('should not change dots if selected dot colors do not match', function() {
      var dotObjBefore = board.findDot([1,1]);
      var first = $('[data-xaxis="1"][data-yaxis="1"]');
      var second = $('[data-xaxis="1"][data-yaxis="2"]');
      first.mousedown();
      second.mouseenter();
      second.mouseup();
      var dotObjAfter = board.findDot([1,1]);
      expect(dotObjBefore).toEqual(dotObjAfter);
      expect(board.dots[1][1].color).toBe("blue");
      expect(board.dots[1][2].color).toBe("red");
    });

    it('should not change dots if selected dots are not neighbors', function() {
      var dotObjBefore = board.findDot([1,1]);
      var first = $('[data-xaxis="1"][data-yaxis="1"]');
      var second = $('[data-xaxis="2"][data-yaxis="2"]');
      first.mousedown();
      second.mouseenter();
      second.mouseup();
      var dotObjAfter = board.findDot([1,1]);
      expect(dotObjBefore).toEqual(dotObjAfter);
      expect(board.dots[1][1].color).toBe("blue");
      expect(board.dots[2][2].color).toBe("red");
    });
  });

  describe('#updateScore', function(){
    it('should increment score by number of selected dots in a valid move', function(){
      $('[data-xaxis="1"][data-yaxis="3"]').mousedown();
      $('[data-xaxis="2"][data-yaxis="3"]').mouseenter();
      $('[data-xaxis="2"][data-yaxis="4"]').mouseenter();
      $('[data-xaxis="2"][data-yaxis="4"]').mouseup();
      expect(board.score).toEqual(3);
    });
  });

});
