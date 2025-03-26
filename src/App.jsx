import Directory from "./Components/Directory/Directory";

function App() {
  const categories = [
    {
      id: 1,
      title: "Hats",
      imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
    },
    {
      id: 1,
      title: "Jackets",
      imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
    },
    {
      id: 1,
      title: "Sneakers",
      imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
    },
    {
      id: 1,
      title: "Women's",
      imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
    },
    {
      id: 1,
      title: "Men's",
      imageUrl: 'https://i.ibb.co/R70vBrQ/men.png'
    },
  ];

  return (
    <>
      <Directory categories={categories} />
    </>
  );
}

export default App;
