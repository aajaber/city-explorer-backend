"use strict";

//================== Movies Class :
class Movies {
  constructor(title, overview, vote, count, image, popularity, release_date) {
    this.title = title;
    this.overview = overview;
    this.vote = vote;
    this.count = count;
    this.img = image;
    this.popularity = popularity;
    this.release_date = release_date;
  }
}

module.exports = Movies;
