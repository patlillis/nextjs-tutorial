import Layout from '../components/MyLayout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

function Index(props) {
  return (
    <Layout>
      <h1>Batman TV Shows</h1>
      <ul>
        {props.shows.map(show => (
          <li key={show.id}>
            <Link href="/p/[id]" as={`/p/${show.id}`}>
              <a>{show.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

Index.getInitialProps = async function() {
  const result = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await result.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data.map(entry => entry.show),
  };
};

export default Index;
