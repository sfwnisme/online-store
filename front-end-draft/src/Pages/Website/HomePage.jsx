
const HomePage = () => {
  //:::
  const srcImage = 'http://res.cloudinary.com/daa68wahe/image/upload/v1704753920/e-commerce/lsxav0cokz0rpowvjefu.png'
  //:::

  return (
    <div className="home-page">
      <img src={srcImage} alt="" />
      <h1>Welcome Home</h1>
    </div>
  )
}

export default HomePage