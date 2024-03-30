const dummy = (blogs) => {
  // this function will take an array of blogposts and return the value 1
  return 1;
};

const totalLikes = (blogs) => {
  // taking the list of blog posts and returning the sum/total of all the likes
  total = 0;
  for (let i = 0; i < blogs.length; i++) {
    total += blogs[i].likes;
  }

  return total;
};

const favoriteBlog = (blogs) => {
  favorite = {};
  highest = 0;
  index = 0;
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > highest) {
      highest = blogs[i].likes;
      index = i;
    }
  }
  favorite.title = blogs[index].title;
  favorite.author = blogs[index].author;
  favorite.likes = blogs[index].likes;

  return favorite;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
