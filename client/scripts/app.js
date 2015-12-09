var Movie = Backbone.Model.extend({

  defaults: {
    like: true
  },

  toggleLike: function() {
    // your code here
    if(this.get('like') === true) {
      this.set('like', false);
      console.log('false');
    } else {
      this.set('like', true);
      console.log('true');
    }
  }

});

var Movies = Backbone.Collection.extend({

  model: Movie,

  initialize: function() {
    // your code here
    this.field = 'title';
  },


  comparator: function(a,b) {
    a = a.get(this[field]);
    b = b.get(this[field]);
    return a > b ? 1 : a < b ? -1 : 0;
  },
  //comparator: this[]

  sortByField: function(field) {
    // your code here
    //console.log(field);
    this.set(this.comparator, field);
    console.log(this.comparator);
    this.sort();
  }

});

var AppView = Backbone.View.extend({

  events: {
    'click form input': 'handleClick'
  },

  handleClick: function(e) {
    var field = $(e.target).val();
    this.collection.sortByField(field);
  },

  render: function() {
    new MoviesView({
      el: this.$('#movies'),
      collection: this.collection
    }).render();
  }

});

var MovieView = Backbone.View.extend({

  template: _.template('<div class="movie"> \
                          <div class="like"> \
                            <button><img src="images/<%- like ? \'up\' : \'down\' %>.jpg"></button> \
                          </div> \
                          <span class="title"><%- title %></span> \
                          <span class="year">(<%- year %>)</span> \
                          <div class="rating">Fan rating: <%- rating %> of 10</div> \
                        </div>'),

  initialize: function() {
    // your code here

  },

  events: {
    'click button': 'handleClick'
  },

  handleClick: function() {
    // your code here
    this.model.toggleLike();
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }

});

var MoviesView = Backbone.View.extend({

  initialize: function() {
    // your code here
    //this.collection.on('sort', this.render, this);
  },

  render: function() {
    this.$el.empty();
    this.collection.forEach(this.renderMovie, this);
  },

  renderMovie: function(movie) {
    var movieView = new MovieView({model: movie});
    this.$el.append(movieView.render());
  }

});
