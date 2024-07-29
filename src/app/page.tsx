import Link from "next/link";

const Home = () => {
  return (
    <>
      <h1>Welcome Home!</h1>
      <div>
        <Link href="/route">Routing</Link>
      </div>      
      <div>
        <Link href="/xyz">Custom 404 page</Link>
      </div>
      <div>
        <Link href="/nested-layout">Nestedlayout</Link>
      </div>
      <div>
        <Link href="/metadata-demo">Metadata</Link>
      </div>
      <div>
        <Link href="/not-found-programatically">404 programatically</Link>
      </div>
      <div>
        <Link href="/layout-vs-template">Layout v/s template</Link>
      </div>
      <div>
        <Link href="/error-boundry">Error Boundry</Link>
      </div>
      <div>
        <Link href="/error-boundry-reset">Error Boundry with reset</Link>
      </div>
      <div>
        <Link href="/slot">Slots / Parallel-routes</Link>
      </div>
      <div>
        <Link href="/auth-with-slot">Auth with slots</Link>
      </div>
      <div>
        <h3>L0050</h3>
        <Link href="/L0050/server-component">Server component</Link>
        <Link href="/L0050/client-component">Client component</Link>
      </div>
      <div>
        <Link href="/product">Product</Link>
      </div>
      <div>
        <Link href="/server-only">Server Only</Link>
      </div>
      <div>
        <Link href="/client-only">Client Only</Link>
      </div>
      <div>
        <Link href="/interleaving">Interleaving</Link>
      </div>
    </>
  );
};

export default Home;
