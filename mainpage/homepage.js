// Generated by CoffeeScript 1.4.0
(function() {
  var Controls, PageController, Trainer, WordsCollection,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  PageController = (function() {

    function PageController() {
      var controls, trainer;
      trainer = new Trainer;
      controls = new Controls;
      $(controls).on("started", function(event, words, interval) {
        return trainer.start(words, interval);
      });
      $(controls).on("paused", function() {
        return trainer.pause();
      });
      $(controls).on("resumed", function(event, interval) {
        return trainer.resume(interval);
      });
    }

    return PageController;

  })();

  Controls = (function() {

    function Controls() {
      this.togglePause = __bind(this.togglePause, this);

      this.start = __bind(this.start, this);
      this.el = $("#controls");
      $("#start", this.el).on("click", this.start);
      $("#pause", this.el).on("click", this.togglePause);
    }

    Controls.prototype.start = function() {
      this.isPaused = false;
      $("#pause", this.el).html("Pause");
      return $(this).trigger("started", [this.getWordsArray(), this.getInterval()]);
    };

    Controls.prototype.pause = function() {
      this.isPaused = true;
      $("#pause", this.el).html("Resume");
      return $(this).trigger("paused");
    };

    Controls.prototype.resume = function() {
      this.isPaused = false;
      $("#pause", this.el).html("Pause");
      return $(this).trigger("resumed", [this.getInterval()]);
    };

    Controls.prototype.togglePause = function(event) {
      if (this.isPaused) {
        return this.resume();
      } else {
        return this.pause();
      }
    };

    Controls.prototype.getWordsArray = function() {
      return this.getWords().toArray();
    };

    Controls.prototype.getWords = function() {
      this.words = this.getWordsCollection();
      this.prepareWordsCollection();
      return this.words;
    };

    Controls.prototype.prepareWordsCollection = function() {
      if (this.parseSelectedOptions().delimiter) {
        words.delimit(options.delimter);
      }
      if (this.parseSelectedOptions().reverse) {
        return words.reverse();
      }
    };

    Controls.prototype.getWordsCollection = function() {
      return new WordsCollection($("textarea", this.el).val().split(" "));
    };

    Controls.prototype.getInterval = function() {
      return 60 / parseInt($("#wpm", this.el).val()) * 1000;
    };

    Controls.prototype.errorCheckText = function(words) {
      var i, word, _i, _len, _results;
      _results = [];
      for (i = _i = 0, _len = words.length; _i < _len; i = ++_i) {
        word = words[i];
        if (word = " ") {
          _results.push(words = words.slice(i, +i + 1 || 9e9));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Controls.prototype.parseSelectedOptions = function() {
      return {
        delimter: this.getDelimiterOption(),
        reverse: this.getReverseOption()
      };
    };

    Controls.prototype.getDelimiterOption = function() {
      return $("#delimit", this.el).hasClass("active") && $("#worddelimiter", this.el);
    };

    Controls.prototype.getReverseOption = function() {
      return $("#backwards", this.el).hasClass("active");
    };

    return Controls;

  })();

  WordsCollection = (function() {

    function WordsCollection(words) {
      this.words = words;
    }

    WordsCollection.prototype.delimit = function(delimter) {
      return this.words.join(" " + delimter + " ").split(" ");
    };

    WordsCollection.prototype.toArray = function() {
      return this.words;
    };

    return WordsCollection;

  })();

  Trainer = (function() {

    function Trainer() {
      this.displayNextWord = __bind(this.displayNextWord, this);
      this.el = $("#trainer");
    }

    Trainer.prototype.start = function(words, interval) {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.currentWordIndex = 0;
      this.words = words;
      return this.interval = setInterval(this.displayNextWord, interval);
    };

    Trainer.prototype.pause = function() {
      return clearInterval(this.interval);
    };

    Trainer.prototype.resume = function(interval) {
      return this.interval = setInterval(this.displayNextWord, interval);
    };

    Trainer.prototype.displayNextWord = function() {
      $("#word", this.el).html(this.words[this.currentWordIndex]);
      return this.currentWordIndex += 1;
    };

    return Trainer;

  })();

  new PageController();

}).call(this);
