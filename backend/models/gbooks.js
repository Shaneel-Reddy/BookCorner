class gbooks {
    constructor(title, author,genre, coverImageUrl,description,rating, cost) {
      this.title = title;
      this.author = author;
      this.genre=genre;
      this.coverImageUrl = coverImageUrl; 
      this.description=description;
      this.rating=rating;
      this.cost = cost;
    }
  }
  
  module.exports = gbooks;
  