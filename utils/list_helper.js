const totalLikes = (blogs) => {
    return blogs.reduce((acummulator, blog) => acummulator + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  let favorite = blogs[0];

  for (const blog of blogs) {
    if (blog.likes > favorite.likes) {
      favorite = blog;
    }
  }

  return favorite;
}
  
module.exports = {
  totalLikes,
  favoriteBlog
}