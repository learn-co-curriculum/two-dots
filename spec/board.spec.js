describe('DonutCounter', function() {
  beforeEach(function() {
    setFixtures('<body role="document"> <div class="container theme-showcase" role="main"> <div class="jumbotron"> <h1>Two Dots</h1> <p>This is a basic object-oriented implementation of Two Dots.</p><p>Score: <span id="score">0</span></p></div></div><div class="container"> <div class="row"> <div class="col-md-6 col-md-offset-3 noselect" id="board"> <i class="fa fa-cog fa-spin fa-5x"></i> <p>Making snow...</p></div></div></div><script src="public/javascripts/lib/jquery.min.js"></script> <script src="public/javascripts/lib/bootstrap.min.js"></script> <script src="public/javascripts/lib/underscore.js"></script> <script src="public/javascripts/lib/backbone.js"></script> <script src="public/javascripts/views/DotView.js"></script> <script src="public/javascripts/models/dot.js"></script> <script src="public/javascripts/custom/01-prevent-text-highlighting.js"></script> <script src="public/javascripts/custom/02-helper-functions.js"></script> <script src="public/javascripts/custom/03-dot.js"></script> <script src="public/javascripts/custom/04-board.js"></script> <script src="public/javascripts/custom/05-builder.js"></script> </body>');
    var donutCounter = new DonutCounter();
  });

  describe('adding and subtracting buttons', function() {
    it('can add donuts', function() {
      $('#donuts button').first().click();
      expect($('#donuts h3 span').text()).toBe('1');
    });

    it('can remove donuts if there are more than zero', function() {
      $('#donuts button').first().click();
      $('#donuts button').first().click();
      $('#donuts button').last().click();
      expect($('#donuts h3 span').text()).toBe('1');
      $('#donuts button').last().click();
      $('#donuts button').last().click();
      expect($('#donuts h3 span').text()).toBe('0');
    });

    it('can add guests', function() {
      $('#guests button').first().click();
      expect($('#guests h3 span').text()).toBe('1');
    });

    it('can remove guests if there are more than zero', function() {
      $('#guests button').first().click();
      $('#guests button').first().click();
      $('#guests button').last().click();
      expect($('#guests h3 span').text()).toBe('1');
      $('#guests button').last().click();
      $('#guests button').last().click();
      expect($('#guests h3 span').text()).toBe('0');
    });
  });

  describe('calculating donuts to guests', function() {
    it('knows if there are too few donuts', function() {
      $('#guests button').first().click();
      $('#check button').click();
      expect($('#status').text()).toBe('Guests are sad :(');
    });

    it('knows if there are no guests and no donuts', function() {
      $('#check button').click();
      expect($('#status').text()).toBe('Invite someone you jerk!');
    });

  });
});
