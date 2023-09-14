import Feed from "@components/Feed";

function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>

      <p className="desc text-center">
        Search and dicover power AI prompts from popular developers with tags and keywords
      </p>

      <Feed />
    </section>
  );
}

export default Home;
